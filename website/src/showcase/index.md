---
title: Showcase
description: See Lumina in action — app screenshots, before/after translations, and recent releases published by the lumina-tl group on MangaDex.
---

<script setup>
import ShowcaseScreenshot from '@theme/components/ShowcaseScreenshot.vue'
import BeforeAfterSlider from '@theme/components/BeforeAfterSlider.vue'
import MangaDexFeed from '@theme/components/MangaDexFeed.vue'

const SHOWCASE = 'https://raw.githubusercontent.com/lumina-tl/lumina/main/showcase'
</script>

# Showcase

Real output from the Lumina pipeline: original pages next to pages that Lumina
detected, translated, inpainted, and typeset. The examples below may not be
frequently updated and may not represent the effect of the current `main`
branch version.

## The app

<ShowcaseScreenshot
  :src="`${SHOWCASE}/screenshot.png`"
  alt="The Lumina desktop app with a manga page open in the editor"
/>

## Before and after

Drag the divider — or focus it and use the arrow keys — to compare the
original page with Lumina's result.

### Full pipeline

<BeforeAfterSlider
  :before="`${SHOWCASE}/1/before.png`"
  :after="`${SHOWCASE}/1/after.png`"
  alt="A manga page translated with the full Lumina pipeline"
/>

Example 1 — full pipeline: detection, OCR, translation, inpainting, and
typesetting. (Source: [@rikak on X](https://x.com/rikak/status/1642727617886556160/photo/1).)

### Page sourced from MangaDex

<BeforeAfterSlider
  :before="`${SHOWCASE}/2/before.jpg`"
  :after="`${SHOWCASE}/2/after.png`"
  alt="A manga page sourced from MangaDex, translated with the full Lumina pipeline"
/>

Example 2 — full pipeline: detection, OCR, translation, inpainting, and
typesetting. The original page comes from a
[MangaDex](https://mangadex.org/title/d313c527-5a37-411f-b82b-3ca61feca13e)
title; the translation shown here is a showcase only and was not uploaded to
MangaDex.

### Inpainting only

<BeforeAfterSlider
  :before="`${SHOWCASE}/3/before.png`"
  :after="`${SHOWCASE}/3/cleaned.png`"
  after-label="Cleaned"
  alt="A manga page with text regions removed by Lumina's inpainting"
/>

Example 3 — inpainting only: text regions were removed and the artwork
reconstructed, with no typesetting added.
(Source: [@hiduki_yayoi on X](https://x.com/hiduki_yayoi/status/1645186427712573440/photo/2).)

## Lumina in action on MangaDex

The [lumina-tl](https://mangadex.org/group/c3b19e53-56eb-47a0-8e0c-880e1b91847d/lumina-tl)
group on MangaDex is used to upload translations made with Lumina. The list
below is fetched live from the MangaDex API when this page loads.

<MangaDexFeed />
