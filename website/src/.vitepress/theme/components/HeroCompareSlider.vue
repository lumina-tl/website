<script setup lang="ts">
import { computed, ref } from 'vue'

const container = ref<HTMLElement | null>(null)
const position = ref(52)
let dragging = false

const posPercent = computed(() => `${position.value}%`)

function setFromClientX(clientX: number) {
  const el = container.value
  if (!el)
    return
  const rect = el.getBoundingClientRect()
  if (rect.width === 0)
    return
  const pct = ((clientX - rect.left) / rect.width) * 100
  position.value = Math.min(100, Math.max(0, Math.round(pct * 10) / 10))
}

function onPointerDown(e: PointerEvent) {
  dragging = true
  container.value?.setPointerCapture(e.pointerId)
  setFromClientX(e.clientX)
}

function onPointerMove(e: PointerEvent) {
  if (dragging)
    setFromClientX(e.clientX)
}

function onPointerUp(e: PointerEvent) {
  if (dragging) {
    dragging = false
    try {
      container.value?.releasePointerCapture(e.pointerId)
    }
    catch {}
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    position.value = Math.max(0, position.value - 2)
  }
  else if (e.key === 'ArrowRight') {
    e.preventDefault()
    position.value = Math.min(100, position.value + 2)
  }
  else if (e.key === 'Home') {
    position.value = 0
  }
  else if (e.key === 'End') {
    position.value = 100
  }
}
</script>

<template>
  <div class="hero-slider-wrap">
    <div
      ref="container"
      class="hero-slider"
      role="slider"
      tabindex="0"
      aria-label="Drag to compare original and translated manga"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="Math.round(position)"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKeydown"
    >
      <img
        class="hero-slider-img after"
        src="/sample/translated.png"
        alt="Lumina translated result"
        loading="eager"
        decoding="async"
        draggable="false"
      >
      <img
        class="hero-slider-img before"
        src="/sample/original.png"
        alt="Original manga page"
        loading="eager"
        decoding="async"
        draggable="false"
        :style="{ clipPath: `inset(0 calc(100% - ${posPercent}) 0 0)` }"
      >

      <span class="slider-badge badge-before">Original</span>
      <span class="slider-badge badge-after">Lumina</span>

      <div class="slider-divider" :style="{ left: posPercent }" aria-hidden="true">
        <div class="divider-line" />
        <div class="divider-handle">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
    <p class="hero-slider-hint">
      Drag slider to compare · Full pipeline
    </p>
  </div>
</template>

<style scoped>
.hero-slider-wrap {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
}

.hero-slider {
  position: relative;
  width: 100%;
  aspect-ratio: 1020 / 1254;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  box-shadow: 0 20px 45px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: border-color 0.25s, box-shadow 0.25s;
}

:root:not(.dark) .hero-slider {
  box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.hero-slider:hover {
  border-color: var(--vp-c-brand-2);
}

.hero-slider:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.hero-slider-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  -webkit-user-drag: none;
}

.hero-slider-img.after {
  z-index: 1;
}

.hero-slider-img.before {
  z-index: 2;
}

.slider-badge {
  position: absolute;
  top: 12px;
  z-index: 5;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  pointer-events: none;
  backdrop-filter: blur(8px);
}

.badge-before {
  left: 12px;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
}

.badge-after {
  right: 12px;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
}

.slider-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
  pointer-events: none;
  transform: translateX(-50%);
}

.divider-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}

.divider-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--vp-c-bg-elv);
  border: 1.5px solid var(--vp-c-divider);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  color: var(--vp-c-text-1);
}

.hero-slider:hover .divider-handle {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
}

.hero-slider-hint {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  letter-spacing: 0.01em;
}
</style>
