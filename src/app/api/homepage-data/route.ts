import { NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type HomeCourse = {
  category: string;
  title: string;
  author: string;
  lessons: string;
  price: string;
  oldPrice: string;
  rating: string;
  imageUrl: string | null;
  handle: string | null;
};

type HomeFaq = {
  question: string;
  answer: string;
};

function normalizeCourseHandle(input: {
  title: string;
  handle: string | null;
  productType: string | null;
}) {
  const source = `${input.title} ${input.handle ?? ""} ${input.productType ?? ""}`.toLowerCase();

  if (source.includes("+") || source.includes("bundle") || source.includes("discount")) {
    return null;
  }

  if (source.includes("advanced database") || source.includes("sql advanced")) return "sql-advanced";
  if (source.includes("database fundamentals") || source.includes("sql basic")) return "sql-basic";
  if (source.includes("power bi")) return "power-bi";
  if (source.includes("tableau")) return "tableau";
  if (source.includes("azure data factory")) return "ms-azure";
  if (source.includes("cybersecurity")) return "cybersecurity";
  if (source.includes("qlik")) return "qlik-sense";
  if (source.includes("data bricks") || source.includes("databricks")) return "data-bricks";
  if (source.includes("full stack")) return "full-stack";
  if (source.includes("microsoft azure")) return "ms-azure";

  return null;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

function formatMoney(value: number | null) {
  if (value === null || Number.isNaN(value)) {
    return "$0.00";
  }

  return `$${value.toFixed(2)}`;
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL is not configured." },
      { status: 500 },
    );
  }

  try {
    const [partnersResult, coursesResult, pagesResult, statsResult] = await Promise.all([
      pool.query<{ name: string }>(
        `SELECT DISTINCT
           CASE
             WHEN lower(coalesce(product_type, '')) LIKE '%database%' OR lower(coalesce(product_type, '')) LIKE '%sql%'
               THEN 'SQL & Databases'
             WHEN lower(coalesce(product_type, '')) LIKE '%data%'
               THEN 'Data Analytics'
             WHEN lower(coalesce(product_type, '')) LIKE '%cloud%' OR lower(coalesce(title, '')) LIKE '%azure%'
               THEN 'Cloud & Azure'
             WHEN lower(coalesce(product_type, '')) LIKE '%security%' OR lower(coalesce(title, '')) LIKE '%cyber%'
               THEN 'Cybersecurity'
             ELSE 'Career-Focused Tech Training'
           END AS name
         FROM products
         WHERE status = 'ACTIVE'
         ORDER BY name
         LIMIT 4`,
      ),
      pool.query<{
        product_type: string | null;
        title: string;
        handle: string | null;
        vendor: string | null;
        variants_count: string;
        min_price: string | null;
        max_compare_at_price: string | null;
        featured_image_url: string | null;
      }>(
        `SELECT
           p.product_type,
           p.title,
           p.handle,
           p.vendor,
           p.featured_image_url,
           COUNT(v.variant_id)::text AS variants_count,
           MIN(v.price)::text AS min_price,
           MAX(v.compare_at_price)::text AS max_compare_at_price
         FROM products p
         LEFT JOIN product_variants v ON v.product_id = p.product_id
         WHERE p.status = 'ACTIVE'
         GROUP BY p.product_id, p.product_type, p.title, p.handle, p.vendor, p.featured_image_url, p.updated_at_shopify, p.migrated_at
         ORDER BY p.updated_at_shopify DESC NULLS LAST, p.migrated_at DESC
         LIMIT 6`,
      ),
      pool.query<{ title: string; body: string | null }>(
        `SELECT title, body
         FROM pages
         WHERE title IS NOT NULL AND title <> ''
         ORDER BY updated_at_shopify DESC NULLS LAST, migrated_at DESC
         LIMIT 6`,
      ),
      pool.query<{
        products_count: string;
        customers_count: string;
      }>(
        `SELECT
           (SELECT COUNT(*)::text FROM products) AS products_count,
           (SELECT COUNT(*)::text FROM customers) AS customers_count`,
      ),
    ]);

    const partners = partnersResult.rows.map((row) => row.name).filter(Boolean);

    const courses: HomeCourse[] = coursesResult.rows.map((row) => {
      const minPrice = row.min_price ? Number(row.min_price) : null;
      const oldPrice =
        row.max_compare_at_price !== null
          ? Number(row.max_compare_at_price)
          : minPrice !== null
            ? minPrice * 1.25
            : null;

      return {
        category: (row.product_type || "COURSE").toUpperCase(),
        title: row.title,
        handle: normalizeCourseHandle({
          title: row.title,
          handle: row.handle ?? null,
          productType: row.product_type ?? null,
        }),
        author: row.vendor ?? "ITVision Academy",
        lessons: "12 Sessions",
        price: formatMoney(minPrice),
        oldPrice: formatMoney(oldPrice),
        rating: "5.0",
        imageUrl: row.featured_image_url ?? null,
      };
    });

    const faqs: HomeFaq[] = pagesResult.rows.map((row) => ({
      question: row.title,
      answer:
        stripHtml(row.body ?? "").slice(0, 220) ||
        "Imported from your Shopify store pages.",
    }));

    const statsRow = statsResult.rows[0] ?? { products_count: "0", customers_count: "0" };
    const stats = {
      products: Number(statsRow.products_count),
      customers: Number(statsRow.customers_count),
    };

    return NextResponse.json({
      ok: true,
      partners,
      courses,
      faqs,
      stats,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load homepage data.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
