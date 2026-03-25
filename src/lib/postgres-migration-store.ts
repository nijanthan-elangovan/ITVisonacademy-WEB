import { Pool, type PoolClient } from "pg";

type JsonObject = Record<string, unknown>;

export type PersistManifest = {
  snapshotName: string;
  createdAt: string;
  storeDomain: string;
  apiVersion: string;
  dryRun: boolean;
  resources: Array<{
    resource: string;
    count: number;
    fileName: string;
    skipped?: boolean;
    reason?: string;
  }>;
};

type PersistInput = {
  manifest: PersistManifest;
  dataByResource: Partial<Record<string, unknown>>;
};

let pool: Pool | null = null;

function getPool() {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL for PostgreSQL persistence.");
  }

  pool = new Pool({
    connectionString,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });

  return pool;
}

function asArray(value: unknown): JsonObject[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is JsonObject => typeof item === "object" && item !== null,
  );
}

function asObject(value: unknown): JsonObject {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }

  return value as JsonObject;
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

async function ensureSchema(client: PoolClient) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS migration_runs (
      id BIGSERIAL PRIMARY KEY,
      snapshot_name TEXT UNIQUE NOT NULL,
      store_domain TEXT NOT NULL,
      api_version TEXT NOT NULL,
      dry_run BOOLEAN NOT NULL DEFAULT FALSE,
      raw_manifest JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS shops (
      shop_id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      currency_code TEXT,
      myshopify_domain TEXT,
      primary_domain_host TEXT,
      primary_domain_url TEXT,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      product_id TEXT PRIMARY KEY,
      legacy_resource_id BIGINT,
      title TEXT,
      handle TEXT,
      status TEXT,
      product_type TEXT,
      vendor TEXT,
      tags TEXT[],
      description_html TEXT,
      featured_image_url TEXT,
      featured_image_alt TEXT,
      seo_title TEXT,
      seo_description TEXT,
      created_at_shopify TIMESTAMPTZ,
      updated_at_shopify TIMESTAMPTZ,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS product_variants (
      variant_id TEXT PRIMARY KEY,
      legacy_resource_id BIGINT,
      product_id TEXT,
      product_title TEXT,
      product_handle TEXT,
      title TEXT,
      sku TEXT,
      barcode TEXT,
      price NUMERIC(18, 6),
      compare_at_price NUMERIC(18, 6),
      taxable BOOLEAN,
      inventory_quantity INTEGER,
      selected_options JSONB,
      image_url TEXT,
      created_at_shopify TIMESTAMPTZ,
      updated_at_shopify TIMESTAMPTZ,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS collections (
      collection_id TEXT PRIMARY KEY,
      legacy_resource_id BIGINT,
      title TEXT,
      handle TEXT,
      description_html TEXT,
      seo_title TEXT,
      seo_description TEXT,
      image_url TEXT,
      updated_at_shopify TIMESTAMPTZ,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS customers (
      customer_id TEXT PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      phone TEXT,
      state TEXT,
      verified_email BOOLEAN,
      tax_exempt BOOLEAN,
      number_of_orders INTEGER,
      amount_spent NUMERIC(18, 6),
      amount_spent_currency TEXT,
      tags TEXT[],
      default_address JSONB,
      addresses JSONB,
      created_at_shopify TIMESTAMPTZ,
      updated_at_shopify TIMESTAMPTZ,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pages (
      page_id TEXT PRIMARY KEY,
      title TEXT,
      handle TEXT,
      body TEXT,
      template_suffix TEXT,
      published_at_shopify TIMESTAMPTZ,
      created_at_shopify TIMESTAMPTZ,
      updated_at_shopify TIMESTAMPTZ,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS blogs (
      blog_id TEXT PRIMARY KEY,
      title TEXT,
      handle TEXT,
      template_suffix TEXT,
      created_at_shopify TIMESTAMPTZ,
      updated_at_shopify TIMESTAMPTZ,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS articles (
      article_id TEXT PRIMARY KEY,
      blog_id TEXT,
      blog_title TEXT,
      blog_handle TEXT,
      title TEXT,
      handle TEXT,
      summary TEXT,
      body TEXT,
      author_name TEXT,
      tags TEXT[],
      image_url TEXT,
      published_at_shopify TIMESTAMPTZ,
      created_at_shopify TIMESTAMPTZ,
      updated_at_shopify TIMESTAMPTZ,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      order_id TEXT PRIMARY KEY,
      legacy_resource_id BIGINT,
      order_name TEXT,
      financial_status TEXT,
      fulfillment_status TEXT,
      currency_code TEXT,
      customer_id TEXT,
      customer_first_name TEXT,
      customer_last_name TEXT,
      customer_email TEXT,
      customer_accepts_marketing BOOLEAN,
      note TEXT,
      subtotal_amount NUMERIC(18, 6),
      total_amount NUMERIC(18, 6),
      shipping_amount NUMERIC(18, 6),
      shipping_address JSONB,
      billing_address JSONB,
      line_items JSONB,
      processed_at_shopify TIMESTAMPTZ,
      created_at_shopify TIMESTAMPTZ,
      updated_at_shopify TIMESTAMPTZ,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS staff_users (
      user_id TEXT PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      account_type TEXT,
      active BOOLEAN,
      initials TEXT,
      locale TEXT,
      is_shop_owner BOOLEAN,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      raw JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS shopify_resource_dumps (
      id BIGSERIAL PRIMARY KEY,
      snapshot_name TEXT NOT NULL,
      resource_type TEXT NOT NULL,
      resource_id TEXT NOT NULL,
      payload JSONB NOT NULL,
      migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (snapshot_name, resource_type, resource_id)
    );
  `);
}

async function upsertMigrationRun(client: PoolClient, manifest: PersistManifest) {
  await client.query(
    `INSERT INTO migration_runs (snapshot_name, store_domain, api_version, dry_run, raw_manifest, created_at)
     VALUES ($1, $2, $3, $4, $5::jsonb, $6::timestamptz)
     ON CONFLICT (snapshot_name)
     DO UPDATE SET
       store_domain = EXCLUDED.store_domain,
       api_version = EXCLUDED.api_version,
       dry_run = EXCLUDED.dry_run,
       raw_manifest = EXCLUDED.raw_manifest,
       created_at = EXCLUDED.created_at`,
    [
      manifest.snapshotName,
      manifest.storeDomain,
      manifest.apiVersion,
      manifest.dryRun,
      JSON.stringify(manifest),
      manifest.createdAt,
    ],
  );
}

async function upsertShop(client: PoolClient, raw: JsonObject) {
  const primaryDomain = asObject(raw.primaryDomain);
  await client.query(
    `INSERT INTO shops (
      shop_id, name, email, currency_code, myshopify_domain, primary_domain_host, primary_domain_url, raw
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb)
    ON CONFLICT (shop_id)
    DO UPDATE SET
      name=EXCLUDED.name,
      email=EXCLUDED.email,
      currency_code=EXCLUDED.currency_code,
      myshopify_domain=EXCLUDED.myshopify_domain,
      primary_domain_host=EXCLUDED.primary_domain_host,
      primary_domain_url=EXCLUDED.primary_domain_url,
      raw=EXCLUDED.raw,
      migrated_at=NOW()`,
    [
      asString(raw.id),
      asString(raw.name),
      asString(raw.email),
      asString(raw.currencyCode),
      asString(raw.myshopifyDomain),
      asString(primaryDomain.host),
      asString(primaryDomain.url),
      JSON.stringify(raw),
    ],
  );
}

async function upsertProducts(client: PoolClient, items: JsonObject[]) {
  for (const raw of items) {
    const featuredImage = asObject(raw.featuredImage);
    const seo = asObject(raw.seo);
    await client.query(
      `INSERT INTO products (
        product_id, legacy_resource_id, title, handle, status, product_type, vendor, tags,
        description_html, featured_image_url, featured_image_alt, seo_title, seo_description,
        created_at_shopify, updated_at_shopify, raw
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::timestamptz,$15::timestamptz,$16::jsonb)
      ON CONFLICT (product_id)
      DO UPDATE SET
        legacy_resource_id=EXCLUDED.legacy_resource_id,
        title=EXCLUDED.title,
        handle=EXCLUDED.handle,
        status=EXCLUDED.status,
        product_type=EXCLUDED.product_type,
        vendor=EXCLUDED.vendor,
        tags=EXCLUDED.tags,
        description_html=EXCLUDED.description_html,
        featured_image_url=EXCLUDED.featured_image_url,
        featured_image_alt=EXCLUDED.featured_image_alt,
        seo_title=EXCLUDED.seo_title,
        seo_description=EXCLUDED.seo_description,
        created_at_shopify=EXCLUDED.created_at_shopify,
        updated_at_shopify=EXCLUDED.updated_at_shopify,
        raw=EXCLUDED.raw,
        migrated_at=NOW()`,
      [
        asString(raw.id),
        asNumber(raw.legacyResourceId),
        asString(raw.title),
        asString(raw.handle),
        asString(raw.status),
        asString(raw.productType),
        asString(raw.vendor),
        asStringArray(raw.tags),
        asString(raw.descriptionHtml),
        asString(featuredImage.url),
        asString(featuredImage.altText),
        asString(seo.title),
        asString(seo.description),
        asString(raw.createdAt),
        asString(raw.updatedAt),
        JSON.stringify(raw),
      ],
    );
  }
}

async function upsertVariants(client: PoolClient, items: JsonObject[]) {
  for (const raw of items) {
    const image = asObject(raw.image);
    const product = asObject(raw.product);
    await client.query(
      `INSERT INTO product_variants (
        variant_id, legacy_resource_id, product_id, product_title, product_handle,
        title, sku, barcode, price, compare_at_price, taxable, inventory_quantity,
        selected_options, image_url, created_at_shopify, updated_at_shopify, raw
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14,$15::timestamptz,$16::timestamptz,$17::jsonb)
      ON CONFLICT (variant_id)
      DO UPDATE SET
        legacy_resource_id=EXCLUDED.legacy_resource_id,
        product_id=EXCLUDED.product_id,
        product_title=EXCLUDED.product_title,
        product_handle=EXCLUDED.product_handle,
        title=EXCLUDED.title,
        sku=EXCLUDED.sku,
        barcode=EXCLUDED.barcode,
        price=EXCLUDED.price,
        compare_at_price=EXCLUDED.compare_at_price,
        taxable=EXCLUDED.taxable,
        inventory_quantity=EXCLUDED.inventory_quantity,
        selected_options=EXCLUDED.selected_options,
        image_url=EXCLUDED.image_url,
        created_at_shopify=EXCLUDED.created_at_shopify,
        updated_at_shopify=EXCLUDED.updated_at_shopify,
        raw=EXCLUDED.raw,
        migrated_at=NOW()`,
      [
        asString(raw.id),
        asNumber(raw.legacyResourceId),
        asString(product.id),
        asString(product.title),
        asString(product.handle),
        asString(raw.title),
        asString(raw.sku),
        asString(raw.barcode),
        asNumber(raw.price),
        asNumber(raw.compareAtPrice),
        asBoolean(raw.taxable),
        asNumber(raw.inventoryQuantity),
        JSON.stringify(raw.selectedOptions ?? []),
        asString(image.url),
        asString(raw.createdAt),
        asString(raw.updatedAt),
        JSON.stringify(raw),
      ],
    );
  }
}

async function upsertCollections(client: PoolClient, items: JsonObject[]) {
  for (const raw of items) {
    const image = asObject(raw.image);
    const seo = asObject(raw.seo);
    await client.query(
      `INSERT INTO collections (
        collection_id, legacy_resource_id, title, handle, description_html, seo_title,
        seo_description, image_url, updated_at_shopify, raw
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::timestamptz,$10::jsonb)
      ON CONFLICT (collection_id)
      DO UPDATE SET
        legacy_resource_id=EXCLUDED.legacy_resource_id,
        title=EXCLUDED.title,
        handle=EXCLUDED.handle,
        description_html=EXCLUDED.description_html,
        seo_title=EXCLUDED.seo_title,
        seo_description=EXCLUDED.seo_description,
        image_url=EXCLUDED.image_url,
        updated_at_shopify=EXCLUDED.updated_at_shopify,
        raw=EXCLUDED.raw,
        migrated_at=NOW()`,
      [
        asString(raw.id),
        asNumber(raw.legacyResourceId),
        asString(raw.title),
        asString(raw.handle),
        asString(raw.descriptionHtml),
        asString(seo.title),
        asString(seo.description),
        asString(image.url),
        asString(raw.updatedAt),
        JSON.stringify(raw),
      ],
    );
  }
}

async function upsertCustomers(client: PoolClient, items: JsonObject[]) {
  for (const raw of items) {
    const defaultEmailAddress = asObject(raw.defaultEmailAddress);
    const defaultPhoneNumber = asObject(raw.defaultPhoneNumber);
    const amountSpent = asObject(raw.amountSpent);
    await client.query(
      `INSERT INTO customers (
        customer_id, first_name, last_name, email, phone, state, verified_email, tax_exempt,
        number_of_orders, amount_spent, amount_spent_currency, tags, default_address, addresses,
        created_at_shopify, updated_at_shopify, raw
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14::jsonb,$15::timestamptz,$16::timestamptz,$17::jsonb)
      ON CONFLICT (customer_id)
      DO UPDATE SET
        first_name=EXCLUDED.first_name,
        last_name=EXCLUDED.last_name,
        email=EXCLUDED.email,
        phone=EXCLUDED.phone,
        state=EXCLUDED.state,
        verified_email=EXCLUDED.verified_email,
        tax_exempt=EXCLUDED.tax_exempt,
        number_of_orders=EXCLUDED.number_of_orders,
        amount_spent=EXCLUDED.amount_spent,
        amount_spent_currency=EXCLUDED.amount_spent_currency,
        tags=EXCLUDED.tags,
        default_address=EXCLUDED.default_address,
        addresses=EXCLUDED.addresses,
        created_at_shopify=EXCLUDED.created_at_shopify,
        updated_at_shopify=EXCLUDED.updated_at_shopify,
        raw=EXCLUDED.raw,
        migrated_at=NOW()`,
      [
        asString(raw.id),
        asString(raw.firstName),
        asString(raw.lastName),
        asString(defaultEmailAddress.emailAddress),
        asString(defaultPhoneNumber.phoneNumber),
        asString(raw.state),
        asBoolean(raw.verifiedEmail),
        asBoolean(raw.taxExempt),
        asNumber(raw.numberOfOrders),
        asNumber(amountSpent.amount),
        asString(amountSpent.currencyCode),
        asStringArray(raw.tags),
        JSON.stringify(raw.defaultAddress ?? {}),
        JSON.stringify(raw.addresses ?? []),
        asString(raw.createdAt),
        asString(raw.updatedAt),
        JSON.stringify(raw),
      ],
    );
  }
}

async function upsertPages(client: PoolClient, items: JsonObject[]) {
  for (const raw of items) {
    await client.query(
      `INSERT INTO pages (
        page_id, title, handle, body, template_suffix, published_at_shopify,
        created_at_shopify, updated_at_shopify, raw
      ) VALUES ($1,$2,$3,$4,$5,$6::timestamptz,$7::timestamptz,$8::timestamptz,$9::jsonb)
      ON CONFLICT (page_id)
      DO UPDATE SET
        title=EXCLUDED.title,
        handle=EXCLUDED.handle,
        body=EXCLUDED.body,
        template_suffix=EXCLUDED.template_suffix,
        published_at_shopify=EXCLUDED.published_at_shopify,
        created_at_shopify=EXCLUDED.created_at_shopify,
        updated_at_shopify=EXCLUDED.updated_at_shopify,
        raw=EXCLUDED.raw,
        migrated_at=NOW()`,
      [
        asString(raw.id),
        asString(raw.title),
        asString(raw.handle),
        asString(raw.body),
        asString(raw.templateSuffix),
        asString(raw.publishedAt),
        asString(raw.createdAt),
        asString(raw.updatedAt),
        JSON.stringify(raw),
      ],
    );
  }
}

async function upsertBlogs(client: PoolClient, items: JsonObject[]) {
  for (const raw of items) {
    await client.query(
      `INSERT INTO blogs (
        blog_id, title, handle, template_suffix, created_at_shopify, updated_at_shopify, raw
      ) VALUES ($1,$2,$3,$4,$5::timestamptz,$6::timestamptz,$7::jsonb)
      ON CONFLICT (blog_id)
      DO UPDATE SET
        title=EXCLUDED.title,
        handle=EXCLUDED.handle,
        template_suffix=EXCLUDED.template_suffix,
        created_at_shopify=EXCLUDED.created_at_shopify,
        updated_at_shopify=EXCLUDED.updated_at_shopify,
        raw=EXCLUDED.raw,
        migrated_at=NOW()`,
      [
        asString(raw.id),
        asString(raw.title),
        asString(raw.handle),
        asString(raw.templateSuffix),
        asString(raw.createdAt),
        asString(raw.updatedAt),
        JSON.stringify(raw),
      ],
    );
  }
}

async function upsertArticles(client: PoolClient, items: JsonObject[]) {
  for (const raw of items) {
    const blog = asObject(raw.blog);
    const author = asObject(raw.author);
    const image = asObject(raw.image);
    await client.query(
      `INSERT INTO articles (
        article_id, blog_id, blog_title, blog_handle, title, handle, summary, body,
        author_name, tags, image_url, published_at_shopify, created_at_shopify,
        updated_at_shopify, raw
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::timestamptz,$13::timestamptz,$14::timestamptz,$15::jsonb)
      ON CONFLICT (article_id)
      DO UPDATE SET
        blog_id=EXCLUDED.blog_id,
        blog_title=EXCLUDED.blog_title,
        blog_handle=EXCLUDED.blog_handle,
        title=EXCLUDED.title,
        handle=EXCLUDED.handle,
        summary=EXCLUDED.summary,
        body=EXCLUDED.body,
        author_name=EXCLUDED.author_name,
        tags=EXCLUDED.tags,
        image_url=EXCLUDED.image_url,
        published_at_shopify=EXCLUDED.published_at_shopify,
        created_at_shopify=EXCLUDED.created_at_shopify,
        updated_at_shopify=EXCLUDED.updated_at_shopify,
        raw=EXCLUDED.raw,
        migrated_at=NOW()`,
      [
        asString(raw.id),
        asString(blog.id),
        asString(blog.title),
        asString(blog.handle),
        asString(raw.title),
        asString(raw.handle),
        asString(raw.summary),
        asString(raw.body),
        asString(author.name),
        asStringArray(raw.tags),
        asString(image.url),
        asString(raw.publishedAt),
        asString(raw.createdAt),
        asString(raw.updatedAt),
        JSON.stringify(raw),
      ],
    );
  }
}

async function upsertOrders(client: PoolClient, items: JsonObject[]) {
  for (const raw of items) {
    const customer = asObject(raw.customer);
    const customerEmail = asObject(customer.defaultEmailAddress);
    const subtotal = asObject(asObject(raw.subtotalPriceSet).shopMoney);
    const total = asObject(asObject(raw.totalPriceSet).shopMoney);
    const shipping = asObject(asObject(raw.totalShippingPriceSet).shopMoney);
    const lineItems = asObject(raw.lineItems);
    await client.query(
      `INSERT INTO orders (
        order_id, legacy_resource_id, order_name, financial_status, fulfillment_status,
        currency_code, customer_id, customer_first_name, customer_last_name, customer_email,
        customer_accepts_marketing, note, subtotal_amount, total_amount, shipping_amount,
        shipping_address, billing_address, line_items, processed_at_shopify, created_at_shopify,
        updated_at_shopify, raw
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16::jsonb,$17::jsonb,$18::jsonb,$19::timestamptz,$20::timestamptz,$21::timestamptz,$22::jsonb)
      ON CONFLICT (order_id)
      DO UPDATE SET
        legacy_resource_id=EXCLUDED.legacy_resource_id,
        order_name=EXCLUDED.order_name,
        financial_status=EXCLUDED.financial_status,
        fulfillment_status=EXCLUDED.fulfillment_status,
        currency_code=EXCLUDED.currency_code,
        customer_id=EXCLUDED.customer_id,
        customer_first_name=EXCLUDED.customer_first_name,
        customer_last_name=EXCLUDED.customer_last_name,
        customer_email=EXCLUDED.customer_email,
        customer_accepts_marketing=EXCLUDED.customer_accepts_marketing,
        note=EXCLUDED.note,
        subtotal_amount=EXCLUDED.subtotal_amount,
        total_amount=EXCLUDED.total_amount,
        shipping_amount=EXCLUDED.shipping_amount,
        shipping_address=EXCLUDED.shipping_address,
        billing_address=EXCLUDED.billing_address,
        line_items=EXCLUDED.line_items,
        processed_at_shopify=EXCLUDED.processed_at_shopify,
        created_at_shopify=EXCLUDED.created_at_shopify,
        updated_at_shopify=EXCLUDED.updated_at_shopify,
        raw=EXCLUDED.raw,
        migrated_at=NOW()`,
      [
        asString(raw.id),
        asNumber(raw.legacyResourceId),
        asString(raw.name),
        asString(raw.displayFinancialStatus),
        asString(raw.displayFulfillmentStatus),
        asString(raw.currencyCode),
        asString(customer.id),
        asString(customer.firstName),
        asString(customer.lastName),
        asString(customerEmail.emailAddress),
        asBoolean(raw.customerAcceptsMarketing),
        asString(raw.note),
        asNumber(subtotal.amount),
        asNumber(total.amount),
        asNumber(shipping.amount),
        JSON.stringify(raw.shippingAddress ?? {}),
        JSON.stringify(raw.billingAddress ?? {}),
        JSON.stringify(lineItems.nodes ?? []),
        asString(raw.processedAt),
        asString(raw.createdAt),
        asString(raw.updatedAt),
        JSON.stringify(raw),
      ],
    );
  }
}

async function upsertUsers(client: PoolClient, items: JsonObject[]) {
  for (const raw of items) {
    await client.query(
      `INSERT INTO staff_users (
        user_id, first_name, last_name, email, account_type, active, initials, locale, is_shop_owner, raw
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb)
      ON CONFLICT (user_id)
      DO UPDATE SET
        first_name=EXCLUDED.first_name,
        last_name=EXCLUDED.last_name,
        email=EXCLUDED.email,
        account_type=EXCLUDED.account_type,
        active=EXCLUDED.active,
        initials=EXCLUDED.initials,
        locale=EXCLUDED.locale,
        is_shop_owner=EXCLUDED.is_shop_owner,
        raw=EXCLUDED.raw,
        migrated_at=NOW()`,
      [
        asString(raw.id),
        asString(raw.firstName),
        asString(raw.lastName),
        asString(raw.email),
        asString(raw.accountType),
        asBoolean(raw.active),
        asString(raw.initials),
        asString(raw.locale),
        asBoolean(raw.isShopOwner),
        JSON.stringify(raw),
      ],
    );
  }
}

function deriveResourceId(resourceType: string, item: unknown, index: number): string {
  if (typeof item === "object" && item !== null) {
    const obj = item as JsonObject;
    if (typeof obj.id === "string" && obj.id.length > 0) {
      return obj.id;
    }
    if (typeof obj.admin_graphql_api_id === "string" && obj.admin_graphql_api_id.length > 0) {
      return obj.admin_graphql_api_id;
    }
    if (typeof obj.legacyResourceId === "string" || typeof obj.legacyResourceId === "number") {
      return String(obj.legacyResourceId);
    }
  }

  return `${resourceType}:${index}`;
}

async function persistRawResourceDumps(
  client: PoolClient,
  snapshotName: string,
  dataByResource: Partial<Record<string, unknown>>,
) {
  for (const [resourceType, resourceData] of Object.entries(dataByResource)) {
    if (Array.isArray(resourceData)) {
      for (let index = 0; index < resourceData.length; index += 1) {
        const payload = resourceData[index];
        const resourceId = deriveResourceId(resourceType, payload, index);
        await client.query(
          `INSERT INTO shopify_resource_dumps (snapshot_name, resource_type, resource_id, payload)
           VALUES ($1, $2, $3, $4::jsonb)
           ON CONFLICT (snapshot_name, resource_type, resource_id)
           DO UPDATE SET payload = EXCLUDED.payload, migrated_at = NOW()`,
          [snapshotName, resourceType, resourceId, JSON.stringify(payload ?? {})],
        );
      }
      continue;
    }

    const resourceId = deriveResourceId(resourceType, resourceData, 0);
    await client.query(
      `INSERT INTO shopify_resource_dumps (snapshot_name, resource_type, resource_id, payload)
       VALUES ($1, $2, $3, $4::jsonb)
       ON CONFLICT (snapshot_name, resource_type, resource_id)
       DO UPDATE SET payload = EXCLUDED.payload, migrated_at = NOW()`,
      [snapshotName, resourceType, resourceId, JSON.stringify(resourceData ?? {})],
    );
  }
}

export async function persistMigrationToPostgres(input: PersistInput) {
  const localPool = getPool();
  const client = await localPool.connect();

  try {
    await client.query("BEGIN");
    await ensureSchema(client);
    await upsertMigrationRun(client, input.manifest);

    const shop = asObject(input.dataByResource.shop);
    if (shop.id) {
      await upsertShop(client, shop);
    }

    await upsertProducts(client, asArray(input.dataByResource.products));
    await upsertVariants(client, asArray(input.dataByResource.productVariants));
    await upsertCollections(client, asArray(input.dataByResource.collections));
    await upsertCustomers(client, asArray(input.dataByResource.customers));
    await upsertPages(client, asArray(input.dataByResource.pages));
    await upsertBlogs(client, asArray(input.dataByResource.blogs));
    await upsertArticles(client, asArray(input.dataByResource.articles));
    await upsertOrders(client, asArray(input.dataByResource.orders));
    await upsertUsers(client, asArray(input.dataByResource.users));
    await persistRawResourceDumps(
      client,
      input.manifest.snapshotName,
      input.dataByResource,
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
