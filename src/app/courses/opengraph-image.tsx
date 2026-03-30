import { ImageResponse } from "next/og";

export const alt = "Tech Courses — ITVision Academy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const courses = ["SQL & Databases", "Power BI", "Tableau", "Azure Data Factory", "Cybersecurity", "Azure Databricks", "Qlik Sense", "Full Stack Dev"];

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
            gap: 16,
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
            Our Courses
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            Live instructor-led, 12-session programs. $499 per course. Get certified and job-ready.
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 12,
            }}
          >
            {courses.map((c) => (
              <div
                key={c}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "8px 18px",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 600,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }}>
          new.itvisionacademy.com/courses
        </div>
      </div>
    ),
    { ...size },
  );
}
