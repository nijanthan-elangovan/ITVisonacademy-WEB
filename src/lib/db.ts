import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Product {
  product_id: string;
  title: string;
  handle: string;
  status: string;
  product_type: string;
  vendor: string;
  tags: string[];
  description_html: string;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  price: number;
  compare_at_price: number | null;
}

export async function getProducts(): Promise<Product[]> {
  const { rows } = await pool.query<Product>(`
    SELECT
      p.product_id,
      p.title,
      p.handle,
      p.status,
      p.product_type,
      p.vendor,
      p.tags,
      p.description_html,
      p.featured_image_url,
      p.featured_image_alt,
      v.price::float as price,
      v.compare_at_price::float as compare_at_price
    FROM products p
    LEFT JOIN product_variants v ON v.product_id = p.product_id
    WHERE p.status = 'ACTIVE'
    ORDER BY p.created_at_shopify DESC
  `);
  return rows;
}

export default pool;
