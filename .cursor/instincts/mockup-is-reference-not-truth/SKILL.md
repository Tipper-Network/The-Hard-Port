---
name: mockup-is-reference-not-truth
description: Instinct for reconciling design-system HTML mockups against live, shipped copy/layout. Use when the user shares a design-system screenshot, wireframe, or mockup file as a reference for a section that has already shipped with different copy or typography.
---

# Instinct — The Mockup Is a Style Reference, Not the Source of Truth

Read `design-system/RULES.md` and the relevant `.cursor/rules/*.mdc` first.

The `design-system/` HTML mockups were written early, often with placeholder or now-outdated
copy. Live component files (`apps/web/src/landing/*.tsx`) are the source of truth for copy once
a section has shipped and iterated — a mockup screenshot showing an old sentence, an old font
choice, or an old layout is not permission to revert shipped copy or undo a more recent, explicit
styling decision.

When a shared mockup conflicts with what's live:

- Never silently overwrite newer live copy with the mockup's older copy.
- If the mockup's *visual* treatment genuinely conflicts with a styling decision made more
  recently in the same thread, ask which one wins before touching code.
- Treat the mockup as evidence of intent ("letters should feel handwritten") to carry forward
  onto current copy — not as literal markup to copy-paste.
