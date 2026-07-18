# The Hard Port — Design System (extracted)

Source: `Hard Port - Design System & Wireframes.dc.html` (internal review doc). This folder
splits that single file into one markdown doc per design-system concept, so each piece can be
read, referenced, and applied independently.

**Every file below notes where the source doc's values match or conflict with what's actually
live in `apps/web`** (Tailwind config, `styles.css`, `brand.ts`). The short version: the source
doc proposes a **different palette and typeface** than what's currently shipped. See
`02-color-tokens.md` and `03-typography.md` for the exact conflict, and `RULES.md` for the
decision this forces.

## Files

| File | Concept |
|------|---------|
| [`01-ia-sitemap.md`](./01-ia-sitemap.md) | The 9-rung ladder + live-site audit flags |
| [`02-color-tokens.md`](./02-color-tokens.md) | Color palette — **conflicts with live tokens** |
| [`03-typography.md`](./03-typography.md) | Type scale — **conflicts with live font** |
| [`04-spacing.md`](./04-spacing.md) | Spacing scale |
| [`05-buttons-cta.md`](./05-buttons-cta.md) | Button variants + CTA escalation copy |
| [`06-icons-motifs.md`](./06-icons-motifs.md) | Nautical icon/motif direction |
| [`07-depth-scroll-intensity.md`](./07-depth-scroll-intensity.md) | Scroll-depth escalation tokens |
| [`08-wireframe-patterns.md`](./08-wireframe-patterns.md) | Low-fi layout pattern per rung |
| [`09-hifi-components.md`](./09-hifi-components.md) | Hi-fi spec for 6 core sections |
| [`RULES.md`](./RULES.md) | Every normative "must/never" statement, extracted and consolidated |

## How to use this

1. Read `RULES.md` first — it's the short list of things that are wrong or missing on the live
   site right now, per this doc's own audit.
2. Read `02-color-tokens.md` and `03-typography.md` before touching any token — there's a real
   decision to make there, not just a copy-paste.
3. Everything else (`04`–`09`) is reference detail to pull from when building/revising a
   specific section.
