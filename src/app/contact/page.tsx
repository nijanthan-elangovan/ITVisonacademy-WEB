"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import LeadForm from "@/components/LeadForm";
import { fadeUp, stagger, scaleIn } from "@/components/animations";

const offices = [
  { city: "Plano, Texas (HQ)", address: "3737 Mapleshade Ln, Plano, TX 75075, USA", phone: "737-332-2742" },
  { city: "Cary, North Carolina", address: "15000 Weston Parkway, Cary, NC 27513", phone: "(984) 326-8110" },
  { city: "Houston, Texas", address: "950 Echo Lane, Suite 200-17, Houston, TX 77024", phone: "(737) 332-2742" },
  { city: "Hyderabad, India", address: "133, Kavuri Hills Rd, CBI Colony, Madhapur, Hyderabad, Telangana 500033", phone: "" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
      <Header />

      {/* ── Hero ── */}
      <motion.section initial="hidden" animate="visible" variants={stagger}
        className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2387cf_48%,#203b77_100%)] px-5 py-10 text-white sm:rounded-[1.5rem] sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1240px] text-center">
          <motion.div variants={fadeUp}><SectionEyebrow>Contact Us</SectionEyebrow></motion.div>
          <motion.h1 variants={fadeUp} className="mx-auto mt-4 max-w-[600px] text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:mt-5 sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            Talk to our admissions team
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-[500px] text-sm leading-7 text-white/80 sm:mt-5 sm:text-base">
            Have questions about class schedules, pricing, or enrollment? We&apos;re here to help.
          </motion.p>
        </div>
      </motion.section>

      {/* ── Contact Info Cards ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] gap-3 sm:grid-cols-3 sm:gap-5">
          <motion.div variants={fadeUp} className="rounded-2xl bg-white p-5 text-center shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 sm:p-6">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf7fd] text-[#2ca9df] sm:h-12 sm:w-12">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-[#192231] sm:mt-4">Email</h3>
            <a href="mailto:info@itvisionacademy.com" className="mt-1 block text-sm text-[#2ca9df] hover:underline sm:mt-2">info@itvisionacademy.com</a>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl bg-white p-5 text-center shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 sm:p-6">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf7fd] text-[#2ca9df] sm:h-12 sm:w-12">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-[#192231] sm:mt-4">Phone</h3>
            <a href="tel:7373322742" className="mt-1 block text-sm text-[#2ca9df] hover:underline sm:mt-2">737-332-2742</a>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl bg-white p-5 text-center shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 sm:p-6">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf7fd] text-[#2ca9df] sm:h-12 sm:w-12">
              <ExternalLink className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-[#192231] sm:mt-4">LinkedIn</h3>
            <a href="https://www.linkedin.com/company/itvisionacademy/" target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm text-[#2ca9df] hover:underline sm:mt-2">@itvisionacademy</a>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Form + Offices ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* Form */}
          <motion.div variants={scaleIn} className="rounded-2xl bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 sm:p-8">
            <h2 className="text-xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-2xl">Send us a message</h2>
            <p className="mt-2 text-sm text-[#74808b]">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
            <LeadForm source="contact" showSubject className="mt-5 sm:mt-6" />
          </motion.div>

          {/* Office Locations */}
          <div className="space-y-3 sm:space-y-4">
            <motion.div variants={fadeUp}><SectionEyebrow>Our Offices</SectionEyebrow></motion.div>
            <motion.h2 variants={fadeUp} className="text-xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-2xl">Visit us</motion.h2>
            {offices.map((office, i) => (
              <motion.div key={office.city} variants={fadeUp} custom={i}
                className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] ring-1 ring-black/5 sm:p-5">
                <h3 className="text-sm font-bold text-[#192231]">{office.city}</h3>
                <div className="mt-2 flex items-start gap-2 text-xs text-[#74808b]">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2ca9df]" />{office.address}
                </div>
                {office.phone && (
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-[#74808b]">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-[#2ca9df]" />
                    <a href={`tel:${office.phone.replace(/[^0-9]/g, "")}`} className="hover:text-[#2ca9df]">{office.phone}</a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Map / People image ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 pb-3 pt-2 sm:px-10 lg:px-12">
        <motion.div variants={scaleIn} className="relative mx-auto h-[200px] max-w-[1240px] overflow-hidden rounded-2xl sm:h-[300px]">
          <Image
            src="/images/contact-office.svg"
            alt="Modern office space"
            fill className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18283a]/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white sm:bottom-6 sm:left-8">
            <p className="text-lg font-bold sm:text-xl">HQ — Plano, Texas</p>
            <p className="text-xs text-white/70 sm:text-sm">3737 Mapleshade Ln, Plano, TX 75075</p>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </main>
  );
}
