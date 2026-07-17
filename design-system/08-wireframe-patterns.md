# Wireframe patterns (low-fi, mobile-first)

Eight 375px-wide phone frames, one per rung (rung 1 — the off-site video hook — has no on-site
frame, since it lives on IG/YT before the visitor ever lands). Each frame's background and type
weight follow the formula in `07-depth-scroll-intensity.md`. Pricing (rung 6) and FAQ (rung 8)
are covered inline here rather than getting their own hi-fi treatment beyond this.

## Per-rung layout pattern

**Rung 2 — Identity Match (Hero)**
Nav row (logo block + button block) → video-bg placeholder (120px) → two heading lines (92%/68%
width) → one subhead line (55% width) → CTA pair side-by-side (solid + dashed/ghost) → one small
caption line below. This is a hero with a real CTA pair, not a single button.

**Rung 3 — Agitation (Letter)**
No nav row. Eight full-width text lines varying 60–100% width (paragraph rhythm) → one centered
CTA below, set apart with margin-top. Reads as a wall of text with a single escape hatch at the
bottom — matches "the canonical letter, long-form, uninterrupted."

**Rung 4 — Mechanism**
One heading line (70% width) → two-column comparison (`Boosting` bordered in muted gray vs.
`Campaign` bordered in Ink/full-brightness) each with a label + 3–4 short lines → one summary line
below spanning most of the width. The visual hierarchy (dim/bordered-gray column vs.
bright/bordered-white column) *is* the argument — no need for extra copy explaining which side
wins.

**Rung 5 — Proof**
One heading line (75% width) → 2×2 stat grid, each cell = one big number block (Gold) + one label
line → one closer line below. Matches the hi-fi stats exactly (11 strategies, 5 independent
clients, $0/$270K).

**Rung 6 — Offer Stack (Pricing)**
One heading line (60% width) → three stacked tier blocks (not side-by-side at this frame width),
each: label line, price line (Gold), two detail lines, one full-width CTA outline. Third block's
border uses the Gold/highlight treatment — this is the "recommended" tier signal, controlled by a
single `highlightTier` value (default: `ocean`), not hardcoded per-tier.

**Rung 7 — Scarcity**
Two heading lines (85%/60% width, no subhead) → 4-row bullet list (Gold dot + line) → one CTA
pinned to the bottom via `margin-top: auto` (not inline after the content — deliberately anchored
low in the frame, like a closing door).

**Rung 8 — Objection Handling (FAQ)**
One heading line (65% width) → 6 accordion rows, each: one question line (varying width 55–80%)
+ a chevron. No answers shown expanded in the wireframe — the pattern is the accordion list
itself, not particular Q&A content.

**Rung 9 — Last Call**
Nothing but: one small rung label, one large centered heading block (88% width), one CTA block
(no text specified — deliberately abstracted, since at hi-fi stage this becomes "Apply for the
free slot"). Centered, generous whitespace, absolutely nothing else in the frame. This is the
starkest frame of all 8 — visually enforces "nothing else competing."

## The one control that ties them all together

A single `escalationIntensity` slider (1–3, default 2) redraws every frame's background darkness
and type weight at once — this is the same mechanic as `07-depth-scroll-intensity.md`, just
demonstrated here at wireframe fidelity before any real color/type decision has been locked in.
Confirms the depth mechanic is meant to be validated at low-fi *before* investing in the hi-fi
color system — worth doing that validation step for real (e.g. a quick prototype toggle) before
committing to the oklch palette.
