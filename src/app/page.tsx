"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  CirclePlay,
  GraduationCap,
  Grid2x2,
  Lock,
  MapPin,
  MonitorPlay,
  MoveUpRight,
  Search,
  Star,
  Trophy,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import { fadeUp, stagger, scaleIn } from "@/components/animations";

/* ── data ── */
type CourseCardModel = {
  category: string;
  title: string;
  author: string;
  lessons: string;
  price: string;
  oldPrice: string;
  rating: string;
  imageUrl?: string | null;
  handle?: string | null;
};

type FaqModel = {
  question: string;
  answer: string;
};

type HomeDataResponse = {
  ok: boolean;
  courses?: CourseCardModel[];
  faqs?: FaqModel[];
  stats?: { products: number; customers: number };
};

const companyNames = ["Microsoft", "Google", "Amazon", "Deloitte", "Accenture", "IBM", "Oracle", "Cognizant"];

const features = [
  {
    icon: Trophy,
    title: "Progress Tracking & Certifications",
    description:
      "Monitor your learning journey with real-time dashboards, milestone badges, and industry-recognized certificates.",
    tint: "bg-[#edf7fd] text-[#2ca9df]",
  },
  {
    icon: Lock,
    title: "Learn Anywhere, Anytime",
    description:
      "Lifetime access to every enrolled course. Study on your schedule with mobile-first, offline-ready content.",
    tint: "bg-[#eef3ff] text-[#203b77]",
  },
  {
    icon: Grid2x2,
    title: "Curated Course Library",
    description:
      "Hundreds of expert-vetted courses across cloud, security, development, design, and data science.",
    tint: "bg-[#edf7fd] text-[#2ca9df]",
  },
  {
    icon: MonitorPlay,
    title: "Hands-On Learning",
    description:
      "Labs, quizzes, and real-world projects baked into every course. Learn by doing, not just watching.",
    tint: "bg-[#eef3ff] text-[#203b77]",
  },
];

const skillTags = [
  "SQL & Databases",
  "Cybersecurity",
  "Microsoft Azure",
  "Python",
  "Power BI",
  "Data Science",
  "Full Stack Development",
  "Qlik Sense",
];

const fallbackCourses: CourseCardModel[] = [
  { category: "DATABASE", title: "Database Fundamentals Using SQL Microsoft", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (120)", handle: "sql-basic" },
  { category: "DATABASE", title: "Advanced Database Programming Microsoft SQL Server", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (98)", handle: "sql-advanced" },
  { category: "DATA ANALYTICS", title: "Data Analysis and Visualization Power BI", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (156)", handle: "power-bi" },
  { category: "CLOUD", title: "Azure Data Factory", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (87)", handle: "ms-azure" },
  { category: "SECURITY", title: "Cybersecurity", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (203)", handle: "cybersecurity" },
  { category: "CLOUD", title: "Azure Data Bricks", author: "ITVision Academy", lessons: "12 Sessions", price: "$499.00", oldPrice: "$599.00", rating: "5.0 (74)", handle: "data-bricks" },
];

const fallbackFaqs: FaqModel[] = [
  { question: "Do I need prior IT experience to enroll?", answer: "No. We offer beginner-friendly paths and guide you step-by-step. For advanced tracks, we share prerequisites before enrollment." },
  { question: "How are classes delivered?", answer: "Classes are live, instructor-led sessions with practical exercises, assignments, and mentor support." },
  { question: "How long is each course?", answer: "Most programs are delivered as a 12-session format over approximately one month." },
  { question: "Do you provide certificates?", answer: "Yes. Learners receive a completion certificate after meeting course requirements." },
  { question: "Do you offer bundled pricing?", answer: "Yes. Selected bundles are available, including the current 2+1 offer shown on our course pages." },
  { question: "How can I choose the right course?", answer: "Use the contact form and our team will recommend a track based on your background and career goal." },
];

/* ── components ── */

function CourseCard({ category, title, author, lessons, price, oldPrice, rating, imageUrl, handle }: CourseCardModel) {
  const resolvedImage = imageUrl || "/images/course-default.svg";
  const card = (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
    >
      <div className="relative h-40 w-full overflow-hidden bg-[#f0f4f8] sm:h-44">
        <Image src={resolvedImage} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a0aab5]">{category}</p>
        <h3 className="mt-2 text-[0.95rem] font-bold leading-snug text-[#1c2635] sm:mt-3 sm:text-[1.02rem] sm:leading-6">{title}</h3>
        <div className="mt-3 flex items-center justify-between text-xs text-[#7f8b97] sm:mt-4">
          <span>{author}</span><span>{lessons}</span>
        </div>
        <div className="mt-4 flex items-center justify-between sm:mt-5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#2ca9df]">{price}</span>
            {oldPrice && oldPrice !== price && <span className="text-xs text-[#b6bfc8] line-through">{oldPrice}</span>}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#f59e0b]">
            <Star className="h-3.5 w-3.5 fill-current" /><span>{rating}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
  if (handle) return <Link href={`/courses/${handle}`}>{card}</Link>;
  return card;
}

/* ── page ── */

export default function Home() {
  const [courses, setCourses] = useState<CourseCardModel[]>(fallbackCourses);
  const [faqs, setFaqs] = useState<FaqModel[]>(fallbackFaqs);
  const [stats, setStats] = useState({ products: 0, customers: 0 });
  const [searchValue, setSearchValue] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const loadHomeData = async () => {
      try {
        const response = await fetch("/api/homepage-data", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as HomeDataResponse;
        if (!payload.ok || cancelled) return;
        if (payload.courses?.length) setCourses(payload.courses);
        if (payload.faqs?.length && payload.faqs.some((f) => f.question.includes("?"))) {
          setFaqs(payload.faqs);
        }
        if (payload.stats) setStats(payload.stats);
      } catch { /* keep fallback */ }
    };
    void loadHomeData();
    return () => { cancelled = true; };
  }, []);

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
      <Header />

      {/* ── Hero ── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2387cf_48%,#203b77_100%)] px-5 py-10 text-white sm:rounded-[1.5rem] sm:px-10 sm:py-14 lg:px-12 lg:py-16"
      >
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <motion.div variants={fadeUp}><SectionEyebrow>Enhance Your Career</SectionEyebrow></motion.div>
            <motion.h1 variants={fadeUp} className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:mt-5 sm:text-4xl md:text-5xl lg:text-[3.9rem] lg:leading-[1.05]">
              Master in-demand tech skills with world-class mentors
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-[460px] text-sm leading-7 text-white/80 sm:mt-5 sm:text-[15px]">
              Industry-led courses in cloud, cybersecurity, AI, and full-stack development. Go from curious to certified with hands-on labs and 1-on-1 mentorship.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/courses" className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#12354a] shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-shadow hover:shadow-[0_14px_40px_rgba(0,0,0,0.22)]">
                  <CirclePlay className="mr-2 h-4 w-4" />Explore Courses
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/about" className="inline-flex h-12 items-center justify-center rounded-xl bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero image — people learning */}
          <motion.div variants={scaleIn} className="relative mx-auto flex w-full max-w-[500px] items-center justify-center">
            <div className="absolute -left-4 top-10 hidden h-44 w-44 rounded-full bg-white/10 blur-3xl sm:block" />
            <div className="absolute -right-4 -top-4 hidden h-56 w-56 rounded-full bg-[#79d3f7]/20 blur-3xl sm:block" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(9,20,32,0.35)] sm:rounded-3xl">
              <Image
                src="/images/hero-collaboration.svg"
                alt="Students collaborating on tech projects"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#203b77]/30 to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-2 rounded-xl bg-white px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.18)] sm:-left-8 sm:bottom-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <Image src="/images/avatar-1.svg" alt="" width={32} height={32} className="h-8 w-8 rounded-full ring-2 ring-white" />
                  <Image src="/images/avatar-2.svg" alt="" width={32} height={32} className="h-8 w-8 rounded-full ring-2 ring-white" />
                  <Image src="/images/avatar-3.svg" alt="" width={32} height={32} className="h-8 w-8 rounded-full ring-2 ring-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1f2937]">2,500+ Students</p>
                  <p className="text-[10px] text-[#96a0aa]">Enrolled this year</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="px-5 py-8 sm:px-10 sm:py-12 lg:px-12"
      >
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0e2437_0%,#173c5f_42%,#2ca9df_100%)] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <motion.div variants={fadeUp}>
                <SectionEyebrow>Program Spotlight</SectionEyebrow>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="mt-5 max-w-[700px] text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.06em] sm:text-4xl lg:text-[4.4rem]"
              >
                Mid-level is not a ceiling. It&apos;s a launchpad.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-[640px] text-sm leading-7 text-white/78 sm:text-base"
              >
                A hands-on readiness program for Program Managers, Technical
                Managers, TPMs, and TPGMs who want sharper market positioning,
                role-specific interview prep, AI readiness, and direct
                mentorship.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/launchpad"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#10263a] shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5"
                >
                  Explore Launchpad
                </Link>
                <Link
                  href="/launchpad#launchpad-signup"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/16"
                >
                  Sign up now
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2"
            >
              <motion.div
                variants={fadeUp}
                className="rounded-[1.6rem] border border-white/10 bg-white/10 p-5 backdrop-blur"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#2ca9df]">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">
                  Learn from MIT Solve award winners
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  Built for professionals who have already proven themselves and
                  now need the right framing, polish, and market-ready story.
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="rounded-[1.6rem] border border-white/10 bg-[#ecf7fd] p-5 text-[#10263a]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#2ca9df]">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">Frisco headquarters</h3>
                <p className="mt-2 text-sm leading-7 text-[#4b5563]">
                  9300 John Hickman Parkway, #1104, Frisco, TX.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Trusted By ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-7 lg:px-12">
        <div className="mx-auto max-w-[1240px] border-b border-[#edf0ee] pb-6 text-center">
          <motion.p variants={fadeUp} className="text-xs text-[#96a0aa]">Our graduates work at leading companies worldwide</motion.p>
          <motion.div variants={stagger} className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:mt-5 sm:gap-x-8 sm:gap-y-3">
            {companyNames.map((name, i) => (
              <motion.span key={name} variants={fadeUp} custom={i} className="text-base font-bold tracking-tight text-[#c0c6cc] sm:text-lg">{name}</motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Why Choose Us ── */}
      <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-[1240px] text-center">
          <motion.div variants={fadeUp}><SectionEyebrow>Why Choose Us</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-[620px] text-2xl font-extrabold tracking-[-0.04em] text-[#111827] sm:mt-5 sm:text-3xl md:text-[2.6rem]">
            Everything you need to launch a tech career
          </motion.h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-[1240px] gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
          {features.map(({ icon: Icon, title, description, tint }, i) => (
            <motion.article key={title} variants={fadeUp} custom={i} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="rounded-2xl bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] sm:p-6">
              <div className="flex items-start gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint} transition-transform hover:scale-110 sm:h-12 sm:w-12`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#192231] sm:text-lg">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#74808b] sm:mt-2">{description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* ── Boost Skillset — people image ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-[#1c2c40] px-5 py-7 text-white sm:rounded-[1.55rem] sm:px-8 sm:py-9 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <motion.div variants={scaleIn} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/team-learning.svg"
                alt="Team collaborating on data projects"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c40]/60 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur">
                100,000 Job-Ready Goal
              </div>
            </motion.div>
            <div>
              <motion.div variants={fadeUp}><SectionEyebrow>Enhance Your Career</SectionEyebrow></motion.div>
              <motion.h2 variants={fadeUp} className="mt-4 text-2xl font-extrabold tracking-[-0.04em] sm:mt-5 sm:text-3xl md:text-[2.7rem]">
                Level up your career with structured learning paths
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 max-w-[560px] text-sm leading-7 text-white/70 sm:mt-5">
                Whether you&apos;re switching careers or sharpening existing skills, our curated learning paths give you a clear roadmap from beginner to job-ready.
              </motion.p>
              <motion.div variants={stagger} className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                {skillTags.map((tag) => (
                  <motion.span key={tag} variants={fadeUp} whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.14)" }}
                    className="cursor-default rounded-xl border border-white/12 bg-white/6 px-3 py-1.5 text-xs text-white/82 transition-colors sm:px-4 sm:py-2 sm:text-sm">
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Courses ── */}
      <motion.section id="courses" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-[1240px] text-center">
          <motion.div variants={fadeUp}><SectionEyebrow>Our Best Courses</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-[660px] text-2xl font-extrabold tracking-[-0.04em] text-[#111827] sm:mt-5 sm:text-3xl md:text-[2.6rem]">
            Explore our most popular courses
          </motion.h2>
        </div>

        <motion.div variants={fadeUp} className="mx-auto mt-6 flex max-w-[500px] items-center gap-2 rounded-2xl bg-white p-2.5 shadow-[0_14px_36px_rgba(15,23,42,0.05)] ring-1 ring-black/5 sm:mt-7 sm:gap-3 sm:p-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#eef1ef] bg-[#fbfcfb] px-3 py-2.5 sm:px-4 sm:py-3">
            <Search className="h-4 w-4 text-[#9aa5af]" />
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search course..." className="w-full border-0 bg-transparent text-sm text-[#1f2937] outline-none placeholder:text-[#a4adb5]" />
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="rounded-xl bg-[#152a3c] px-4 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-lg sm:px-5 sm:py-3">
            Search
          </motion.button>
        </motion.div>

        <motion.div variants={stagger} className="mx-auto mt-8 grid max-w-[1240px] gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => <CourseCard key={course.title} {...course} />)}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex justify-center">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/courses" className="rounded-xl bg-[#10263a] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,38,58,0.16)] transition-shadow hover:shadow-[0_16px_40px_rgba(16,38,58,0.24)]">
              View All Courses
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── Learning Stats — people image ── */}
      <motion.section id="community" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] gap-6 rounded-2xl bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 sm:gap-8 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div className="flex flex-col justify-center">
            <motion.div variants={fadeUp}><SectionEyebrow>Learn Smarter, Not Harder</SectionEyebrow></motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#111827] sm:mt-5 sm:text-3xl md:text-[2.6rem]">
              Built for learners who mean business
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-[460px] text-sm leading-7 text-[#74808b] sm:mt-5">
              Our platform is designed around outcomes, not hours. Every course connects to real career milestones with mentorship, community, and accountability built in.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-8 sm:mt-8 sm:gap-10">
              <div>
                <div className="text-3xl font-extrabold text-[#16202e] sm:text-4xl">{stats.products.toLocaleString()}</div>
                <div className="mt-1 text-sm text-[#7d8793] sm:mt-2">Courses in Catalog</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#16202e] sm:text-4xl">{stats.customers.toLocaleString()}</div>
                <div className="mt-1 text-sm text-[#7d8793] sm:mt-2">Learner Records</div>
              </div>
            </motion.div>
          </div>
          <motion.div variants={scaleIn} className="relative aspect-[4/3] min-h-[240px] overflow-hidden rounded-2xl sm:min-h-[320px]">
            <Image
              src="/images/student-success.svg"
              alt="Students celebrating success"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#1f2937] shadow-[0_16px_40px_rgba(15,23,42,0.14)] sm:bottom-6 sm:right-8 sm:py-3"
            >
              <Star className="h-4 w-4 fill-[#f4b740] text-[#f4b740]" />4.9 Rating
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── FAQ ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-[860px] text-center">
          <motion.div variants={fadeUp}><SectionEyebrow>Frequently Asked Questions</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#111827] sm:mt-5 sm:text-3xl md:text-[2.6rem]">
            Got Questions? We&apos;ve Got Answers!
          </motion.h2>
        </div>
        <div className="mx-auto mt-8 max-w-[860px] space-y-3 sm:mt-10">
          {faqs.map((faq, index) => (
            <motion.div key={faq.question} variants={fadeUp} custom={index}>
              <div className="overflow-hidden rounded-2xl bg-white px-4 py-1 shadow-[0_12px_30px_rgba(15,23,42,0.04)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] sm:px-5">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex((prev) => (prev === index ? -1 : index))}
                  className="flex w-full cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-sm font-semibold text-[#1f2937] marker:hidden sm:gap-4 sm:py-5"
                  aria-expanded={openFaqIndex === index}
                >
                  {faq.question}
                  <ChevronDown className={`h-4 w-4 shrink-0 text-[#7f8b97] transition-transform duration-300 ${openFaqIndex === index ? "rotate-180" : ""}`} />
                </button>
                {openFaqIndex === index && (
                  <p className="pb-4 text-sm leading-7 text-[#74808b] sm:pb-5">{faq.answer}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact" className="block rounded-xl border border-[#d7dde2] bg-white px-5 py-3 text-center text-sm font-medium text-[#334155] transition-shadow hover:shadow-md">
              Ask a Question
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact" className="block rounded-xl bg-[#13283b] px-5 py-3 text-center text-sm font-medium text-white transition-shadow hover:shadow-lg">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section id="download" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 pb-3 pt-4 sm:px-10 sm:pt-6 lg:px-12">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2492d7_45%,#203b77_100%)] px-5 py-8 text-white sm:rounded-[1.55rem] sm:px-10 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <motion.h2 variants={fadeUp} className="text-2xl font-extrabold leading-tight tracking-[-0.04em] sm:text-3xl md:text-[2.8rem]">
                Start your learning journey today
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 max-w-[420px] text-sm leading-7 text-white/80 sm:mt-4">
                Join thousands of learners who have transformed their careers with ITVision Academy. Enroll in two courses and get the third one FREE.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-3 sm:mt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/courses" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#112a3d] px-5 text-sm font-semibold text-white transition-shadow hover:shadow-lg">
                    Browse Courses
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-xl bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                    <MoveUpRight className="h-4 w-4" />Contact Us
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            <motion.div variants={scaleIn} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(9,20,32,0.3)]">
              <Image
                src="/images/laptop-study.svg"
                alt="Student working on laptop"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#203b77]/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
