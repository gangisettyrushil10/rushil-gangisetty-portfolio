import { ImageResponse } from "next/og";

import { siteTagline } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(140deg, rgb(247,243,234) 0%, rgb(230,213,190) 45%, rgb(31,27,23) 100%)",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            color: "rgb(95,80,62)",
          }}
        >
          <span>Rushil Gangisetty</span>
          <span>Portfolio</span>
        </div>

        <div
          style={{
            maxWidth: "920px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.08em",
              color: "rgb(28,24,20)",
            }}
          >
            Engineer the product, not just the demo.
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgb(80,69,54)",
            }}
          >
            {siteTagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
