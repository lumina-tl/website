---
title: Getting started
description: Install Lumina, download your first models, and translate your first page.
---

<script setup>
import DownloadButtons from '@theme/components/DownloadButtons.vue'
</script>

# Getting started

## 1. Choose a build

Lumina ships native builds for **Windows** and **Linux** — pick the one that
fits your OS and hardware:

- **Windows — DirectML installer** — works on any DirectX 12 GPU and falls back
  to CPU. The universal Windows choice.
- **Windows — CUDA installer** — NVIDIA-only, noticeably faster on RTX/GTX
  cards.
- **Linux — CPU AppImage** — universal `x86_64` AppImage with Wayland and X11
  auto-detection.
- **Linux — CUDA AppImage** — for `x86_64` Linux systems with proprietary NVIDIA
  drivers.

CUDA builds download the platform ONNX Runtime archive once on first launch
(with a live extraction progress bar) to keep installers small and updates
differential.

<DownloadButtons />

::: tip Requirements

- 64-bit Windows (10 or newer recommended) or 64-bit Linux (`x86_64`, Wayland
  or X11)
- A GPU is **optional** — Lumina runs on CPU alone
- CUDA builds need an NVIDIA GPU with a reasonably recent driver
  :::

## 2. Install and launch

On **Windows**, run the installer and follow the steps, then launch Lumina.
On **Linux**, make the `.AppImage` executable and launch it directly, or
integrate desktop shortcuts, icons, and `.lmi` file associations with:

```sh
bash scripts/install-linux-appimage.sh /path/to/Lumina-*.AppImage
```

The app starts a small local backend (FastAPI + ONNX Runtime) automatically —
no separate server or Python installation is required.

![Lumina editor interface](/img/screenshot.png)

## 3. Download models

Models are **not** bundled with the installer. Open **Settings → Models** and
download the models you need. The app groups them by stage:

| Stage          | Recommended default                               | Notes                                                                                                       |
| -------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Text detection | `rtdetr`                                          | Apache-2.0 licensed; `rfdetr_seg` (FP16) adds segmentation masks but is restricted to academic, non-commercial use |
| OCR            | `baberu` (multilingual) or `manga_ocr` (Japanese) | `baberu` v1.2 features 256-token decoding for dense bubbles; `manga_ocr` is tuned for Japanese |
| Inpainting     | `lama_manga`                                      | Manga fine-tune; `lama` is a CPU-only general fallback                                                      |
| Aux            | `anglenet`                                        | Tiny (~2 MB) model downloaded automatically; measures text slant for typesetting                            |

Model files can also be placed manually in your models directory or deleted at any time to free space — see
[Managing models](/docs/guides/models).

## 4. Translate a page

1. Click **Import** (or drag images in) to add your first page.
2. Open the page and run the pipeline stages — **detection → OCR → translation →
   inpainting → typesetting**. You can click each stage individually in the floating
   pipeline pill, or use the **Run All** dropdown with presets (**Full Pipeline** or **Clean Only**).
3. Translation needs a configured provider and API key — see
   [Translation settings](/docs/guides/translation) before you reach that step.
4. When you're happy with the result, export the page as PNG, JPG, or PDF from the
   **Export** dialog, save a layered PSD document, or save the whole project as a `.lmi` file.

For a detailed explanation of each stage and how to edit its results, read the
[Translation workflow](/docs/guides/workflow) guide.
