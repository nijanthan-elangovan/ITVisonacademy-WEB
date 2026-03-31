"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Sparkles,
  Target,
  Trophy,
  Megaphone,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import LaunchpadSignupForm from "@/components/LaunchpadSignupForm";
import {
  fadeUp,
  stagger,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/components/animations";

const outcomes = [
  {
    icon: Target,
    title: "Position Yourself",
    description:
      "We rebuild how the market sees you — resume, LinkedIn, and interview story.",
    details: [
      "A tighter career narrative aligned to PM, TPM, and Tech Manager roles",
      "Stronger articulation of scope, influence, and leadership signal",
      "A market-facing brand that reflects where you're going",
    ],
  },
  {
    icon: Megaphone,
    title: "Interview Ready",
    description:
      "Role-specific prep for PM, TPM, and Tech Manager interviews. Plus AI fluency that makes you more credible.",
    details: [
      "Prep built around execution, ambiguity, and stakeholder management",
      "AI readiness that helps you talk confidently about tools and workflows",
      "Portfolio framing that turns experience into evidence",
    ],
  },
  {
    icon: Sparkles,
    title: "Get Mentored",
    description:
      "Direct access to mentors already doing the work you want. No theory — real hiring insight.",
    details: [
      "1-on-1 guidance from people in the roles you're targeting",
      "Feedback on positioning, communication, and decision-making",
      "Practical perspective on where to focus and what to stop overthinking",
    ],
  },
];

export default function LaunchpadPage() {
  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#10263a]">
      <Header />

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#7fd6ff_0%,#2ca9df_26%,#173d63_62%,#0c2034_100%)] px-5 py-12 text-white sm:px-10 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#7fd6ff] blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-[#16324f] blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div variants={slideInLeft}>
            <SectionEyebrow>Focused Program</SectionEyebrow>
            <h1 className="mt-5 max-w-[760px] text-[2.7rem] font-extrabold leading-[0.92] tracking-[-0.055em] sm:text-[3.4rem] lg:text-[4.8rem]">
              Mid-level is not a ceiling. It&apos;s a launchpad.
            </h1>
            <p className="mt-6 max-w-[720px] text-[1rem] leading-8 text-white/78 sm:text-[1.08rem]">
              Built for PMs, TPMs, and tech leaders ready to land their next
              role.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#launchpad-signup"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-[#10263a] shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(0,0,0,0.25)]"
              >
                Apply for Launchpad
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/16"
              >
                Book a strategy call
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={slideInRight} className="grid gap-4">
            <motion.div
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur transition duration-300 hover:shadow-[0_28px_70px_rgba(5,20,34,0.25)]"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaborating around a table"
                  fill
                  className="object-cover opacity-30 transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,26,44,0.15)_0%,rgba(8,26,44,0.72)_100%)]" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#2ca9df] shadow-[0_10px_30px_rgba(255,255,255,0.15)]">
                  <Trophy className="h-4 w-4" />
                  Learn from MIT Solve award winners
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-[#081a2c]/60 p-5 backdrop-blur">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                      Best For
                    </p>
                    <p className="mt-3 text-[1.15rem] font-bold leading-8 tracking-[-0.02em] text-white">
                      Tech leaders ready to reposition and interview stronger.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-[#081a2c]/60 p-5 backdrop-blur">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                      Built Around
                    </p>
                    <div className="mt-3 flex items-start gap-3 text-white">
                      <BrainCircuit className="mt-1 h-5 w-5 shrink-0 text-[#7fd6ff]" />
                      <p className="text-[1.15rem] font-bold leading-8 tracking-[-0.02em]">
                        AI readiness, positioning, and direct mentoring.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur">
                    Role-based prep
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur">
                    AI fluency
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur">
                    1-on-1 mentoring
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Image cards */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="px-5 pb-4 sm:px-10 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1240px] gap-4 md:grid-cols-3">
          {[
            {
              image:
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
              title: "Career storytelling that sounds executive-ready",
              text: "Sharper positioning so your experience reads with clarity and authority.",
            },
            {
              image:
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
              title: "Interview confidence built on real outcomes",
              text: "Communicate scope, judgment, and technical fluency more convincingly.",
            },
            {
              image:
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
              title: "Professional polish without the buzzwords",
              text: "A cleaner, market-ready presence across your profile and conversations.",
            },
          ].map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-[1.8rem] bg-[#10263a] shadow-[0_18px_50px_rgba(15,23,42,0.12)] transition duration-300 hover:shadow-[0_24px_65px_rgba(15,23,42,0.18)]"
            >
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,38,58,0.08)_0%,rgba(16,38,58,0.88)_100%)]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-[1.12rem] font-bold leading-7 tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.94rem] leading-7 text-white/78">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Outcomes */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="px-5 py-10 sm:px-10 sm:py-14 lg:px-12"
      >
        <div className="mx-auto max-w-[1240px]">
          <motion.div
            variants={scaleIn}
            className="rounded-[2rem] bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-black/5"
          >
            <h2 className="text-[2.1rem] font-extrabold leading-[0.95] tracking-[-0.05em] text-[#2ca9df] sm:text-[2.8rem] lg:text-[3.25rem]">
              What you&apos;ll walk away with
            </h2>
            <p className="mt-4 max-w-[760px] text-[0.98rem] leading-8 text-[#5b6773]">
              Clearer positioning, stronger interview readiness, and mentoring
              that turns ambition into a concrete next move.
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {outcomes.map(({ icon: Icon, title, description, details }) => (
                <motion.article
                  key={title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group rounded-[1.7rem] border border-[#dce7ee] bg-[linear-gradient(135deg,#f8fbfd_0%,#eef7fb_100%)] p-5 transition duration-300 hover:shadow-[0_24px_60px_rgba(44,169,223,0.12)]"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2ca9df] shadow-[0_10px_30px_rgba(44,169,223,0.18)]"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <h3 className="text-[1.32rem] font-bold leading-8 tracking-[-0.03em] text-[#10263a]">
                        {title}
                      </h3>
                      <p className="mt-2 text-[0.98rem] leading-8 text-[#5b6773]">
                        {description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-3 text-[0.98rem] leading-8 text-[#334155]"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2ca9df]" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Signup form */}
      <motion.section
        id="launchpad-signup"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="px-5 pb-6 sm:px-10 sm:pb-10 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[0.84fr_1.16fr]">
          <motion.div
            variants={slideInLeft}
            className="relative overflow-hidden rounded-[2rem] bg-[#10263a] p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
          >
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,38,58,0.82)_0%,rgba(16,38,58,0.98)_100%)]" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7fd6ff]">
                Signup
              </p>
              <h2 className="mt-4 text-[2rem] font-extrabold leading-tight tracking-[-0.045em] sm:text-[2.35rem]">
                Tell us where you are and where you want to go.
              </h2>
              <p className="mt-4 text-[0.98rem] leading-8 text-white/70">
                Share your current role, target role, and where you want
                support. We&apos;ll save your interest and send confirmation to
                both you and{" "}
                <span className="font-semibold text-white">
                  ad@itvisionacademy.com
                </span>
                .
              </p>
              <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                  What happens next
                </p>
                <p className="mt-3 text-[0.98rem] leading-8 text-white/80">
                  We review your goals, match you to the right mentoring and
                  prep priorities, and reach out with your next step.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            className="rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition duration-300 hover:shadow-[0_28px_75px_rgba(15,23,42,0.12)] sm:p-8"
          >
            <LaunchpadSignupForm />
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
