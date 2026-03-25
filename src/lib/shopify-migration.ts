import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { persistMigrationToPostgres } from "@/lib/postgres-migration-store";

const DEFAULT_API_VERSION = "2026-01";
const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 100;
const SNAPSHOT_ROOT = path.join(process.cwd(), "data", "shopify-migrations");

export const SHOPIFY_RESOURCES = [
  "shop",
  "products",
  "productVariants",
  "collections",
  "customers",
  "pages",
  "blogs",
  "articles",
  "orders",
  "users",
] as const;

export type ShopifyResource = (typeof SHOPIFY_RESOURCES)[number];

type JsonRecord = Record<string, unknown>;

type BulkResourceResult = {
  resource: string;
  count: number;
  fileName: string;
  skipped?: boolean;
  reason?: string;
};

type MigrationSnapshotManifest = {
  snapshotName: string;
  createdAt: string;
  storeDomain: string;
  apiVersion: string;
  dryRun: boolean;
  resources: BulkResourceResult[];
};

export type ShopifyMigrationRequest = {
  storeDomain?: string;
  accessToken?: string;
  clientId?: string;
  clientSecret?: string;
  apiVersion?: string;
  resources?: ShopifyResource[];
  pageSize?: number;
  snapshotName?: string;
  dryRun?: boolean;
  includeExhaustive?: boolean;
};

type ShopifyConfig = {
  storeDomain: string;
  accessToken: string;
  apiVersion: string;
};

type RestEndpoint = {
  key: string;
  path: string;
  params?: Record<string, string | number>;
};

const REST_ENDPOINTS: RestEndpoint[] = [
  { key: "products_rest", path: "products.json", params: { limit: 250, status: "any" } },
  { key: "customers_rest", path: "customers.json", params: { limit: 250 } },
  { key: "orders_rest", path: "orders.json", params: { limit: 250, status: "any" } },
  { key: "pages_rest", path: "pages.json", params: { limit: 250 } },
  { key: "blogs_rest", path: "blogs.json", params: { limit: 250 } },
  { key: "articles_rest", path: "articles.json", params: { limit: 250 } },
  { key: "smart_collections_rest", path: "smart_collections.json", params: { limit: 250 } },
  { key: "custom_collections_rest", path: "custom_collections.json", params: { limit: 250 } },
  { key: "collects_rest", path: "collects.json", params: { limit: 250 } },
  { key: "themes_rest", path: "themes.json" },
  { key: "locations_rest", path: "locations.json", params: { limit: 250 } },
  { key: "price_rules_rest", path: "price_rules.json", params: { limit: 250 } },
  { key: "marketing_events_rest", path: "marketing_events.json", params: { limit: 250 } },
  { key: "redirects_rest", path: "redirects.json", params: { limit: 250 } },
  { key: "policies_rest", path: "policies.json" },
  { key: "shop_rest", path: "shop.json" },
];

class ShopifyMigrationError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function normalizeStoreDomain(input: string | undefined): string {
  if (!input) {
    return "";
  }

  return input
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
}

async function exchangeAdminAccessToken(
  storeDomain: string,
  clientId: string,
  clientSecret: string,
): Promise<string> {
  const response = await fetch(`https://${storeDomain}/admin/oauth/access_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ShopifyMigrationError(
      `Shopify token exchange failed with ${response.status}: ${text}`,
      response.status,
    );
  }

  const json = (await response.json()) as { access_token?: string };
  if (!json.access_token) {
    throw new ShopifyMigrationError(
      "Shopify token exchange succeeded but no access_token was returned.",
      502,
    );
  }

  return json.access_token;
}

async function resolveConfig(overrides: ShopifyMigrationRequest): Promise<ShopifyConfig> {
  const storeDomain = normalizeStoreDomain(
    overrides.storeDomain ?? process.env.SHOPIFY_STORE_DOMAIN,
  );
  const apiVersion =
    overrides.apiVersion ?? process.env.SHOPIFY_ADMIN_API_VERSION ?? DEFAULT_API_VERSION;
  const accessToken =
    overrides.accessToken ?? process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ?? "";
  const clientId = overrides.clientId ?? process.env.SHOPIFY_CLIENT_ID ?? "";
  const clientSecret =
    overrides.clientSecret ?? process.env.SHOPIFY_CLIENT_SECRET ?? "";

  if (!storeDomain) {
    throw new ShopifyMigrationError(
      "Missing Shopify store domain. Set SHOPIFY_STORE_DOMAIN or send storeDomain in the request body.",
    );
  }

  if (accessToken) {
    return {
      storeDomain,
      accessToken,
      apiVersion,
    };
  }

  if (!clientId || !clientSecret) {
    throw new ShopifyMigrationError(
      "Missing Shopify credentials. Set SHOPIFY_ADMIN_ACCESS_TOKEN or provide SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET.",
    );
  }

  const exchangedAccessToken = await exchangeAdminAccessToken(
    storeDomain,
    clientId,
    clientSecret,
  );

  return {
    storeDomain,
    accessToken: exchangedAccessToken,
    apiVersion,
  };
}

function sanitizeSnapshotName(input?: string): string {
  const fallback = new Date().toISOString().replace(/[:.]/g, "-");
  if (!input) {
    return fallback;
  }

  const sanitized = input.trim().replace(/[^a-zA-Z0-9-_]/g, "-");
  return sanitized || fallback;
}

function resolveResources(resources?: ShopifyResource[]): ShopifyResource[] {
  if (!resources || resources.length === 0) {
    return [...SHOPIFY_RESOURCES];
  }

  const invalid = resources.filter((resource) => !SHOPIFY_RESOURCES.includes(resource));
  if (invalid.length > 0) {
    throw new ShopifyMigrationError(
      `Unsupported resources requested: ${invalid.join(", ")}`,
    );
  }

  return Array.from(new Set(resources));
}

function resolvePageSize(pageSize?: number): number {
  if (!pageSize) {
    return DEFAULT_PAGE_SIZE;
  }

  return Math.max(1, Math.min(MAX_PAGE_SIZE, Math.floor(pageSize)));
}

async function shopifyGraphql<TData>(
  config: ShopifyConfig,
  query: string,
  variables?: JsonRecord,
): Promise<TData> {
  const endpoint = `https://${config.storeDomain}/admin/api/${config.apiVersion}/graphql.json`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": config.accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ShopifyMigrationError(
      `Shopify request failed with ${response.status}: ${text}`,
      response.status,
    );
  }

  const json = (await response.json()) as {
    data?: TData;
    errors?: Array<{ message?: string }>;
  };

  if (json.errors && json.errors.length > 0) {
    throw new ShopifyMigrationError(
      json.errors.map((entry) => entry.message ?? "Unknown Shopify error").join("; "),
      502,
    );
  }

  if (!json.data) {
    throw new ShopifyMigrationError("Shopify returned an empty data payload.", 502);
  }

  return json.data;
}

function parseNextLink(headerValue: string | null): string | null {
  if (!headerValue) {
    return null;
  }

  const parts = headerValue.split(",");
  for (const part of parts) {
    const section = part.trim();
    if (!section.includes('rel="next"')) {
      continue;
    }

    const match = section.match(/<([^>]+)>/);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

async function shopifyRestFetchAll(
  config: ShopifyConfig,
  endpoint: RestEndpoint,
): Promise<unknown[]> {
  let url = new URL(`https://${config.storeDomain}/admin/api/${config.apiVersion}/${endpoint.path}`);
  if (endpoint.params) {
    for (const [key, value] of Object.entries(endpoint.params)) {
      url.searchParams.set(key, String(value));
    }
  }

  const allItems: unknown[] = [];

  while (true) {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": config.accessToken,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ShopifyMigrationError(
        `Shopify REST request failed (${endpoint.path}) with ${response.status}: ${text}`,
        response.status,
      );
    }

    const payload = (await response.json()) as Record<string, unknown>;
    const arrayKey = Object.keys(payload).find((key) => Array.isArray(payload[key]));
    if (arrayKey) {
      const pageItems = payload[arrayKey] as unknown[];
      allItems.push(...pageItems);
    } else {
      allItems.push(payload);
    }

    const nextLink = parseNextLink(response.headers.get("link"));
    if (!nextLink) {
      break;
    }

    url = new URL(nextLink);
  }

  return allItems;
}

async function fetchExhaustiveRestResources(config: ShopifyConfig) {
  const dataByEndpoint: Record<string, unknown[]> = {};
  const results: BulkResourceResult[] = [];

  for (const endpoint of REST_ENDPOINTS) {
    try {
      const data = await shopifyRestFetchAll(config, endpoint);
      dataByEndpoint[endpoint.key] = data;
      results.push({
        resource: endpoint.key,
        count: data.length,
        fileName: `${endpoint.key}.json`,
      });
    } catch (error) {
      const reason =
        error instanceof Error ? error.message : "Unknown Shopify REST migration error";
      results.push({
        resource: endpoint.key,
        count: 0,
        fileName: `${endpoint.key}.json`,
        skipped: true,
        reason,
      });
    }
  }

  return {
    dataByEndpoint,
    results,
  };
}

type ConnectionPage<TNode> = {
  nodes: TNode[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

async function paginateConnection<TNode>(
  config: ShopifyConfig,
  query: string,
  rootField: string,
  pageSize: number,
): Promise<TNode[]> {
  const items: TNode[] = [];
  let cursor: string | null = null;

  do {
    const data: Record<string, ConnectionPage<TNode>> = await shopifyGraphql<
      Record<string, ConnectionPage<TNode>>
    >(
      config,
      query,
      {
        first: pageSize,
        after: cursor,
      },
    );

    const connection = data[rootField];
    if (!connection) {
      throw new ShopifyMigrationError(
        `Shopify response was missing the ${rootField} connection.`,
        502,
      );
    }

    items.push(...connection.nodes);
    cursor = connection.pageInfo.hasNextPage ? connection.pageInfo.endCursor : null;
  } while (cursor);

  return items;
}

async function fetchResource(
  config: ShopifyConfig,
  resource: ShopifyResource,
  pageSize: number,
): Promise<unknown> {
  switch (resource) {
    case "shop": {
      const data = await shopifyGraphql<{ shop: JsonRecord }>(
        config,
        `query ShopDetails {
          shop {
            id
            name
            email
            currencyCode
            myshopifyDomain
            primaryDomain {
              host
              url
            }
          }
        }`,
      );
      return data.shop;
    }
    case "products":
      return paginateConnection<JsonRecord>(
        config,
        `query Products($first: Int!, $after: String) {
          products(first: $first, after: $after, sortKey: ID) {
            nodes {
              id
              legacyResourceId
              title
              handle
              status
              productType
              vendor
              tags
              createdAt
              updatedAt
              descriptionHtml
              featuredImage {
                url
                altText
                width
                height
              }
              seo {
                title
                description
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        "products",
        pageSize,
      );
    case "productVariants":
      return paginateConnection<JsonRecord>(
        config,
        `query ProductVariants($first: Int!, $after: String) {
          productVariants(first: $first, after: $after, sortKey: ID) {
            nodes {
              id
              legacyResourceId
              title
              sku
              barcode
              price
              compareAtPrice
              taxable
              inventoryQuantity
              createdAt
              updatedAt
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
                width
                height
              }
              product {
                id
                legacyResourceId
                title
                handle
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        "productVariants",
        pageSize,
      );
    case "collections":
      return paginateConnection<JsonRecord>(
        config,
        `query Collections($first: Int!, $after: String) {
          collections(first: $first, after: $after, sortKey: ID) {
            nodes {
              id
              legacyResourceId
              title
              handle
              updatedAt
              descriptionHtml
              seo {
                title
                description
              }
              image {
                url
                altText
                width
                height
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        "collections",
        pageSize,
      );
    case "customers":
      return paginateConnection<JsonRecord>(
        config,
        `query Customers($first: Int!, $after: String) {
          customers(first: $first, after: $after, sortKey: UPDATED_AT) {
            nodes {
              id
              firstName
              lastName
              createdAt
              updatedAt
              numberOfOrders
              state
              verifiedEmail
              taxExempt
              tags
              defaultEmailAddress {
                emailAddress
                marketingState
              }
              defaultPhoneNumber {
                phoneNumber
                marketingState
                marketingCollectedFrom
              }
              amountSpent {
                amount
                currencyCode
              }
              addresses {
                id
                firstName
                lastName
                address1
                address2
                city
                province
                country
                zip
                phone
                name
                provinceCode
                countryCodeV2
              }
              defaultAddress {
                id
                address1
                address2
                city
                province
                country
                zip
                phone
                provinceCode
                countryCodeV2
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        "customers",
        pageSize,
      );
    case "pages":
      return paginateConnection<JsonRecord>(
        config,
        `query Pages($first: Int!, $after: String) {
          pages(first: $first, after: $after, sortKey: UPDATED_AT) {
            nodes {
              id
              title
              handle
              body
              createdAt
              updatedAt
              publishedAt
              templateSuffix
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        "pages",
        pageSize,
      );
    case "blogs":
      return paginateConnection<JsonRecord>(
        config,
        `query Blogs($first: Int!, $after: String) {
          blogs(first: $first, after: $after, sortKey: ID) {
            nodes {
              id
              title
              handle
              templateSuffix
              createdAt
              updatedAt
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        "blogs",
        pageSize,
      );
    case "articles":
      return paginateConnection<JsonRecord>(
        config,
        `query Articles($first: Int!, $after: String) {
          articles(first: $first, after: $after, sortKey: ID) {
            nodes {
              id
              title
              handle
              summary
              body
              tags
              createdAt
              updatedAt
              publishedAt
              author {
                name
              }
              blog {
                id
                title
                handle
              }
              image {
                url
                altText
                width
                height
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        "articles",
        pageSize,
      );
    case "orders":
      return paginateConnection<JsonRecord>(
        config,
        `query Orders($first: Int!, $after: String) {
          orders(first: $first, after: $after, sortKey: UPDATED_AT) {
            nodes {
              id
              legacyResourceId
              name
              createdAt
              updatedAt
              processedAt
              displayFinancialStatus
              displayFulfillmentStatus
              currencyCode
              customerAcceptsMarketing
              note
              subtotalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              totalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              totalShippingPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              customer {
                id
                firstName
                lastName
                defaultEmailAddress {
                  emailAddress
                }
              }
              shippingAddress {
                address1
                address2
                city
                province
                country
                zip
                phone
              }
              billingAddress {
                address1
                address2
                city
                province
                country
                zip
                phone
              }
              lineItems(first: 100) {
                nodes {
                  id
                  currentQuantity
                  sku
                  title
                  variantTitle
                  vendor
                  originalTotalSet {
                    shopMoney {
                      amount
                      currencyCode
                    }
                  }
                  discountedTotalSet {
                    shopMoney {
                      amount
                      currencyCode
                    }
                  }
                  product {
                    id
                    legacyResourceId
                    title
                    handle
                  }
                  variant {
                    id
                    legacyResourceId
                    title
                    sku
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        "orders",
        pageSize,
      );
    case "users":
      return paginateConnection<JsonRecord>(
        config,
        `query StaffMembers($first: Int!, $after: String) {
          staffMembers(first: $first, after: $after, sortKey: ID) {
            nodes {
              id
              firstName
              lastName
              email
              accountType
              active
              initials
              locale
              isShopOwner
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        "staffMembers",
        pageSize,
      );
    default:
      throw new ShopifyMigrationError(`Unhandled resource: ${resource}`);
  }
}

async function writeSnapshotFiles(
  snapshotName: string,
  manifest: MigrationSnapshotManifest,
  dataByResource: Record<string, unknown>,
): Promise<string> {
  const snapshotDir = path.join(SNAPSHOT_ROOT, snapshotName);
  await mkdir(snapshotDir, { recursive: true });

  await Promise.all(
    Object.entries(dataByResource).map(async ([resource, data]) => {
      await writeFile(
        path.join(snapshotDir, `${resource}.json`),
        JSON.stringify(data, null, 2),
        "utf8",
      );
    }),
  );

  await writeFile(
    path.join(snapshotDir, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  return snapshotDir;
}

export async function runShopifyMigration(input: ShopifyMigrationRequest) {
  const config = await resolveConfig(input);
  const pageSize = resolvePageSize(input.pageSize);
  const resources = resolveResources(input.resources);
  const snapshotName = sanitizeSnapshotName(input.snapshotName);
  const dryRun = Boolean(input.dryRun);
  const includeExhaustive = input.includeExhaustive !== false;

  const dataByResource: Record<string, unknown> = {};
  const results: BulkResourceResult[] = [];

  for (const resource of resources) {
    try {
      const data = await fetchResource(config, resource, pageSize);
      dataByResource[resource] = data;
      results.push({
        resource,
        count: Array.isArray(data) ? data.length : 1,
        fileName: `${resource}.json`,
      });
    } catch (error) {
      const reason =
        error instanceof Error ? error.message : "Unknown Shopify migration error";

      results.push({
        resource,
        count: 0,
        fileName: `${resource}.json`,
        skipped: true,
        reason,
      });
    }
  }

  if (includeExhaustive) {
    const exhaustive = await fetchExhaustiveRestResources(config);
    Object.assign(dataByResource, exhaustive.dataByEndpoint);
    results.push(...exhaustive.results);
  }

  const manifest: MigrationSnapshotManifest = {
    snapshotName,
    createdAt: new Date().toISOString(),
    storeDomain: config.storeDomain,
    apiVersion: config.apiVersion,
    dryRun,
    resources: results,
  };

  let snapshotDir: string | null = null;
  if (!dryRun) {
    snapshotDir = await writeSnapshotFiles(snapshotName, manifest, dataByResource);
    await persistMigrationToPostgres({
      manifest,
      dataByResource,
    });
  }

  return {
    snapshotName,
    snapshotDir,
    manifest,
    data: dryRun ? dataByResource : undefined,
  };
}

export async function listMigrationSnapshots(limit = 10) {
  try {
    const names = await readdir(SNAPSHOT_ROOT);
    const manifests = await Promise.all(
      names.map(async (name) => {
        const filePath = path.join(SNAPSHOT_ROOT, name, "manifest.json");
        try {
          const file = await readFile(filePath, "utf8");
          return JSON.parse(file) as MigrationSnapshotManifest;
        } catch {
          return null;
        }
      }),
    );

    return manifests
      .filter((manifest): manifest is MigrationSnapshotManifest => manifest !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  } catch {
    return [];
  }
}

export function getMigrationInstructions() {
  return {
    apiVersionDefault: DEFAULT_API_VERSION,
    resources: SHOPIFY_RESOURCES,
    env: [
      "SHOPIFY_STORE_DOMAIN",
      "SHOPIFY_ADMIN_ACCESS_TOKEN",
      "SHOPIFY_CLIENT_ID",
      "SHOPIFY_CLIENT_SECRET",
      "SHOPIFY_ADMIN_API_VERSION (optional)",
    ],
    requiredScopes: [
      "read_products",
      "read_customers",
      "read_orders",
      "read_content",
      "read_online_store_pages",
    ],
    optionalScopes: [
      "read_all_orders",
      "read_users",
    ],
    notes: [
      "Orders older than 60 days require the read_all_orders scope.",
      "Staff user export depends on your app having access to staff member data.",
      "Snapshots are written to data/shopify-migrations/<snapshotName>/",
    ],
  };
}
