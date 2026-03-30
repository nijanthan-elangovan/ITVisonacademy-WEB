import type { MetadataRoute } from "next";

const BASE = "https://new.itvisionacademy.com";

const courseSlugs = [
  "sql-basic",
  "sql-advanced",
  "power-bi",
  "tableau",
  "ms-azure",
  "cybersecurity",
  "qlik-sense",
  "data-bricks",
  "full-stack",
];

const blogSlugs = [
  "why-sql-is-essential-for-data-careers",
  "getting-started-with-azure-data-factory",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const coursePages: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${BASE}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...coursePages, ...blogPages];
}
