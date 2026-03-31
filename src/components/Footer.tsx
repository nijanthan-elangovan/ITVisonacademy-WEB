"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { fadeUp, stagger } from "./animations";

export default function Footer() {
  return (
    <motion.footer
      id="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="mt-4 bg-[#18283a] px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-12"
    >
      <div className="mx-auto grid max-w-[1240px] gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.8fr_1fr]">
        <motion.div variants={fadeUp}>
          <Image
            src="/logo.png"
            alt="ITVision Academy"
            width={170}
            height={44}
            style={{ width: "auto", height: "auto" }}
            className="max-h-[40px] w-auto brightness-0 invert sm:max-h-[44px]"
          />
          <p className="mt-4 max-w-[280px] text-sm leading-7 text-white/55">
            Empowering the next generation of tech professionals with practical,
            mentor-led education since 2023.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/itvisionacademy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="text-sm font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/55">
            {[
              { label: "Home", href: "/" },
              { label: "Launchpad", href: "/launchpad" },
              { label: "About Us", href: "/about" },
              { label: "Courses", href: "/courses" },
              { label: "Contact Us", href: "/contact" },
              { label: "Blog", href: "/blog" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white/80">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="text-sm font-semibold text-white">Courses</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/55">
            {[
              { label: "SQL Fundamentals", href: "/courses/sql-basic" },
              { label: "SQL Advanced", href: "/courses/sql-advanced" },
              { label: "Power BI", href: "/courses/power-bi" },
              { label: "Tableau", href: "/courses/tableau" },
              { label: "Azure Data Factory", href: "/courses/ms-azure" },
              { label: "Cybersecurity", href: "/courses/cybersecurity" },
              { label: "Azure Databricks", href: "/courses/data-bricks" },
              { label: "Full Stack Dev", href: "/courses/full-stack" },
            ].map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="transition-colors hover:text-white/80">{c.label}</Link>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h3 className="text-sm font-semibold text-white">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/55">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href="tel:12147272154" className="hover:text-white/80">(214) 727-2154</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href="mailto:info@itvisionacademy.com" className="hover:text-white/80">info@itvisionacademy.com</a>
            </li>
            <li>9300 John Hickman Parkway, #1104<br />Frisco, TX</li>
          </ul>
        </motion.div>
      </div>
      <div className="mx-auto mt-8 flex max-w-[1240px] flex-col gap-3 border-t border-white/10 pt-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="text-xs text-white/45">
          Copyright &copy; {new Date().getFullYear()} ITVision Academy. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-white/45 sm:justify-start">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </motion.footer>
  );
}
