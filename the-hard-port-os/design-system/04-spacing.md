# Spacing scale

A 10-step scale, in px: **4, 8, 12, 16, 24, 32, 48, 64, 96, 128**.

Not a fully geometric progression — it doubles cleanly at the small end (4→8), then loosens to
roughly ×1.5 steps in the middle (16→24→32), then doubles again at the top (32→64, 64→128, with
48/96 as half-steps). Read it as "tight" (4–16, for gaps within a component), "medium" (24–48,
for gaps between elements in a section), and "loose" (64–128, for section padding and vertical
rhythm between rungs).

## Live comparison

Nothing in `tailwind.config.ts` or `styles.css` currently overrides Tailwind's default spacing
scale — the project uses Tailwind's stock scale (which is also a 4px base unit: 4, 8, 12, 16, 20,
24, 28, 32...). The doc's scale is a **subset** of Tailwind's default scale (same 4px base, just
fewer named stops at the loose end — 48/64/96/128 instead of every 4px increment). No conflict:
whatever spacing utility classes (`gap-4`, `p-16`, etc. via Tailwind's default `rem`-based scale)
are already in use should already land on or near these stops. No token migration needed here,
unlike color/type.

## Section padding, observed in the doc's own layouts

Section-level padding in the hi-fi mockups is consistently `80px 48px` (vertical/horizontal) at
desktop, dropping in the mobile phone-frame examples to roughly `16px`–`24px` internal padding.
Treat `80px` vertical as the default section padding rhythm at desktop, `48px` as the default
horizontal gutter — both fall cleanly within Tailwind's default scale (`py-20 px-12`).
