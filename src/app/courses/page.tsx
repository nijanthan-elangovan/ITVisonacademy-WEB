"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, Star, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import { fadeUp, stagger, scaleIn, slideInLeft, slideInRight } from "@/components/animations";

type Course = {
  category: string;
  title: string;
  author: string;
  lessons: string;
  price: string;
  oldPrice: string;
  rating: string;
  handle: string;
};

const allCourses: Course[] = [
  { category: "DATABASE", title: "Database Fundamentals Using SQL Microsoft", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (120)", handle: "sql-basic" },
  { category: "DATABASE", title: "Advanced Database Programming Microsoft SQL Server", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (98)", handle: "sql-advanced" },
  { category: "DATA ANALYTICS", title: "Data Analysis and Visualization Power BI", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (156)", handle: "power-bi" },
  { category: "DATA ANALYTICS", title: "Data Analysis and Visualization Tableau", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (134)", handle: "tableau" },
  { category: "CLOUD", title: "Azure Data Factory", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (87)", handle: "ms-azure" },
  { category: "SECURITY", title: "Cybersecurity", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (203)", handle: "cybersecurity" },
  { category: "DATA ANALYTICS", title: "Qlik Sense", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (65)", handle: "qlik-sense" },
  { category: "CLOUD", title: "Azure Data Bricks", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (74)", handle: "data-bricks" },
  { category: "DEVELOPMENT", title: "Full Stack Development", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (112)", handle: "full-stack" },
];

const categories = ["All", "Database", "Data Analytics", "Cloud", "Security", "Development"];

const categoryMap: Record<string, string> = {
  "Database": "DATABASE",
  "Data Analytics": "DATA ANALYTICS",
  "Cloud": "CLOUD",
  "Security": "SECURITY",
  "Development": "DEVELOPMENT",
};

const courseImages: Record<string, string> = {
  "DATABASE": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80",
  "DATA ANALYTICS": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  "CLOUD": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  "SECURITY": "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=80",
  "DEVELOPMENT": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
};

const companyLogos = ["Microsoft", "Google", "Amazon", "Deloitte", "Accenture", "IBM", "Oracle", "Cognizant", "TCS", "Infosys"];

export default function CoursesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchValue.toLowerCase());
    if (activeCategory === "All") return matchesSearch;
    return matchesSearch && course.category === categoryMap[activeCategory];
  });

  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
      <Header />

      {/* ── Hero ── */}
      <motion.section initial="hidden" animate="visible" variants={stagger}
        className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2387cf_48%,#203b77_100%)] px-5 py-10 text-white sm:rounded-[1.5rem] sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <motion.div variants={slideInLeft} className="text-center lg:text-left">
            <motion.div variants={fadeUp}><SectionEyebrow>Our Courses</SectionEyebrow></motion.div>
            <motion.h1 variants={fadeUp} className="mx-auto mt-4 max-w-[600px] text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:mt-5 sm:text-4xl md:text-5xl lg:mx-0 lg:text-[3.5rem]">
              Learn today, work tomorrow
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-[560px] text-sm leading-7 text-white/80 sm:mt-5 sm:text-base lg:mx-0">
              Get job-ready with practical, mentor-led training built around the tools employers actually use across data, cloud, security, and development.
            </motion.p>
          </motion.div>
          <motion.div variants={slideInRight} className="grid gap-4 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/10 p-4 backdrop-blur transition duration-300 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden rounded-[1.2rem]">
                <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" alt="Students learning together" fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 25vw" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,38,58,0.05)_0%,rgba(16,38,58,0.78)_100%)]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 text-left text-white">
                <p className="text-sm font-semibold">Live instruction</p>
                <p className="mt-1 text-xs text-white/75">Hands-on, career-aligned, mentor-led sessions</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-[1.7rem] border border-white/15 bg-white/10 p-5 backdrop-blur transition duration-300 hover:-translate-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">What stands out</p>
                <p className="mt-3 text-lg font-bold leading-8">Clear learning paths, practical projects, and outcomes that read well in interviews.</p>
              </div>
              <div className="rounded-[1.7rem] bg-[#ecf7fd] p-5 text-[#10263a] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(6,21,36,0.18)]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2ca9df]">Professional edge</p>
                <p className="mt-3 text-lg font-bold leading-8">Course tracks that build confidence in tools, workflows, and communication, not just theory.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Company Logos ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
        <div className="mx-auto max-w-[1240px] text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-[#74808b]">
            Our graduates work at leading companies worldwide
          </motion.p>
          <motion.div variants={stagger} className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:mt-6 sm:gap-x-6 sm:gap-y-3">
            {companyLogos.map((logo, i) => (
              <motion.span key={logo} variants={fadeUp} custom={i} className="text-sm font-semibold tracking-tight text-[#c0c6cc] sm:text-base">{logo}</motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Search & Filter ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button key={cat} onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-xl px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${activeCategory === cat ? "bg-[#2ca9df] text-white shadow-lg" : "bg-white text-[#4a5563] ring-1 ring-black/5 hover:bg-[#f4f7fa]"}`}>
                  {cat}
                </motion.button>
              ))}
            </div>
            <div className="group flex items-center gap-2 rounded-xl border border-[#eef1ef] bg-white px-3 py-2.5 ring-1 ring-black/5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#2ca9df]/40 focus-within:shadow-[0_0_0_4px_rgba(44,169,223,0.1)] sm:px-4 sm:py-3">
              <Search className="h-4 w-4 text-[#9aa5af] transition-colors group-focus-within:text-[#2ca9df]" />
              <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search courses..."
                className="w-full border-0 bg-transparent text-sm text-[#1f2937] outline-none placeholder:text-[#a4adb5] sm:w-60" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Course Grid ── */}
      <section className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={stagger}
            className="mx-auto grid max-w-[1240px] gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredCourses.map((course, i) => (
              <motion.div key={course.title} variants={fadeUp} custom={i} layout>
                <Link href={`/courses/${course.handle}`}>
                  <motion.article whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="h-full flex flex-col group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
                    <div className="relative h-40 w-full overflow-hidden bg-[#f0f4f8] sm:h-44">
                      <Image src={courseImages[course.category]} alt={course.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                    <div className="flex flex-col flex-1 p-4 sm:p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a0aab5]">{course.category}</p>
                      <h3 className="mt-2 line-clamp-2 text-[0.95rem] font-bold leading-snug text-[#1c2635] sm:mt-3 sm:text-[1.02rem] sm:leading-6">{course.title}</h3>
                      <div className="mt-auto pt-3 sm:pt-4">
                        <div className="flex items-center justify-between text-xs text-[#7f8b97]">
                          <span>{course.author}</span><span>{course.lessons}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between sm:mt-5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#2ca9df]">{course.price}</span>
                            {course.oldPrice !== course.price && <span className="text-xs text-[#b6bfc8] line-through">{course.oldPrice}</span>}
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-[#f59e0b]">
                            <Star className="h-3.5 w-3.5 fill-current" /><span>{course.rating}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#2ca9df] opacity-0 transition-opacity group-hover:opacity-100 sm:mt-4">
                          View Details <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-10 max-w-[1240px] text-center"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/60 shadow-sm ring-1 ring-black/5">
                  <Search className="h-7 w-7 text-[#b6bfc8]" />
                </div>
                <p className="text-sm font-medium text-[#74808b]">No courses found</p>
                <p className="mt-1 text-xs text-[#a0aab5]">Try a different search term or category.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Bundle CTA ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 pb-3 pt-2 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] gap-6 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2492d7_45%,#203b77_100%)] px-5 py-8 text-white sm:rounded-[1.55rem] sm:px-10 sm:py-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <motion.div variants={slideInLeft} className="text-center lg:text-left">
            <motion.h2 variants={fadeUp} className="mx-auto max-w-[500px] text-2xl font-extrabold leading-tight tracking-[-0.04em] sm:text-3xl md:text-[2.5rem] lg:mx-0">
              Bundle offer: enroll in two courses and get the third one free
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-[420px] text-sm leading-7 text-white/80 sm:mt-4 lg:mx-0">
              Three courses for $1,000 instead of $1,497. Build a stronger skill stack without piecing your learning together course by course.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-5 flex justify-center sm:mt-6 lg:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#112a3d] px-5 text-sm font-semibold text-white transition-shadow hover:shadow-lg">
                  Get Bundle Deal <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div variants={slideInRight} className="relative h-64 overflow-hidden rounded-[1.7rem] shadow-[0_24px_70px_rgba(9,20,32,0.28)]">
            <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" alt="Student working through online course material" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,38,58,0.08)_0%,rgba(16,38,58,0.55)_100%)]" />
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
