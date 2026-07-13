import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${SITE.name} — Transporte de pasajeros`;
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
          justifyContent: "center",
          padding: "80px",
          background: "#09090B",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.35), transparent 45%), radial-gradient(circle at 85% 75%, rgba(124,58,237,0.35), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "white",
            }}
          >
            LE
          </div>
          <div
            style={{
              color: "white",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            {SITE.name}
          </div>
        </div>
        <div
          style={{
            color: "white",
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          Viajá a los mejores recitales y eventos con total comodidad.
        </div>
        <div
          style={{
            color: "#a1a1aa",
            fontSize: 30,
            marginTop: 28,
          }}
        >
          Transporte de pasajeros · Recitales · Turismo · Aeropuertos
        </div>
      </div>
    ),
    { ...size },
  );
}
