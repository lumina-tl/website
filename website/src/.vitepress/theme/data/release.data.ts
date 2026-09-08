import { ref, onMounted } from "vue";

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  published_at: string;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
  }[];
}

const CACHE_KEY = "lumina:github:latest-release";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function getCached(): GitHubRelease | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) return data as GitHubRelease;
    localStorage.removeItem(CACHE_KEY);
  } catch {
    localStorage.removeItem(CACHE_KEY);
  }
  return null;
}

function setCache(data: GitHubRelease): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {}
}

export function useRelease() {
  const release = ref<GitHubRelease>({
    tag_name: "v0.0.0",
    html_url: "#",
    published_at: "",
    assets: [],
  });

  onMounted(async () => {
    const cached = getCached();
    if (cached) {
      release.value = cached;
      return;
    }
    try {
      const res = await fetch(
        "https://api.github.com/repos/lumina-tl/lumina/releases/latest",
        { headers: { Accept: "application/vnd.github+json" } },
      );
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const data: GitHubRelease = await res.json();
      release.value = data;
      setCache(data);
    } catch (err) {
      console.error("Failed to fetch latest release:", err);
    }
  });

  return release;
}
