import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ITVision Academy is on a mission to get 100,000 people job-ready in 10 years. Practical, mentor-led tech training based in Frisco, Texas.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ITVision Academy",
    description:
      "Our mission: get 100,000 people job-ready in 10 years through inclusive, hands-on tech education.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
