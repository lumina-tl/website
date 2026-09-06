<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { data as release } from "../data/release.data";

const version = computed(() =>
  (release.tag_name ?? "v0.0.0").replace(/^v/, ""),
);

const dmlAsset = computed(() =>
  (release.assets ?? []).find((a) =>
    /^Lumina-Setup-DML-.+\.exe$/i.test(a.name),
  ),
);
const cudaAsset = computed(() =>
  (release.assets ?? []).find((a) =>
    /^Lumina-Setup-CUDA-.+\.exe$/i.test(a.name),
  ),
);

// Lumina currently only ships Windows installers.
const isWindows = ref(true);

onMounted(() => {
  isWindows.value = !!navigator.userAgent.match(/windows/i);
});
</script>

<template>
  <div>
    <div v-if="!isWindows" class="custom-block danger">
      <p class="custom-block-title">Unsupported operating system</p>
      <p>
        <strong>Lumina</strong> currently only ships installers for
        <strong>Windows</strong>. macOS and Linux builds are not available yet.
      </p>
    </div>

    <div class="download-buttons">
      <a
        class="download-button primary"
        :href="dmlAsset?.browser_download_url ?? release.html_url"
        :download="dmlAsset?.name"
      >
        <svg
          width="1.2em"
          height="1.2em"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 5v6h1.17L12 13.17 9.83 11H11V5h2m2-2H9v6H5l7 7 7-7h-4V3m4 15H5v2h16v-2Z"
          />
        </svg>
        <span class="text">Lumina Setup — DirectML</span>
        <span class="version">{{ version }}</span>
      </a>
      <a
        class="download-button secondary"
        :href="cudaAsset?.browser_download_url ?? release.html_url"
        :download="cudaAsset?.name"
      >
        <svg
          width="1.2em"
          height="1.2em"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 15H6l7-14v9h5L11 23v-8Z" />
        </svg>
        <span class="text">Lumina Setup — CUDA</span>
        <span class="version">{{ version }}</span>
      </a>
    </div>

    <p class="version-disclaimer">
      <strong>DirectML</strong> runs on any DirectX 12 GPU and falls back to
      CPU. <strong>CUDA</strong> is NVIDIA-only but noticeably faster on RTX/GTX
      cards. Missing an asset? View the
      <a :href="release.html_url" target="_blank" rel="noopener"
        >full release on GitHub</a
      >.
    </p>
  </div>
</template>

<style lang="stylus">
.download-buttons {
  display: flex
  gap: 0.75em
  justify-content: center
  align-items: center
  flex-wrap: wrap
  margin: 0.75em auto
}

.download-button {
  display: inline-flex
  align-items: center
  gap: 0.5em
  border: 1px solid transparent
  text-align: center
  font-weight: 600
  white-space: nowrap
  transition: color 0.25s, border-color 0.25s, background-color 0.25s
  cursor: pointer
  transition: all 0.3s ease
  border-radius: 20px
  padding: 0 20px
  line-height: 38px
  font-size: 14px

  &:hover {
    text-decoration: none !important
  }

  &.primary {
    border-color: var(--vp-button-brand-border)
    color: var(--vp-button-brand-text)
    background-color: var(--vp-button-brand-bg)

    &:hover {
      border-color: var(--vp-button-brand-hover-border)
      color: var(--vp-button-brand-hover-text)
      background-color: var(--vp-button-brand-hover-bg)
    }
  }

  &.secondary {
    border-color: var(--vp-button-alt-border)
    color: var(--vp-button-alt-text)
    background-color: var(--vp-button-alt-bg)

    &:hover {
      border-color: var(--vp-button-alt-hover-border)
      color: var(--vp-button-alt-hover-text)
      background-color: var(--vp-button-alt-hover-bg)
    }
  }

  .version {
    opacity: 0.7
    font-weight: 500
    font-size: 0.85em
  }
}

.version-disclaimer {
  text-align: center
  font-size: 0.875rem
  color: var(--vp-c-text-2)
  margin: 0.5em auto 1em
  max-width: 46em
}
</style>
