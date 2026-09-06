// Lumina website — MangaDex cover proxy (Vercel Serverless Function)
// Serves cover art for the lumina-tl group feed through this site.
// Fetching happens server-side, so the browser's Referer header never
// reaches MangaDex — this avoids their hotlink placeholder ("you can read
// this on mangadex") for visitors in regions where MangaDex is blocked.
// Route: /api/cover?id=<mangaId>&file=<fileName>

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
  const mangaId = url.searchParams.get("id");
  const fileName = url.searchParams.get("file");
  if (!mangaId || !fileName) {
    return new Response(JSON.stringify({ error: "Missing id or file" }), {
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
