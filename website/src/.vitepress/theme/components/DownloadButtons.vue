<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRelease } from '../data/release'

type Platform = 'windows' | 'linux'

const release = useRelease()

const version = computed(() =>
  (release.value.tag_name ?? 'v0.0.0').replace(/^v/, ''),
)

const dmlAsset = computed(() =>
  (release.value.assets ?? []).find(a =>
    /^Lumina-Setup-DML-.+\.exe$/i.test(a.name),
  ),
)
const cudaWinAsset = computed(() =>
  (release.value.assets ?? []).find(a =>
    /^Lumina-Setup-CUDA-.+\.exe$/i.test(a.name),
  ),
)
const cpuLinuxAsset = computed(() =>
  (release.value.assets ?? []).find(a =>
    /^Lumina-CPU-.+-linux-x86_64\.AppImage$/i.test(a.name),
  ),
)
const cudaLinuxAsset = computed(() =>
  (release.value.assets ?? []).find(a =>
    /^Lumina-CUDA-.+-linux-x86_64\.AppImage$/i.test(a.name),
  ),
)

const selectedPlatform = ref<Platform>('windows')
const isUnsupportedOs = ref(false)

onMounted(() => {
  const ua = navigator.userAgent
  if (/linux/i.test(ua) && !/android/i.test(ua)) {
    selectedPlatform.value = 'linux'
    isUnsupportedOs.value = false
  }
  else if (/windows/i.test(ua)) {
    selectedPlatform.value = 'windows'
    isUnsupportedOs.value = false
  }
  else {
    selectedPlatform.value = 'windows'
    isUnsupportedOs.value = true
  }
})
</script>

<template>
  <div>
    <div v-if="isUnsupportedOs" class="custom-block danger">
      <p class="custom-block-title">
        Unsupported operating system
      </p>
      <p>
        <strong>Lumina</strong> currently ships builds for
        <strong>Windows</strong> and <strong>Linux</strong>. macOS and mobile
        builds are not available yet.
      </p>
    </div>

    <div class="platform-tabs" role="tablist" aria-label="Operating system">
      <button
        type="button"
        role="tab"
        class="platform-tab"
        :class="{ active: selectedPlatform === 'windows' }"
        :aria-selected="selectedPlatform === 'windows'"
        @click="selectedPlatform = 'windows'"
      >
        Windows
      </button>
      <button
        type="button"
        role="tab"
        class="platform-tab"
        :class="{ active: selectedPlatform === 'linux' }"
        :aria-selected="selectedPlatform === 'linux'"
        @click="selectedPlatform = 'linux'"
      >
        Linux (AppImage)
      </button>
    </div>

    <div v-if="selectedPlatform === 'windows'" class="download-buttons">
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
        :href="cudaWinAsset?.browser_download_url ?? release.html_url"
        :download="cudaWinAsset?.name"
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

    <div v-else class="download-buttons">
      <a
        class="download-button primary"
        :href="cpuLinuxAsset?.browser_download_url ?? release.html_url"
        :download="cpuLinuxAsset?.name"
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
        <span class="text">Lumina AppImage — CPU</span>
        <span class="version">{{ version }}</span>
      </a>
      <a
        class="download-button secondary"
        :href="cudaLinuxAsset?.browser_download_url ?? release.html_url"
        :download="cudaLinuxAsset?.name"
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
        <span class="text">Lumina AppImage — CUDA</span>
        <span class="version">{{ version }}</span>
      </a>
    </div>

    <p v-if="selectedPlatform === 'windows'" class="version-disclaimer">
      <strong>DirectML</strong> runs on any DirectX 12 GPU and falls back to
      CPU. <strong>CUDA</strong> is NVIDIA-only but noticeably faster on RTX/GTX
      cards. Missing an asset? View the
      <a :href="release.html_url" target="_blank" rel="noopener">full release on GitHub</a>.
    </p>
    <p v-else class="version-disclaimer">
      <strong>CPU AppImage</strong> works across Linux distros on Wayland and
      X11. <strong>CUDA AppImage</strong> targets systems with proprietary NVIDIA
      drivers. Missing an asset? View the
      <a :href="release.html_url" target="_blank" rel="noopener">full release on GitHub</a>.
    </p>
  </div>
</template>

<style lang="stylus">
.platform-tabs {
  display: flex
  gap: 0.5em
  justify-content: center
  margin: 1em auto 0.5em
}

.platform-tab {
  border: 1px solid var(--vp-c-divider)
  background-color: var(--vp-c-bg-soft)
  color: var(--vp-c-text-2)
  border-radius: 999px
  padding: 0.3em 1em
  font-size: 0.875rem
  font-weight: 500
  cursor: pointer
  transition: all 0.2s ease

  &:hover {
    color: var(--vp-c-text-1)
    border-color: var(--vp-c-brand-1)
  }

  &.active {
    background-color: var(--vp-c-brand-soft)
    color: var(--vp-c-brand-1)
    border-color: var(--vp-c-brand-1)
  }
}

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
