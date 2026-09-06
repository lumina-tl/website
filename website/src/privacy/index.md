---
title: Privacy Policy
description: How Lumina and this website handle your data.
---

# Privacy Policy

Lumina is a **local-first desktop application**. The overwhelming majority of
what it does happens entirely on your computer, and it has no accounts, no
cloud sync, and no telemetry.

This page explains what data the app and this website touch, and where data
may leave your machine.

## The Lumina app

### Everything runs locally

Text detection, OCR, inpainting, typesetting, and model inference all run on
your own machine through ONNX Runtime. Page images and project files stay on
your disk. Lumina does **not** upload artwork, projects, or model data anywhere.

### Translation is the only online step

Translation is optional and opt-in. When you translate a page, Lumina sends
**only the text segments you are translating** (never page images) to the
translation provider you configured — for example OpenRouter, Groq, Gemini, or
a self-hosted endpoint. Everything else in the pipeline works offline.

### API keys

Keys for translation providers are stored in Lumina's local secrets vault,
encrypted with your operating system's credential facility — DPAPI on Windows,
Keychain on macOS, libsecret on Linux. They are never written into project
files (`.lmi`) and are only ever sent as request headers directly to the
provider you chose.

### Model downloads

Models are downloaded on demand from their respective public sources (for
example Hugging Face) when you install them through **Settings → Models**.
Lumina does not collect information about which models you use.

### Updates

When checking for updates, the app queries the public GitHub Releases API for
the `lumina-tl/lumina` repository.

## This website

This website is a static site and does **not** use analytics, advertising, or
third-party trackers, and it does not set cookies. If you contact us through
the GitHub repository, GitHub's own privacy policy applies to that interaction.

## Contact

If you have privacy concerns, please open an issue on the
[Lumina repository](https://github.com/lumina-tl/lumina/issues) or read the
[source code](https://github.com/lumina-tl/lumina).
