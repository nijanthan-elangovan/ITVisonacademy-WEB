import { ImageResponse } from "next/og";

export const alt = "ITVision Academy — Get Job-Ready with World-Class Tech Education";
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
          background: "linear-gradient(135deg, #2ca9df 0%, #2387cf 48%, #203b77 100%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -40,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 50,
              padding: "8px 20px",
              fontSize: 18,
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
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 800,
            }}
          >
            Master In-Demand Tech Skills with World-Class Mentors
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            Live instructor-led courses in SQL, Azure, Cybersecurity, Power BI, Tableau & Full Stack Development
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>
            itvisionacademy.com
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: "10px 24px",
              fontSize: 18,
              fontWeight: 700,
              color: "white",
            }}
          >
            Get Started →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
