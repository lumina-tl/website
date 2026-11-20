---
title: Translation settings
description: Configure translation providers in Lumina — custom APIs, OpenRouter, Groq, and Gemini — and how API keys are handled.
---

# Translation settings

Translation is the **only stage in Lumina that calls an external AI API**.
Detection, OCR, inpainting, and typesetting run fully offline; translation
sends only the text segments you choose to the provider you configure.

Configure everything under **Settings → Translation**.

## Providers

Lumina organizes translation providers into visual cards with custom model and
endpoint controls under **Settings → Translation**:

| Provider | Compatible with | Notes |
| --- | --- | --- |
| **Google Gemini** | Google Gemini | Official Google API. Uses your Gemini API key — see [How to get your API key](#how-to-get-your-api-key) for a free-tier setup. |
| **OpenRouter** | OpenRouter | Unified model gateway. Connects to hundreds of models using your OpenRouter API key. |
| **xAI / Groq** | Groq (GroqCloud) / xAI Grok | High-speed inference providers using your Groq or xAI API key and model. |
| **Custom** | Any OpenAI-compatible API | Connect to local LLMs (Ollama, LM Studio, vLLM) or any custom OpenAI-compatible `/v1/chat/completions` endpoint. |

Providers load on demand: Lumina only imports the client module for the
provider you actively select, eliminating startup overhead for unused services.

## API keys

- Keys are entered once in translation settings and stored in Lumina's local
  secrets vault, **encrypted with your operating system's credential facility**
  (DPAPI on Windows, Keychain on macOS, libsecret on Linux), then persisted to
  `secrets.json` in the app's user-data folder.
- If the OS encryption facility is unavailable, Lumina falls back to base64
  obfuscation rather than failing.
- Keys are loaded in parallel on startup and **never** written to project files
  (`.lmi`) or sent anywhere except directly to your designated translation provider.

### How to get your API key

Each provider issues keys from its own developer dashboard. The flow is always
the same: generate an API key, copy it, and paste it into
**Settings → Translation**.

#### Gemini (Google AI Studio)

1. Open <https://aistudio.google.com/app/apikey> and sign in with a Google
   account.
2. Click **Create API key**. If asked to pick a Google Cloud project, choose
   one or let AI Studio create a new one automatically.
3. Copy the key right away (it starts with `AIza...`).
4. In Lumina, open **Settings → Translation**, select the **Google Gemini** card,
   paste the key, and choose your preferred model (e.g. Gemini 1.5 Flash).

The free tier offers substantial monthly requests and token allowances for
casual translation.

## Target language and localization prompts

- **Target language:** Choose from quick presets for popular comic translation
  languages, or enter any custom ISO language code. Target language is saved
  per project in `.lmi` files.
- **System instruction:** Lumina uses a specialized localization instruction
  template (`prompts/translate-default.md`) designed to optimize dialogue
  naturalness, speech bubble spatial constraints, OCR cut-off reconstruction,
  and tone matching without language-specific hardcoding.
- **Dynamic variables:** Insert `{{target_language}}` and `{{previous_line}}`
  chips into your custom instruction prompt so the AI retains narrative
  continuity and naming consistency across consecutive bubbles.
- **Quick actions:** Use **Reset to Default** to restore the standard comic
  prompt or **Clear** to start from a blank instruction.

## Privacy

Only the text of the page you translate is sent to your provider — never the
page image, and never any model or project data. Read more in the
[Privacy Policy](/privacy/) and the [General FAQ](/docs/faq/general).
