"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fadeUp, stagger } from "@/components/animations";

type Article = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
  content: string[];
};

const articles: Record<string, Article> = {
  "why-sql-is-essential-for-data-careers": {
    slug: "why-sql-is-essential-for-data-careers",
    title: "Why SQL Is Essential for Data Careers in 2025",
    date: "March 15, 2025",
    readTime: "5 min read",
    author: "ITVision Academy",
    category: "Career Tips",
    image: "/images/blog-tech-1.svg",
    content: [
      "In 2025, SQL continues to dominate as the most requested skill in data job postings. Whether you're aiming to become a data analyst, data engineer, or data scientist, SQL is the foundational language you need to master.",
      "SQL (Structured Query Language) is the standard language for interacting with relational databases. It allows you to query, manipulate, and manage data stored in systems like Microsoft SQL Server, PostgreSQL, MySQL, and Oracle. Every major company — from startups to Fortune 500 corporations — relies on relational databases, making SQL an indispensable skill.",
      "According to recent industry reports, SQL appears in over 50% of all data-related job postings. It's not just for database administrators anymore. Product managers, marketers, and business analysts are all expected to write basic SQL queries to pull insights from company databases.",
      "At ITVision Academy, our SQL courses are designed to take you from zero to job-ready. Our Database Fundamentals course covers everything from basic SELECT statements to complex JOINs and subqueries. For those ready to advance, our Advanced Database Programming course dives into T-SQL, performance tuning, and enterprise-level database management.",
      "The beauty of SQL is its universality. Once you learn it, you can apply your skills across any industry — healthcare, finance, e-commerce, tech, and beyond. It's also the gateway to more advanced tools like Power BI, Tableau, and Python for data analysis.",
      "If you're serious about a career in data, start with SQL. It's the skill that opens the most doors, and with our structured 12-session courses, you can be job-ready in just one month.",
    ],
  },
  "getting-started-with-azure-data-factory": {
    slug: "getting-started-with-azure-data-factory",
    title: "Getting Started with Azure Data Factory: A Beginner's Guide",
    date: "March 8, 2025",
    readTime: "7 min read",
    author: "ITVision Academy",
    category: "Cloud",
    image: "/images/blog-tech-2.svg",
    content: [
      "Azure Data Factory (ADF) is Microsoft's cloud-based ETL (Extract, Transform, Load) service that allows you to create data-driven workflows for orchestrating data movement and transforming data at scale. If you're looking to break into cloud data engineering, ADF is one of the most important tools to learn.",
      "At its core, ADF lets you create pipelines that move data between different data stores — whether that's Azure Blob Storage, SQL databases, on-premises servers, or third-party services like Salesforce and SAP. You can schedule these pipelines, monitor their execution, and handle errors gracefully.",
      "The key concepts you need to understand are: Linked Services (connections to your data sources), Datasets (the structure of your data), Pipelines (the workflows), Activities (the individual tasks within a pipeline), and Triggers (what starts a pipeline run).",
      "One of ADF's most powerful features is Data Flows, which provide a visual interface for building complex data transformations without writing code. You can join datasets, filter rows, aggregate values, and pivot data — all through a drag-and-drop interface.",
      "For organizations already invested in the Microsoft ecosystem, ADF integrates seamlessly with Azure SQL Database, Azure Synapse Analytics, Azure Databricks, and Power BI. This makes it the natural choice for building end-to-end data solutions on Azure.",
      "Our Azure Data Factory course at ITVision Academy covers everything from setting up your first pipeline to advanced topics like CI/CD for data pipelines, monitoring, and security. In just 12 sessions, you'll have the skills to build production-grade data pipelines.",
    ],
  },
};

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles[slug];

  if (!article) {
    return (
      <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
        <Header />
        <div className="mx-auto max-w-[1240px] px-5 py-16 text-center sm:py-20">
          <h1 className="text-2xl font-extrabold text-[#111827] sm:text-3xl">Article Not Found</h1>
          <p className="mt-3 text-sm text-[#74808b]">The article you&apos;re looking for doesn&apos;t exist yet.</p>
          <Link href="/blog" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2ca9df] px-5 py-3 text-sm font-semibold text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
      <Header />

      {/* ── Breadcrumb ── */}
      <div className="px-5 pt-4 sm:px-10 sm:pt-6 lg:px-12">
        <div className="mx-auto max-w-[800px]">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#74808b] transition-colors hover:text-[#2ca9df]">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>

      {/* ── Article ── */}
      <motion.article initial="hidden" animate="visible" variants={stagger} className="px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
        <div className="mx-auto max-w-[800px]">
          <motion.div variants={fadeUp}>
            <span className="rounded-full bg-[#ecf7fd] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2ca9df]">{article.category}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#111827] sm:mt-5 sm:text-3xl md:text-[2.4rem] md:leading-[1.15]">
            {article.title}
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#96a0aa] sm:gap-4 sm:text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {article.readTime}</span>
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {article.author}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="relative mt-6 aspect-[2/1] overflow-hidden rounded-2xl sm:mt-8">
            <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 800px) 100vw, 800px" priority />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              "Practical career framing",
              "Industry-relevant skills",
              "Professional next steps",
            ].map((item) => (
              <div key={item} className="rounded-[1.3rem] border border-[#dce7ee] bg-white px-4 py-4 text-sm font-semibold text-[#334155] shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                {item}
              </div>
            ))}
          </motion.div>

          <motion.div variants={stagger} className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
            {article.content.map((paragraph, i) => (
              <motion.p key={i} variants={fadeUp} className="text-sm leading-7 text-[#4a5563] sm:text-[15px] sm:leading-8">
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div variants={fadeUp} className="mt-8 rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#203b77_100%)] p-5 text-center text-white sm:mt-10 sm:p-8">
            <h3 className="text-lg font-extrabold sm:text-xl">Ready to start learning?</h3>
            <p className="mt-2 text-sm text-white/80">Explore our courses and take the first step toward your new career.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link href="/courses" className="inline-flex h-11 items-center rounded-xl bg-[#112a3d] px-5 text-sm font-semibold text-white transition-shadow hover:shadow-lg">
                View Courses
              </Link>
              <Link href="/contact" className="inline-flex h-11 items-center rounded-xl bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.article>

      <Footer />
    </main>
  );
}
