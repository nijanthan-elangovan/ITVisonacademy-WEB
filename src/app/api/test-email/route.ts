import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Resend API key not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromAddr = process.env.RESEND_FROM_EMAIL || "ITVision Academy <admin@itvisionacademy.com>";
    const toAddr = "nijanthan.work@gmail.com";

    const { error } = await resend.emails.send({
      from: fromAddr,
      to: toAddr,
      subject: "ITVision Academy — Email Service Test",
      html: `
        <h2>Email Service Working!</h2>
        <p>This is a test email sent via Resend from ITVision Academy.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: `Test email sent to ${toAddr}` });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
