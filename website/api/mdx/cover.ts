// Lumina website — MangaDex cover proxy (Vercel Serverless Function)
// Serves cover art for the lumina-tl group feed through this site so
// visitors in regions where MangaDex is blocked can still see cover images.
// Route: /api/mdx/cover/<manga-id>/<fileName>

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const mangaId = parts[3];
  const fileName = parts.slice(4).join("/");
  if (!mangaId || !fileName) {
    return new Response(JSON.stringify({ error: "Missing cover path" }), {
      status: 400,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
  const upstream = await fetch(coverUrl, {
    headers: { Accept: "image/avif,image/webp,image/*,*/*;q=0.8" },
  });
  if (!upstream.ok) {
    return new Response(JSON.stringify({ error: "Cover not found" }), {
      status: upstream.status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  const headers = new Headers(upstream.headers);
  headers.set(
    "Content-Type",
    upstream.headers.get("Content-Type") ?? "image/jpeg",
  );
  headers.set(
    "Cache-Control",
    "public, max-age=86400, s-maxage=86400, immutable",
  );
  headers.set("Access-Control-Allow-Origin", "*");

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}
