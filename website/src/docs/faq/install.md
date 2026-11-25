---
title: Installation FAQ
description: Frequently asked questions about installing and updating Lumina.
---

# Installation FAQ

## Which build should I download?

### Windows

- **Lumina Setup — DirectML** runs on any DirectX 12 GPU — including NVIDIA —
  and falls back to CPU on machines without a compatible GPU. Choose this if
  you don't have an NVIDIA RTX/GTX card.
- **Lumina Setup — CUDA** is NVIDIA-only and **highly recommended over the
  DirectML installer if you have an NVIDIA RTX/GTX card** — it's noticeably
  faster. It requires a reasonably recent NVIDIA driver.

### Linux

- **Lumina AppImage — CPU** is a universal `x86_64` AppImage using ONNX
  Runtime CPU, with Wayland and X11 auto-detection.
- **Lumina AppImage — CUDA** targets `x86_64` Linux systems with proprietary
  NVIDIA drivers for CUDA 12 acceleration.

To integrate the AppImage into your desktop environment (launcher shortcuts,
icons, and `.lmi` file associations), run:

```sh
bash scripts/install-linux-appimage.sh /path/to/Lumina-*.AppImage
```

Both Windows and Linux packages configure the app and its Python backend
automatically, so no manual backend or Python installation is required. CUDA
builds download and verify the platform ONNX Runtime archive
(`cuda-runtime-win.7z` or `cuda-runtime-linux.tar.gz`) once on first launch
with a live extraction progress bar, keeping initial downloads small and
updates differential.

## What are the system requirements?

- 64-bit **Windows** (10 or newer recommended) or 64-bit **Linux** (`x86_64`,
  Wayland or X11)
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
from inside the app. Both Windows installers support differential auto-updates
via their respective channels (`dml` or `cuda`). You can also grab the latest
package from the
[releases page](https://github.com/lumina-tl/lumina/releases) at any time.

::: info Nightly
In **Nightly** builds, **Settings → General** adds a **Stable / Nightly**
update channel selector along with a visible installation progress bar.
:::

## Is Lumina available for macOS?

Not yet. Current builds target Windows and Linux. There is no published
timeline for macOS — follow the repository for announcements.

## Can I run two Lumina installs side by side?

You can install the DirectML and CUDA variants separately if you want to
compare them, but keep in mind they share the same app data directory unless
you override it with `LUMINA_MODEL_DIR` for the models folder.

## Do I need to install Python or ONNX Runtime myself?

No. The Python backend is managed entirely by the app. The Windows DirectML
installer and Linux CPU AppImage pre-bundle their execution provider, while
CUDA builds automatically download and verify the CUDA ONNX Runtime on your
first launch. See the [Technical FAQ](/docs/faq/technical) if you want to run
from a source checkout instead.
