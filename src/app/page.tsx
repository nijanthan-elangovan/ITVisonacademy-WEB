import Image from "next/image";
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
  MonitorPlay,
  MoveUpRight,
  Search,
  Star,
  Trophy,
} from "lucide-react";

const partners = ["Microsoft", "Evernote", "Medium"];

const features = [
  {
    icon: Trophy,
    title: "Progress Tracking And Certifications",
    description:
      "Track your course progress, module goals, and certificate milestones with a clear dashboard.",
    tint: "bg-[#edf7fd] text-[#2ca9df]",
  },
  {
    icon: Lock,
    title: "Accessibility And Convenience",
    description:
      "Study with flexible access, lifetime lessons, and a learning flow that fits busy schedules.",
    tint: "bg-[#eef3ff] text-[#203b77]",
  },
  {
    icon: Grid2x2,
    title: "Diverse Course Selection",
    description:
      "Choose from modern, high-demand topics and explore tracks designed for practical job growth.",
    tint: "bg-[#edf7fd] text-[#2ca9df]",
  },
  {
    icon: MonitorPlay,
    title: "Interactive Learning Experience",
    description:
      "Lessons include quizzes, visual walkthroughs, and guided exercises to keep learning active.",
    tint: "bg-[#eef3ff] text-[#203b77]",
  },
];

const skillTags = [
  "Graphic Design",
  "IT Software",
  "UI/UX Design",
  "Development",
  "Data Science",
  "Photography",
  "Personal Development",
  "Marketing",
];

const courses = [
  {
    category: "GRAPHICS DESIGN",
    title: "The Complete Graphic Design Theory For Beginners Course",
    author: "Shivon dowel",
    lessons: "12 Sessions",
    price: "$18.00",
    oldPrice: "$24.00",
    rating: "5.0 (6,023)",
  },
  {
    category: "ANIMATION",
    title: "After Effect Masterclass: how to rigging character easily",
    author: "John Connor",
    lessons: "12 Sessions",
    price: "$12.00",
    oldPrice: "$24.00",
    rating: "5.0 (6,023)",
  },
  {
    category: "IT SOFTWARE",
    title: "CCNA 2020 200-125 video Boot Camp With Chris Bryant",
    author: "Chris Bryant",
    lessons: "12 Sessions",
    price: "$12.00",
    oldPrice: "$24.00",
    rating: "5.0 (6,023)",
  },
  {
    category: "UI/UX DESIGN",
    title: "User Experience Design Fundamentals",
    author: "Shivon dowel",
    lessons: "12 Sessions",
    price: "$18.00",
    oldPrice: "$24.00",
    rating: "5.0 (6,023)",
  },
  {
    category: "DEVELOPMENT",
    title: "Web Development Masterclass Online Certification",
    author: "El Eduardo",
    lessons: "12 Sessions",
    price: "$12.00",
    oldPrice: "$24.00",
    rating: "5.0 (6,023)",
  },
  {
    category: "DATA SCIENCE",
    title: "Python for Data Science and Machine Learning Bootcamp",
    author: "Nanne Maxwell",
    lessons: "12 Sessions",
    price: "$12.00",
    oldPrice: "$24.00",
    rating: "5.0 (6,023)",
  },
];

const faqs = [
  {
    question: "Is my personal information safe on the app?",
    answer:
      "Yes. We use secure account handling, encrypted form flows, and privacy-aware storage practices to protect personal information.",
  },
  {
    question: "What types of courses are available on these apps?",
    answer:
      "You can access design, development, business, data, and productivity courses, along with short skills-based programs.",
  },
  {
    question: "Are certificates or credentials provided upon course completion?",
    answer:
      "Yes. Many programs include completion certificates and guided paths that support career-ready portfolio work.",
  },
  {
    question: "Can I interact with instructors and other learners?",
    answer:
      "Yes. Course spaces support mentor feedback, discussion areas, and collaborative learning touchpoints.",
  },
  {
    question: "How do I track my progress in a course?",
    answer:
      "Each course includes lesson completion states, progress summaries, and quick access to unfinished sessions.",
  },
  {
    question: "Can I access courses on multiple devices?",
    answer:
      "Yes. The experience is designed to continue across desktop, tablet, and mobile layouts.",
  },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[#ecf7fd] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#2ca9df]">
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
        <p className="text-sm font-semibold leading-snug">
          Best course that suits your future career path.
        </p>
      </div>
      <div className="absolute left-4 right-4 top-[190px] rounded-2xl bg-white p-4 shadow-lg">
        <div className="mb-3 flex items-start justify-between">
          <div className="rounded-xl bg-[#2f78ff] p-2 text-white">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-semibold text-[#95a1ad]">5.0</span>
        </div>
        <p className="text-sm font-semibold leading-snug text-[#1f2a37]">
          How to make modern poster for a product campaign
        </p>
        <div className="mt-4 flex items-center justify-between text-[10px] text-[#8b97a3]">
          <span>Sessions 7 / 15</span>
          <span className="font-bold text-[#2ca9df]">82%</span>
        </div>
      </div>
      <div className="absolute bottom-5 left-4 right-4 rounded-2xl bg-[#f4efff] p-3 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-[10px] text-[#7e58b3]">
          <Bell className="h-3.5 w-3.5" />
          <span>Mentor Of The Week</span>
        </div>
        <div className="h-2 rounded-full bg-white">
          <div className="h-2 w-3/4 rounded-full bg-[#2ca9df]" />
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  category,
  title,
  author,
  lessons,
  price,
  oldPrice,
  rating,
}: (typeof courses)[number]) {
  return (
    <article className="rounded-[1.45rem] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5">
      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#a0aab5]">
        {category}
      </p>
      <h3 className="mt-3 text-[1.02rem] font-bold leading-6 text-[#1c2635]">
        {title}
      </h3>
      <div className="mt-4 flex items-center justify-between text-xs text-[#7f8b97]">
        <span>{author}</span>
        <span>{lessons}</span>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#2ca9df]">{price}</span>
          <span className="text-xs text-[#b6bfc8] line-through">{oldPrice}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-[#f59e0b]">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span>{rating}</span>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e7ecea] px-3 py-4 text-[#1c2635] sm:px-5 sm:py-6">
      <div className="mx-auto max-w-[1240px] rounded-[1.6rem] border border-black/5 bg-[#fbfbf9] p-3 shadow-[0_18px_70px_rgba(15,23,42,0.08)] sm:p-5">
        <header className="rounded-[1.25rem] bg-white px-5 py-4 shadow-[0_8px_26px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="ITVision Academy" width={132} height={34} priority />
            </div>
            <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#4a5563] lg:flex">
              <a href="#courses">Course Program</a>
              <a href="#courses">Best Learning</a>
              <a href="#community">Community</a>
              <a href="#about">About Us</a>
            </nav>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs font-semibold text-[#667180] sm:inline">
                24/7
              </span>
              <a
                href="#courses"
                className="rounded-xl bg-[#10263a] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,38,58,0.16)]"
              >
                Get started
              </a>
            </div>
          </div>
        </header>

        <section className="mt-4 overflow-hidden rounded-[1.55rem] bg-[linear-gradient(135deg,#2ca9df_0%,#2387cf_48%,#203b77_100%)] px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div>
              <SectionEyebrow>Enhance Your Career</SectionEyebrow>
              <h1 className="mt-5 max-w-[560px] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-[3.9rem]">
                Access the world&apos;s best learning course with ITVision
              </h1>
              <p className="mt-5 max-w-[460px] text-sm leading-7 text-white/80 sm:text-[15px]">
                Discover a world of knowledge with our curated online courses.
                Empower yourself to learn in your own time, from anywhere, with
                practical lessons and personal guidance.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#courses"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#12354a]"
                >
                  <CirclePlay className="mr-2 h-4 w-4" />
                  Watch video
                </a>
                <a
                  href="#download"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[#113145] px-5 text-sm font-semibold text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download now
                </a>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[470px] items-center justify-center lg:justify-end">
              <div className="absolute left-0 top-20 hidden h-44 w-44 rounded-full bg-white/10 blur-3xl sm:block" />
              <div className="absolute right-8 top-0 hidden h-56 w-56 rounded-full bg-[#79d3f7]/20 blur-3xl sm:block" />
              <div className="absolute right-[12%] top-4 rotate-6 text-2xl font-black uppercase tracking-[0.24em] text-white/70">
                Wow!
              </div>

              <div className="relative flex items-center">
                <div className="absolute -left-10 top-28 z-20 hidden w-[210px] rotate-[-10deg] rounded-[1.35rem] bg-white p-4 text-[#202d3b] shadow-[0_24px_50px_rgba(20,32,44,0.18)] sm:block">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-xl bg-[#2d86ff] p-2 text-white">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#9aa5af]">
                      GRAPHICS DESIGN
                    </span>
                  </div>
                  <p className="text-lg font-semibold leading-6">
                    How to make modern poster for a campaign
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#7f8b97]">
                    <span>Sessions 7 / 15</span>
                    <span className="font-bold text-[#2ca9df]">82%</span>
                  </div>
                </div>

                <PhoneMockup />

                <div className="absolute -right-7 bottom-16 hidden w-[170px] rounded-[1.2rem] bg-white p-4 text-[#202d3b] shadow-[0_18px_40px_rgba(20,32,44,0.16)] sm:block">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5af]">
                    <GraduationCap className="h-4 w-4 text-[#2ca9df]" />
                    Quick Track
                  </div>
                  <p className="text-sm font-semibold leading-5">
                    Bite-size tasks and mentor checkpoints every week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-2 py-7 sm:px-5">
          <div className="grid gap-4 border-b border-[#edf0ee] pb-6 text-center sm:grid-cols-4 sm:text-left">
            <div className="text-xs text-[#96a0aa]">
              More than 60+ companies trusted us
            </div>
            {partners.map((partner) => (
              <div
                key={partner}
                className="text-lg font-semibold tracking-tight text-[#afb6bb]"
              >
                {partner}
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="px-2 py-10 sm:px-5 sm:py-14">
          <div className="text-center">
            <SectionEyebrow>Why Choose Us</SectionEyebrow>
            <h2 className="mx-auto mt-5 max-w-[620px] text-3xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-[2.6rem]">
              Dive into online courses on diverse subjects
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {features.map(({ icon: Icon, title, description, tint }) => (
              <article
                key={title}
                className="rounded-[1.35rem] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tint}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#192231]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#74808b]">
                      {description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-2 py-6 sm:px-5 sm:py-10">
          <div className="overflow-hidden rounded-[1.55rem] bg-[#1c2c40] px-6 py-7 text-white sm:px-8 sm:py-9 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="relative min-h-[320px]">
                <div className="absolute left-0 top-16 rotate-[-16deg]">
                  <PhoneMockup compact />
                </div>
                <div className="absolute left-[100px] top-7 rotate-[-4deg]">
                  <PhoneMockup compact />
                </div>
                <div className="absolute left-[210px] top-16 rotate-[9deg]">
                  <PhoneMockup compact />
                </div>
                <div className="absolute bottom-0 left-10 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
                  1.2M User Downloaded
                </div>
              </div>

              <div>
                <SectionEyebrow>Enhance Your Career</SectionEyebrow>
                <h2 className="mt-5 max-w-[520px] text-3xl font-extrabold tracking-[-0.04em] sm:text-[2.7rem]">
                  Boost your skillset with our online learning app
                </h2>
                <p className="mt-5 max-w-[560px] text-sm leading-7 text-white/72">
                  There are many course categories to help learners move forward
                  with confidence. Explore modern skills, practical lessons, and
                  supportive mentors in one focused experience.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {skillTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-xl border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/82"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="px-2 py-10 sm:px-5 sm:py-14">
          <div className="text-center">
            <SectionEyebrow>Our Best Courses</SectionEyebrow>
            <h2 className="mx-auto mt-5 max-w-[660px] text-3xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-[2.6rem]">
              Discover a most popular Online Course
            </h2>
          </div>

          <div className="mx-auto mt-7 flex max-w-[500px] items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_14px_36px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#eef1ef] bg-[#fbfcfb] px-4 py-3">
              <Search className="h-4 w-4 text-[#9aa5af]" />
              <input
                type="text"
                defaultValue=""
                placeholder="Search course..."
                className="w-full border-0 bg-transparent text-sm text-[#1f2937] outline-none placeholder:text-[#a4adb5]"
              />
            </div>
            <button className="rounded-xl bg-[#152a3c] px-5 py-3 text-sm font-semibold text-white">
              Search
            </button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </section>

        <section id="community" className="px-2 py-6 sm:px-5 sm:py-10">
          <div className="grid gap-8 rounded-[1.45rem] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
            <div className="flex flex-col justify-center">
              <SectionEyebrow>Learn Smarter, Not Harder</SectionEyebrow>
              <h2 className="mt-5 max-w-[500px] text-3xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-[2.6rem]">
                Enjoyable Learning Experiences Await You
              </h2>
              <p className="mt-5 max-w-[460px] text-sm leading-7 text-[#74808b]">
                Your study journey and next career move can happen together. Our
                learning paths are built to feel approachable, clear, and
                motivating from the first lesson.
              </p>
              <div className="mt-8 flex flex-wrap gap-10">
                <div>
                  <div className="text-4xl font-extrabold text-[#16202e]">
                    10,000
                  </div>
                  <div className="mt-2 text-sm text-[#7d8793]">Daily Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-[#16202e]">
                    60%
                  </div>
                  <div className="mt-2 text-sm text-[#7d8793]">
                    Course Enrollment Rate
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[1.45rem] bg-[linear-gradient(145deg,#eef8f3_0%,#edf0d6_100%)]">
              <div className="absolute inset-x-8 bottom-7 top-7 rounded-[1.35rem] bg-[linear-gradient(150deg,#8ab99a_0%,#335e48_100%)]" />
              <div className="absolute left-12 top-10 h-56 w-40 rounded-[1.5rem] bg-[linear-gradient(180deg,#2f3d4c_0%,#17202b_100%)] shadow-[0_18px_45px_rgba(15,23,42,0.3)]" />
              <div className="absolute left-24 top-12 h-56 w-44 rounded-[1.6rem] bg-[linear-gradient(180deg,#607d67_0%,#1e3527_100%)] shadow-[0_18px_45px_rgba(15,23,42,0.24)]" />
              <div className="absolute right-10 top-10 max-w-[160px] rotate-[8deg] text-3xl font-black uppercase tracking-[0.2em] text-white/90">
                Wow!
              </div>
              <div className="absolute bottom-6 right-8 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#1f2937] shadow-[0_16px_40px_rgba(15,23,42,0.14)]">
                <Star className="h-4 w-4 fill-[#f4b740] text-[#f4b740]" />
                4.9 900k Reviews
              </div>
            </div>
          </div>
        </section>

        <section className="px-2 py-10 sm:px-5 sm:py-14">
          <div className="mx-auto max-w-[860px] text-center">
            <SectionEyebrow>Frequently Asked Questions</SectionEyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-[2.6rem]">
              Got Questions? We&apos;ve Got Answers!
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-[860px] space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-[1.1rem] bg-white px-5 py-1 shadow-[0_12px_30px_rgba(15,23,42,0.04)] ring-1 ring-black/5"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-[#1f2937] marker:hidden">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#7f8b97] transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-sm leading-7 text-[#74808b]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <a
              href="#courses"
              className="rounded-xl border border-[#d7dde2] bg-white px-5 py-3 text-sm font-medium text-[#334155]"
            >
              See more FAQs
            </a>
            <a
              href="#footer"
              className="rounded-xl bg-[#13283b] px-5 py-3 text-sm font-medium text-white"
            >
              Contact Us
            </a>
          </div>
        </section>

        <section id="download" className="px-2 pb-3 pt-6 sm:px-5">
          <div className="relative overflow-hidden rounded-[1.55rem] bg-[linear-gradient(135deg,#2ca9df_0%,#2492d7_45%,#203b77_100%)] px-7 py-8 text-white sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <h2 className="max-w-[470px] text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-[2.8rem]">
                  Let&apos;s find your perfect online course today!
                </h2>
                <p className="mt-4 max-w-[420px] text-sm leading-7 text-white/80">
                  Empower yourself with expert-led learning, anywhere and on any
                  device.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#courses"
                    className="inline-flex items-center gap-3 rounded-xl bg-[#112a3d] px-4 py-3 text-sm font-semibold text-white"
                  >
                    <Apple className="h-5 w-5" />
                    App Store
                  </a>
                  <a
                    href="#courses"
                    className="inline-flex items-center gap-3 rounded-xl bg-[#112a3d] px-4 py-3 text-sm font-semibold text-white"
                  >
                    <MoveUpRight className="h-5 w-5" />
                    Google Play
                  </a>
                </div>
              </div>

              <div className="relative flex min-h-[240px] items-center justify-center lg:justify-end">
                <div className="absolute inset-x-10 top-6 h-28 rounded-full bg-white/10 blur-3xl" />
                <div className="rotate-[18deg]">
                  <PhoneMockup compact />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer
          id="footer"
          className="mt-4 rounded-[1.35rem] bg-[#18283a] px-6 py-8 text-white sm:px-8 sm:py-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr_0.8fr_1fr]">
            <div>
              <Image
                src="/logo.png"
                alt="ITVision Academy"
                width={144}
                height={38}
                className="brightness-0 invert"
              />
              <p className="mt-4 max-w-[280px] text-sm leading-7 text-white/55">
                Learn modern skills in analytics, cloud, security, and design
                with practical, career-focused learning.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">ITVision Business</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                <li>Teach on ITVision</li>
                <li>Get the app</li>
                <li>About us</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Service</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                <li>Course</li>
                <li>Challenge</li>
                <li>Job Path</li>
                <li>Webinar</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Contact Us</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                <li>(+91) 555-210</li>
                <li>hello@itvisionacademy.com</li>
                <li>Kolkata, India</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/45">Copyright © 2026 ITVision</p>
            <div className="flex items-center gap-3 text-white/60">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
              >
                <Clock3 className="h-4 w-4" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
