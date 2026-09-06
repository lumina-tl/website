<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    before: string;
    after: string;
    alt: string;
    beforeLabel?: string;
    afterLabel?: string;
  }>(),
  {
    beforeLabel: "Original",
    afterLabel: "Lumina",
  },
);

const container = ref<HTMLElement | null>(null);
const position = ref(50);
let dragging = false;

const posStyle = computed(() => `${position.value}%`);

function setFromClientX(clientX: number) {
  const el = container.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  if (rect.width === 0) return;
  const pct = ((clientX - rect.left) / rect.width) * 100;
  position.value = Math.min(100, Math.max(0, pct));
}

function onPointerDown(e: PointerEvent) {
  dragging = true;
  container.value?.setPointerCapture(e.pointerId);
  setFromClientX(e.clientX);
}

function onPointerMove(e: PointerEvent) {
  if (dragging) setFromClientX(e.clientX);
}

function onPointerUp() {
  dragging = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    position.value = Math.max(0, position.value - 2);
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    position.value = Math.min(100, position.value + 2);
  } else if (e.key === "Home") {
    position.value = 0;
  } else if (e.key === "End") {
    position.value = 100;
  }
}
</script>

<template>
  <div
    ref="container"
    class="ba"
    role="slider"
    tabindex="0"
    :aria-label="`Before/after comparison — ${props.alt}`"
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
      class="ba-img ba-after"
      :src="props.after"
      :alt="props.alt"
      draggable="false"
      loading="lazy"
      decoding="async"
    />
    <div class="ba-clip" :style="{ width: posStyle }">
      <img
        class="ba-img ba-before"
        :src="props.before"
        :alt="`${props.alt} — ${props.beforeLabel}`"
        draggable="false"
        loading="lazy"
        decoding="async"
      />
    </div>
    <span class="ba-label ba-label-before">{{ props.beforeLabel }}</span>
    <span class="ba-label ba-label-after">{{ props.afterLabel }}</span>
    <div class="ba-handle" :style="{ left: posStyle }" aria-hidden="true">
      <span class="ba-handle-bar" />
      <span class="ba-handle-knob">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </span>
    </div>
  </div>
</template>

<style lang="stylus">
.ba {
  position: relative
  overflow: hidden
  width: 100%
  border-radius: 10px
  border: 1px solid var(--vp-c-divider)
  cursor: ew-resize
  line-height: 0
  touch-action: none
  user-select: none
  -webkit-user-select: none
  -webkit-tap-highlight-color: transparent

  &:focus-visible {
    outline: 2px solid var(--vp-c-brand-1)
    outline-offset: 2px
  }

  img {
    display: block
    width: 100%
    height: auto
    pointer-events: none
    -webkit-user-drag: none
  }
}

.ba-clip {
  position: absolute
  top: 0
  left: 0
  bottom: 0
  overflow: hidden
  pointer-events: none

  .ba-before {
    position: absolute
    top: 0
    left: 0
    width: auto
    height: 100%
    max-width: none
  }
}

.ba-label {
  position: absolute
  top: 10px
  z-index: 3
  padding: 2px 10px
  border-radius: 999px
  background: var(--vp-c-bg-soft)
  border: 1px solid var(--vp-c-divider)
  color: var(--vp-c-text-1)
  font-size: 12px
  font-weight: 600
  line-height: 1.7
  letter-spacing: 0.01em
  pointer-events: none
}

.ba-label-before {
  left: 10px
}

.ba-label-after {
  right: 10px
  background: var(--vp-c-brand-soft)
  border-color: var(--vp-c-brand-2)
  color: var(--vp-c-brand-1)
}

.ba-handle {
  position: absolute
  top: 0
  bottom: 0
  z-index: 4
  pointer-events: none
  transform: translateX(-50%)
}

.ba-handle-bar {
  position: absolute
  top: 0
  bottom: 0
  left: -1px
  width: 2px
  background: var(--vp-c-bg-elv)
  box-shadow: 0 0 0 1px var(--vp-c-divider)
}

.ba-handle-knob {
  position: absolute
  top: 50%
  left: 0
  display: flex
  align-items: center
  justify-content: center
  gap: 2px
  width: 36px
  height: 36px
  border-radius: 50%
  background: var(--vp-c-bg-elv)
  border: 1px solid var(--vp-c-divider)
  box-shadow: var(--vp-shadow-3)
  color: var(--vp-c-text-1)
  transform: translate(-50%, -50%)
}
</style>
