import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = {
  width: 1200,
  height: 630,
};

type OgLocale = "en" | "ru";

const copy = {
  en: {
    brand: "// FRONTEND SISYPHUS",
    status: "STATUS  AVAILABLE",
    loc: "LOC  MOSCOW",
    utc: "UTC  +3",
    index: "// 00  PORTFOLIO",
    name: "BORIS KARABUT",
    role: "SOFTWARE ENGINEER",
    tagline: "Neural nets, DevOps, tests, security — and UX that holds up.",
    metrics: [
      { value: "30,000+", label: "PEOPLE" },
      { value: "2,768", label: "HOURS SAVED" },
      { value: "0", label: "FAILURES" },
    ],
    panelTag: "// FS",
    panelLineOne: "FRONTEND",
    panelLineTwo: "SISYPHUS",
  },
  ru: {
    brand: "// FRONTEND SISYPHUS",
    status: "STATUS  ДОСТУПЕН",
    loc: "LOC  МОСКВА",
    utc: "UTC  +3",
    index: "// 00  ПОРТФОЛИО",
    name: "БОРИС КАРАБУТ",
    role: "SOFTWARE ENGINEER",
    tagline: "Нейросети, DevOps, тесты, безопасность — и UX, который держится.",
    metrics: [
      { value: "30 000+", label: "ЧЕЛОВЕК" },
      { value: "2 768", label: "ЧАСОВ" },
      { value: "0", label: "ОТКАЗОВ" },
    ],
    panelTag: "// FS",
    panelLineOne: "FRONTEND",
    panelLineTwo: "SISYPHUS",
  },
} as const;

export async function renderOgImage(locale: string) {
  const texts = copy[locale === "en" ? "en" : "ru"] as (typeof copy)[OgLocale];

  const [playBold, playRegular] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Play-Bold.ttf")),
    readFile(join(process.cwd(), "app/fonts/Play-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#050505",
          color: "#f4f4f2",
          fontFamily: "Play",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(244,244,242,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,242,0.07) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            opacity: 0.55,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            width: 28,
            height: 28,
            borderTop: "2px solid #d7ff3f",
            borderLeft: "2px solid #d7ff3f",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            width: 28,
            height: 28,
            borderTop: "2px solid #d7ff3f",
            borderRight: "2px solid #d7ff3f",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 28,
            width: 28,
            height: 28,
            borderBottom: "2px solid #d7ff3f",
            borderLeft: "2px solid #d7ff3f",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            width: 28,
            height: 28,
            borderBottom: "2px solid #d7ff3f",
            borderRight: "2px solid #d7ff3f",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "52px 56px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              letterSpacing: "0.18em",
              fontSize: 16,
              textTransform: "uppercase",
              color: "rgba(244,244,242,0.55)",
            }}
          >
            <div style={{ display: "flex", color: "#d7ff3f", letterSpacing: "0.2em" }}>
              {texts.brand}
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              <span>{texts.status}</span>
              <span>{texts.loc}</span>
              <span>{texts.utc}</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              marginTop: 36,
              gap: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: "#d7ff3f",
                  fontSize: 16,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: 18,
                }}
              >
                {texts.index}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 72,
                  fontWeight: 700,
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                }}
              >
                {texts.name}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 14,
                  color: "#d7ff3f",
                  fontSize: 34,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                }}
              >
                {texts.role}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 18,
                  maxWidth: 640,
                  color: "rgba(244,244,242,0.58)",
                  fontSize: 22,
                  lineHeight: 1.35,
                  letterSpacing: "0.01em",
                }}
              >
                {texts.tagline}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: 250,
                backgroundColor: "#d7ff3f",
                color: "#050505",
                padding: "28px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 16,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                {texts.panelTag}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: 36,
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                }}
              >
                <span>{texts.panelLineOne}</span>
                <span>{texts.panelLineTwo}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              border: "1px solid rgba(244,244,242,0.14)",
            }}
          >
            {texts.metrics.map((metric, index) => (
              <div
                key={metric.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  padding: "18px 22px",
                  borderRight:
                    index < texts.metrics.length - 1
                      ? "1px solid rgba(244,244,242,0.14)"
                      : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 32,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 8,
                    color: "rgba(244,244,242,0.45)",
                    fontSize: 14,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Play",
          data: playBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Play",
          data: playRegular,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
