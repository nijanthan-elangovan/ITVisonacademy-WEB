"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Lightbulb,
  GraduationCap,
  Handshake,
  BookOpen,
  Briefcase,
  Heart,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import { fadeUp, stagger, scaleIn } from "@/components/animations";

const pillars = [
  { icon: Heart, title: "Inclusive Learning", description: "Fostering an inclusive learning environment for individuals of all backgrounds.", tint: "bg-[#fef2f2] text-[#ef4444]" },
  { icon: Handshake, title: "Hands-On Experience", description: "Providing hands-on experience and practical training that goes beyond classroom knowledge.", tint: "bg-[#edf7fd] text-[#2ca9df]" },
  { icon: Lightbulb, title: "Industry-Relevant Programs", description: "Delivering relevant programs that align with evolving industry demands.", tint: "bg-[#fefce8] text-[#eab308]" },
  { icon: Briefcase, title: "Job-Ready Training", description: "Getting students job-ready from initial classroom education to final job readiness training.", tint: "bg-[#eef3ff] text-[#203b77]" },
];

const stats = [
  { value: "100,000", label: "People Job-Ready Goal" },
  { value: "10", label: "Year Mission" },
  { value: "14+", label: "Partner Companies" },
  { value: "4", label: "Office Locations" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
      <Header />

      {/* ── Hero ── */}
      <motion.section
        initial="hidden" animate="visible" variants={stagger}
        className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2387cf_48%,#203b77_100%)] px-5 py-10 text-white sm:rounded-[1.5rem] sm:px-10 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-[1240px] text-center">
          <motion.div variants={fadeUp}><SectionEyebrow>About Us</SectionEyebrow></motion.div>
          <motion.h1 variants={fadeUp} className="mx-auto mt-4 max-w-[700px] text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:mt-5 sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            Helping 100,000 people become job-ready in 10 years
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-[600px] text-sm leading-7 text-white/80 sm:mt-6 sm:text-base">
            At ITVision Academy, our instructors deliver practical, mentor-led training designed to help you build confidence, gain certification, and move into high-demand tech roles.
          </motion.p>
        </div>
      </motion.section>

      {/* ── Stats ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i} className="rounded-2xl bg-white p-4 text-center shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 sm:p-6">
              <div className="text-2xl font-extrabold text-[#2ca9df] sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-[#74808b] sm:mt-2 sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Who Are We — people image ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div variants={fadeUp}><SectionEyebrow>Who Are We</SectionEyebrow></motion.div>
            <motion.h2 variants={fadeUp} className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#111827] sm:mt-5 sm:text-3xl md:text-[2.6rem]">
              Breaking barriers in tech education
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm leading-7 text-[#74808b] sm:mt-5">
              Don&apos;t let your education or experience hold you back. Even without a formal education, our training programs are designed to help you bridge this gap, offering industry knowledge and hands-on training that empowers you, regardless of your background.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 text-sm leading-7 text-[#74808b] sm:mt-4">
              Our curriculum is accessible and effective, ensuring that learners acquire essential technical skills and gain the practical experience needed to land great jobs.
            </motion.p>
          </div>
          <motion.div variants={scaleIn} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
            <Image
              src="/images/about-team.svg"
              alt="Diverse team collaborating on tech projects"
              fill className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#203b77]/20 to-transparent" />
          </motion.div>
        </div>
      </motion.section>

      {/* ── Mission Pillars ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-[1240px] text-center">
          <motion.div variants={fadeUp}><SectionEyebrow>Our Mission</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-[620px] text-2xl font-extrabold tracking-[-0.04em] text-[#111827] sm:mt-5 sm:text-3xl md:text-[2.6rem]">
            Our core commitments
          </motion.h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-[1240px] gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, description, tint }, i) => (
            <motion.article key={title} variants={fadeUp} custom={i} whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] sm:p-6">
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

      {/* ── Vision — people image ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-[#1c2c40] px-5 py-7 text-white sm:rounded-[1.55rem] sm:px-10 sm:py-12 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <motion.div variants={fadeUp}><SectionEyebrow>Our Vision</SectionEyebrow></motion.div>
              <motion.h2 variants={fadeUp} className="mt-4 text-2xl font-extrabold tracking-[-0.04em] sm:mt-5 sm:text-3xl md:text-[2.7rem]">
                Technology for everyone
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 max-w-[520px] text-sm leading-7 text-white/70 sm:mt-5">
                Our vision is clear: to help people from all backgrounds learn and succeed in the fast-changing world of technology, making education accessible and empowering everyone to build successful careers.
              </motion.p>
            </div>
            <motion.div variants={scaleIn} className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Users, label: "Community First", desc: "Building connections that last beyond the classroom" },
                { icon: Target, label: "Goal Oriented", desc: "Every course maps to real career outcomes" },
                { icon: BookOpen, label: "Always Learning", desc: "Curriculum updated with industry trends" },
                { icon: GraduationCap, label: "Certified Ready", desc: "Industry-recognized certifications included" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-xl bg-white/8 p-3 backdrop-blur sm:p-4">
                  <Icon className="h-5 w-5 text-[#2ca9df] sm:h-6 sm:w-6" />
                  <p className="mt-2 text-xs font-semibold sm:mt-3 sm:text-sm">{label}</p>
                  <p className="mt-1 text-[11px] leading-snug text-white/55 sm:text-xs">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Team image + CTA ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 pb-3 pt-4 sm:px-10 sm:pt-6 lg:px-12">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2492d7_45%,#203b77_100%)] px-5 py-8 text-white sm:rounded-[1.55rem] sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <motion.h2 variants={fadeUp} className="text-2xl font-extrabold leading-tight tracking-[-0.04em] sm:text-3xl md:text-[2.5rem]">
                Ready to start your journey?
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 max-w-[420px] text-sm leading-7 text-white/80 sm:mt-4">
                Join thousands of students who have transformed their careers with ITVision Academy.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-3 sm:mt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/courses" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#112a3d] px-5 text-sm font-semibold text-white transition-shadow hover:shadow-lg">
                    Explore Courses
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-xl bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                    Contact Us
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            <motion.div variants={scaleIn} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(9,20,32,0.3)]">
              <Image
                src="/images/classroom.svg"
                alt="Students in a classroom"
                fill className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
