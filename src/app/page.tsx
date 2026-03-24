"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

function CountdownTimer() {
  const launchDate = new Date("2026-03-29T12:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-5">
      {blocks.map((block) => (
        <motion.div
          key={block.label}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="relative group">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#1EAED7] to-[#0D3B66] opacity-30 blur-sm group-hover:opacity-60 transition-opacity" />
            <div className="relative w-16 h-16 sm:w-22 sm:h-22 bg-[#0d1117] border border-[#1EAED7]/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl sm:text-4xl font-bold font-mono text-white tabular-nums">
                {String(block.value).padStart(2, "0")}
              </span>
            </div>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#1EAED7]/60 mt-2">
            {block.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ParticleField() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#1EAED7]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function EmailForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-[#1EAED7]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm">
          You&apos;re on the list! We&apos;ll be in touch.
        </span>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
    >
      <div className="relative flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-3 bg-[#0d1117] border border-[#1EAED7]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1EAED7]/60 focus:ring-1 focus:ring-[#1EAED7]/30 transition-all text-sm"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-[#1EAED7] to-[#0D3B66] rounded-lg text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#1EAED7]/25 transition-shadow cursor-pointer"
      >
        Notify Me
      </motion.button>
    </form>
  );
}

export default function ComingSoon() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#0a0a0f]">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#1EAED7 1px, transparent 1px), linear-gradient(90deg, #1EAED7 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1EAED7]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <ParticleField />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 sm:gap-10 max-w-2xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/logo.png"
            alt="ITVision Academy"
            width={280}
            height={80}
            priority
            className="drop-shadow-[0_0_25px_rgba(30,174,215,0.3)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Something{" "}
            <span className="bg-gradient-to-r from-[#1EAED7] to-[#0D3B66] bg-clip-text text-transparent">
              Extraordinary
            </span>
            <br />
            is Coming
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            We&apos;re building a next-generation learning platform to
            transform how you master technology. Get ready for world-class
            courses, hands-on labs, and expert mentorship.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full flex flex-col items-center gap-3"
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Be the first to know when we launch
          </p>
          <EmailForm />
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mt-2"
        >
          {[
            "Live Workshops",
            "Hands-on Labs",
            "Expert Mentors",
            "Industry Certifications",
          ].map((feature) => (
            <span
              key={feature}
              className="px-4 py-1.5 text-xs rounded-full border border-[#1EAED7]/15 text-gray-400 bg-[#1EAED7]/[0.03]"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-6 text-[11px] text-gray-600">
        &copy; {new Date().getFullYear()} ITVision Academy. All rights
        reserved.
      </div>
    </main>
  );
}
