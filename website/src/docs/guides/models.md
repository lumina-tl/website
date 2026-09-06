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

- Each model shows its **ready state** and download size.
- Download models you plan to use; everything is stored locally.
- The badge next to a model marks the recommended choice for best quality.
  Note the license notes next to each model — the segmentation detector
  `rfdetr_seg`, for example, is limited to academic, non-commercial research.

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

- **`rtdetr`** (default detector) is Apache-2.0 licensed, which is why it is
  the license-safe default. It detects boxes but produces no masks.
- **`rfdetr_seg`** (Koharu Layout RF-DETR Seg 2XL) adds segmentation masks for
  better automatic inpainting, but is trained on Manga109 and restricted to
  academic, non-commercial research use — it is offered as an optional model
  for that purpose only.
- **`anglenet`** (~2 MB) is a global auxiliary model that Lumina downloads in
  the background on first launch. It measures the slant of detected text so
  typeset text can be rotated to match. If the file is missing, Lumina falls
  back to a PCA-based slant heuristic.
- **`paddleocr_vl`** is a vision-language model (~1.2 GB) that reads whole text
  regions at once; it is strongest on Chinese and English.

## Execution providers

Every model runs through ONNX Runtime, and you control the **execution
provider** per model. In short:

- **CUDA** — NVIDIA GPUs, fastest when available.
- **DirectML** — any DirectX 12 GPU.
- **CPU** — always works; slower on heavy models.

CUDA acceleration requires the CUDA-enabled installer and an NVIDIA driver.
See the [Technical FAQ](/docs/faq/technical) for details.
