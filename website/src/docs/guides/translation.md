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
| Gemini     | Google Gemini                           | Uses your Gemini API key — see [How to get your API key](#how-to-get-your-api-key) for a free-tier example                                       |

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

### How to get your API key

Each provider issues keys from its own dashboard — the exact steps differ per
provider, but the flow is always the same: create a key on the provider's
site, then paste it into **Settings → Translation**.

As an example, here is how to get a **Gemini** key. We recommend Gemini for
getting started because Google AI Studio's free tier offers a large monthly
quota at no cost — plenty for casual translation.

#### Gemini (Google AI Studio)

1. Open <https://aistudio.google.com/app/apikey> and sign in with a Google
   account.
2. Click **Create API key**. If asked to pick a Google Cloud project, choose
   one or let AI Studio create a new one automatically — either works.
3. Copy the key right away. It starts with `AIza...` and is only shown once;
   if you lose it, delete it and create a new one.
4. In Lumina, open **Settings → Translation**, set **Provider** to **Gemini**,
   paste the key, and pick a model (e.g. the latest Gemini Flash).

The free tier gives you a monthly quota of requests and tokens that resets
automatically. Hitting the limit just means waiting for the next reset — or
upgrading to a paid tier if you need more.

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
