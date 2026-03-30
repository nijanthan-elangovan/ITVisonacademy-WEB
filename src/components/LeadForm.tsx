"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

type LeadFormProps = {
  course?: string;
  source: "course" | "contact";
  showSubject?: boolean;
  className?: string;
};

export default function LeadForm({
  course,
  source,
  showSubject = false,
  className = "",
}: LeadFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          course: course || undefined,
          source,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl bg-[#f0fdf4] p-6 text-center sm:p-8 ${className}`}
      >
        <CheckCircle className="mx-auto h-12 w-12 text-[#22c55e]" />
        <h3 className="mt-4 text-lg font-bold text-[#192231]">
          Thank you!
        </h3>
        <p className="mt-2 text-sm text-[#74808b]">
          We&apos;ve received your inquiry and will get back to you within 24
          hours.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            });
          }}
          className="mt-4 text-sm font-semibold text-[#2ca9df] hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#4a5563]">
            Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-[#e5e7eb] bg-[#fbfcfb] px-4 py-3 text-sm text-[#1f2937] outline-none transition-colors focus:border-[#2ca9df] focus:ring-1 focus:ring-[#2ca9df]"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#4a5563]">
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-[#e5e7eb] bg-[#fbfcfb] px-4 py-3 text-sm text-[#1f2937] outline-none transition-colors focus:border-[#2ca9df] focus:ring-1 focus:ring-[#2ca9df]"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#4a5563]">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-xl border border-[#e5e7eb] bg-[#fbfcfb] px-4 py-3 text-sm text-[#1f2937] outline-none transition-colors focus:border-[#2ca9df] focus:ring-1 focus:ring-[#2ca9df]"
            placeholder="(123) 456-7890"
          />
        </div>
        {showSubject && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#4a5563]">
              Subject
            </label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full rounded-xl border border-[#e5e7eb] bg-[#fbfcfb] px-4 py-3 text-sm text-[#1f2937] outline-none transition-colors focus:border-[#2ca9df] focus:ring-1 focus:ring-[#2ca9df]"
              placeholder="How can we help?"
            />
          </div>
        )}
        {course && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#4a5563]">
              Course
            </label>
            <input
              type="text"
              readOnly
              value={course}
              className="w-full rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-3 text-sm text-[#6b7280]"
            />
          </div>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#4a5563]">
          Message
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-xl border border-[#e5e7eb] bg-[#fbfcfb] px-4 py-3 text-sm text-[#1f2937] outline-none transition-colors focus:border-[#2ca9df] focus:ring-1 focus:ring-[#2ca9df]"
          placeholder={
            course
              ? "I'm interested in this course. Please share more details..."
              : "Tell us more about your inquiry..."
          }
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2ca9df] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(44,169,223,0.3)] transition-all hover:shadow-[0_16px_40px_rgba(44,169,223,0.4)] disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />{" "}
            {course ? "Get in Touch" : "Send Message"}
          </>
        )}
      </motion.button>
    </form>
  );
}
