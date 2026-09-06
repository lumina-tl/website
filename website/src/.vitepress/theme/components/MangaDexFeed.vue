<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const GROUP_ID = "c3b19e53-56eb-47a0-8e0c-880e1b91847d";
const GROUP_URL = `https://mangadex.org/group/${GROUP_ID}`;

interface ChapterItem {
  id: string;
  label: string;
  lang: string;
  date: string;
  url: string;
}

interface ShowManga {
  id: string;
  title: string;
  coverUrl: string | null;
  chapters: ChapterItem[];
}

type State = "loading" | "ready" | "empty" | "error";

const state = ref<State>("loading");
const error = ref("");
const mangaList = ref<ShowManga[]>([]);
const open = ref<Record<string, boolean>>({});
const failedCovers = ref<Record<string, boolean>>({});
let controller: AbortController | null = null;

async function load() {
  controller?.abort();
  controller = new AbortController();
  const signal = controller.signal;
  state.value = "loading";
  error.value = "";
  open.value = {};

  try {
    const res = await fetch("/api/mdx", { signal });
    if (!res.ok) {
      throw new Error(res.status === 504 ? "timed out" : `HTTP ${res.status}`);
    }
    const payload = (await res.json()) as { manga?: ShowManga[] };
    const list = payload.manga ?? [];

    if (list.length === 0) {
      state.value = "empty";
      return;
    }

    mangaList.value = list;
    if (list.length <= 3) {
      list.forEach((m) => {
        open.value[m.id] = true;
      });
    }
    state.value = "ready";
  } catch (err) {
    if (signal.aborted) return;
    error.value = err instanceof Error ? err.message : String(err);
    state.value = "error";
  }
}

const totalChapters = computed(() =>
  mangaList.value.reduce((sum, manga) => sum + manga.chapters.length, 0),
);

function toggle(id: string) {
  open.value[id] = !open.value[id];
}

function onCoverError(id: string) {
  failedCovers.value[id] = true;
}

onMounted(load);
onBeforeUnmount(() => controller?.abort());
</script>

<template>
  <div class="mdx">
    <div class="mdx-head">
      <span class="mdx-head-note">
        Live from MangaDex · {{ totalChapters }}
        {{ totalChapters === 1 ? "chapter" : "chapters" }} by the
        <strong>lumina-tl</strong> group
      </span>
      <a class="mdx-link" :href="GROUP_URL" target="_blank" rel="noopener">
        Open group profile
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </div>

    <p v-if="state === 'loading'" class="mdx-note">
      Loading releases from MangaDex…
    </p>

    <p v-else-if="state === 'error'" class="mdx-note">
      Couldn't load releases from MangaDex
      <template v-if="error"> ({{ error }}) </template>.
      <button type="button" class="mdx-retry" @click="load">Try again</button>
    </p>

    <p v-else-if="state === 'empty'" class="mdx-note">
      No releases detected for this group yet — check the
      <a :href="GROUP_URL" target="_blank" rel="noopener"
        >lumina-tl group on MangaDex</a
      >.
    </p>

    <div v-else class="mdx-list">
      <div v-for="manga in mangaList" :key="manga.id" class="mdx-item">
        <button
          type="button"
          class="mdx-item-head"
          :aria-expanded="!!open[manga.id]"
          @click="toggle(manga.id)"
        >
          <img
            v-if="manga.coverUrl && !failedCovers[manga.id]"
            class="mdx-cover"
            :src="manga.coverUrl"
            alt=""
            loading="lazy"
            decoding="async"
            @error="onCoverError(manga.id)"
          />
          <span v-else class="mdx-cover mdx-cover-empty" aria-hidden="true" />
          <span class="mdx-item-title">{{ manga.title }}</span>
          <span class="mdx-item-count">
            {{ manga.chapters.length }}
            {{ manga.chapters.length === 1 ? "chapter" : "chapters" }}
          </span>
          <svg
            class="mdx-chevron"
            :class="{ open: !!open[manga.id] }"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div v-show="open[manga.id]" class="mdx-item-body">
          <a
            v-for="chapter in manga.chapters"
            :key="chapter.id"
            class="mdx-ch"
            :href="chapter.url"
            target="_blank"
            rel="noopener"
          >
            <span class="mdx-ch-label">{{ chapter.label }}</span>
            <span class="mdx-ch-lang">{{ chapter.lang }}</span>
            <time v-if="chapter.date" class="mdx-ch-date">{{
              chapter.date
            }}</time>
            <svg
              class="mdx-ch-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.mdx {
  margin: 1.5rem 0
}

.mdx-head {
  display: flex
  align-items: center
  justify-content: space-between
  gap: 1rem
  flex-wrap: wrap
  margin-bottom: 0.75rem
}

.mdx-head-note {
  color: var(--vp-c-text-2)
  font-size: 0.95em
}

.mdx-link {
  display: inline-flex
  align-items: center
  gap: 0.4em
  font-weight: 600
  font-size: 0.9em
}

.mdx-note {
  padding: 1rem 1.25rem
  border-radius: 10px
  border: 1px dashed var(--vp-c-divider)
  color: var(--vp-c-text-2)
}

.mdx-retry {
  margin-left: 0.5em
  padding: 2px 12px
  border-radius: 999px
  border: 1px solid var(--vp-c-divider)
  background: var(--vp-c-bg-soft)
  color: var(--vp-c-brand-1)
  font-weight: 600
  cursor: pointer

  &:hover {
    border-color: var(--vp-c-brand-2)
  }
}

.mdx-list {
  display: flex
  flex-direction: column
  gap: 0.6rem
}

.mdx-item {
  border-radius: 10px
  border: 1px solid var(--vp-c-divider)
  background: var(--vp-c-bg-soft)
  overflow: hidden
}

.mdx-item-head {
  display: flex
  align-items: center
  gap: 0.85rem
  width: 100%
  padding: 0.75rem 1rem
  border: 0
  background: transparent
  color: var(--vp-c-text-1)
  cursor: pointer
  text-align: left

  &:hover {
    background: var(--vp-c-bg-elv)
  }

  &:focus-visible {
    outline: 2px solid var(--vp-c-brand-1)
    outline-offset: -2px
  }
}

.mdx-cover {
  flex: none
  width: 42px
  height: 60px
  border-radius: 5px
  object-fit: cover
  background: var(--vp-c-bg-alt)
}

.mdx-cover-empty {
  background: var(--vp-c-bg-elv)
}

.mdx-item-title {
  flex: 1
  min-width: 0
  font-weight: 600
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
}

.mdx-item-count {
  flex: none
  padding: 1px 10px
  border-radius: 999px
  border: 1px solid var(--vp-c-divider)
  background: var(--vp-c-bg-elv)
  color: var(--vp-c-text-2)
  font-size: 0.8em
}

.mdx-chevron {
  flex: none
  color: var(--vp-c-text-2)
  transition: transform 0.2s

  &.open {
    transform: rotate(180deg)
  }
}

.mdx-item-body {
  border-top: 1px solid var(--vp-c-divider)
  background: var(--vp-c-bg)
  padding: 0.5rem
}

.mdx-ch {
  display: flex
  align-items: center
  gap: 0.75rem
  padding: 0.5rem 0.65rem
  border-radius: 7px
  color: var(--vp-c-text-1)
  text-decoration: none

  &:hover {
    background: var(--vp-c-bg-soft)
    text-decoration: none
  }
}

.mdx-ch-label {
  flex: 1
  min-width: 0
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
}

.mdx-ch-lang {
  flex: none
  padding: 0 6px
  border-radius: 4px
  background: var(--vp-c-brand-soft)
  color: var(--vp-c-brand-1)
  font-family: var(--vp-font-family-mono)
  font-size: 0.75em
  text-transform: uppercase
}

.mdx-ch-date {
  flex: none
  color: var(--vp-c-text-3)
  font-size: 0.85em
}

.mdx-ch-icon {
  flex: none
  color: var(--vp-c-text-3)
}
</style>
