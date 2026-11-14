import { ImageResponse } from "next/og";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  const { personal } = PORTFOLIO_DATA;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#0D1B15",
          color: "#F5F0E6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "9999px",
              backgroundColor: "#C8B48A",
              color: "#12231B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            {personal.initials}
          </div>
          <span
            style={{
              fontSize: "24px",
              color: "#C8B48A",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {personal.role} · {personal.company} · {personal.location}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {personal.name}
          </div>
          <div
            style={{
              fontSize: "30px",
              color: "#C4C9B8",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            {personal.heroSummary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(245, 240, 230, 0.16)",
            paddingTop: "28px",
            fontSize: "22px",
            color: "#7F8C6A",
          }}
        >
          <span>{personal.role} @ {personal.company}</span>
          <span>{personal.siteUrl}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

