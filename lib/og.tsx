import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/* Google Fonts returns TrueType when no browser user agent is sent; Satori cannot read woff2. */
async function loadNewsreader(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Newsreader:wght@500", {
      headers: { "User-Agent": "" },
      cache: "force-cache",
    }).then((r) => r.text());
    const url = css.match(/src: url\((https:[^)]+)\) format\('truetype'\)/)?.[1];
    if (!url) return null;
    return await fetch(url, { cache: "force-cache" }).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

async function loadLogo(): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), "public/assets/wooster-logo.jpg"));
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/** Branded share card: logo top left, eyebrow, serif title in navy on white. */
export async function ogImage(title: string, eyebrow = "Wooster Prep") {
  const [font, logo] = await Promise.all([loadNewsreader(), loadLogo()]);
  const serif = font ? "Newsreader" : "serif";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#ffffff",
          color: "#14213d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" width={220} height={62} />
          ) : (
            <div style={{ fontSize: 28, fontFamily: serif }}>Wooster Prep</div>
          )}
          <div style={{ fontSize: 22, color: "rgba(23,27,34,0.5)", fontFamily: "sans-serif" }}>{eyebrow}</div>
        </div>
        <div
          style={{
            fontFamily: serif,
            fontSize: title.length > 60 ? 64 : 84,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "rgba(23,27,34,0.5)", fontFamily: "sans-serif" }}>
          <span>woosterprep.com</span>
          <span>Personalized SAT prep that actually moves your score.</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: font ? [{ name: "Newsreader", data: font, weight: 500, style: "normal" }] : undefined,
    },
  );
}
