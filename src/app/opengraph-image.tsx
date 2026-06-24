import { ImageResponse } from "next/og";

// OG image générée dynamiquement en PNG — compatible LinkedIn, Facebook,
// WhatsApp, X (qui ne savent PAS afficher les .svg). Sert pour tout le site
// sauf si une route définit sa propre opengraph-image.
export const runtime = "edge";
export const alt = "PrismaWeb — Création de site internet à Strasbourg";
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
          background: "linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow accent */}
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,107,44,0.35) 0%, rgba(255,107,44,0) 70%)",
          }}
        />

        {/* Top — brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#0A0A0A",
              border: "2px solid #FF6B2C",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 48 48">
              <path
                d="M 24 9.5 L 36.5 35 L 11.5 35 Z"
                fill="#FFFFFF"
                fillOpacity="0.07"
                stroke="#FFFFFF"
                strokeWidth="3.4"
                strokeLinejoin="round"
              />
              <path d="M 4 26 L 11.5 26" stroke="#FF6B2C" strokeWidth="3.4" strokeLinecap="round" />
              <path d="M 33.8 19.65 L 43.5 13.5" stroke="#FF6B2C" strokeWidth="3.4" strokeLinecap="round" />
              <path d="M 34.5 22 L 44 22" stroke="#FF6B2C" strokeOpacity="0.6" strokeWidth="3.4" strokeLinecap="round" />
              <path d="M 33.8 24.35 L 43.5 30.5" stroke="#FF6B2C" strokeOpacity="0.32" strokeWidth="3.4" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 700, color: "#FFFFFF" }}>
            Prisma<span style={{ color: "#FF6B2C" }}>Web</span>
          </div>
        </div>

        {/* Middle — headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Création de sites
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            <span>web à&nbsp;</span>
            <span style={{ color: "#FF6B2C" }}>Strasbourg</span>
            <span>.</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "rgba(255,255,255,0.7)" }}>
            Pour les artisans, commerçants et PME d&apos;Alsace.
          </div>
        </div>

        {/* Bottom — url */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 110, height: 4, borderRadius: 2, background: "#FF6B2C" }} />
          <div style={{ fontSize: 24, fontWeight: 600, color: "#FF6B2C" }}>prismaweb.fr</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
