import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── ensure table exists ── */
const ensureTable = pool.query(`
  CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    course VARCHAR(255),
    subject VARCHAR(255),
    message TEXT,
    source VARCHAR(50) DEFAULT 'website',
    created_at TIMESTAMPTZ DEFAULT NOW()
  )
`);

/* ── email transporter (Gmail SMTP) ── */
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendLeadEmail(lead: {
  name: string;
  email: string;
  phone?: string;
  course?: string;
  subject?: string;
  message?: string;
  source: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP not configured — skipping email notification");
    return;
  }

  const transporter = getTransporter();

  const courseLabel = lead.course || "General Inquiry";
  const subjectLine =
    lead.source === "course"
      ? `New Course Inquiry: ${courseLabel} — ${lead.name}`
      : `New Contact Form: ${lead.subject || "General"} — ${lead.name}`;

  await transporter.sendMail({
    from: `"ITVision Academy Website" <${process.env.SMTP_USER}>`,
    to: "ad@itvisionacademy.com",
    replyTo: lead.email,
    subject: subjectLine,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2ca9df, #203b77); padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">New Lead from ITVision Academy</h2>
        </div>
        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${lead.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            ${lead.phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>` : ""}
            ${lead.course ? `<tr><td style="padding: 8px 0; color: #6b7280;">Course</td><td style="padding: 8px 0; font-weight: 600; color: #2ca9df;">${lead.course}</td></tr>` : ""}
            ${lead.subject ? `<tr><td style="padding: 8px 0; color: #6b7280;">Subject</td><td style="padding: 8px 0;">${lead.subject}</td></tr>` : ""}
          </table>
          ${lead.message ? `<div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;"><p style="color: #6b7280; margin: 0 0 8px; font-size: 13px;">Message</p><p style="margin: 0; color: #1f2937;">${lead.message}</p></div>` : ""}
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Source: ${lead.source} &middot; ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}</p>
        </div>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    await ensureTable;

    const body = await req.json();
    const { name, email, phone, course, subject, message, source } = body;

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    /* save to DB */
    await pool.query(
      `INSERT INTO leads (name, email, phone, course, subject, message, source)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        name,
        email,
        phone || null,
        course || null,
        subject || null,
        message || null,
        source || "website",
      ]
    );

    /* send email notification (non-blocking) */
    sendLeadEmail({
      name,
      email,
      phone,
      course,
      subject,
      message,
      source: source || "website",
    }).catch((err) => console.error("Lead email failed:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
