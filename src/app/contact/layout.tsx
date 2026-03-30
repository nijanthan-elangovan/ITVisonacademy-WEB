import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ITVision Academy. Call 737-332-2742, email info@itvisionacademy.com, or visit our offices in Plano TX, Cary NC, Houston TX, and Hyderabad India.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ITVision Academy",
    description:
      "Call 737-332-2742 or email info@itvisionacademy.com. Offices in Texas, North Carolina & India.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
