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

/* ── M365 SMTP transporter ── */
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || "admin@itvisionacademy.com",
      pass: process.env.SMTP_PASS,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
  if (!process.env.SMTP_PASS) {
    console.warn("SMTP_PASS not configured — skipping email notification");
    return;
  }

  const transporter = getTransporter();
  const fromAddr = process.env.SMTP_USER || "admin@itvisionacademy.com";

  const courseLabel = lead.course || "General Inquiry";
  const subjectLine =
    lead.source === "course"
      ? `New Course Inquiry: ${courseLabel} — ${lead.name}`
      : `New Contact Form: ${lead.subject || "General"} — ${lead.name}`;

  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const safeName = escapeHtml(lead.name);
  const safeEmail = escapeHtml(lead.email);
  const safePhone = lead.phone ? escapeHtml(lead.phone) : "";
  const safeCourse = lead.course ? escapeHtml(lead.course) : "";
  const safeSubject = lead.subject ? escapeHtml(lead.subject) : "";
  const safeMessage = lead.message ? escapeHtml(lead.message) : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subjectLine)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2ca9df 0%,#203b77 100%);padding:32px 40px;text-align:center;">
              <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 8px;">
                ${lead.source === "course" ? "New Course Inquiry" : "New Contact Form Submission"}
              </h1>
              <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0;">${now} (CST)</p>
            </td>
          </tr>

          <!-- Lead Details -->
          <tr>
            <td style="padding:32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e8ecf1;">
                    <span style="display:inline-block;width:100px;color:#6b7280;font-size:13px;font-weight:500;vertical-align:top;">Name</span>
                    <span style="color:#111827;font-size:15px;font-weight:600;">${safeName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e8ecf1;">
                    <span style="display:inline-block;width:100px;color:#6b7280;font-size:13px;font-weight:500;vertical-align:top;">Email</span>
                    <a href="mailto:${safeEmail}" style="color:#2ca9df;font-size:15px;font-weight:500;text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
                ${safePhone ? `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e8ecf1;">
                    <span style="display:inline-block;width:100px;color:#6b7280;font-size:13px;font-weight:500;vertical-align:top;">Phone</span>
                    <a href="tel:${safePhone}" style="color:#2ca9df;font-size:15px;font-weight:500;text-decoration:none;">${safePhone}</a>
                  </td>
                </tr>` : ""}
                ${safeCourse ? `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e8ecf1;">
                    <span style="display:inline-block;width:100px;color:#6b7280;font-size:13px;font-weight:500;vertical-align:top;">Course</span>
                    <span style="display:inline-block;background:#ecf7fd;color:#2ca9df;font-size:13px;font-weight:700;padding:4px 14px;border-radius:20px;">${safeCourse}</span>
                  </td>
                </tr>` : ""}
                ${safeSubject ? `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e8ecf1;">
                    <span style="display:inline-block;width:100px;color:#6b7280;font-size:13px;font-weight:500;vertical-align:top;">Subject</span>
                    <span style="color:#111827;font-size:15px;">${safeSubject}</span>
                  </td>
                </tr>` : ""}
              </table>

              ${safeMessage ? `
              <div style="margin-top:24px;padding:20px;background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;">
                <p style="margin:0 0 8px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                <p style="margin:0;color:#1f2937;font-size:14px;line-height:1.7;white-space:pre-wrap;">${safeMessage}</p>
              </div>` : ""}

              <!-- Quick Actions -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${safeEmail}?subject=Re: ${escapeHtml(subjectLine)}"
                       style="display:inline-block;background:#2ca9df;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:10px;text-decoration:none;">
                      Reply to ${safeName}
                    </a>
                  </td>
                  ${safePhone ? `
                  <td align="center">
                    <a href="tel:${safePhone}"
                       style="display:inline-block;background:#203b77;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:10px;text-decoration:none;">
                      Call ${safeName}
                    </a>
                  </td>` : ""}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background:#f9fafb;border-top:1px solid #e8ecf1;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                Source: ${lead.source === "course" ? "Course Page Inquiry" : "Contact Form"} &bull; ITVision Academy Website
              </p>
              <p style="margin:4px 0 0;color:#9ca3af;font-size:11px;">
                new.itvisionacademy.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: `"ITVision Academy" <${fromAddr}>`,
    to: "ad@itvisionacademy.com",
    replyTo: lead.email,
    subject: subjectLine,
    html,
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
