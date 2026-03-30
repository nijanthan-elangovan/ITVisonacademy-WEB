import { ImageResponse } from "next/og";

export const alt = "About ITVision Academy";
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
              maxWidth: 700,
            }}
          >
            Helping 100,000 People Become Job-Ready in 10 Years
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.5,
              maxWidth: 550,
            }}
          >
            Practical, mentor-led training designed to help you build confidence, gain certification, and land high-demand tech roles.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span>Frisco, TX</span>
          <span>|</span>
          <span>new.itvisionacademy.com/about</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
