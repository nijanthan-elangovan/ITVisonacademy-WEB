import { ImageResponse } from "next/og";

export const alt = "Contact ITVision Academy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #2ca9df 0%, #203b77 100%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 50,
              padding: "8px 20px",
              fontSize: 16,
              color: "rgba(255,255,255,0.9)",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            ITVISION ACADEMY
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Talk to Our Admissions Team
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              maxWidth: 500,
            }}
          >
            Questions about class schedules, pricing, or enrollment? We&apos;re here to help.
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 8,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "12px 24px",
                fontSize: 18,
                color: "white",
                fontWeight: 600,
              }}
            >
              (214) 727-2154
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "12px 24px",
                fontSize: 18,
                color: "white",
                fontWeight: 600,
              }}
            >
              info@itvisionacademy.com
            </div>
          </div>
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }}>
          9300 John Hickman Parkway, #1104, Frisco, TX
        </div>
      </div>
    ),
    { ...size },
  );
}
