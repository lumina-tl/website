---
title: Translation workflow
description: How the Lumina pipeline works — detection, OCR, translation, inpainting, and typesetting — and how to edit each step.
---

# Translation workflow

Lumina automates the five stages of page translation, but treats automation as
a starting point rather than a final answer. Every stage produces editable
results, and a light human pass is expected to polish the output.

```text
Import → Detect → OCR → Translate → Inpaint → Typeset → Export
                    └──────── every step stays editable ────────┘
```

## 1. Text detection

Detection finds text boxes and speech bubbles on each page and hands them to
the next stages.

- The default detector, `rtdetr`, produces fast, accurate boxes and is
  Apache-2.0 licensed.
- `rfdetr_seg` is a segmentation-based detector that also outputs masks, which
  enables the automatic **full-page inpaint mask**. It is trained on
  [Manga109](https://manga109.github.io/manga109-project-website/en/) and is
  restricted to academic, non-commercial research use.

**Editing:** detected boxes can be re-ordered, corrected, or drawn by hand with
the selection tools before running OCR.

## 2. OCR

OCR reads the text inside each detected region. Lumina bundles several engines:

- `baberu` — multilingual (Japanese / Chinese / English), tuned for manga
  speech bubbles. The recommended default.
- `manga-ocr` — Japanese-focused; handles vertical, horizontal, stylized, and
  even handwritten text, and is lightweight.
- `ppocrv6` — very fast on CPU and covers 50+ languages, but is weaker on
  rotated or skewed text.
- `paddleocr_vl` — a vision-language model, strongest on Chinese/English;
  slower and still in development.

**Editing:** OCR text can be edited line by line or re-translated individually.

## 3. Translation

Translation is the only stage that calls an external AI API — everything else
runs fully offline. Configure a provider and target language in
**Settings → Translation**, then run translation per page.

**Editing:** each line can be edited, re-translated, or excluded. An angle
detector (`anglenet`) measures the slant of the original text so typeset text
can be rotated to match.

Read the [Translation settings](/docs/guides/translation) guide for providers,
API keys, and custom instructions.

## 4. Inpainting

Inpainting erases the original text from the page. With a segmentation
detector, Lumina generates a full-page mask automatically; otherwise it falls
back to a heuristic (Otsu) mask inside each detected box.

**Editing:** inpaint masks are individual layers — toggle, move, or remove them
before exporting. A cleanup brush lets you paint additional areas that need
erasing by hand.

## 5. Typesetting

Typesetting places the translated text back on the page:

- Auto-detected text **color** and **slant** from the original
- **Auto-fit fonts** to keep text inside its bubble or box
- Per-layer typography controls (font family, size, weight, style, rotation)
- A full-page paint layer for manual cleanup work

**Editing:** every typeset layer stays editable. The text tool, brush, eraser,
bucket, and eyedropper give you full control over the final look.

## Export

Use the **Export** dialog to flatten pages to PNG or JPG. You can re-order
pages there (this only affects export order, never your working project) and
export just the active page or the whole project. See
[Projects & export](/docs/guides/projects).
