import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  Building2,
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
      "Rebuild how the market reads you so your background sounds sharper, more intentional, and more aligned to the roles you want next.",
    details: [
      "A tighter career story for your resume, LinkedIn, and interview introductions",
      "Role-aligned positioning for Program Manager, TPM, Tech Manager, and Tech PM paths",
      "Stronger articulation of scope, influence, metrics, and leadership signal",
      "A clearer market-facing brand that reflects where you are going, not just where you have been",
    ],
  },
  {
    icon: Megaphone,
    title: "Role-Specific Interview & AI Readiness",
    description:
      "Prepare for modern hiring expectations with practical role-based interview prep and hands-on AI fluency that makes you more credible in the room.",
    details: [
      "Interview preparation built around PM, TPM, Tech Manager, and Tech PM expectations",
      "Stronger answers for execution, ambiguity, stakeholder management, and technical depth",
      "AI readiness that helps you talk confidently about tools, workflows, and productivity gains",
      "Portfolio and proof-point framing that turns experience into evidence",
    ],
  },
  {
    icon: Sparkles,
    title: "Mentorship & Networking",
    description:
      "Get direct access to mentors who understand the roles you are targeting and can help you move with more clarity and less guesswork.",
    details: [
      "1-on-1 guidance from people who are already doing the work you want to step into",
      "Feedback on your positioning, communication style, and decision-making story",
      "Practical perspective on where to focus, what to improve, and what to stop overthinking",
      "Networking and mentorship that feels grounded in real hiring and real leadership work",
    ],
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
            <h1 className="mt-5 max-w-[760px] text-[2.7rem] font-extrabold leading-[0.92] tracking-[-0.055em] sm:text-[3.4rem] lg:text-[4.8rem]">
              Mid-level is not a ceiling. It&apos;s a launchpad.
            </h1>
            <p className="mt-6 max-w-[720px] text-[1rem] leading-8 text-white/78 sm:text-[1.08rem]">
              A hands-on readiness program for Program Managers, Technical
              Managers, TPMs, TPGMs, and technical leaders at every level and
              every stage.
            </p>
            <p className="mt-5 max-w-[720px] text-[0.98rem] leading-8 text-white/70 sm:text-[1.04rem]">
              You&apos;ve proved it. Now it&apos;s time to prove it louder. The
              experience is real, the skills are sharp, and Launchpad is built
              to help you show up with sharper positioning, stronger AI fluency,
              and the kind of mentoring that turns experience into momentum.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#launchpad-signup"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-[#10263a] shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5"
              >
                Apply for Launchpad
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/16"
              >
                Book a strategy call
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
                  <p className="mt-3 text-[1.15rem] font-bold leading-8 tracking-[-0.02em] text-white">
                    Managers and technical leaders ready to reposition, interview
                    stronger, and level up with credibility.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-[#081a2c]/45 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                    Built Around
                  </p>
                  <div className="mt-3 flex items-start gap-3 text-white">
                    <BrainCircuit className="mt-1 h-5 w-5 shrink-0 text-[#7fd6ff]" />
                    <p className="text-[1.15rem] font-bold leading-8 tracking-[-0.02em]">
                      AI readiness, leadership positioning, and direct mentoring
                      for the exact roles you want next.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-[#ecf7fd] p-6 text-[#10263a] shadow-[0_24px_70px_rgba(6,21,36,0.2)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2ca9df]">
                How can we help?
              </p>
              <p className="mt-4 text-[1.08rem] leading-8 text-[#334155]">
                Launchpad is built for aspiring and established Program
                Managers, Technical Managers, Technical Product Managers, and
                Technical Program Managers who need clearer differentiation,
                sharper executive presence, and support that translates into
                real interview and career momentum.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-10 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="rounded-[2rem] bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-black/5">
            <h2 className="text-[2.1rem] font-extrabold leading-[0.95] tracking-[-0.05em] text-[#2ca9df] sm:text-[2.8rem] lg:text-[3.25rem]">
              What you&apos;ll walk away with
            </h2>
            <p className="mt-4 max-w-[760px] text-[0.98rem] leading-8 text-[#5b6773]">
              Launchpad is built to leave you with clearer positioning,
              stronger interview readiness, better AI fluency, and mentoring
              that turns vague ambition into a concrete next move.
            </p>
            <div className="mt-8 grid gap-4">
              {outcomes.map(({ icon: Icon, title, description, details }) => (
                <article
                  key={title}
                  className="rounded-[1.7rem] border border-[#dce7ee] bg-[linear-gradient(135deg,#f8fbfd_0%,#eef7fb_100%)] p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2ca9df] shadow-[0_10px_30px_rgba(44,169,223,0.18)]">
                      <Icon className="h-5 w-5" />
                    </div>
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
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-6 sm:px-10 sm:pb-10 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="rounded-[2rem] bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-black/5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#edf7fd] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2ca9df]">
              <Building2 className="h-4 w-4" />
              Who it serves
            </div>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
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
            <h2 className="mt-4 text-[2rem] font-extrabold leading-tight tracking-[-0.045em] sm:text-[2.35rem]">
              Tell us where you are and where you want to go.
            </h2>
            <p className="mt-4 text-[0.98rem] leading-8 text-white/70">
              Share your current role, target role, and where you want support.
              We&apos;ll save your interest in the database and send confirmation
              to both you and{" "}
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
                We review your goals, match you to the right mentoring and prep
                priorities, and reach out with the next step for Launchpad.
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
