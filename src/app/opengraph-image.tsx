import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.shortName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#faf8f5", fontFamily: "Georgia, serif" }}>
        <div style={{ width: 14, height: "100%", background: "#65318b" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#65318b", fontFamily: "Arial" }}>
            Central Florida · Since {site.since}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, lineHeight: 1.08, color: "#172b48" }}>Care that comes</div>
            <div style={{ fontSize: 76, lineHeight: 1.08, color: "#65318b" }}>from the heart.</div>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#435167", fontFamily: "Arial" }}>
            {site.name} · {site.phone.display}
          </div>
        </div>
        <div style={{ width: 380, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0eaf5" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={300} height={235} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
