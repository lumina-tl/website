<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";

defineProps<{
  src: string;
  alt: string;
}>();

const open = ref(false);

function close() {
  open.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

watch(open, (value) => {
  if (value) {
    document.addEventListener("keydown", onKeydown);
    document.body.style.overflow = "hidden";
  } else {
    document.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <figure class="shot">
    <button
      type="button"
      class="shot-thumb"
      aria-label="Open full-size screenshot"
      @click="open = true"
    >
      <img :src="src" :alt="alt" loading="lazy" decoding="async" />
      <span class="shot-zoom" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M8 11h6" />
          <path d="M11 8v6" />
        </svg>
        Zoom
      </span>
    </button>
    <figcaption>{{ alt }}</figcaption>
  </figure>

  <Teleport to="body">
    <div
      v-if="open"
      class="shot-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Full-size screenshot"
      @click.self="close"
    >
      <button
        type="button"
        class="shot-close"
        aria-label="Close"
        @click="close"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
      <img class="shot-full" :src="src" :alt="alt" @click="close" />
    </div>
  </Teleport>
</template>

<style lang="stylus">
.shot {
  margin: 1.5rem auto
  text-align: center
}

.shot-thumb {
  position: relative
  display: block
  margin: 0 auto
  padding: 0
  border-radius: 10px
  border: 1px solid var(--vp-c-divider)
  background: transparent
  cursor: zoom-in
  overflow: hidden
  max-width: min(880px, 100%)
  transition: border-color 0.25s, box-shadow 0.25s

  &:hover {
    border-color: var(--vp-c-brand-2)
    box-shadow: var(--vp-shadow-2)
  }

  &:focus-visible {
    outline: 2px solid var(--vp-c-brand-1)
    outline-offset: 2px
  }

  img {
    display: block
    width: 100%
    height: auto
  }
}

.shot-zoom {
  position: absolute
  right: 12px
  bottom: 12px
  display: inline-flex
  align-items: center
  gap: 6px
  padding: 4px 10px
  border-radius: 999px
  background: rgb(0 0 0 / 70%)
  border: 1px solid rgb(255 255 255 / 25%)
  color: #fff
  font-size: 12px
  font-weight: 600
  opacity: 0
  transition: opacity 0.25s
}

.shot-thumb:hover .shot-zoom {
  opacity: 1
}

.shot figcaption {
  margin-top: 0.6em
  font-size: 0.9em
  color: var(--vp-c-text-2)
}

.shot-overlay {
  position: fixed
  inset: 0
  z-index: 1000
  display: flex
  align-items: center
  justify-content: center
  padding: 5vh 4vw
  background: rgb(0 0 0 / 85%)
  cursor: zoom-out
}

.shot-full {
  display: block
  max-width: 100%
  max-height: 90vh
  border-radius: 6px
  box-shadow: var(--vp-shadow-5)
}

.shot-close {
  position: absolute
  top: 20px
  right: 20px
  display: inline-flex
  align-items: center
  justify-content: center
  width: 40px
  height: 40px
  border-radius: 50%
  border: 1px solid rgb(255 255 255 / 25%)
  background: rgb(0 0 0 / 40%)
  color: #fff
  cursor: pointer

  &:hover {
    background: rgb(255 255 255 / 15%)
  }

  &:focus-visible {
    outline: 2px solid #fff
    outline-offset: 2px
  }
}
</style>
