---
title: Troubleshooting
description: Common Lumina problems and how to fix them — model downloads, GPU issues, translation errors, and more.
---

# Troubleshooting

If you run into a problem that isn't covered here, search the
[open issues](https://github.com/lumina-tl/lumina/issues) on GitHub first, then
open a new one with as much detail as you can — log output, your GPU, and which
installer (DirectML or CUDA) you used.

## Model downloads

**Download is slow or fails.**
Models can be large (the vision-language OCR model is ~1.2 GB). Check your
connection, free disk space, and retry from **Settings → Models**. Downloads
can be resumed by retrying.

**A model never shows as ready after downloading.**
Verify the models directory location under **Settings → Models** and confirm
the files landed in the per-model subfolder (e.g. `%APPDATA%\Lumina\models` on
Windows or `~/.config/lumina/models` on Linux).
You can also place model files manually there.

## Performance and GPU

**Everything is slow.**
Lumina falls back to CPU when no supported GPU is available, and some models
are CPU-only by design (see the [models table](/docs/guides/models)). Check
that the execution provider is set per model in the settings, and consider the
CUDA installer if you have an NVIDIA card.

**CUDA errors or "provider not available".**
Make sure you installed the **CUDA build** (Windows CUDA installer or Linux CUDA
AppImage, not DirectML/CPU) and that your NVIDIA driver is reasonably recent. If
in doubt, the DirectML installer (Windows) or CPU AppImage (Linux) is the
universal fallback.

**Out of memory or GPU VRAM exhaustion.**
- Inspect the live **System Resources** chip in the status bar to verify current
  RAM and GPU VRAM usage.
- Click the chip and click **Unload Models** to purge idle model weights and
  sessions from memory.
- For text detection, ensure `rfdetr_seg` is updated to the latest FP16 weights
  (~3.2 GB VRAM instead of the older 5.9 GB requirement).
- Uninstall unused models using the **Delete** button in **Settings → Models**
  to reclaim disk space and memory headroom.

## Translation

**Translation fails with an auth error.**
Re-enter the API key in **Settings → Translation**. Keys are stored encrypted;
if you reinstalled or changed user profiles the vault entry may be gone.

**Custom provider returns errors.**
Check the base URL, model name, and verify that the endpoint is reachable from
your computer. Custom providers must adhere to the standard OpenAI
`/v1/chat/completions` protocol (e.g. `http://localhost:11434/v1` for Ollama or
`http://localhost:1234/v1` for LM Studio). The deprecated Anthropic client has
been removed.

**Translation is empty or obviously wrong.**
Try another provider/model, or review the instruction/style field. Translating
with context (preceding bubbles) helps consistency — if the source language
isn't detected well, set it explicitly.

## The app or backend fails to start

- Make sure you installed with the matching installer for your GPU setup and
  that your antivirus/firewall isn't blocking the bundled backend or its local
  server.
- Fully quit and relaunch Lumina (including the tray icon if present).
- If the problem persists after a reinstall, open an issue on GitHub and attach
  the app log output.

## Diagnosing issues

The fastest way to get help is to reproduce the problem and describe it
precisely: which stage fails, which models are installed, your OS and GPU, and
the exact text of any error message.
