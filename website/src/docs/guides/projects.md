---
title: Projects & export
description: Work with Lumina projects — the .lmi file format, saving and opening projects, and exporting pages.
---

# Projects & export

## Saving a project

A Lumina project bundles everything about your work session into one file so
you can close it and pick up later — or hand it to someone else.

Use **Save** (<kbd>Ctrl</kbd> + <kbd>S</kbd>) or **Save As**
(<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>) from the menu or shortcut to
create a `.lmi` file. A `.lmi` file is a **zip archive** that contains:

- `project.json` — the manifest: page list, active page, text detections,
  layers, typography, and a non-secret subset of the translation settings
  (provider, target language, model/style choices).
- Every page's **source image** (copies, so the project is self-contained).
- Every **inpaint mask patch** (the PNGs Lumina uses to erase text).

::: tip What is _not_ stored
API keys are never written into `.lmi` files. Translation secrets stay in the
operating system's encrypted credential vault.
:::

### Auto-save and unsaved changes guard

- **Auto-save:** Configure automatic saving under **Settings → General**. You
  can define the interval (in seconds). Auto-save runs in the background and is
  automatically suspended while pipeline tasks or model downloads are active.
  The initial save is always manual so you can designate your file location.
- **Unsaved changes guard:** Closing the window or switching projects triggers
  a confirmation dialog (Save / Don't Save / Cancel) so work is never lost
  accidentally.

## Managing and reordering pages

- **Bottom page strip:** Drag and drop page thumbnails at the bottom of the
  workspace to reorder your chapter. A visible insertion marker highlights the
  target position.
- **Page deletions:** Deleting a page synchronizes all mirrored detection boxes
  and layer IDs cleanly.

## Opening a project

- Double-click a `.lmi` file — Lumina registers the file association and opens
  the project directly.
- Or use **Open project** (<kbd>Ctrl</kbd> + <kbd>O</kbd>) from the landing screen,
  which also displays recent projects and imported images.

Opening a project restores its pages, masks, layers, typography, and
translation settings so the page looks exactly as you left it.

## Exporting pages and documents

Open the **Export** dialog (<kbd>Ctrl</kbd> + <kbd>E</kbd> for the active page,
or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> for all pages):

1. **Re-order pages:** Adjust export sequence if needed (drag-and-drop within
   the export modal affects only the export order, not your project layout).
2. **Choose format:**
   - **PNG / JPG** — Flattened image files rendered at native resolution.
   - **PDF** — Combines and compiles rendered pages in project sequence into
     a single PDF document.
   - **Save as PSD** (preview feature) — Exports pages as Photoshop documents
     with separated layers and editable typography.
3. **Select destination:** Pick destination folder and export. Real-time export
   progress displays in the header and status notifications.
