---
title: Technical FAQ
description: Technical details about Lumina — models directory, execution providers, the local backend, and the .lmi format.
---

# Technical FAQ

## Where does Lumina store its models?

The models directory is resolved in this order:

1. The `LUMINA_MODEL_DIR` environment variable.
2. The location saved in **Settings → Models**.
3. The platform default `userData/models` —
   `%APPDATA%\Lumina\models` on Windows.

Each model lives in a subfolder named after its id (for example `anglenet/`).
In a source checkout, set `LUMINA_MODEL_DIR` in `.env` to keep using the repo's
`models/` folder.

## What is an execution provider?

Models run as ONNX graphs through ONNX Runtime. The "execution provider" is the
backend that executes the graph:

- **CUDA** — NVIDIA GPUs (fastest on supported hardware)
- **DirectML** — any DirectX 12 GPU
- **CPU** — universal fallback

You can choose the provider per model. The installer you use determines which
providers are available: the CUDA build ships CUDA support; the DirectML build
ships DirectML + CPU.

## Does Lumina run a server?

Yes, internally. Lumina spawns a small local **FastAPI** backend
(`localhost:8765`) that performs all model inference and translation requests.
It is started and stopped automatically by the app — you don't manage it, and
it is not exposed to the network.

## What is inside a `.lmi` project file?

A `.lmi` file is a zip archive containing:

- `project.json` — manifest with page list, detections, layers, typography,
  and non-secret translation settings
- copies of the source page images
- inpaint mask patches (PNG)

API keys are never stored in `.lmi` files. See
[Projects & export](/docs/guides/projects).

## How are translation API keys protected?

Keys are stored in Lumina's secrets vault and encrypted with the operating
system's credential facility (DPAPI on Windows, Keychain on macOS, libsecret
on Linux), persisted to `secrets.json` in the app's user-data folder. If the OS
facility is unavailable, a base64 obfuscation fallback is used. Keys are only
sent to the translation provider you configured, never to Lumina's servers
(there are none).

## Which models does Lumina support?

See the table in [Managing models](/docs/guides/models), including status,
execution providers, and licensing notes.

## Can I use a local LLM for translation?

Yes. The **Custom** provider works with any OpenAI- or Anthropic-compatible
endpoint — including local servers like Ollama, LM Studio, or vLLM — by
pointing Lumina at your own base URL. No text then leaves your machine.

## How do I run Lumina from a source checkout?

See the **Development** section of the
[README](https://github.com/lumina-tl/lumina#readme): set up a Python 3.13
virtual environment, install the backend requirements, then build and start
the Electron app. A GPU execution provider is optional for development.
