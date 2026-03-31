"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type LaunchpadFormState = {
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  targetRole: string;
  linkedinUrl: string;
  goals: string;
};

const initialState: LaunchpadFormState = {
  name: "",
  email: "",
  phone: "",
  currentRole: "",
  targetRole: "",
  linkedinUrl: "",
  goals: "",
};

export default function LaunchpadSignupForm() {
  const [form, setForm] = useState<LaunchpadFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const updateField =
    (field: keyof LaunchpadFormState) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          course: "Launchpad",
          subject: "Launchpad signup",
          message: form.goals,
          source: "launchpad",
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to submit your signup.");
      }

      setStatus("sent");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit your signup."
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-[2rem] border border-[#d9e5ef] bg-white p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CheckCircle2 className="mx-auto h-14 w-14 text-[#2ca9df]" />
        <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.03em] text-[#10263a]">
          You&apos;re on the list
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#5c6874]">
          Your Launchpad signup has been saved. A confirmation email is being
          sent to you, and the admissions team has been notified at{" "}
          <span className="font-semibold text-[#10263a]">
            ad@itvisionacademy.com
          </span>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-[#2ca9df] hover:underline"
        >
          Submit another signup
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6b77]">
            Full Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={updateField("name")}
            placeholder="Your name"
            className="w-full rounded-2xl border border-[#dce5ec] bg-[#f8fbfd] px-4 py-3.5 text-sm text-[#10263a] outline-none transition focus:border-[#2ca9df] focus:ring-2 focus:ring-[#2ca9df]/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6b77]">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={updateField("email")}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-[#dce5ec] bg-[#f8fbfd] px-4 py-3.5 text-sm text-[#10263a] outline-none transition focus:border-[#2ca9df] focus:ring-2 focus:ring-[#2ca9df]/20"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6b77]">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={updateField("phone")}
            placeholder="(123) 456-7890"
            className="w-full rounded-2xl border border-[#dce5ec] bg-[#f8fbfd] px-4 py-3.5 text-sm text-[#10263a] outline-none transition focus:border-[#2ca9df] focus:ring-2 focus:ring-[#2ca9df]/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6b77]">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={form.linkedinUrl}
            onChange={updateField("linkedinUrl")}
            placeholder="https://linkedin.com/in/your-profile"
            className="w-full rounded-2xl border border-[#dce5ec] bg-[#f8fbfd] px-4 py-3.5 text-sm text-[#10263a] outline-none transition focus:border-[#2ca9df] focus:ring-2 focus:ring-[#2ca9df]/20"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6b77]">
            Current Role
          </label>
          <input
            type="text"
            required
            value={form.currentRole}
            onChange={updateField("currentRole")}
            placeholder="Program Manager, TPM, Tech Manager..."
            className="w-full rounded-2xl border border-[#dce5ec] bg-[#f8fbfd] px-4 py-3.5 text-sm text-[#10263a] outline-none transition focus:border-[#2ca9df] focus:ring-2 focus:ring-[#2ca9df]/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6b77]">
            Target Role
          </label>
          <input
            type="text"
            required
            value={form.targetRole}
            onChange={updateField("targetRole")}
            placeholder="What role are you aiming for next?"
            className="w-full rounded-2xl border border-[#dce5ec] bg-[#f8fbfd] px-4 py-3.5 text-sm text-[#10263a] outline-none transition focus:border-[#2ca9df] focus:ring-2 focus:ring-[#2ca9df]/20"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6b77]">
          What do you want help with?
        </label>
        <textarea
          rows={5}
          required
          value={form.goals}
          onChange={updateField("goals")}
          placeholder="Share the kind of positioning, interview prep, AI readiness, or mentorship support you want from Launchpad."
          className="w-full resize-none rounded-2xl border border-[#dce5ec] bg-[#f8fbfd] px-4 py-3.5 text-sm leading-6 text-[#10263a] outline-none transition focus:border-[#2ca9df] focus:ring-2 focus:ring-[#2ca9df]/20"
        />
      </div>

      {status === "error" && (
        <p className="rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm text-[#b91c1c]">
          {errorMessage}
        </p>
      )}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10263a] px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(16,38,58,0.2)] transition hover:bg-[#173650] disabled:cursor-not-allowed disabled:opacity-75"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving your spot...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Join Launchpad
          </>
        )}
      </motion.button>
    </form>
  );
}
