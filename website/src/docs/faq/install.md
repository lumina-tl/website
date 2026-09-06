---
title: Installation FAQ
description: Frequently asked questions about installing and updating Lumina.
---

# Installation FAQ

## Which installer should I download?

- **Lumina Setup — DirectML** runs on any DirectX 12 GPU — including NVIDIA —
  and falls back to CPU on machines without a compatible GPU. Choose this if
  you don't have an NVIDIA RTX/GTX card.
- **Lumina Setup — CUDA** is NVIDIA-only and **highly recommended over the
  DirectML installer if you have an NVIDIA RTX/GTX card** — it's noticeably
  faster. It requires a reasonably recent NVIDIA driver and is a larger
  download.

Both installers bundle the app and its Python backend, so no separate runtime
installation is needed.

## What are the system requirements?

- 64-bit Windows (10 or newer is recommended)
- A GPU is optional — CPU-only machines work, just slower
- Free disk space for the app and any models you download (some models exceed
  1 GB)
- An internet connection for model downloads and AI translation

## Do the installers include the AI models?

No. Models are downloaded on demand from inside the app
(**Settings → Models**) or placed manually in the models directory. See
[Managing models](/docs/guides/models).

## How do I update Lumina?

Lumina checks for new releases on GitHub and can download and install them
from inside the app. You can also grab the latest installer from the
[releases page](https://github.com/lumina-tl/lumina/releases) at any time.

## Is Lumina available for macOS or Linux?

Not yet. The current installers target Windows only. There is no published
timeline for other platforms — follow the repository for announcements.

## Can I run two Lumina installs side by side?

You can install the DirectML and CUDA variants separately if you want to
compare them, but keep in mind they share the same app data directory unless
you override it with `LUMINA_MODEL_DIR` for the models folder.

## Do I need to install Python or ONNX Runtime myself?

No. The Python backend and ONNX Runtime are bundled with the installer and
started automatically by the app. See the
[Technical FAQ](/docs/faq/technical) if you want to run from a source checkout
instead.
