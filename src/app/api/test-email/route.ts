import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!process.env.SES_SMTP_USER || !process.env.SES_SMTP_PASS) {
      return NextResponse.json(
        { ok: false, error: "SES credentials not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SES_SMTP_HOST || "email-smtp.eu-north-1.amazonaws.com",
      port: Number(process.env.SES_SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SES_SMTP_USER,
        pass: process.env.SES_SMTP_PASS,
      },
    });

    const fromAddr = process.env.SES_FROM_EMAIL || "admin@itvisionacademy.com";
    const toAddr = "nijanthan.work@gmail.com";

    await transporter.sendMail({
      from: `"ITVision Academy" <${fromAddr}>`,
      to: toAddr,
      subject: "ITVision Academy — Email Service Test",
      html: `
        <h2>Email Service Working!</h2>
        <p>This is a test email sent via Amazon SES from ITVision Academy.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ ok: true, message: `Test email sent to ${toAddr}` });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
