---
title: Managing models
description: How Lumina downloads, stores, and runs its models — and which execution providers each model supports.
---

# Managing models

Lumina runs every model locally as an ONNX graph through ONNX Runtime. Models
are **not** bundled with the installer; each one is downloaded on demand (or
placed manually) and can be removed at any time.

## The Models screen

Open **Settings → Models** to manage models. The screen is split into three
categories — **Text Detection | OCR | Inpainting** — with a sidebar per
category:

- Each model shows its **ready state**, download size, and GPU execution badge.
- Download models you plan to use; everything is stored locally.
- **Delete installed models:** Click the delete button on any installed model
  to delete its files from disk and unload its ONNX sessions from memory and VRAM.
  A confirmation modal protects against accidental deletions.
- **Minimizable downloads:** The floating download progress dialog can be
  minimized directly into a status bar chip, showing real-time percentage and
  download speed without obstructing the canvas.
- The badge next to a model marks the recommended choice for best quality.
  Note the license terms next to each model — the segmentation detector
  `rfdetr_seg`, for example, is restricted to academic, non-commercial research.

## Resource monitoring and model unloading

Lumina includes active resource tracking to prevent system slowdowns and out-of-memory errors:

- **Status bar monitor:** A live chip in the bottom status bar displays current
  CPU load, system RAM, dedicated GPU VRAM (via NVIDIA NVML), and the number of
  active AI models currently loaded in memory.
- **Popover breakdown:** Clicking the status chip opens a popover detailing
  exact usage per resource.
- **One-click purge:** Click **Unload Models** in the popover to instantly purge
  idle model weights and sessions from VRAM and system RAM.
- **Automatic memory management:** Lumina monitors native memory pressure and
  uses LRU eviction to cycle out inactive models when headroom runs low.

## Where models are stored

The models directory is resolved in this order:

1. The `LUMINA_MODEL_DIR` environment variable.
2. The location you saved in **Settings → Models** ("Models directory" card).
3. The platform default: `userData/models` — on Windows,
   `%APPDATA%\Lumina\models`.

In a source checkout you can set `LUMINA_MODEL_DIR` in `.env` (see
`.env.example` in the repository) to keep using the repo's `models/` folder.

Inside the directory, each model lives in its own subfolder named after the
model id — for example `anglenet/` for the AngleNet model.

## Available models

| Category | Model          | Status          | Acceleration                     |
| -------- | -------------- | --------------- | -------------------------------- |
| Detect   | `rtdetr`       | Ready (default) | CUDA / DirectML / CPU            |
| Detect   | `rfdetr_seg`   | Ready           | CUDA / DirectML / CPU            |
| OCR      | `manga-ocr`    | Ready           | CUDA / DirectML (decoder on CPU) |
| OCR      | `baberu`       | Ready (default) | CUDA / DirectML (decoder on CPU) |
| OCR      | `ppocrv6`      | Ready           | CUDA / DirectML / CPU            |
| OCR      | `paddleocr_vl` | In development  | CUDA or CPU (no DirectML)        |
| Inpaint  | `lama_manga`   | Ready (default) | CUDA or CPU (no DirectML)        |
| Inpaint  | `lama`         | Ready           | CPU only                         |
| Aux      | `anglenet`     | Ready (aux)     | CPU (forced)                     |

"Ready" models are stable; "In development" models work but may still have
rough edges.

### Notes on specific models

- **`rtdetr`** (default detector) is Apache-2.0 licensed, making it the
  license-safe default. It detects text bounding boxes fast and accurately.
- **`rfdetr_seg`** (Koharu Layout RF-DETR Seg 2XL) produces detailed polygon
  segmentation masks for automatic full-page inpainting. It uses optimized
  **FP16 weights** (`koharu-layout-rfdetr-seg-2xl-1152-fp16.onnx`), cutting VRAM
  demand from ~5.9 GB down to ~3.2 GB (~45% reduction) and doubling speed.
  Note: trained on Manga109 and restricted to academic, non-commercial research use.
- **`baberu`** (v1.2) is the recommended multilingual OCR model. It features
  a 256-token decoding window to prevent truncation in dense narration bubbles.
- **`anglenet`** (~2 MB) is a global auxiliary model downloaded automatically
  in the background on first launch. It measures text slant so typography layers
  can match original rotation.
- **`paddleocr_vl`** is a vision-language model (~1.2 GB) strongest on Chinese
  and English text.

## Execution providers

Every model runs through ONNX Runtime, and you control the **execution
provider** per model. In short:

- **CUDA** — NVIDIA GPUs, fastest when available. Starting with v0.3.0, the
  CUDA runtime (~1.4 GB) is downloaded once on initial launch to your user folder
  and verified automatically.
- **DirectML** — any DirectX 12 GPU. DirectML runtimes come pre-bundled with
  the DirectML installer.
- **CPU** — always works; slower on heavy models.

CUDA acceleration requires the CUDA-enabled installer and an NVIDIA driver.
See the [Technical FAQ](/docs/faq/technical) for details.
