import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Launchpad",
  description:
    "Launchpad is ITVision Academy's hands-on readiness program for Program Managers, Technical Managers, TPMs, TPGMs, and technical leaders ready for their next move.",
  alternates: {
    canonical: "/launchpad",
  },
};

export default function LaunchpadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
