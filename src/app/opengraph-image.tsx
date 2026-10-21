import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.shortName} — Home Is Where The Heart Is`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #1d0f35 0%, #4b2a7d 55%, #b03567 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#fdcbe0" }}>
          Serving Central Florida since 2017
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.05, fontStyle: "italic" }}>Open Arms</div>
          <div style={{ fontSize: 44, color: "#f48bb5" }}>&amp; Heart Services Inc.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#e1d2f8" }}>
          <span>Home is where the heart is.</span>
          <span>{site.phone.display}</span>
        </div>
      </div>
    ),
    size,
  );
}
