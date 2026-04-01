import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── run once at module load ── */
const schemaReady = pool
  .query(`
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
  `)
  .then(() => pool.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS "current_role" VARCHAR(255)`))
  .then(() => pool.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS "target_role" VARCHAR(255)`))
  .then(() => pool.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS linkedin_url TEXT`))
  .catch((err) => console.error("Schema init error:", err));

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
  if (!process.env.RESEND_API_KEY) {
    console.warn("Resend API key not configured — skipping email notification");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddr = process.env.RESEND_FROM_EMAIL || "ITVision Academy <admin@itvisionacademy.com>";

  await resend.emails.send({
    from: fromAddr,
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

async function sendLeadEmails(lead: LeadPayload) {
  const adminEmail = buildAdminEmail(lead);

  await sendMail({
    to: "ad@itvisionacademy.com",
    subject: adminEmail.subject,
    html: adminEmail.html,
    replyTo: lead.email,
  });
}

export async function POST(req: NextRequest) {
  try {
    await schemaReady;

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
        "current_role",
        "target_role",
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
