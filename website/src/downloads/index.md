---
title: Download Lumina
description: Download the latest Lumina release for Windows and Linux.
---

<script setup>
import DownloadButtons from '@theme/components/DownloadButtons.vue'
</script>

# Download Lumina

Lumina is available for **Windows** and **Linux**. Both packages bundle the
application and its local Python backend — model files are downloaded on demand
from inside the app.

<DownloadButtons />

## Which build should I choose?

### Windows

| Installer                   | Runs on                              | Notes                                                                                                                                      |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Lumina Setup — DirectML** | Any DirectX 12 GPU, including NVIDIA | Universal choice. Uses DirectML when a compatible GPU is present and falls back to CPU otherwise.                                          |
| **Lumina Setup — CUDA**     | NVIDIA GPUs only (RTX/GTX)           | Noticeably faster on NVIDIA hardware. Requires an NVIDIA GPU; downloads the ONNX Runtime once on first run to keep updates small. |

### Linux

| Package                    | Runs on                                  | Notes                                                                                                       |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Lumina AppImage — CPU**  | Universal `x86_64` Linux                 | Works out of the box on Wayland and X11 using ONNX Runtime CPU.                                             |
| **Lumina AppImage — CUDA** | `x86_64` Linux with NVIDIA CUDA drivers  | Uses NVIDIA CUDA 12. Downloads the Linux CUDA runtime archive once on first run.                             |

To integrate an AppImage into your Linux desktop environment (launcher shortcuts,
icons, and `.lmi` file associations), run:

```sh
bash scripts/install-linux-appimage.sh /path/to/Lumina-*.AppImage
```

::: tip Not sure?
If you have an **NVIDIA RTX/GTX** card, pick the **CUDA** build for the best
speed. Otherwise, pick **DirectML** on Windows or the **CPU AppImage** on Linux.
:::

> **CUDA on-demand runtime:** CUDA builds (Windows installer and Linux
> AppImage) do not bundle the ~1.4 GB ONNX Runtime and NVIDIA libraries
> directly. Instead, Lumina downloads and verifies the platform runtime archive
> (`cuda-runtime-win.7z` or `cuda-runtime-linux.tar.gz`) once into user data on
> first launch with a live extraction progress bar.

::: info Nightly builds
Automated **nightly** builds are published on every `main` commit for testing
upcoming features (such as the Pen tool, layer locking, and movable text
format bar). You can download them from the
[nightly release](https://github.com/lumina-tl/lumina/releases/tag/nightly) or
switch to the **Nightly** update channel in **Settings → General**.
:::

## System requirements

- 64-bit **Windows** (10 or newer recommended) or 64-bit **Linux** (`x86_64`,
  Wayland or X11)
- No GPU required — CPU-only machines work, just slower
- Storage space for the app and the models you choose to download
- Internet connection for the initial model downloads (and for translation, if
  you use an AI provider)

Models are **not** bundled with the release packages. On first launch, use
**Settings → Models** to download the ones you need.

## Verifying releases

Every release is published on GitHub, including the full changelog:

- [Lumina releases on GitHub](https://github.com/lumina-tl/lumina/releases)
- [Changelog](/changelogs/)
- [Project source code](https://github.com/lumina-tl/lumina)

See the [Installation FAQ](/docs/faq/install) for more details about the
installers, updates, and requirements.
