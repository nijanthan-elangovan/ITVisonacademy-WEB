import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const BASE_URL = "https://itvisionacademy.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2ca9df",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ITVision Academy — Get Job-Ready with World-Class Tech Education",
    template: "%s | ITVision Academy",
  },
  description:
    "Learn SQL, Azure, Cybersecurity, Power BI, Tableau, and Full Stack Development with live instructor-led courses. Get certified and job-ready in just one month. Based in Frisco, Texas.",
  keywords: [
    "ITVision Academy",
    "tech courses",
    "SQL training",
    "Azure Data Factory",
    "Cybersecurity course",
    "Power BI training",
    "Tableau course",
    "Full Stack Development",
    "online tech education",
    "job-ready training",
    "IT certifications",
    "Frisco Texas",
    "data analytics training",
    "Azure Databricks",
    "Qlik Sense",
  ],
  authors: [{ name: "ITVision Academy", url: BASE_URL }],
  creator: "ITVision Academy",
  publisher: "ITVision Academy",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "ITVision Academy",
    title: "ITVision Academy — Get Job-Ready with World-Class Tech Education",
    description:
      "Live instructor-led courses in SQL, Azure, Cybersecurity, Power BI & more. Get certified in one month.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ITVision Academy — World-Class Tech Education",
    description:
      "Get job-ready with live instructor-led courses. SQL, Azure, Cybersecurity, Power BI & more.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon",
    apple: "/icon",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

/* ── JSON-LD: Organization + EducationalOrganization ── */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  name: "ITVision Academy",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "ITVision Academy provides live instructor-led tech courses to get you job-ready in SQL, Azure, Cybersecurity, Power BI, Tableau, and Full Stack Development.",
  email: "info@itvisionacademy.com",
  telephone: "+1-214-727-2154",
  sameAs: ["https://www.linkedin.com/company/itvisionacademy/"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "9300 John Hickman Parkway, #1104",
    addressLocality: "Frisco",
    addressRegion: "TX",
    addressCountry: "US",
  },
  foundingDate: "2023",
  numberOfEmployees: { "@type": "QuantitativeValue", value: "10-50" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
