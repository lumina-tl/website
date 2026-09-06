---
title: Download Lumina
description: Download the latest Lumina release for Windows.
---

<script setup>
import DownloadButtons from '@theme/components/DownloadButtons.vue'
</script>

# Download Lumina

Lumina is currently available for **Windows** as two installers, one per
execution provider. Both bundle everything you need to run — the Python
backend is included; model files are downloaded on demand from inside the app.

<DownloadButtons />

## Which installer should I choose?

| Installer                   | Runs on                              | Notes                                                                                                   |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| **Lumina Setup — DirectML** | Any DirectX 12 GPU, including NVIDIA | Universal choice. Uses DirectML when a compatible GPU is present and falls back to CPU otherwise.       |
| **Lumina Setup — CUDA**     | NVIDIA GPUs only (RTX/GTX)           | Noticeably faster on NVIDIA hardware. Requires a reasonably recent NVIDIA driver and a larger download. |

::: tip Not sure?
If you have an **NVIDIA RTX/GTX** card, pick the CUDA installer for the best
speed. If you don't know your GPU — or don't have one — the DirectML installer
is the safe choice: it works everywhere.
:::

## System requirements

- 64-bit **Windows** (10 or newer is recommended)
- No GPU required — CPU-only machines work, just slower
- Storage space for the app and the models you choose to download
- Internet connection for the initial model downloads (and for translation, if you use an AI provider)

Models are **not** bundled with the installer. On first launch, use
**Settings → Models** to download the ones you need.

## Verifying releases

Every release is published on GitHub, including the full changelog:

- [Lumina releases on GitHub](https://github.com/lumina-tl/lumina/releases)
- [Changelog](/changelogs/)
- [Project source code](https://github.com/lumina-tl/lumina)

See the [Installation FAQ](/docs/faq/install) for more details about the
installers, updates, and requirements.
