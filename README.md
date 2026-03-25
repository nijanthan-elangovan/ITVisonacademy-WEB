This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Shopify Migration API

The project now includes a server-side Shopify migration endpoint at `/api/shopify/migrate`.

Set these environment variables in the project root `.env.local`:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ADMIN_API_VERSION=2026-01
SHOPIFY_CLIENT_ID=your_client_id
SHOPIFY_CLIENT_SECRET=your_client_secret
```

If you already have a valid Admin token, you can use this instead:

```bash
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxx
```

Required Shopify Admin scopes:

- `read_products`
- `read_customers`
- `read_orders`
- `read_content`
- `read_online_store_pages`

Optional but recommended scopes:

- `read_all_orders` for orders older than 60 days
- `read_users` for staff user export

`GET /api/shopify/migrate` returns instructions and recent snapshot manifests.

`POST /api/shopify/migrate` runs the import, exchanges client credentials for an Admin token when needed, fetches Shopify data, and writes JSON snapshots into `data/shopify-migrations/<snapshotName>/`.
By default it also runs an exhaustive REST pull (`includeExhaustive: true`) for additional Shopify resources and stores them in snapshot files and DB raw dumps.

When `DATABASE_URL` is set, each migration run also upserts data into PostgreSQL tables:

- `migration_runs`
- `shops`
- `products`
- `product_variants`
- `collections`
- `customers`
- `pages`
- `blogs`
- `articles`
- `orders`
- `staff_users`
- `shopify_resource_dumps` (raw payload archive per snapshot/resource/id)

Database environment variables:

```bash
DATABASE_URL=postgresql://user:password@host:5432/dbname
# optional
DB_SSL=true
```

Example request:

```bash
curl -X POST http://localhost:3000/api/shopify/migrate \
  -H "Content-Type: application/json" \
  -d '{
    "snapshotName": "initial-shopify-import",
    "resources": [
      "shop",
      "products",
      "productVariants",
      "collections",
      "customers",
      "pages",
      "blogs",
      "articles",
      "orders",
      "users"
    ]
  }'
```

Notes:

- The default Admin API version is `2026-01`.
- Orders older than 60 days require the `read_all_orders` scope.
- Some stores may deny staff-member exports depending on app permissions and store plan.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
