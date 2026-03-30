import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ITVision Academy. Call (214) 727-2154, email info@itvisionacademy.com, or visit us at 9300 John Hickman Parkway, #1104, Frisco, TX.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ITVision Academy",
    description:
      "Call (214) 727-2154 or email info@itvisionacademy.com. Visit us in Frisco, TX.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
