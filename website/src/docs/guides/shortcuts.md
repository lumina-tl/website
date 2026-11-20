---
title: Keyboard shortcuts
description: Default keyboard shortcuts in Lumina and how to customize them.
---

# Keyboard shortcuts

Lumina provides keyboard shortcuts for fast canvas navigation, tool switching,
and project management. All shortcuts can be customized from
**Settings → Shortcuts**.

## Canvas tools

| Shortcut | Tool | Description |
| --- | --- | --- |
| <kbd>V</kbd> | Select | Move, resize, and inspect detected regions or text layers |
| <kbd>L</kbd> | Lasso | Freehand marquee selection |
| <kbd>R</kbd> | Rectangle | Rectangular marquee selection |
| <kbd>T</kbd> | Text | Create and edit typography layers |
| <kbd>B</kbd> | Brush | Draw manual inpaint and cleanup strokes |
| <kbd>E</kbd> | Eraser | Erase cleanup strokes or mask areas |
| <kbd>G</kbd> | Paint bucket | Flood-fill regions on the canvas |
| <kbd>I</kbd> | Eyedropper | Pick colors directly from the active page |
| <kbd>[</kbd> | Brush size down | Decrease active brush size by 1px |
| <kbd>]</kbd> | Brush size up | Increase active brush size by 1px |

## Navigation and zoom

| Shortcut | Action | Description |
| --- | --- | --- |
| <kbd>Ctrl</kbd> + <kbd>=</kbd> | Zoom in | Enlarge the active canvas view |
| <kbd>Ctrl</kbd> + <kbd>-</kbd> | Zoom out | Reduce the active canvas view |
| <kbd>Ctrl</kbd> + <kbd>0</kbd> | Fit to screen | Reset zoom and center the page in the viewport |

## Project and history

| Shortcut | Action | Description |
| --- | --- | --- |
| <kbd>Ctrl</kbd> + <kbd>Z</kbd> | Undo | Revert the last canvas or layer change |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> | Redo | Reapply the reverted change |
| <kbd>Ctrl</kbd> + <kbd>O</kbd> | Open project | Open an existing `.lmi` project file |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Save | Save the current project |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | Save As | Save the project to a new file location |
| <kbd>Ctrl</kbd> + <kbd>E</kbd> | Export current page | Open export modal for the active page |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> | Export all pages | Open export modal for all project pages |

## Selection modifiers

When using the Lasso (<kbd>L</kbd>) or Rectangle (<kbd>R</kbd>) selection tools:

- **Add to selection**: Hold <kbd>Shift</kbd> while dragging to expand the active selection.
- **Subtract from selection**: Hold <kbd>Alt</kbd> while dragging to cut areas out of the active selection.
- **Cancel inline text edit**: Press <kbd>Escape</kbd> while editing a text layer to discard pending typing.
- **In-place text edit**: Double-click any layer in the sidebar or any text node on the canvas to open the inline text editor.

## Customizing shortcuts

1. Open **Settings** (gear icon) and select the **Shortcuts** tab.
2. Click on the key combination for any action.
3. Press your preferred key combination. The manager automatically checks for conflicts.
4. Click **Reset all to default** at any time to restore the original keybindings.
