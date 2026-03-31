import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f7fbfe 0%, #e7f4fb 100%)",
        }}
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 11L55 21.5L32 32L9 21.5L32 11Z"
            fill="#2CA9DF"
          />
          <path
            d="M18 27.5V35.5C18 36.7 18.7 37.8 19.8 38.3C23.1 39.9 27.3 41 32 41C36.7 41 40.9 39.9 44.2 38.3C45.3 37.8 46 36.7 46 35.5V27.5L32 34L18 27.5Z"
            fill="#2CA9DF"
            opacity="0.95"
          />
          <path
            d="M49.5 24V37.5"
            stroke="#2CA9DF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="49.5" cy="40.5" r="4.5" fill="#2CA9DF" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
