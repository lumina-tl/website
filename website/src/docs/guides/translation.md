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

| Provider   | Compatible with                         | Notes                                                                                                                                            |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Custom     | Any OpenAI- or Anthropic-compatible API | Bring your own base URL — Ollama, LM Studio, vLLM, OpenRouter, etc. An "Anthropic style" switch is available for Anthropic-compatible endpoints. |
| OpenRouter | OpenRouter                              | Uses your OpenRouter key and model                                                                                                               |
| Groq       | Groq (GroqCloud)                        | Uses your Groq key and model                                                                                                                     |
| Gemini     | Google Gemini                           | Uses your Gemini API key                                                                                                                         |

Providers load on demand: Lumina only imports the SDK for the provider you
actually use, so switching providers — or running local-only models — has no
startup cost for the others.

## API keys

- Keys are entered once in translation settings and stored in Lumina's local
  secrets vault, **encrypted with your operating system's credential facility**
  (DPAPI on Windows, Keychain on macOS, libsecret on Linux), then persisted to
  `secrets.json` in the app's user-data folder.
- If the OS encryption facility is unavailable, Lumina falls back to base64
  obfuscation rather than failing.
- Keys are **never** written to project files (`.lmi`) and never sent anywhere
  except directly to the provider you configured, as a request header.

## Target language and style

- Pick the **target language** for translation; it is stored per project (a
  non-secret setting embedded in `.lmi` files).
- A **style / instruction** field controls how the model translates. Lumina
  ships a default instruction file (`prompts/translate-default.md`) that you
  can load, and you can write your own to enforce terminology, tone, honorifics,
  or formatting rules.
- When translating, Lumina sends the preceding dialogue as context so names and
  phrasing stay consistent across bubbles.

## Privacy

Only the text of the page you translate is sent to your provider — never the
page image, and never any model or project data. Read more in the
[Privacy Policy](/privacy/) and the [General FAQ](/docs/faq/general).
