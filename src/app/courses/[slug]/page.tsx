"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Award,
  Monitor,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import LeadForm from "@/components/LeadForm";
import { fadeUp, stagger, scaleIn } from "@/components/animations";

type CourseDetail = {
  slug: string;
  title: string;
  category: string;
  price: string;
  description: string;
  duration: string;
  sessions: string;
  level: string;
  highlights: string[];
  topics: string[];
};

const courseData: Record<string, CourseDetail> = {
  "sql-basic": {
    slug: "sql-basic", title: "Database Fundamentals Using SQL Microsoft", category: "DATABASE", price: "$499.00",
    description: "Master the fundamentals of SQL and relational databases. Learn to write queries, manage data, and understand database design principles used in real-world applications.",
    duration: "1 Month", sessions: "12 Sessions", level: "Beginner",
    highlights: ["Write efficient SQL queries from scratch", "Understand relational database concepts", "Hands-on labs with real datasets", "Industry-recognized certification"],
    topics: ["Introduction to Databases", "SQL Syntax & Data Types", "SELECT Queries & Filtering", "JOINs & Subqueries", "Aggregate Functions", "Data Manipulation (INSERT, UPDATE, DELETE)", "Database Design & Normalization", "Indexing & Performance", "Stored Procedures", "Views & Triggers", "Security & Permissions", "Final Project & Certification"],
  },
  "sql-advanced": {
    slug: "sql-advanced", title: "Advanced Database Programming Microsoft SQL Server", category: "DATABASE", price: "$499.00",
    description: "Take your SQL skills to the next level with advanced programming techniques, performance optimization, and enterprise-level database management.",
    duration: "1 Month", sessions: "12 Sessions", level: "Intermediate",
    highlights: ["Advanced query optimization techniques", "T-SQL programming mastery", "Real-world performance tuning", "Enterprise database management"],
    topics: ["Advanced Joins & Set Operations", "Window Functions & CTEs", "Dynamic SQL", "Advanced Stored Procedures", "Error Handling & Transactions", "Performance Tuning & Execution Plans", "Indexing Strategies", "Data Warehousing Concepts", "ETL Processes", "Database Administration", "Security & Compliance", "Capstone Project"],
  },
  "power-bi": {
    slug: "power-bi", title: "Data Analysis and Visualization Power BI", category: "DATA ANALYTICS", price: "$499.00",
    description: "Learn to transform raw data into stunning visualizations and actionable insights using Microsoft Power BI. Build interactive dashboards and reports.",
    duration: "1 Month", sessions: "12 Sessions", level: "Beginner to Intermediate",
    highlights: ["Build interactive dashboards", "DAX formula mastery", "Connect to multiple data sources", "Share reports across organizations"],
    topics: ["Introduction to Power BI", "Data Import & Transformation", "Data Modeling", "DAX Fundamentals", "Visualization Types", "Interactive Dashboards", "Advanced DAX Calculations", "Row-Level Security", "Power BI Service & Sharing", "Power Query (M Language)", "Real-World Case Studies", "Final Dashboard Project"],
  },
  tableau: {
    slug: "tableau", title: "Data Analysis and Visualization Tableau", category: "DATA ANALYTICS", price: "$499.00",
    description: "Master Tableau for data visualization and business intelligence. Create compelling visual stories from complex datasets.",
    duration: "1 Month", sessions: "12 Sessions", level: "Beginner to Intermediate",
    highlights: ["Create stunning data visualizations", "Advanced analytics & calculations", "Dashboard design best practices", "Tableau Server & Online publishing"],
    topics: ["Introduction to Tableau", "Connecting to Data Sources", "Building Basic Charts", "Calculated Fields & Parameters", "Filters & Sets", "Maps & Geospatial Analysis", "Dashboard Design", "Advanced Calculations", "Table Calculations", "Storytelling with Data", "Tableau Server / Online", "Final Visualization Project"],
  },
  "ms-azure": {
    slug: "ms-azure", title: "Azure Data Factory", category: "CLOUD", price: "$499.00",
    description: "Learn to build, manage, and monitor data pipelines using Azure Data Factory. Master cloud-based data integration for enterprise environments.",
    duration: "1 Month", sessions: "12 Sessions", level: "Intermediate",
    highlights: ["Build enterprise data pipelines", "Azure cloud integration", "ETL/ELT workflow automation", "Azure certification preparation"],
    topics: ["Introduction to Azure & ADF", "Azure Storage & Data Lake", "Linked Services & Datasets", "Pipeline Activities", "Data Flows", "Integration Runtimes", "Triggers & Scheduling", "Monitoring & Alerting", "CI/CD for Data Pipelines", "Security & Governance", "Performance Optimization", "Capstone Project"],
  },
  cybersecurity: {
    slug: "cybersecurity", title: "Cybersecurity", category: "SECURITY", price: "$499.00",
    description: "Build a solid foundation in cybersecurity. Learn about threats, vulnerabilities, security tools, and best practices to protect organizations.",
    duration: "1 Month", sessions: "12 Sessions", level: "Beginner to Intermediate",
    highlights: ["Understand cyber threats & defense", "Network security fundamentals", "Hands-on security labs", "Industry certification prep"],
    topics: ["Introduction to Cybersecurity", "Network Security Fundamentals", "Cryptography & Encryption", "Identity & Access Management", "Threat Detection & Response", "Security Operations Center (SOC)", "Vulnerability Assessment", "Penetration Testing Basics", "Cloud Security", "Compliance & Governance", "Incident Response Planning", "Security Certification Prep"],
  },
  "qlik-sense": {
    slug: "qlik-sense", title: "Qlik Sense", category: "DATA ANALYTICS", price: "$499.00",
    description: "Master Qlik Sense for self-service data analytics. Build interactive apps and discover insights through associative data exploration.",
    duration: "1 Month", sessions: "12 Sessions", level: "Beginner to Intermediate",
    highlights: ["Associative data model mastery", "Self-service analytics", "Build interactive Qlik apps", "Enterprise data governance"],
    topics: ["Introduction to Qlik Sense", "Data Loading & Modeling", "Associative Engine", "Visualizations & Charts", "Set Analysis", "Advanced Expressions", "Qlik Sense Scripting", "App Design Best Practices", "Qlik Cloud & Sharing", "Security Rules", "Data Storytelling", "Final Analytics Project"],
  },
  "data-bricks": {
    slug: "data-bricks", title: "Azure Data Bricks", category: "CLOUD", price: "$499.00",
    description: "Learn Apache Spark and Databricks on Azure. Process big data, build ML pipelines, and create enterprise-scale analytics solutions.",
    duration: "1 Month", sessions: "12 Sessions", level: "Intermediate",
    highlights: ["Apache Spark fundamentals", "Big data processing at scale", "ML pipeline development", "Azure Databricks certification prep"],
    topics: ["Introduction to Databricks & Spark", "Databricks Workspace & Notebooks", "Data Engineering with Spark", "DataFrame API", "Spark SQL", "Delta Lake", "Streaming Data Processing", "Machine Learning with MLlib", "MLflow for Experiment Tracking", "Job Scheduling & Clusters", "Security & Governance", "Capstone Big Data Project"],
  },
  "full-stack": {
    slug: "full-stack", title: "Full Stack Development", category: "DEVELOPMENT", price: "$499.00",
    description: "Become a full stack developer. Learn front-end, back-end, databases, and deployment to build complete web applications from scratch.",
    duration: "1 Month", sessions: "12 Sessions", level: "Beginner to Intermediate",
    highlights: ["Full stack web development", "React & Node.js mastery", "Database design & APIs", "Deploy real applications"],
    topics: ["HTML, CSS & JavaScript Foundations", "React.js Fundamentals", "State Management & Hooks", "Node.js & Express.js", "RESTful API Design", "Database Design (SQL & NoSQL)", "Authentication & Authorization", "Git & Version Control", "Testing & Debugging", "Cloud Deployment", "CI/CD Pipelines", "Full Stack Capstone Project"],
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = courseData[slug];

  if (!course) {
    return (
      <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
        <Header />
        <div className="mx-auto max-w-[1240px] px-5 py-16 text-center sm:py-20">
          <h1 className="text-2xl font-extrabold text-[#111827] sm:text-3xl">Course Not Found</h1>
          <p className="mt-3 text-sm text-[#74808b]">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/courses" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2ca9df] px-5 py-3 text-sm font-semibold text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Courses
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
        <div className="mx-auto max-w-[1240px]">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-[#74808b] transition-colors hover:text-[#2ca9df]">
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </Link>
        </div>
      </div>

      {/* ── Course Hero + Get in Touch ── */}
      <motion.section initial="hidden" animate="visible" variants={stagger} className="px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-8">
          <div>
            <motion.div variants={fadeUp}><SectionEyebrow>{course.category}</SectionEyebrow></motion.div>
            <motion.h1 variants={fadeUp} className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-[#111827] sm:mt-4 sm:text-3xl md:text-[2.6rem]">
              {course.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-sm leading-7 text-[#74808b] sm:mt-5">{course.description}</motion.p>

            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-3 sm:mt-6 sm:gap-4">
              <div className="flex items-center gap-2 text-sm text-[#4a5563]"><Clock className="h-4 w-4 text-[#2ca9df]" />{course.duration}</div>
              <div className="flex items-center gap-2 text-sm text-[#4a5563]"><BookOpen className="h-4 w-4 text-[#2ca9df]" />{course.sessions}</div>
              <div className="flex items-center gap-2 text-sm text-[#4a5563]"><Users className="h-4 w-4 text-[#2ca9df]" />{course.level}</div>
              <div className="flex items-center gap-1 text-sm font-semibold text-[#f59e0b]"><Star className="h-4 w-4 fill-current" /> 5.0</div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 sm:mt-8">
              <h3 className="text-base font-bold text-[#192231] sm:text-lg">What you&apos;ll learn</h3>
              <div className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3">
                {course.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-[#4a5563] sm:gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]" />{item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Get in Touch Card (replaces Add to Cart) ── */}
          <motion.div variants={scaleIn} className="rounded-2xl bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.08)] ring-1 ring-black/5 sm:p-6 lg:sticky lg:top-24">
            <div className="mb-5 text-center sm:mb-6">
              <div className="text-2xl font-extrabold text-[#2ca9df] sm:text-3xl">{course.price}</div>
              <p className="mt-1 text-sm text-[#74808b]">per course</p>
            </div>
            <div className="mb-5 space-y-2.5 sm:mb-6 sm:space-y-3">
              {[
                { icon: Monitor, text: "Live instructor-led sessions" },
                { icon: Clock, text: course.duration + " intensive program" },
                { icon: BookOpen, text: course.sessions },
                { icon: Award, text: "Certificate of completion" },
                { icon: Users, text: "Small batch sizes" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#4a5563]">
                  <Icon className="h-4 w-4 shrink-0 text-[#2ca9df]" />{text}
                </div>
              ))}
            </div>
            <div className="mb-4 rounded-xl bg-[#f0f9ff] p-3 text-center text-xs font-medium text-[#2ca9df]">
              Enroll in 2 courses, get the 3rd FREE!
            </div>

            <div className="border-t border-[#e5e7eb] pt-5">
              <h3 className="mb-4 text-center text-base font-bold text-[#192231]">Get in Touch</h3>
              <LeadForm course={course.title} source="course" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Curriculum ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <motion.div variants={fadeUp}><SectionEyebrow>Curriculum</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#111827] sm:mt-5 sm:text-3xl md:text-[2.2rem]">
            Course Outline
          </motion.h2>
          <div className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
            {course.topics.map((topic, i) => (
              <motion.div key={topic} variants={fadeUp} custom={i}
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] ring-1 ring-black/5 sm:gap-4 sm:px-5 sm:py-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf7fd] text-xs font-bold text-[#2ca9df] sm:h-8 sm:w-8">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-sm font-medium text-[#1f2937]">{topic}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 pb-3 pt-2 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2492d7_45%,#203b77_100%)] px-5 py-8 text-center text-white sm:rounded-[1.55rem] sm:px-10 sm:py-10">
          <motion.h2 variants={fadeUp} className="mx-auto max-w-[500px] text-xl font-extrabold leading-tight tracking-[-0.04em] sm:text-2xl md:text-3xl">
            Have questions about this course?
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-[400px] text-sm text-white/80">
            Reach out to us and we&apos;ll help you find the right path.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-5 flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex h-12 items-center rounded-xl bg-[#112a3d] px-5 text-sm font-semibold text-white transition-shadow hover:shadow-lg">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
