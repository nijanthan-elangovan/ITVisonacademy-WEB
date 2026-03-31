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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#e7ecea] text-[#1c2635]">
      <Header />

      {/* ── Hero ── */}
      <motion.section initial="hidden" animate="visible" variants={stagger}
        className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2ca9df_0%,#2387cf_48%,#203b77_100%)] px-5 py-10 text-white sm:rounded-[1.5rem] sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="text-center lg:text-left">
            <motion.div variants={fadeUp}><SectionEyebrow>Contact Us</SectionEyebrow></motion.div>
            <motion.h1 variants={fadeUp} className="mx-auto mt-4 max-w-[600px] text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:mt-5 sm:text-4xl md:text-5xl lg:mx-0 lg:text-[3.5rem]">
              Talk to our admissions team
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-[500px] text-sm leading-7 text-white/80 sm:mt-5 sm:text-base lg:mx-0">
              Have questions about class schedules, pricing, or enrollment? We&apos;re here to help.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="relative h-64 overflow-hidden rounded-[1.8rem] border border-white/15 bg-white/10 shadow-[0_24px_70px_rgba(9,20,32,0.2)]">
            <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="ITVision Academy office contact illustration" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,38,58,0.1)_0%,rgba(16,38,58,0.68)_100%)]" />
          </motion.div>
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
            <a href="tel:12147272154" className="mt-1 block text-sm text-[#2ca9df] hover:underline sm:mt-2">(214) 727-2154</a>
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

      {/* ── Full-Width Form ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="px-5 py-8 sm:px-10 sm:py-14 lg:px-12">
        <motion.div variants={scaleIn} className="mx-auto max-w-[1240px] rounded-2xl bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ring-1 ring-black/5 transition duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] sm:p-8">
          <h2 className="text-xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-2xl">Send us a message</h2>
          <p className="mt-2 text-sm text-[#74808b]">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
          <LeadForm source="contact" showSubject className="mt-5 sm:mt-6" />
        </motion.div>
      </motion.section>

      {/* ── Office Address ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <motion.div variants={fadeUp}><SectionEyebrow>Our Office</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-3 text-xl font-extrabold tracking-[-0.04em] text-[#111827] sm:text-2xl">Visit us</motion.h2>
          <motion.div variants={fadeUp}
            className="mt-4 rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] ring-1 ring-black/5 sm:p-5">
            <h3 className="text-sm font-bold text-[#192231]">Frisco, Texas (HQ)</h3>
            <div className="mt-2 flex items-start gap-2 text-xs text-[#74808b]">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2ca9df]" />9300 John Hickman Parkway, #1104, Frisco, TX
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-[#74808b]">
              <Phone className="h-3.5 w-3.5 shrink-0 text-[#2ca9df]" />
              <a href="tel:12147272154" className="hover:text-[#2ca9df]">(214) 727-2154</a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Google Map ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
        <motion.div variants={scaleIn} className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl shadow-[0_14px_40px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
          <iframe
            title="ITVision Academy — Frisco, TX"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3343.8!2d-96.8204!3d33.1007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3c6b1a1a1a1%3A0x0!2s9300+John+Hickman+Pkwy%2C+Frisco%2C+TX!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="sm:h-[400px]"
          />
        </motion.div>
      </motion.section>

      <Footer />
    </main>
  );
}
