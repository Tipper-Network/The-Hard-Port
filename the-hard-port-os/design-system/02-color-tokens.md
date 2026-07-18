# Color tokens

## ⚠️ Conflict with what's live

This doc proposes a **4-step navy depth scale + gold accent + rust alert**, in `oklch()`. What's
actually live in `apps/web/src/styles.css` and `lib/brand.ts` is a **2-color navy/light-blue
system + orange accent**, in hex. These are not the same palette. Before applying any token
below, this needs an explicit decision — see `RULES.md`.

| Token | Live now (`styles.css` / `brand.ts`) | This doc proposes |
|-------|----------------------------------------|--------------------|
| Base background | `--color-navy: #0a2c75` (single flat navy) | 4-step depth scale, `oklch(0.14 0.03 250)` (deepest) up to `oklch(0.32 0.055 250)` (lightest surface) |
| Primary text | `--color-light-blue: #f3fbff` | `oklch(0.97 0.01 250)` "Ink" |
| Secondary text | not tokenized separately (uses opacity, e.g. `text-white/70`) | `oklch(0.72 0.03 250)` "Ink Muted" |
| Accent / primary CTA | `--color-orange: #ff6b17` | `oklch(0.80 0.14 85)` "Gold" |
| Alert / scarcity / "wrong" | not tokenized (reuses accent) | `oklch(0.62 0.16 35)` "Rust" — a distinct color from the CTA accent |

## This doc's proposed tokens (source of truth for this file)

| Name | Value | Use |
|------|-------|-----|
| Deepest | `oklch(0.14 0.03 250)` | Base background / "trench" — deepest sections (Last Call) |
| Navy | `oklch(0.20 0.045 250)` | Section background |
| Navy Mid | `oklch(0.26 0.05 250)` | Cards / panels |
| Navy Light | `oklch(0.32 0.055 250)` | Surface / hero |
| Ink | `oklch(0.97 0.01 250)` | Primary text |
| Ink Muted | `oklch(0.72 0.03 250)` | Secondary text |
| Gold | `oklch(0.80 0.14 85)` | Primary CTA — replaces orange |
| Rust | `oklch(0.62 0.16 35)` | Alert / scarcity / "wrong" state — distinct from the CTA color |

## Why this matters, not just aesthetically

The **4-step depth scale is load-bearing for the scroll-intensity mechanic** — see
`07-depth-scroll-intensity.md`. A single flat navy background (what's live now) can't visually
escalate depth as the visitor scrolls; the doc's whole "background darkens as you go deeper"
idea depends on having 4 distinct navy steps to move through, not one.

The **Rust/Gold split** also matters functionally, not just visually: it lets "wrong" states
(the boosting column's ✕ marks, agitation warnings) read as a different color from "the thing
we want you to click" (CTAs). Live site currently has no separate alert color, so ✕ marks and
CTAs risk visually competing for the same attention.

## Decision this forces

Three options, not evaluated here — just named, so the choice is explicit rather than accidental:

1. **Migrate** — replace the orange/navy hex system with this oklch depth-scale + gold + rust
   system. Bigger visual change; matches this doc's wireframes/hi-fi exactly.
2. **Adapt** — keep orange as the accent (it's established brand identity at this point,
   referenced in `00-brand-core.mdc` implicitly via the live site), but adopt the 4-step navy
   depth scale and a separate rust/alert token. Smaller change, keeps current brand recognition.
   would require `03-ui-visual-system.mdc` to gain a real depth-scale spec (it currently just says
   "background gets darker... as the visitor moves down the page" with no concrete tokens).
3. **Ignore** — treat this doc as exploratory/reference only, keep the current 2-color system as
   canonical. Loses the depth-scale mechanic and the rust/gold distinction.

This is a real design decision, not a copy-paste. Flagging it rather than picking for you.
