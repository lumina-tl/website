import { ref, onMounted } from "vue";

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  published_at: string | null;
  body: string | null;
  author: { login: string };
}

const CACHE_KEY = "lumina:github:changelogs";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function getCached(): GitHubRelease[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) return data as GitHubRelease[];
    localStorage.removeItem(CACHE_KEY);
  } catch {
    localStorage.removeItem(CACHE_KEY);
  }
  return null;
}

function setCache(data: GitHubRelease[]): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {}
}

export function useChangelogs() {
  const changelogs = ref<GitHubRelease[]>([]);

  onMounted(async () => {
    const cached = getCached();
    if (cached) {
      changelogs.value = cached;
      return;
    }
    try {
      let page = 1;
      const all: GitHubRelease[] = [];
      while (true) {
        const res = await fetch(
          `https://api.github.com/repos/lumina-tl/lumina/releases?per_page=100&page=${page}`,
          { headers: { Accept: "application/vnd.github+json" } },
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data: GitHubRelease[] = await res.json();
        all.push(...data);
        if (data.length < 100) break;
        page++;
      }
      changelogs.value = all;
      setCache(all);
    } catch (err) {
      console.error("Failed to fetch changelogs:", err);
    }
  });

  return changelogs;
}
