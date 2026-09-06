---
title: Projects & export
description: Work with Lumina projects — the .lmi file format, saving and opening projects, and exporting pages.
---

# Projects & export

## Saving a project

A Lumina project bundles everything about your work session into one file so
you can close it and pick up later — or hand it to someone else.

Use **Save** / **Save As** from the app menu to create a `.lmi` file. A
`.lmi` file is a **zip archive** that contains:

- `project.json` — the manifest: page list, active page, text detections,
  layers, typography, and a non-secret subset of the translation settings
  (provider, target language, model/style choices).
- Every page's **source image** (copies, so the project is self-contained).
- Every **inpaint mask patch** (the PNGs Lumina uses to erase text).

::: tip What is _not_ stored
API keys are never written into `.lmi` files. Translation secrets stay in the
operating system's encrypted credential vault.
:::

## Opening a project

- Double-click a `.lmi` file — Lumina registers the file association and opens
  the project directly.
- Or use **Open project** from the landing screen, which also lists your
  recent projects and images.

Opening a project restores its pages, masks, layers, typography, and
translation settings so the page looks exactly as you left it.

## Exporting images

To produce the final translated pages:

1. Open the **Export** dialog (export the active page, or every page).
2. Re-order pages if needed — reordering here changes only the export order,
   never your working project.
3. Choose PNG or JPG and pick a destination folder.

Export renders each page at its natural resolution, flattening all layers
(masks, cleanup work, and typeset text) into the final image.
