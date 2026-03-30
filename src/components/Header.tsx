"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-[#4a5563] transition-colors hover:bg-[#f4f7fa]"
        aria-label="Menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 top-full z-50 border-t border-[#edf0ee] bg-white px-5 py-3 shadow-lg sm:px-6"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-[#2ca9df]"
                  : "text-[#4a5563] active:text-[#2ca9df]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </motion.nav>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/90 px-4 py-3 shadow-[0_8px_26px_rgba(15,23,42,0.04)] backdrop-blur-lg sm:px-5 sm:py-4"
    >
      <div className="relative mx-auto flex max-w-[1240px] items-center justify-between gap-3 sm:gap-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="ITVision Academy"
            width={160}
            height={42}
            priority
            style={{ width: "auto", height: "auto" }}
            className="max-h-[36px] w-auto sm:max-h-[42px]"
          />
        </Link>
        <nav className="hidden items-center gap-6 text-[13px] font-medium text-[#4a5563] lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative py-1 transition-colors hover:text-[#2ca9df] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2ca9df] after:transition-all hover:after:w-full ${
                pathname === l.href
                  ? "text-[#2ca9df] after:w-full"
                  : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/courses"
              className="hidden rounded-xl bg-[#10263a] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,38,58,0.16)] transition-shadow hover:shadow-[0_16px_40px_rgba(16,38,58,0.24)] sm:inline-block"
            >
              Get started
            </Link>
          </motion.div>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
