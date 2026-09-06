// Lumina website — MangaDex feed proxy (Vercel Serverless Function)
// Fetches chapter list + manga metadata for the lumina-tl group from the
// MangaDex API on the server, shapes it into a small JSON payload for the
// client, and caches the response on Vercel's CDN so visitors in regions
// where MangaDex is blocked can still see the feed.

export const config = {
  runtime: 'edge',
}

const GROUP_ID = 'c3b19e53-56eb-47a0-8e0c-880e1b91847d'
const API = 'https://api.mangadex.org'
const CHUNK = 100
const MAX_PAGES = 20

const MANGADEX_ACCEPT = 'application/vnd.api+json'

const CACHE_TTL = 900 // 15 min fresh
const STALE_TTL = 3600 // serve stale up to 1h while revalidating

interface ChapterAttributes {
  volume: string | null
  chapter: string | null
  title: string | null
  translatedLanguage: string
  externalUrl?: string | null
  publishAt: string
}

interface Relationship {
  id: string
  type: string
  attributes?: Record<string, unknown> | null
}

interface ChapterData {
  id: string
  attributes: ChapterAttributes
  relationships: Relationship[]
}

interface MangaData {
  id: string
  attributes: {
    title?: Record<string, string>
  }
  relationships: Relationship[]
}

interface ChapterItem {
  id: string
  label: string
  lang: string
  date: string
  url: string
}

interface ShowManga {
  id: string
  title: string
  coverUrl: string | null
  chapters: ChapterItem[]
}

function pickTitle(title?: Record<string, string>): string {
  if (!title)
    return 'Unknown title'
  const preferred = ['en', 'id', 'ja', 'ko', 'zh']
  for (const key of preferred) {
    if (title[key])
      return title[key]
  }
  const first = Object.values(title)[0]
  return first ?? 'Unknown title'
}

function chapterLabel(attributes: ChapterAttributes): string {
  const parts: string[] = []
  if (attributes.volume)
    parts.push(`Vol. ${attributes.volume}`)
  if (attributes.chapter)
    parts.push(`Ch. ${attributes.chapter}`)
  const label = parts.join(' · ')
  if (attributes.title) {
    return label ? `${label} — ${attributes.title}` : attributes.title
  }
  return label || 'Chapter'
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

async function getJson(
  path: string,
  signal: AbortSignal,
): Promise<{ total?: number, data: unknown[] }> {
  const res = await fetch(`${API}${path}`, {
    signal,
    headers: { Accept: MANGADEX_ACCEPT },
  })
  if (!res.ok)
    throw new Error(`MangaDex responded with ${res.status}`)
  return (await res.json()) as { total?: number, data: unknown[] }
}

async function fetchChapters(signal: AbortSignal): Promise<ChapterData[]> {
  const chapters: ChapterData[] = []
  let offset = 0
  for (let page = 0; page < MAX_PAGES; page++) {
    const query = new URLSearchParams({
      'groups[]': GROUP_ID,
      'order[chapter]': 'asc',
      'limit': String(CHUNK),
      'offset': String(offset),
      'includes[]': 'manga',
    })
    const res = await getJson(`/chapter?${query}`, signal)
    const data = res.data as ChapterData[]
    chapters.push(...data)
    if (
      res.total == null
      || chapters.length >= res.total
      || data.length === 0
    ) {
      break
    }
    offset += CHUNK
  }
  return chapters
}

async function fetchMangaMeta(
  ids: string[],
  signal: AbortSignal,
): Promise<MangaData[]> {
  const result: MangaData[] = []
  for (let i = 0; i < ids.length; i += CHUNK) {
    const slice = ids.slice(i, i + CHUNK)
    const query = new URLSearchParams({
      'limit': String(CHUNK),
      'includes[]': 'cover_art',
    })
    slice.forEach(id => query.append('ids[]', id))
    const res = await getJson(`/manga?${query}`, signal)
    result.push(...(res.data as MangaData[]))
  }
  return result
}

function jsonOk(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
      ...init?.headers,
    },
  })
}

function respondError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return respondError('Method not allowed', 405)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)
  try {
    const chapters = await fetchChapters(controller.signal)
    if (chapters.length === 0) {
      return jsonOk({ manga: [] })
    }

    const byManga = new Map<string, ChapterItem[]>()
    for (const chapter of chapters) {
      const mangaId = chapter.relationships.find(r => r.type === 'manga')?.id
      if (!mangaId)
        continue
      const item: ChapterItem = {
        id: chapter.id,
        label: chapterLabel(chapter.attributes),
        lang: chapter.attributes.translatedLanguage,
        date: formatDate(chapter.attributes.publishAt),
        url:
          chapter.attributes.externalUrl
          ?? `https://mangadex.org/chapter/${chapter.id}`,
      }
      const list = byManga.get(mangaId)
      if (list)
        list.push(item)
      else byManga.set(mangaId, [item])
    }

    const metas = await fetchMangaMeta([...byManga.keys()], controller.signal)
    const metaMap = new Map(metas.map(m => [m.id, m]))

    const list: ShowManga[] = [...byManga.entries()].map(([id, items]) => {
      const meta = metaMap.get(id)
      const coverFile = meta?.relationships.find(
        r => r.type === 'cover_art' && r.attributes?.fileName,
      )?.attributes?.fileName as string | undefined
      const coverUrl = coverFile ? `/api/mdx/cover/${id}/${coverFile}` : null
      return {
        id,
        title: meta ? pickTitle(meta.attributes.title) : 'Unknown title',
        coverUrl,
        chapters: items,
      }
    })

    const sorted = list.sort((a, b) => {
      const aLatest = a.chapters[a.chapters.length - 1]?.date ?? ''
      const bLatest = b.chapters[b.chapters.length - 1]?.date ?? ''
      return aLatest < bLatest ? 1 : -1
    })

    return jsonOk({ manga: sorted })
  }
  catch (err) {
    if (controller.signal.aborted) {
      return respondError('MangaDex request timed out', 504)
    }
    const message
      = err instanceof Error ? err.message : 'Failed to fetch MangaDex data'
    return respondError(message, 502)
  }
  finally {
    clearTimeout(timeout)
  }
}
