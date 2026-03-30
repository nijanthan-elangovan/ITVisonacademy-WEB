"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import { fadeUp, stagger } from "@/components/animations";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
};

const blogPosts: BlogPost[] = [
  {
    slug: "why-sql-is-essential-for-data-careers",
    title: "Why SQL Is Essential for Data Careers in 2025",
    excerpt: "SQL remains one of the most in-demand skills in the data industry. Learn why mastering SQL can open doors to high-paying careers in data analysis, engineering, and science.",
    date: "March 15, 2025",
    readTime: "5 min read",
    author: "ITVision Academy",
    category: "Career Tips",
    image: "/images/blog-tech-1.svg",
  },
  {
    slug: "getting-started-with-azure-data-factory",
    title: "Getting Started with Azure Data Factory: A Beginner's Guide",
    excerpt: "Azure Data Factory is a powerful cloud-based ETL service. This guide walks you through the basics of setting up your first data pipeline.",
    date: "March 8, 2025",
    readTime: "7 min read",
    author: "ITVision Academy",
    category: "Cloud",
    image: "/images/blog-tech-2.svg",
  },
  {
    slug: "power-bi-vs-tableau",
    title: "Power BI vs Tableau: Which Should You Learn First?",
    excerpt: "Both Power BI and Tableau are industry-leading visualization tools. We break down the pros, cons, and career opportunities for each.",
    date: "February 28, 2025",
    readTime: "6 min read",
    author: "ITVision Academy",
    category: "Data Analytics",
    image: "/images/blog-tech-3.svg",
  },
  {
    slug: "cybersecurity-career-path",
    title: "The Complete Cybersecurity Career Path for Beginners",
    excerpt: "Cybersecurity is one of the fastest-growing fields in tech. Discover the certifications, skills, and roles that can launch your career in security.",
    date: "February 20, 2025",
    readTime: "8 min read",
    author: "ITVision Academy",
    category: "Cybersecurity",
    image: "/images/blog-tech-1.svg",
  },
  {
    slug: "top-5-skills-for-full-stack-developers",
    title: "Top 5 Skills Every Full Stack Developer Needs in 2025",
    excerpt: "From React to Node.js, cloud deployment to DevOps — here are the must-have skills for aspiring full stack developers this year.",
    date: "February 12, 2025",
    readTime: "5 min read",
    author: "ITVision Academy",
    category: "Development",
    image: "/images/blog-tech-2.svg",
  },
  {
    slug: "from-zero-to-data-analyst",
    title: "From Zero to Data Analyst: A Step-by-Step Roadmap",
    excerpt: "No tech background? No problem. This roadmap shows you exactly how to transition into a data analyst role, even without a computer science degree.",
    date: "February 5, 2025",
    readTime: "10 min read",
    author: "ITVision Academy",
    category: "Career Tips",
    image: "/images/blog-tech-3.svg",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
      <Header />

      {/* ── Hero ── */}
      <motion.section initial="hidden" animate="visible" variants={stagger}
        className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2387cf_48%,#203b77_100%)] px-5 py-10 text-white sm:rounded-[1.5rem] sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1240px] text-center">
          <motion.div variants={fadeUp}><SectionEyebrow>Blog</SectionEyebrow></motion.div>
          <motion.h1 variants={fadeUp} className="mx-auto mt-4 max-w-[600px] text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:mt-5 sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            News & Insights
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-[500px] text-sm leading-7 text-white/80 sm:mt-5 sm:text-base">
            Stay updated with the latest trends in tech education, career tips, and industry insights from ITVision Academy.
          </motion.p>
        </div>
      </motion.section>

      {/* ── Featured Post ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <Link href={`/blog/${blogPosts[0].slug}`}>
            <motion.article variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
              <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
                <div className="relative h-48 overflow-hidden sm:h-56 md:h-full md:min-h-[280px]">
                  <Image src={blogPosts[0].image} alt={blogPosts[0].title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 60vw" />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-8">
                  <span className="w-fit rounded-full bg-[#ecf7fd] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2ca9df]">{blogPosts[0].category}</span>
                  <h2 className="mt-3 text-xl font-extrabold tracking-[-0.02em] text-[#1c2635] sm:text-2xl">{blogPosts[0].title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#74808b]">{blogPosts[0].excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#96a0aa] sm:gap-4">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blogPosts[0].date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blogPosts[0].readTime}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blogPosts[0].author}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#2ca9df]">
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </motion.article>
          </Link>
        </div>
      </motion.section>

      {/* ── Blog Grid ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.slice(1).map((post, i) => (
            <motion.div key={post.slug} variants={fadeUp} custom={i}>
              <Link href={`/blog/${post.slug}`}>
                <motion.article
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                >
                  <div className="relative h-40 overflow-hidden sm:h-44">
                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <span className="w-fit rounded-full bg-[#ecf7fd] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2ca9df]">{post.category}</span>
                    <h3 className="mt-2 text-[0.95rem] font-bold leading-snug text-[#1c2635] sm:mt-3 sm:text-[1.05rem]">{post.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-[#74808b] sm:mt-3">{post.excerpt}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#96a0aa] sm:mt-4">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#2ca9df] opacity-0 transition-opacity group-hover:opacity-100">
                      Read More <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Newsletter CTA ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 pb-3 pt-2 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2492d7_45%,#203b77_100%)] px-5 py-8 text-center text-white sm:rounded-[1.55rem] sm:px-10 sm:py-12">
          <motion.h2 variants={fadeUp} className="mx-auto max-w-[500px] text-2xl font-extrabold leading-tight tracking-[-0.04em] sm:text-3xl md:text-[2.5rem]">
            Stay in the loop
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-[420px] text-sm leading-7 text-white/80 sm:mt-4">
            Follow us on LinkedIn for the latest updates, career tips, and course announcements.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-5 flex justify-center sm:mt-6">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              href="https://www.linkedin.com/company/itvisionacademy/" target="_blank" rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#112a3d] px-5 text-sm font-semibold text-white transition-shadow hover:shadow-lg">
              Follow on LinkedIn <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
