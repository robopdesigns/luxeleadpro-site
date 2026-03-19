import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#050505",
          color: "#f5f5f5",
          padding: "64px",
          border: "2px solid rgba(250, 204, 21, 0.4)",
        }}
      >
        <div style={{ fontSize: 28, color: "#facc15", marginBottom: 16 }}>
          Luxe Lead AI Pro
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          AI Lead Management for Luxury Real Estate Agents
        </div>
        <div style={{ fontSize: 28, marginTop: 24, opacity: 0.9 }}>
          Close more high-end deals with automated nurture and follow-up.
        </div>
      </div>
    ),
    size
  );
}


