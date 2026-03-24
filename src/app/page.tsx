"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Shield,
  Database,
  BarChart3,
  Code,
  Cloud,
  ChevronDown,
  Menu,
  X,
  Mail,
  Phone,
  Award,
  Users,
  BookOpen,
  Target,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";

function LinkedinIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Home", "About Us", "Courses", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Image src="/logo.png" alt="ITVision Academy" width={180} height={48} priority />

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="text-sm font-medium text-gray-600 hover:text-[#1EAED7] transition-colors">
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#courses" className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#1EAED7] to-[#0D3B66] rounded-lg hover:shadow-lg hover:shadow-[#1EAED7]/25 transition-all">
            Get Started
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-600 py-2">
              {l}
            </a>
          ))}
          <a href="#courses" className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#1EAED7] to-[#0D3B66] rounded-lg">
            Get Started
          </a>
        </motion.div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D3B66] via-[#1a5276] to-[#1EAED7]" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`, backgroundSize: "40px 40px" }} />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#1EAED7]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0D3B66]/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur rounded-full border border-white/20">
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-xs font-medium text-white/90">Your Partner in Tech Upskilling</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Launch Your{" "}
              <span className="relative">
                <span className="relative z-10">Tech Career</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#1EAED7]/40 -z-0 rounded" />
              </span>
              <br />
              in Just <span className="text-[#7dd8f0]">6 Months</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-white/80 max-w-xl leading-relaxed">
              We designed our courses to be quickly completed and have you certified and job-ready. No 4-year degree required — just dedication and the right guidance.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a href="#courses" className="px-8 py-3.5 bg-white text-[#0D3B66] font-semibold rounded-lg hover:shadow-xl transition-all flex items-center gap-2">
                Explore Courses <ArrowRight size={18} />
              </a>
              <a href="#about-us" className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
                Learn More
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="pt-4 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1EAED7] to-[#0D3B66] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-white/80 text-sm">
                <span className="font-semibold text-white">500+</span> students trained & certified
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Stats cards */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative hidden lg:block">
            <div className="relative w-full h-[480px]">
              {/* Floating cards */}
              <motion.div variants={fadeUp} className="absolute top-0 right-0 bg-white rounded-2xl shadow-2xl p-6 w-64" style={{ animation: "float 6s ease-in-out infinite" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1EAED7]/10 flex items-center justify-center">
                    <GraduationCap size={20} className="text-[#1EAED7]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0D3B66]">7+</p>
                    <p className="text-xs text-gray-500">Expert-Led Courses</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#1EAED7] to-[#0D3B66] h-2 rounded-full w-4/5" />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="absolute top-32 left-0 bg-white rounded-2xl shadow-2xl p-6 w-64" style={{ animation: "float 7s ease-in-out infinite 1s" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Award size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0D3B66]">3-6</p>
                    <p className="text-xs text-gray-500">Months to Certified</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="absolute bottom-16 right-8 bg-white rounded-2xl shadow-2xl p-6 w-64" style={{ animation: "float 5s ease-in-out infinite 2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Target size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0D3B66]">100%</p>
                    <p className="text-xs text-gray-500">Job-Ready Training</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Values Marquee ─── */
function ValuesBar() {
  const values = ["Inclusivity", "Equal Opportunities", "Commitment", "Education", "Upskilling", "Career Growth", "Innovation"];
  return (
    <div className="bg-[#f4f7fa] py-4 overflow-hidden border-y border-gray-200">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...values, ...values].map((v, i) => (
          <span key={i} className="mx-8 text-sm font-semibold text-[#0D3B66]/60 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1EAED7]" />
            {v}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

/* ─── Why Choose Us ─── */
function WhyChooseUs() {
  const features = [
    { icon: <BookOpen size={24} />, title: "Industry-Ready Curriculum", desc: "Our courses are designed with real-world scenarios and up-to-date content aligned to current industry demands." },
    { icon: <Users size={24} />, title: "Expert Mentorship", desc: "Learn directly from seasoned professionals with hands-on experience in top tech companies." },
    { icon: <Award size={24} />, title: "Certifications Included", desc: "Get certified upon completion. Our programs prepare you for industry-recognized certifications." },
    { icon: <Target size={24} />, title: "Job-Ready in 3-6 Months", desc: "No 4-year degrees needed. Our fast-track programs get you career-ready in months, not years." },
  ];

  return (
    <section id="about-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-sm font-semibold text-[#1EAED7] uppercase tracking-wider mb-3">Why Choose Us</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#0D3B66]">
            Dive into tech courses across<br className="hidden sm:block" /> diverse subjects
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="group p-6 rounded-2xl border border-gray-100 hover:border-[#1EAED7]/30 hover:shadow-xl hover:shadow-[#1EAED7]/5 transition-all duration-300 bg-white">
              <div className="w-12 h-12 rounded-xl bg-[#1EAED7]/10 flex items-center justify-center text-[#1EAED7] mb-4 group-hover:bg-[#1EAED7] group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="font-bold text-[#0D3B66] mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Why Tech ─── */
function WhyTech() {
  const tags = ["Cloud Computing", "Cybersecurity", "Data Engineering", "Data Analytics", "Python", "SQL", "Power BI"];

  return (
    <section className="py-20 bg-[#f4f7fa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Illustration */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
            <div className="bg-gradient-to-br from-[#0D3B66] to-[#1EAED7] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Sparkles size={28} className="text-yellow-300" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">500+</p>
                    <p className="text-white/70 text-sm">Students Trained</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className="px-3 py-1.5 text-xs font-medium bg-white/10 backdrop-blur rounded-full border border-white/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
            <motion.p variants={fadeUp} className="text-sm font-semibold text-[#1EAED7] uppercase tracking-wider">Why Tech?</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#0D3B66] leading-tight">
              Boost your skillset with<br /> our expert-led programs
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed">
              In today&apos;s fast-paced digital landscape, a career in technology offers unparalleled opportunities for growth, innovation and financial success. Whether you have a formal education or not, we train you in the most highly demanded skills of today&apos;s job market.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              {tags.map((t) => (
                <span key={t} className="px-4 py-2 text-sm font-medium bg-white rounded-lg border border-gray-200 text-[#0D3B66] hover:border-[#1EAED7] hover:text-[#1EAED7] transition-colors cursor-pointer">
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Courses ─── */
function Courses() {
  const courses = [
    { icon: <Cloud size={24} />, title: "Azure Data Factory", desc: "Master cloud data integration and ETL pipelines with Microsoft Azure Data Factory.", color: "from-blue-500 to-blue-700" },
    { icon: <Shield size={24} />, title: "Cyber Security", desc: "Learn to protect systems, networks, and programs from digital attacks and threats.", color: "from-red-500 to-red-700" },
    { icon: <Code size={24} />, title: "Python", desc: "Build a strong foundation in Python programming for data science and automation.", color: "from-green-500 to-green-700" },
    { icon: <BarChart3 size={24} />, title: "Power BI", desc: "Transform raw data into stunning interactive dashboards and business insights.", color: "from-yellow-500 to-orange-600" },
    { icon: <Database size={24} />, title: "SQL Basic & Advanced", desc: "From fundamentals to complex queries — master the language of data.", color: "from-purple-500 to-purple-700" },
    { icon: <Cloud size={24} />, title: "Azure Databricks", desc: "Harness the power of big data analytics with Apache Spark on Azure.", color: "from-[#1EAED7] to-[#0D3B66]" },
  ];

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-sm font-semibold text-[#1EAED7] uppercase tracking-wider mb-3">Our Courses</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#0D3B66]">Become an Expert In</motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div key={i} variants={fadeUp} className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 bg-white">
              <div className={`h-2 bg-gradient-to-r ${c.color}`} />
              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-4`}>
                  {c.icon}
                </div>
                <h3 className="font-bold text-[#0D3B66] text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{c.desc}</p>
                <a href="https://itvisionacademy.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#1EAED7] hover:gap-2 transition-all">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats ─── */
function Stats() {
  const stats = [
    { value: "500+", label: "Students Trained" },
    { value: "95%", label: "Completion Rate" },
    { value: "7+", label: "Expert-Led Courses" },
    { value: "4.9", label: "Student Rating" },
  ];

  return (
    <section className="py-20 bg-[#f4f7fa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
            <motion.p variants={fadeUp} className="text-sm font-semibold text-[#1EAED7] uppercase tracking-wider">Learn Smarter, Not Harder</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#0D3B66] leading-tight">
              Enjoyable Learning<br />Experiences Await You
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed">
              You can study at home and get certified with ease. We try to make it easier for you to learn and achieve your dreams. Our flexible schedule means you can learn at your own pace.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6 pt-4">
              {stats.map((s, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-3xl font-bold text-[#0D3B66]">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="relative bg-gradient-to-br from-[#1EAED7]/10 to-[#0D3B66]/10 rounded-3xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <GraduationCap size={28} />, label: "Certified" },
                  { icon: <Users size={28} />, label: "Community" },
                  { icon: <BookOpen size={28} />, label: "Hands-On" },
                  { icon: <Award size={28} />, label: "Recognized" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                    <div className="w-14 h-14 rounded-xl bg-[#1EAED7]/10 flex items-center justify-center text-[#1EAED7] mx-auto mb-3">
                      {item.icon}
                    </div>
                    <p className="font-semibold text-[#0D3B66] text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Referral Program ─── */
function Referral() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative bg-gradient-to-br from-[#0D3B66] to-[#1EAED7] rounded-3xl p-8 lg:p-14 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur text-white rounded-full border border-white/20">Refer to Earn Program</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Don&apos;t let tuition fees hold you back
              </h2>
              <p className="text-white/80 leading-relaxed">
                Our Refer to Earn Program is designed to help you help yourself. We want to make training as accessible as possible so you can achieve success in the world of tech.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <p className="text-4xl font-bold text-white mb-1">$100 <span className="text-lg font-normal text-white/70">off</span></p>
                <p className="text-white/80 text-sm">For each friend you refer — taken off YOUR tuition</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <p className="text-4xl font-bold text-white mb-1">$50 <span className="text-lg font-normal text-white/70">off</span></p>
                <p className="text-white/80 text-sm">Your referred friends receive off their first course</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "Do I need a degree or prior experience to enroll?", a: "Not at all! Our courses are designed for beginners and career changers alike. Whether you have a formal education or not, we train you in the most highly demanded skills of today's job market." },
    { q: "How long does it take to complete a course?", a: "Most of our programs can be completed in 3-6 months. We designed our courses to get you certified and job-ready as quickly as possible while maintaining high quality." },
    { q: "Are certificates provided upon completion?", a: "Yes! Upon successful completion, you receive a certificate from ITVision Academy. Our programs also prepare you for industry-recognized certifications like Azure, CompTIA, and more." },
    { q: "Can I learn at my own pace?", a: "Absolutely. Our flexible schedule allows you to learn at your own pace while still having access to live sessions with expert mentors for guidance and support." },
    { q: "How does the Refer to Earn program work?", a: "For each friend you refer, we take $100 off your tuition. Your referred friends also receive $50 off their first course. It's our way of making tech education more accessible." },
    { q: "What kind of support do I get during the course?", a: "You get access to expert mentors, a community of fellow learners, hands-on labs, and dedicated support to help you every step of the way." },
  ];

  return (
    <section className="py-20 bg-[#f4f7fa]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-sm font-semibold text-[#1EAED7] uppercase tracking-wider mb-3">Frequently Asked Questions</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#0D3B66]">
            Got Questions? We&apos;ve Got Answers!
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-[#0D3B66] text-sm pr-4">{faq.q}</span>
                <ChevronDown size={20} className={`text-gray-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center gap-3">
          <a href="https://itvisionacademy.com/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 text-sm font-medium border border-gray-200 rounded-lg text-gray-600 hover:border-[#1EAED7] hover:text-[#1EAED7] transition-colors">
            See more FAQs
          </a>
          <a href="#contact" className="px-5 py-2.5 text-sm font-medium border border-gray-200 rounded-lg text-gray-600 hover:border-[#1EAED7] hover:text-[#1EAED7] transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative bg-gradient-to-r from-[#1EAED7] to-[#0D3B66] rounded-3xl p-8 lg:p-14 text-center overflow-hidden">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-white/5 rounded-full blur-2xl" />

          <div className="relative space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Let&apos;s find your perfect<br />tech career path today!
            </h2>
            <p className="text-white/80">
              Empower yourself with in-demand skills. Start learning anytime, anywhere.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#courses" className="px-8 py-3.5 bg-white text-[#0D3B66] font-semibold rounded-lg hover:shadow-xl transition-all flex items-center gap-2">
                Browse Courses <ArrowRight size={18} />
              </a>
              <a href="mailto:info@itvisionacademy.com" className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer id="contact" className="bg-[#0D3B66] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Image src="/logo.png" alt="ITVision Academy" width={160} height={44} className="brightness-0 invert" />
            <p className="text-sm text-white/60 leading-relaxed">
              Your partner in tech upskilling and career growth. Certified and job-ready in 3-6 months.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Quick Links</h4>
            <ul className="space-y-2.5">
              {["Home", "About Us", "Courses", "Contact Us", "Blog"].map((l) => (
                <li key={l}>
                  <a href={l === "Blog" ? "https://itvisionacademy.com/blog" : `#${l.toLowerCase().replace(" ", "-")}`} className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Courses</h4>
            <ul className="space-y-2.5">
              {["Azure Data Factory", "Cyber Security", "Python", "Power BI", "SQL", "Azure Databricks"].map((c) => (
                <li key={c}>
                  <a href="#courses" className="text-sm text-white/50 hover:text-white transition-colors">{c}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#1EAED7] shrink-0" />
                <a href="mailto:info@itvisionacademy.com" className="text-sm text-white/50 hover:text-white transition-colors">info@itvisionacademy.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#1EAED7] shrink-0" />
                <a href="tel:7373322742" className="text-sm text-white/50 hover:text-white transition-colors">737-332-2742</a>
              </li>
              <li className="flex items-center gap-2">
                <LinkedinIcon size={16} className="text-[#1EAED7] shrink-0" />
                <a href="https://www.linkedin.com/company/itvisionacademy/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} ITVision Academy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/company/itvisionacademy/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1EAED7] transition-colors">
              <LinkedinIcon size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValuesBar />
        <WhyChooseUs />
        <WhyTech />
        <Courses />
        <Stats />
        <Referral />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
