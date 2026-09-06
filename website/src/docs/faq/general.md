---
title: General FAQ
description: Frequently asked questions about Lumina — what it is, its license, platforms, and privacy.
---

# General FAQ

## What is Lumina?

**Lumina** is a free, open-source desktop application for translating manga,
manhwa, and manhua. It automates the core pipeline — text detection, OCR,
translation, inpainting, and typesetting — but keeps every step editable:
full automation is rarely accurate enough, so a light human pass is expected to
polish the final result.

## Is my artwork uploaded anywhere?

No. All models run locally on your machine through ONNX Runtime, and page
images never leave your computer. The only stage that calls an external API is
translation, which sends just the text you are translating to the provider you
chose (never the images). See the [Privacy Policy](/privacy/).

## Is Lumina open source?

Yes. The source code lives at
[github.com/lumina-tl/lumina](https://github.com/lumina-tl/lumina) and is
released under the [MIT License](https://github.com/lumina-tl/lumina/blob/main/LICENSE).

Model files are **not** covered by that license — they are downloaded
separately and each carries its own license terms (for example, the default
detector `rtdetr` is Apache-2.0, while the segmentation detector `rfdetr_seg`
is restricted to academic, non-commercial research use).

## Which platforms does Lumina support?

Currently **Windows only**. Lumina ships two Windows installers (DirectML and
CUDA). macOS and Linux builds are not available yet — see the
[Installation FAQ](/docs/faq/install).

## Does Lumina need an internet connection?

Not for the core pipeline. Detection, OCR, inpainting, and typesetting run
entirely offline once models are downloaded. Internet is only needed to
download models and to use AI translation providers.

## Does Lumina require an AI provider or API key?

No. You can run detection, OCR, inpainting, and typesetting without any API
key. Translation is the only step that can call external AI APIs, and it is
fully optional.

## Where can I report bugs or request features?

Open an issue on the
[Lumina repository](https://github.com/lumina-tl/lumina/issues). For known
issues and planned work, see `TODO.md` in the repository, and for the release
history see the [Changelog](/changelogs/).
