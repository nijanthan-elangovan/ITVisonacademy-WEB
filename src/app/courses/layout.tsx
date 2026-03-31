import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse ITVision Academy courses: SQL, Azure Data Factory, Cybersecurity, Power BI, Tableau, Qlik Sense, Azure Databricks, and Full Stack Development. All courses $499 with live instruction.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "Tech Courses — ITVision Academy",
    description:
      "Live instructor-led courses in SQL, Azure, Cybersecurity, Power BI & more. $499 per course, 12 sessions, get certified.",
    url: "/courses",
  },
};

const courseListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ITVision Academy Courses",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Database Fundamentals Using SQL Microsoft", url: "https://itvisionacademy.com/courses/sql-basic" },
    { "@type": "ListItem", position: 2, name: "Advanced Database Programming SQL Server", url: "https://itvisionacademy.com/courses/sql-advanced" },
    { "@type": "ListItem", position: 3, name: "Data Analysis and Visualization Power BI", url: "https://itvisionacademy.com/courses/power-bi" },
    { "@type": "ListItem", position: 4, name: "Data Analysis and Visualization Tableau", url: "https://itvisionacademy.com/courses/tableau" },
    { "@type": "ListItem", position: 5, name: "Azure Data Factory", url: "https://itvisionacademy.com/courses/ms-azure" },
    { "@type": "ListItem", position: 6, name: "Cybersecurity", url: "https://itvisionacademy.com/courses/cybersecurity" },
    { "@type": "ListItem", position: 7, name: "Qlik Sense", url: "https://itvisionacademy.com/courses/qlik-sense" },
    { "@type": "ListItem", position: 8, name: "Azure Data Bricks", url: "https://itvisionacademy.com/courses/data-bricks" },
    { "@type": "ListItem", position: 9, name: "Full Stack Development", url: "https://itvisionacademy.com/courses/full-stack" },
  ],
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListJsonLd) }}
      />
      {children}
    </>
  );
}
