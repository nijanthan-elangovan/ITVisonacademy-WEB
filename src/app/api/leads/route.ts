import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function ensureLeadSchema() {
  await pool.query(`
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

  await pool.query(`
    ALTER TABLE leads ADD COLUMN IF NOT EXISTS current_role VARCHAR(255);
    ALTER TABLE leads ADD COLUMN IF NOT EXISTS target_role VARCHAR(255);
    ALTER TABLE leads ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
  `);
}

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  course?: string;
  subject?: string;
  message?: string;
  source: string;
  currentRole?: string;
  targetRole?: string;
  linkedinUrl?: string;
};

/* ── Amazon SES SMTP transport ── */
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SES_SMTP_HOST || "email-smtp.eu-north-1.amazonaws.com",
    port: Number(process.env.SES_SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SES_SMTP_USER!,
      pass: process.env.SES_SMTP_PASS!,
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatRow(label: string, value?: string, isLink = false) {
  if (!value) return "";

  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e8ecf1;">
        <span style="display:inline-block;width:120px;color:#6b7280;font-size:13px;font-weight:500;vertical-align:top;">${escapeHtml(label)}</span>
        ${
          isLink
            ? `<a href="${escapeHtml(value)}" style="color:#2ca9df;font-size:15px;font-weight:500;text-decoration:none;">${escapeHtml(value)}</a>`
            : `<span style="color:#111827;font-size:15px;">${escapeHtml(value)}</span>`
        }
      </td>
    </tr>`;
}

async function sendMail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!process.env.SES_SMTP_USER) {
    console.warn("SES credentials not configured — skipping email notification");
    return;
  }

  const fromAddr = process.env.SES_FROM_EMAIL || "admin@itvisionacademy.com";
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"ITVision Academy" <${fromAddr}>`,
    to,
    replyTo: replyTo || undefined,
    subject,
    html,
  });
}

function buildAdminEmail(lead: LeadPayload) {
  const courseLabel = lead.course || "General Inquiry";
  const subject =
    lead.source === "launchpad"
      ? `New Launchpad Signup: ${lead.name}`
      : lead.source === "course"
        ? `New Course Inquiry: ${courseLabel} - ${lead.name}`
        : `New Contact Form: ${lead.subject || "General"} - ${lead.name}`;

  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const messageBlock = lead.message
    ? `
      <div style="margin-top:24px;padding:20px;background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;">
        <p style="margin:0 0 8px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Goals / Message</p>
        <p style="margin:0;color:#1f2937;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>
      </div>`
    : "";

  return {
    subject,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#2ca9df 0%,#203b77 100%);padding:32px 40px;text-align:center;">
              <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 8px;">
                ${lead.source === "launchpad" ? "New Launchpad Signup" : lead.source === "course" ? "New Course Inquiry" : "New Contact Form Submission"}
              </h1>
              <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0;">${now} (CST)</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${formatRow("Name", lead.name)}
                ${formatRow("Email", lead.email)}
                ${formatRow("Phone", lead.phone)}
                ${formatRow("Program", lead.course)}
                ${formatRow("Current Role", lead.currentRole)}
                ${formatRow("Target Role", lead.targetRole)}
                ${formatRow("LinkedIn", lead.linkedinUrl, true)}
                ${formatRow("Subject", lead.subject)}
              </table>
              ${messageBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;background:#f9fafb;border-top:1px solid #e8ecf1;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                Source: ${escapeHtml(lead.source)} &bull; ITVision Academy Website
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}

function buildUserConfirmationEmail(lead: LeadPayload) {
  const safeName = escapeHtml(lead.name);
  const safeCurrentRole = lead.currentRole
    ? escapeHtml(lead.currentRole)
    : "your current role";
  const safeTargetRole = lead.targetRole
    ? escapeHtml(lead.targetRole)
    : "your target role";
  const subject =
    lead.source === "launchpad"
      ? "Your Launchpad signup is confirmed"
      : "We received your ITVision Academy inquiry";

  return {
    subject,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#eef4f8;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;background:#eef4f8;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;">
          <tr>
            <td style="padding:32px 40px;background:linear-gradient(135deg,#10263a 0%,#2ca9df 100%);">
              <p style="margin:0;color:#9ddcf6;font-size:12px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;">ITVision Academy</p>
              <h1 style="margin:14px 0 0;color:#ffffff;font-size:28px;line-height:1.1;">${lead.source === "launchpad" ? "Welcome to Launchpad" : "Thanks for reaching out"}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0;color:#10263a;font-size:16px;line-height:1.8;">Hi ${safeName},</p>
              <p style="margin:18px 0 0;color:#475569;font-size:15px;line-height:1.9;">
                ${
                  lead.source === "launchpad"
                    ? `We received your Launchpad signup for the move from ${safeCurrentRole} toward ${safeTargetRole}. Your details have been saved, and our team has also been notified at ad@itvisionacademy.com.`
                    : "We received your submission and our team will review it shortly."
                }
              </p>
              <p style="margin:18px 0 0;color:#475569;font-size:15px;line-height:1.9;">
                Launchpad is built to sharpen your market positioning, strengthen role-specific interviews, improve AI readiness, and connect you with mentorship grounded in real practice.
              </p>
              <div style="margin-top:24px;padding:20px;border:1px solid #dce7ee;border-radius:14px;background:#f8fbfd;">
                <p style="margin:0 0 10px;color:#10263a;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Need to reach us sooner?</p>
                <p style="margin:0;color:#475569;font-size:15px;line-height:1.8;">
                  Phone: (214) 727-2154<br>
                  Email: info@itvisionacademy.com<br>
                  Address: 9300 John Hickman Parkway, #1104, Frisco, TX
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}

async function sendLeadEmails(lead: LeadPayload) {
  const adminEmail = buildAdminEmail(lead);
  const userEmail = buildUserConfirmationEmail(lead);

  await Promise.all([
    sendMail({
      to: "ad@itvisionacademy.com",
      subject: adminEmail.subject,
      html: adminEmail.html,
      replyTo: lead.email,
    }),
    sendMail({
      to: lead.email,
      subject: userEmail.subject,
      html: userEmail.html,
    }),
  ]);
}

export async function POST(req: NextRequest) {
  try {
    await ensureLeadSchema();

    const body = (await req.json()) as Partial<LeadPayload>;
    const {
      name,
      email,
      phone,
      course,
      subject,
      message,
      source,
      currentRole,
      targetRole,
      linkedinUrl,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO leads (
        name,
        email,
        phone,
        course,
        subject,
        message,
        source,
        current_role,
        target_role,
        linkedin_url
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        name,
        email,
        phone || null,
        course || null,
        subject || null,
        message || null,
        source || "website",
        currentRole || null,
        targetRole || null,
        linkedinUrl || null,
      ]
    );

    sendLeadEmails({
      name,
      email,
      phone,
      course,
      subject,
      message,
      source: source || "website",
      currentRole,
      targetRole,
      linkedinUrl,
    }).catch((error) => console.error("Lead email failed:", error));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
