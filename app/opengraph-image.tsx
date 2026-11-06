import { ImageResponse } from "next/og";

export const alt = "collections.dev: artículos y recursos de desarrollo web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: "#0b0b0b",
        color: "#f2f6fc",
      }}
    >
      <div style={{ width: 72, height: 72, background: "#4ade80" }} />
      <div style={{ marginTop: 48, fontSize: 104, fontWeight: 700 }}>
        collections.dev
      </div>
      <div style={{ marginTop: 16, fontSize: 44, color: "#a1a1aa" }}>
        Artículos y recursos de desarrollo web
      </div>
    </div>,
    size,
  );
}
