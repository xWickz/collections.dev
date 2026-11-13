import { ImageResponse } from "next/og";
import { getArticleMetaBySlug } from "@/lib/mdx";

export const alt = "Artículo de collections.dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const meta = await getArticleMetaBySlug((await params).slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0b0b0b",
        color: "#f2f6fc",
      }}
    >
      <div style={{ fontSize: 36, color: "#4ade80" }}>
        {meta?.category ?? "collections.dev"}
      </div>
      <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
        {meta?.title ?? "collections.dev"}
      </div>
      <div style={{ fontSize: 36, color: "#a1a1aa" }}>collections.dev</div>
    </div>,
    size,
  );
}
