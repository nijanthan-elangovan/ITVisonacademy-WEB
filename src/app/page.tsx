"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Apple,
  ArrowUpRight,
  Bell,
  BookOpen,
  ChevronDown,
  CirclePlay,
  Clock3,
  Download,
  GraduationCap,
  Grid2x2,
  LayoutGrid,
  Lock,
  Menu,
  MonitorPlay,
  MoveUpRight,
  Search,
  Star,
  Trophy,
  X,
} from "lucide-react";

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

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
};

type FaqModel = {
  question: string;
  answer: string;
};

type HomeDataResponse = {
  ok: boolean;
  partners?: string[];
  courses?: CourseCardModel[];
  faqs?: FaqModel[];
  stats?: {
    products: number;
    customers: number;
  };
};

const fallbackPartners = ["Shopify", "Collections", "Catalog"];

const features = [
  {
    icon: Trophy,
    title: "Progress Tracking & Certifications",
    description: "Monitor your learning journey with real-time dashboards, milestone badges, and industry-recognized certificates.",
    tint: "bg-[#edf7fd] text-[#2ca9df]",
  },
  {
    icon: Lock,
    title: "Learn Anywhere, Anytime",
    description: "Lifetime access to every enrolled course. Study on your schedule with mobile-first, offline-ready content.",
    tint: "bg-[#eef3ff] text-[#203b77]",
  },
  {
    icon: Grid2x2,
    title: "Curated Course Library",
    description: "Hundreds of expert-vetted courses across cloud, security, development, design, and data science.",
    tint: "bg-[#edf7fd] text-[#2ca9df]",
  },
  {
    icon: MonitorPlay,
    title: "Hands-On Learning",
    description: "Labs, quizzes, and real-world projects baked into every course. Learn by doing, not just watching.",
    tint: "bg-[#eef3ff] text-[#203b77]",
  },
];

const skillTags = [
  "SQL & Databases", "Cybersecurity", "Microsoft Azure", "Python",
  "Power BI", "Data Science", "Full Stack Development", "Qlik Sense",
];

const fallbackCourses: CourseCardModel[] = [
  { category: "GRAPHICS DESIGN", title: "The Complete Graphic Design Theory For Beginners Course", author: "Shivon dowel", lessons: "12 Sessions", price: "$18.00", oldPrice: "$24.00", rating: "5.0 (6,023)" },
  { category: "ANIMATION", title: "After Effect Masterclass: how to rigging character easily", author: "John Connor", lessons: "12 Sessions", price: "$12.00", oldPrice: "$24.00", rating: "5.0 (6,023)" },
  { category: "IT SOFTWARE", title: "CCNA 2020 200-125 video Boot Camp With Chris Bryant", author: "Chris Bryant", lessons: "12 Sessions", price: "$12.00", oldPrice: "$24.00", rating: "5.0 (6,023)" },
  { category: "UI/UX DESIGN", title: "User Experience Design Fundamentals", author: "Shivon dowel", lessons: "12 Sessions", price: "$18.00", oldPrice: "$24.00", rating: "5.0 (6,023)" },
  { category: "DEVELOPMENT", title: "Web Development Masterclass Online Certification", author: "El Eduardo", lessons: "12 Sessions", price: "$12.00", oldPrice: "$24.00", rating: "5.0 (6,023)" },
  { category: "DATA SCIENCE", title: "Python for Data Science and Machine Learning Bootcamp", author: "Nanne Maxwell", lessons: "12 Sessions", price: "$12.00", oldPrice: "$24.00", rating: "5.0 (6,023)" },
];

const fallbackFaqs: FaqModel[] = [
  { question: "Is my personal information safe on the app?", answer: "Yes. We use secure account handling, encrypted form flows, and privacy-aware storage practices to protect personal information." },
  { question: "What types of courses are available on these apps?", answer: "You can access design, development, business, data, and productivity courses, along with short skills-based programs." },
  { question: "Are certificates or credentials provided upon course completion?", answer: "Yes. Many programs include completion certificates and guided paths that support career-ready portfolio work." },
  { question: "Can I interact with instructors and other learners?", answer: "Yes. Course spaces support mentor feedback, discussion areas, and collaborative learning touchpoints." },
  { question: "How do I track my progress in a course?", answer: "Each course includes lesson completion states, progress summaries, and quick access to unfinished sessions." },
  { question: "Can I access courses on multiple devices?", answer: "Yes. The experience is designed to continue across desktop, tablet, and mobile layouts." },
];

/* ── reusable components ── */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[#ecf7fd] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#2ca9df]">
      {children}
    </span>
  );
}

function PhoneMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.25rem] border-[8px] border-[#111827] bg-[#0f2438] shadow-[0_30px_80px_rgba(9,20,32,0.28)] ${
        compact ? "h-[290px] w-[160px]" : "h-[430px] w-[220px]"
      }`}
    >
      <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#10263d_0%,#133654_42%,#eff4f7_42%,#eff4f7_100%)]" />
      <div className="absolute left-4 right-4 top-10 flex items-center justify-between text-[10px] font-semibold text-white">
        <span>9:41</span>
        <span className="rounded-full bg-white/20 px-2 py-1">LIVE</span>
      </div>
      <div className="absolute left-4 right-4 top-20 rounded-2xl bg-white/10 p-4 text-white backdrop-blur">
        <div className="mb-2 flex items-center gap-2 text-[11px] text-white/70">
          <span className="h-6 w-6 rounded-full bg-[#f4c95d]" />
          <span>Nicolas Dabrentago</span>
        </div>
        <p className="text-sm font-semibold leading-snug">Best course that suits your future career path.</p>
      </div>
      <div className="absolute left-4 right-4 top-[190px] rounded-2xl bg-white p-4 shadow-lg">
        <div className="mb-3 flex items-start justify-between">
          <div className="rounded-xl bg-[#2f78ff] p-2 text-white"><LayoutGrid className="h-4 w-4" /></div>
          <span className="text-[10px] font-semibold text-[#95a1ad]">5.0</span>
        </div>
        <p className="text-sm font-semibold leading-snug text-[#1f2a37]">How to make modern poster for a product campaign</p>
        <div className="mt-4 flex items-center justify-between text-[10px] text-[#8b97a3]">
          <span>Sessions 7 / 15</span>
          <span className="font-bold text-[#2ca9df]">82%</span>
        </div>
      </div>
      <div className="absolute bottom-5 left-4 right-4 rounded-2xl bg-[#f4efff] p-3 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-[10px] text-[#7e58b3]">
          <Bell className="h-3.5 w-3.5" /><span>Mentor Of The Week</span>
        </div>
        <div className="h-2 rounded-full bg-white"><div className="h-2 w-3/4 rounded-full bg-[#2ca9df]" /></div>
      </div>
    </div>
  );
}

function CourseCard({ category, title, author, lessons, price, oldPrice, rating, imageUrl }: CourseCardModel) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group cursor-pointer overflow-hidden rounded-[1.45rem] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
    >
      {imageUrl && (
        <div className="relative h-44 w-full overflow-hidden bg-[#f0f4f8]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#a0aab5]">{category}</p>
        <h3 className="mt-3 text-[1.02rem] font-bold leading-6 text-[#1c2635]">{title}</h3>
        <div className="mt-4 flex items-center justify-between text-xs text-[#7f8b97]">
          <span>{author}</span><span>{lessons}</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#2ca9df]">{price}</span>
            {oldPrice && oldPrice !== price && (
              <span className="text-xs text-[#b6bfc8] line-through">{oldPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#f59e0b]">
            <Star className="h-3.5 w-3.5 fill-current" /><span>{rating}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(!open)} className="p-2 text-[#4a5563]" aria-label="Menu">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 top-full z-50 border-t border-[#edf0ee] bg-white px-6 py-4 shadow-lg"
        >
          {["Course Program", "Best Learning", "Community", "About Us"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-[#4a5563]">{l}</a>
          ))}
        </motion.nav>
      )}
    </div>
  );
}

/* ── page ── */

export default function Home() {
  const [partners, setPartners] = useState(fallbackPartners);
  const [courses, setCourses] = useState<CourseCardModel[]>(fallbackCourses);
  const [faqs, setFaqs] = useState<FaqModel[]>(fallbackFaqs);
  const [stats, setStats] = useState({ products: 0, customers: 0 });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadHomeData = async () => {
      try {
        const response = await fetch("/api/homepage-data", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as HomeDataResponse;
        if (!payload.ok || cancelled) {
          return;
        }

        if (payload.partners && payload.partners.length > 0) {
          setPartners(payload.partners);
        }

        if (payload.courses && payload.courses.length > 0) {
          setCourses(payload.courses);
        }

        if (payload.faqs && payload.faqs.length > 0) {
          setFaqs(payload.faqs);
        }

        if (payload.stats) {
          setStats(payload.stats);
        }
      } catch {
        // Keep fallback values when API is unavailable.
      }
    };

    void loadHomeData();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
      <div className="w-full">
        {/* ── Header ── */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 rounded-b-[1.25rem] bg-white/90 px-5 py-4 shadow-[0_8px_26px_rgba(15,23,42,0.04)] backdrop-blur-lg"
        >
          <div className="relative mx-auto flex max-w-[1240px] items-center justify-between gap-4">
            <Image src="/logo.png" alt="ITVision Academy" width={132} height={34} priority />
            <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#4a5563] lg:flex">
              {["Course Program", "Best Learning", "Community", "About Us"].map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="relative py-1 transition-colors hover:text-[#2ca9df] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2ca9df] after:transition-all hover:after:w-full">
                  {l}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#courses"
                className="rounded-xl bg-[#10263a] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,38,58,0.16)] transition-shadow hover:shadow-[0_16px_40px_rgba(16,38,58,0.24)]"
              >
                Get started
              </motion.a>
              <MobileNav />
            </div>
          </div>
        </motion.header>

        {/* ── Hero ── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-4 overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#2ca9df_0%,#2387cf_48%,#203b77_100%)] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-12 lg:py-16"
        >
          <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div>
              <motion.div variants={fadeUp}><SectionEyebrow>Enhance Your Career</SectionEyebrow></motion.div>
              <motion.h1 variants={fadeUp} className="mt-5 max-w-[560px] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-[3.9rem]">
                Master in-demand tech skills with world-class mentors
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-5 max-w-[460px] text-sm leading-7 text-white/80 sm:text-[15px]">
                Industry-led courses in cloud, cybersecurity, AI, and full-stack development. Go from curious to certified with hands-on labs and 1-on-1 mentorship.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
                <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="#courses" className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#12354a] shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-shadow hover:shadow-[0_14px_40px_rgba(0,0,0,0.22)]">
                  <CirclePlay className="mr-2 h-4 w-4" />Watch video
                </motion.a>
                <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="#download" className="inline-flex h-11 items-center justify-center rounded-xl bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                  <Download className="mr-2 h-4 w-4" />Download now
                </motion.a>
              </motion.div>
            </div>

            <motion.div variants={scaleIn} className="relative mx-auto flex w-full max-w-[470px] items-center justify-center lg:justify-end">
              <div className="absolute left-0 top-20 hidden h-44 w-44 rounded-full bg-white/10 blur-3xl sm:block" />
              <div className="absolute right-8 top-0 hidden h-56 w-56 rounded-full bg-[#79d3f7]/20 blur-3xl sm:block" />
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative flex items-center">
                <motion.div initial={{ opacity: 0, x: -30, rotate: -15 }} animate={{ opacity: 1, x: 0, rotate: -10 }} transition={{ delay: 0.6, duration: 0.7 }} className="absolute -left-10 top-28 z-20 hidden w-[210px] rounded-[1.35rem] bg-white p-4 text-[#202d3b] shadow-[0_24px_50px_rgba(20,32,44,0.18)] sm:block">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-xl bg-[#2d86ff] p-2 text-white"><BookOpen className="h-4 w-4" /></div>
                    <span className="text-[10px] font-bold text-[#9aa5af]">GRAPHICS DESIGN</span>
                  </div>
                  <p className="text-lg font-semibold leading-6">How to make modern poster for a campaign</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#7f8b97]">
                    <span>Sessions 7 / 15</span><span className="font-bold text-[#2ca9df]">82%</span>
                  </div>
                </motion.div>
                <PhoneMockup />
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="absolute -right-7 bottom-16 hidden w-[170px] rounded-[1.2rem] bg-white p-4 text-[#202d3b] shadow-[0_18px_40px_rgba(20,32,44,0.16)] sm:block">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5af]">
                    <GraduationCap className="h-4 w-4 text-[#2ca9df]" />Quick Track
                  </div>
                  <p className="text-sm font-semibold leading-5">Bite-size tasks and mentor checkpoints every week</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ── Partners ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-6 py-7 sm:px-10 lg:px-12">
          <div className="mx-auto grid max-w-[1240px] items-center gap-4 border-b border-[#edf0ee] pb-6 text-center sm:grid-cols-4 sm:text-left">
            <motion.div variants={fadeUp} className="text-xs text-[#96a0aa]">More than 60+ companies trusted us</motion.div>
            {partners.map((partner, i) => (
              <motion.div key={partner} variants={fadeUp} custom={i + 1} className="text-lg font-semibold tracking-tight text-[#afb6bb]">{partner}</motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Why Choose Us ── */}
        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
          <div className="mx-auto max-w-[1240px] text-center">
            <motion.div variants={fadeUp}><SectionEyebrow>Why Choose Us</SectionEyebrow></motion.div>
            <motion.h2 variants={fadeUp} className="mx-auto mt-5 max-w-[620px] text-3xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-[2.6rem]">
              Everything you need to launch a tech career
            </motion.h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-[1240px] gap-5 md:grid-cols-2">
            {features.map(({ icon: Icon, title, description, tint }, i) => (
              <motion.article
                key={title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-[1.35rem] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tint} transition-transform hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#192231]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#74808b]">{description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* ── Boost Skillset ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-6 py-6 sm:px-10 sm:py-10 lg:px-12">
          <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[1.55rem] bg-[#1c2c40] px-6 py-7 text-white sm:px-8 sm:py-9 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <motion.div variants={scaleIn} className="relative min-h-[320px]">
                <motion.div animate={{ rotate: [-16, -14, -16] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute left-0 top-16"><PhoneMockup compact /></motion.div>
                <motion.div animate={{ rotate: [-4, -2, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[100px] top-7"><PhoneMockup compact /></motion.div>
                <motion.div animate={{ rotate: [9, 11, 9] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[210px] top-16"><PhoneMockup compact /></motion.div>
                <div className="absolute bottom-0 left-10 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur">1.2M User Downloaded</div>
              </motion.div>
              <div>
                <motion.div variants={fadeUp}><SectionEyebrow>Enhance Your Career</SectionEyebrow></motion.div>
                <motion.h2 variants={fadeUp} className="mt-5 max-w-[520px] text-3xl font-extrabold tracking-[-0.04em] sm:text-[2.7rem]">
                  Level up your career with structured learning paths
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-5 max-w-[560px] text-sm leading-7 text-white/70">
                  Whether you&apos;re switching careers or sharpening existing skills, our curated learning paths give you a clear roadmap from beginner to job-ready.
                </motion.p>
                <motion.div variants={stagger} className="mt-6 flex flex-wrap gap-3">
                  {skillTags.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={fadeUp}
                      whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.14)" }}
                      className="cursor-default rounded-xl border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/82 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Courses ── */}
        <motion.section id="courses" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
          <div className="mx-auto max-w-[1240px] text-center">
            <motion.div variants={fadeUp}><SectionEyebrow>Our Best Courses</SectionEyebrow></motion.div>
            <motion.h2 variants={fadeUp} className="mx-auto mt-5 max-w-[660px] text-3xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-[2.6rem]">
              Explore our most popular courses
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="mx-auto mt-7 flex max-w-[500px] items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#eef1ef] bg-[#fbfcfb] px-4 py-3">
              <Search className="h-4 w-4 text-[#9aa5af]" />
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search course..."
                className="w-full border-0 bg-transparent text-sm text-[#1f2937] outline-none placeholder:text-[#a4adb5]"
              />
            </div>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="rounded-xl bg-[#152a3c] px-5 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg">
              Search
            </motion.button>
          </motion.div>

          <motion.div variants={stagger} className="mx-auto mt-10 grid max-w-[1240px] gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </motion.div>
        </motion.section>

        {/* ── Learning Stats ── */}
        <motion.section id="community" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-6 py-6 sm:px-10 sm:py-10 lg:px-12">
          <div className="mx-auto grid max-w-[1240px] gap-8 rounded-[1.45rem] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
            <div className="flex flex-col justify-center">
              <motion.div variants={fadeUp}><SectionEyebrow>Learn Smarter, Not Harder</SectionEyebrow></motion.div>
              <motion.h2 variants={fadeUp} className="mt-5 max-w-[500px] text-3xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-[2.6rem]">
                Built for learners who mean business
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 max-w-[460px] text-sm leading-7 text-[#74808b]">
                Our platform is designed around outcomes, not hours. Every course connects to real career milestones with mentorship, community, and accountability built in.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-10">
                <div>
                  <div className="text-4xl font-extrabold text-[#16202e]">{stats.products.toLocaleString()}</div>
                  <div className="mt-2 text-sm text-[#7d8793]">Products Imported</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-[#16202e]">{stats.customers.toLocaleString()}</div>
                  <div className="mt-2 text-sm text-[#7d8793]">Customers Imported</div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={scaleIn} className="relative min-h-[320px] overflow-hidden rounded-[1.45rem] bg-[linear-gradient(145deg,#eef8f3_0%,#edf0d6_100%)]">
              <div className="absolute inset-x-8 bottom-7 top-7 rounded-[1.35rem] bg-[linear-gradient(150deg,#8ab99a_0%,#335e48_100%)]" />
              <div className="absolute left-12 top-10 h-56 w-40 rounded-[1.5rem] bg-[linear-gradient(180deg,#2f3d4c_0%,#17202b_100%)] shadow-[0_18px_45px_rgba(15,23,42,0.3)]" />
              <div className="absolute left-24 top-12 h-56 w-44 rounded-[1.6rem] bg-[linear-gradient(180deg,#607d67_0%,#1e3527_100%)] shadow-[0_18px_45px_rgba(15,23,42,0.24)]" />
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-6 right-8 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#1f2937] shadow-[0_16px_40px_rgba(15,23,42,0.14)]">
                <Star className="h-4 w-4 fill-[#f4b740] text-[#f4b740]" />4.9 900k Reviews
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ── FAQ ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
          <div className="mx-auto max-w-[860px] text-center">
            <motion.div variants={fadeUp}><SectionEyebrow>Frequently Asked Questions</SectionEyebrow></motion.div>
            <motion.h2 variants={fadeUp} className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-[2.6rem]">
              Got Questions? We&apos;ve Got Answers!
            </motion.h2>
          </div>

          <div className="mx-auto mt-10 max-w-[860px] space-y-3">
            {faqs.map((faq, index) => (
              <motion.details
                key={faq.question}
                variants={fadeUp}
                custom={index}
                className="group overflow-hidden rounded-[1.1rem] bg-white px-5 py-1 shadow-[0_12px_30px_rgba(15,23,42,0.04)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-[#1f2937] marker:hidden">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#7f8b97] transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-sm leading-7 text-[#74808b]">{faq.answer}</p>
              </motion.details>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-8 flex justify-center gap-3">
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="#courses" className="rounded-xl border border-[#d7dde2] bg-white px-5 py-3 text-sm font-medium text-[#334155] transition-shadow hover:shadow-md">
              See more FAQs
            </motion.a>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="#footer" className="rounded-xl bg-[#13283b] px-5 py-3 text-sm font-medium text-white transition-shadow hover:shadow-lg">
              Contact Us
            </motion.a>
          </motion.div>
        </motion.section>

        {/* ── CTA / Download ── */}
        <motion.section id="download" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-6 pb-3 pt-6 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[1.55rem] bg-[linear-gradient(135deg,#2ca9df_0%,#2492d7_45%,#203b77_100%)] px-7 py-8 text-white sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <motion.h2 variants={fadeUp} className="max-w-[470px] text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-[2.8rem]">
                  Start your learning journey today
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-4 max-w-[420px] text-sm leading-7 text-white/80">
                  Download the app and get instant access to 500+ courses, offline mode, and personalized recommendations.
                </motion.p>
                <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href="#courses" className="inline-flex items-center gap-3 rounded-xl bg-[#112a3d] px-4 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg">
                    <Apple className="h-5 w-5" />App Store
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href="#courses" className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                    <MoveUpRight className="h-5 w-5" />Google Play
                  </motion.a>
                </motion.div>
              </div>
              <motion.div variants={scaleIn} className="relative flex min-h-[240px] items-center justify-center lg:justify-end">
                <div className="absolute inset-x-10 top-6 h-28 rounded-full bg-white/10 blur-3xl" />
                <motion.div animate={{ y: [0, -10, 0], rotate: [18, 20, 18] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <PhoneMockup compact />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ── Footer ── */}
        <motion.footer
          id="footer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-4 rounded-t-[1.5rem] bg-[#18283a] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12"
        >
          <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.2fr_0.9fr_0.8fr_1fr]">
            <motion.div variants={fadeUp}>
              <Image src="/logo.png" alt="ITVision Academy" width={144} height={38} className="brightness-0 invert" />
              <p className="mt-4 max-w-[280px] text-sm leading-7 text-white/55">
                Empowering the next generation of tech professionals with practical, mentor-led education since 2024.
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-semibold text-white">ITVision Business</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                {["Teach on ITVision", "Get the app", "About us", "Blog"].map((l) => (
                  <li key={l} className="cursor-pointer transition-colors hover:text-white/80">{l}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-semibold text-white">Service</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                {["Course", "Challenge", "Job Path", "Webinar"].map((l) => (
                  <li key={l} className="cursor-pointer transition-colors hover:text-white/80">{l}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-semibold text-white">Contact Us</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                <li>(+91) 555-210</li>
                <li>hello@itvisionacademy.com</li>
                <li>Kolkata, India</li>
              </ul>
            </motion.div>
          </div>
          <div className="mx-auto mt-8 flex max-w-[1240px] flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/45">Copyright &copy; 2026 ITVision Academy. All rights reserved.</p>
            <div className="flex items-center gap-3 text-white/60">
              {[ArrowUpRight, Clock3].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.12, backgroundColor: "rgba(255,255,255,0.18)" }} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors">
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
