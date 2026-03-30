"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, Star, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import { fadeUp, stagger } from "@/components/animations";

type Course = {
  category: string;
  title: string;
  author: string;
  lessons: string;
  price: string;
  oldPrice: string;
  rating: string;
  imageUrl?: string | null;
  handle?: string;
};

const fallbackCourses: Course[] = [
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

const companyLogos = ["SQL Server", "Azure", "Power BI", "Tableau", "Qlik Sense", "Python", "Cybersecurity", "Full Stack"];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch("/api/homepage-data", { cache: "no-store" });
        if (!response.ok) return;
        const payload = await response.json();
        if (payload.ok && payload.courses?.length > 0) setCourses(payload.courses);
      } catch { /* keep fallback */ }
    };
    void loadCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchValue.toLowerCase());
    if (activeCategory === "All") return matchesSearch;
    const cat = course.category.toLowerCase();
    const filter = activeCategory.toLowerCase();
    const matchesCategory =
      cat === filter ||
      cat.includes(filter) ||
      filter.includes(cat) ||
      (filter === "database" && cat.includes("sql")) ||
      (filter === "cloud" && (cat.includes("azure") || cat.includes("cloud"))) ||
      (filter === "security" && (cat.includes("security") || cat.includes("cyber"))) ||
      (filter === "data analytics" && (cat.includes("data") || cat.includes("analytics") || cat.includes("bi") || cat.includes("visualization")));
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
      <Header />

      {/* ── Hero ── */}
      <motion.section initial="hidden" animate="visible" variants={stagger}
        className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2387cf_48%,#203b77_100%)] px-5 py-10 text-white sm:rounded-[1.5rem] sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1240px] text-center">
          <motion.div variants={fadeUp}><SectionEyebrow>Our Courses</SectionEyebrow></motion.div>
          <motion.h1 variants={fadeUp} className="mx-auto mt-4 max-w-[600px] text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:mt-5 sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            Learn Today, Work Tomorrow
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-[500px] text-sm leading-7 text-white/80 sm:mt-5 sm:text-base">
            Get job-ready with us. Join us in reshaping the future — one where careers are built on purpose, inclusiveness flourishes, and technology becomes a force for positive change.
          </motion.p>
        </div>
      </motion.section>

      {/* ── Company Logos ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
        <div className="mx-auto max-w-[1240px] text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-[#74808b]">
            Train on the technologies used in modern data and cloud teams
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
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${activeCategory === cat ? "bg-[#2ca9df] text-white shadow-lg" : "bg-white text-[#4a5563] ring-1 ring-black/5 hover:bg-[#f4f7fa]"}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#eef1ef] bg-white px-3 py-2.5 ring-1 ring-black/5 sm:px-4 sm:py-3">
              <Search className="h-4 w-4 text-[#9aa5af]" />
              <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search courses..."
                className="w-full border-0 bg-transparent text-sm text-[#1f2937] outline-none placeholder:text-[#a4adb5] sm:w-60" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Course Grid ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <motion.div variants={stagger} className="mx-auto grid max-w-[1240px] gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course, i) => (
            <motion.div key={course.title} variants={fadeUp} custom={i}>
              <Link href={course.handle ? `/courses/${course.handle}` : "/contact"}>
                <motion.article whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
                  <div className="relative h-40 w-full overflow-hidden bg-[#f0f4f8] sm:h-44">
                    <Image src={course.imageUrl || "/images/course-default.svg"} alt={course.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a0aab5]">{course.category}</p>
                    <h3 className="mt-2 text-[0.95rem] font-bold leading-snug text-[#1c2635] sm:mt-3 sm:text-[1.02rem] sm:leading-6">{course.title}</h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-[#7f8b97] sm:mt-4">
                      <span>{course.author}</span><span>{course.lessons}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between sm:mt-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#2ca9df]">{course.price}</span>
                        {course.oldPrice && course.oldPrice !== course.price && <span className="text-xs text-[#b6bfc8] line-through">{course.oldPrice}</span>}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#f59e0b]">
                        <Star className="h-3.5 w-3.5 fill-current" /><span>{course.rating}</span>
                      </div>
                    </div>
                    {course.handle ? (
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#2ca9df] opacity-0 transition-opacity group-hover:opacity-100 sm:mt-4">
                        View Details <ArrowRight className="h-3 w-3" />
                      </div>
                    ) : (
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#2ca9df] opacity-0 transition-opacity group-hover:opacity-100 sm:mt-4">
                        Contact Admissions <ArrowRight className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="mx-auto mt-10 max-w-[1240px] text-center">
            <p className="text-sm text-[#74808b]">No courses found. Try a different search or category.</p>
          </div>
        )}
      </motion.section>

      {/* ── Bundle CTA ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 pb-3 pt-2 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2492d7_45%,#203b77_100%)] px-5 py-8 text-center text-white sm:rounded-[1.55rem] sm:px-10 sm:py-12">
          <motion.h2 variants={fadeUp} className="mx-auto max-w-[500px] text-2xl font-extrabold leading-tight tracking-[-0.04em] sm:text-3xl md:text-[2.5rem]">
            Bundle Offer: Enroll in two courses and get the third one free
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-[420px] text-sm leading-7 text-white/80 sm:mt-4">
            Three courses for $1,000 (normally $1,497). Bundle and save on your path to a tech career.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-5 flex justify-center sm:mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#112a3d] px-5 text-sm font-semibold text-white transition-shadow hover:shadow-lg">
                Get Bundle Deal <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
