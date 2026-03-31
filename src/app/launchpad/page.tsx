import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  MapPin,
  Megaphone,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import LaunchpadSignupForm from "@/components/LaunchpadSignupForm";

export const metadata: Metadata = {
  title: "Launchpad",
  description:
    "Launchpad is ITVision Academy's hands-on readiness program for Program Managers, Technical Managers, TPMs, TPGMs, and technical leaders ready for their next move.",
  alternates: {
    canonical: "/launchpad",
  },
};

const outcomes = [
  {
    icon: Target,
    title: "Career Positioning & Personal Brand Overhaul",
    description:
      "Rebuild your profile, LinkedIn, and career narrative around market demand, role-specific interviews, AI readiness, and the path you want next.",
  },
  {
    icon: Megaphone,
    title: "Role-Specific Interview & AI Readiness",
    description:
      "Practice for PM, TPM, Tech Manager, and Tech PM tracks with role-based prep, portfolio development, and hands-on AI fluency training.",
  },
  {
    icon: Sparkles,
    title: "Mentorship & Networking",
    description:
      "Get direct 1-on-1 mentorship and grounded guidance from leaders already operating in the roles you are targeting.",
  },
];

const audience = [
  "Aspiring Program Managers and Technical Program Managers",
  "Existing mid-level Program Managers, Technical Managers, and TPMs",
  "Technical Product Managers and technical leaders refining their next move",
  "Professionals who have already proven themselves and need sharper market positioning",
];

export default function LaunchpadPage() {
  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#10263a]">
      <Header />

      <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#7fd6ff_0%,#2ca9df_26%,#173d63_62%,#0c2034_100%)] px-5 py-12 text-white sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionEyebrow>Focused Program</SectionEyebrow>
            <h1 className="mt-5 max-w-[760px] text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-[5.4rem]">
              Mid-level is not a ceiling. It&apos;s a launchpad.
            </h1>
            <p className="mt-6 max-w-[720px] text-base leading-8 text-white/78 sm:text-lg">
              A hands-on readiness program for Program Managers, Technical
              Managers, TPMs, TPGMs, and technical leaders at every level and
              every stage.
            </p>
            <p className="mt-5 max-w-[720px] text-base leading-8 text-white/70">
              You&apos;ve proved it. Now it&apos;s time to prove it louder. The
              experience is real, the skills are sharp, and Launchpad is built
              to help you show up polished, market-ready, and unmistakably
              aligned to what comes next.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#launchpad-signup"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-[#10263a] shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5"
              >
                Join Launchpad
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/16"
              >
                Talk to admissions
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#2ca9df]">
                <Trophy className="h-4 w-4" />
                Learn from MIT Solve award winners
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[#081a2c]/45 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                    Best For
                  </p>
                  <p className="mt-3 text-lg font-bold leading-7 text-white">
                    Managers and technical leaders ready to reposition, interview
                    stronger, and level up with credibility.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-[#081a2c]/45 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                    Headquarters
                  </p>
                  <div className="mt-3 flex items-start gap-3 text-white">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#7fd6ff]" />
                    <p className="text-lg font-bold leading-7">
                      9300 John Hickman Parkway, #1104, Frisco, TX
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-[#ecf7fd] p-6 text-[#10263a] shadow-[0_24px_70px_rgba(6,21,36,0.2)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2ca9df]">
                How can we help?
              </p>
              <p className="mt-4 text-lg leading-8 text-[#334155]">
                Launchpad is built for aspiring and established Program
                Managers, Technical Managers, Technical Product Managers, and
                Technical Program Managers, including mid-level leaders and
                every operator in between.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-10 sm:py-14 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-black/5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#edf7fd] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2ca9df]">
              <Building2 className="h-4 w-4" />
              Who it serves
            </div>
            <ul className="mt-6 space-y-4">
              {audience.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.4rem] border border-[#e4ebf1] bg-[#f8fbfd] px-5 py-4 text-sm leading-7 text-[#475569]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-black/5">
            <h2 className="text-3xl font-extrabold uppercase leading-none tracking-[-0.05em] text-[#2ca9df] sm:text-[3.4rem]">
              What you&apos;ll walk away with
            </h2>
            <div className="mt-8 grid gap-4">
              {outcomes.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-[1.7rem] border border-[#dce7ee] bg-[linear-gradient(135deg,#f8fbfd_0%,#eef7fb_100%)] p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2ca9df] shadow-[0_10px_30px_rgba(44,169,223,0.18)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-[-0.03em] text-[#10263a]">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[#5b6773]">
                        {description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="launchpad-signup"
        className="px-5 pb-6 sm:px-10 sm:pb-10 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="rounded-[2rem] bg-[#10263a] p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7fd6ff]">
              Signup
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em]">
              Tell us where you are and where you want to go.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Submit your details and goals. We&apos;ll save your interest in the
              database and send confirmation to both you and{" "}
              <span className="font-semibold text-white">
                ad@itvisionacademy.com
              </span>
              .
            </p>
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                Contact
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">
                (214) 727-2154
                <br />
                info@itvisionacademy.com
                <br />
                itvisionacademy.com/launchpad
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-black/5 sm:p-8">
            <LaunchpadSignupForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
