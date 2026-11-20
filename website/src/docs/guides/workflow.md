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

## The pipeline bar and presets

Lumina features a floating draggable pipeline pill with inline model selectors
and stage triggers. You can trigger each stage individually or use the
**Run All** split button:

- **Full Pipeline** — executes detection, OCR, translation, inpainting, and
  typesetting sequentially.
- **Clean Only** — runs detection and inpainting only, removing text while
  leaving the artwork cleaned and ready for manual typesetting.

Your chosen preset persists across sessions.

## 1. Text detection

Detection identifies text regions on each page and prepares bounding boxes for
subsequent stages. Lumina focuses exclusively on text boundaries to minimize
unnecessary compute:

- **`rtdetr`** (default) — fast, accurate bounding box detector licensed under
  Apache-2.0.
- **`rfdetr_seg`** (Koharu Layout RF-DETR Seg 2XL) — segmentation detector that
  produces tight polygon masks around text strokes, enabling the automatic
  **full-page inpaint mask**. Powered by FP16 weights to reduce VRAM consumption
  (~3.2 GB) and double inference speed.

**Editing:** Use the **Select** (<kbd>V</kbd>), **Rectangle** (<kbd>R</kbd>), or
**Lasso** (<kbd>L</kbd>) tools to draw, adjust, or delete bounding boxes. Hold
<kbd>Shift</kbd> to merge or add to a selection, and <kbd>Alt</kbd> to subtract.
Edited boxes sync directly with OCR crop coordinates.

## 2. OCR

OCR extracts original text from detected regions:

- **`baberu`** — multilingual (Japanese / Chinese / English) fine-tuned for
  manga. Features 256-token decoding to prevent long dialogue cuts. Recommended default.
- **`manga-ocr`** — Japanese-focused engine handling vertical, horizontal,
  stylized, and handwritten text.
- **`ppocrv6`** — lightweight and fast on CPU, supporting 50+ languages.
- **`paddleocr_vl`** — vision-language model, strong on Chinese/English (in development).

**Editing & Normalization:** Edit text line-by-line in the sidebar or re-run OCR
per box. In **Settings → General**, you can configure automatic case
normalization (As-is, Lowercase, Uppercase).

## 3. Translation

Translation is the only step that communicates with external APIs. All other
stages run completely offline.

- Providers: **Google Gemini**, **OpenRouter**, **xAI / Groq**, or **Custom**
  (any local or self-hosted endpoint compatible with OpenAI `/v1/chat/completions`).
- System instructions can be customized with template variables
  `{{target_language}}` and `{{previous_line}}` to maintain narrative tone and
  character voice consistency.
- Bidirectional layer IDs ensure translations stay mapped to the correct bubbles
  even if layers or pages are reordered.

Read the [Translation settings](/docs/guides/translation) guide for detailed setup.

## 4. Inpainting and manual cleaning

Inpainting reconstructs artwork hidden under original text:

- With `rfdetr_seg`, Lumina creates an automated full-page segmentation mask.
  With box detectors, it generates instance masks using localized heuristics.
- **Manual clean actions:** Select any area on the canvas and use the compact
  selection context bar to run **Clean area** (manual inpaint on selection) or
  **Erase area from masks** (clip unwanted mask portions).
- **Paint tools:** Fine-tune artwork with the **Brush** (<kbd>B</kbd>),
  **Eraser** (<kbd>E</kbd>), **Paint Bucket** (<kbd>G</kbd>), and
  **Eyedropper** (<kbd>I</kbd>). Brush size can be stepped with <kbd>[</kbd> and <kbd>]</kbd>.

**Editing:** Inpaint masks are stored as individual layers with toggleable
visibility and adjustable opacity before export.

## 5. Typesetting

Typesetting renders translated text back onto the canvas:

- Automatic text **color** and **angle** detection (powered by `anglenet`, with
  a PCA heuristic fallback).
- **Auto-fit fonts** that scale text to fit snugly inside bounding boundaries.
- Per-layer typography controls: font family, font size, stroke, alignment,
  line height, letter spacing, and rotation.
- **In-place text editing:** Double-click any layer in the sidebar or any text
  node on the canvas to open the rotating inline editor. Press <kbd>Escape</kbd>
  to discard edits safely.

## Page navigation and resource management

- **Bottom page strip:** Drag and drop page thumbnails to reorder pages with
  a real-time insertion indicator.
- **Resource monitor:** Check live CPU load, system RAM, GPU VRAM (via NVIDIA
  NVML), and active loaded models directly in the status bar chip. Click the chip
  to open a breakdown modal and purge idle model memory with **Unload Models**.

## Export

Export completed pages from the **Export** dialog (<kbd>Ctrl</kbd> + <kbd>E</kbd> /
<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd>):

- Flatten pages to **PNG** or **JPG** at full resolution.
- Combine project pages in sequence into a single **PDF** document.
- Export as layered Photoshop **PSD** documents (preview feature).

See [Projects & export](/docs/guides/projects) for export details and `.lmi` project storage.
