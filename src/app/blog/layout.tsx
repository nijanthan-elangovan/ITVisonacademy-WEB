import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tech education insights, career tips, and industry trends from ITVision Academy. Learn about SQL, Azure, Cybersecurity, Power BI, and more.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — ITVision Academy",
    description: "Career tips, tech trends, and learning guides from ITVision Academy.",
    url: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
