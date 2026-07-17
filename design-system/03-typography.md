# Typography

## ⚠️ Conflict with what's live

Source doc: **Anton** (display/headline) + **IBM Plex Sans** (body), loaded via Google Fonts
(`family=Anton&family=IBM+Plex+Sans:wght@400;500;600;700`).

Live now (`tailwind.config.ts`, `styles.css`): **Montserrat** only, for everything —
`fontFamily.sans: ['Montserrat', 'Avenir', 'Avenir Next', 'system-ui', 'sans-serif']`, and
`--font-heading: var(--font-sans)` (heading font is literally aliased to the same body font).

There is currently **no condensed/display typeface** on the live site at all, and no distinct
heading-vs-body font pairing. This is a real gap if the doc's intent — a shouty, condensed,
all-caps display face for headlines, dialed way up in size (96px display, 64px H1) — is the
target. Montserrat at those sizes reads soft/rounded, not like a stencil on a shipping container.

## Type scale (from the doc)

| Token | Size | Font | Case | Notes |
|-------|------|------|------|-------|
| Display | 96px | Anton, weight 400 | UPPERCASE | line-height 0.95 |
| H1 | 64px | Anton, weight 400 | UPPERCASE | line-height 1 |
| H2 | 40px | Anton, weight 400 | UPPERCASE | — |
| H3 | 28px | IBM Plex Sans, weight 700 | normal case | — |
| Body Lg | 20px | IBM Plex Sans | normal case | line-height 1.6, max-width 560px, color = Ink Muted-ish (`oklch(0.88 0.01 250)`) |
| Body | 16px | IBM Plex Sans | normal case | line-height 1.6, max-width 560px, color `oklch(0.80 0.02 250)` |
| Caption | 13px | IBM Plex Sans | UPPERCASE | letter-spacing 0.12em, color `oklch(0.62 0.02 250)` (Ink Muted-adjacent) |

Live equivalents for comparison — `tailwind.config.ts` currently only defines two custom sizes:
`hero` (3.4375rem = 55px, line-height 1) and `body-lg` (1rem = 16px, line-height 1.75). Everything
else falls back to default Tailwind scale. So the doc's scale is considerably more complete (7
named steps vs. 2) and considerably larger at the top end (96px/64px display vs. 55px hero).

## Hero copy example used in the doc (for tone reference, not literal copy to ship)

- H1 example: "You're not sinking." / hi-fi hero headline: "Your business isn't sinking. It's
  just not going anywhere."
- Body Lg example: "The sea never cared for a sailor's feelings. Only whether he was prepared."
- Body example: "You don't need us. You just can't get where you say you want to go without us."
- Caption example: "Rung 04 — Mechanism"

These match the tone already established in `01-copywriting-standards.mdc` and the live
`hero.tsx` / `letter-section.tsx` copy — no conflict on voice, only on the typeface rendering it.
