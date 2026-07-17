# Depth / scroll-intensity tokens

The core mechanic: **background darkens and type weight climbs as the visitor scrolls down the
ladder.** Even at wireframe/boxes-and-lines stage, the descent should be *felt*, not just read.

## The static 4-step version (design-system tile)

| Depth | Label | Example section | Type weight |
|-------|-------|------------------|--------------|
| 1 — Surface | Hook | `HOOK` | 400 |
| 2 — Mid-water | Mechanism | `MECHANISM` | 500 |
| 3 — Deep | Offer Stack | `OFFER STACK` | 700 |
| 4 — Trench | Last Call | `LAST CALL` | 800 |

## The actual formula (from the doc's live component logic)

This isn't just 4 fixed steps — the doc computes background lightness and font-weight
**per-section, procedurally**, across 8 named sections in ladder order (`hero, letter, mechanism,
proof, offer, scarcity, faq, lastcall`), driven by one input: `escalationIntensity` (range 1–3,
default 2). Reference implementation (JS from the doc):

```javascript
const intensity = escalationIntensity ?? 2; // 1-3, default 2
const stepL = 0.018 + 0.012 * intensity;
const names = ['hero','letter','mechanism','proof','offer','scarcity','faq','lastcall'];
names.forEach((n, i) => {
  const L = Math.max(0.08, 0.30 - i * stepL);
  const weight = Math.min(800, 420 + i * Math.round(35 * intensity));
  // background: oklch(${L} 0.045 250), font-weight: weight
});
```

At the default intensity of 2: `stepL = 0.042`. Lightness (`L`) starts at 0.30 (hero) and drops by
0.042 per rung, floored at 0.08 (reached by "scarcity," 5 rungs in — everything after that is
equally dark). Weight starts at 420 and climbs by `35 * intensity` (=70 at default) per rung,
capped at 800 (reached by "faq," rung 7).

This is a genuinely reusable idea: **one intensity slider controls the entire page's visual
pacing.** A subtler escalation (intensity 1) vs. a steeper one (intensity 3) is a single-number
change, not a per-section rewrite.

## Live comparison

Nothing like this exists in `apps/web`. Sections currently use a flat `bg-primary` (single navy)
with no per-section depth variation — `03-ui-visual-system.mdc` describes the *intent*
qualitatively ("background gets progressively darker... as the visitor moves down the page") but
has no concrete formula or token backing it. This doc's formula is the missing implementation
detail for that existing rule.

## What this requires to actually ship

1. A resolved color-depth decision (`02-color-tokens.md`) — this formula assumes the 4-step
   oklch navy scale exists to interpolate across. Can't implement gradual per-rung darkening
   against a single flat `--color-navy`.
2. A place to put the intensity constant / formula — likely a small utility
   (`lib/scroll-intensity.ts` or similar) that maps rung index → background lightness + heading
   weight, consumed by each landing section component in ladder order.
3. Decide whether this is worth the engineering cost at all vs. a simpler hand-picked 4-step
   background per section (matches the "Depth 1–4" table above, no formula needed). The formula
   buys tunability; the hand-picked version buys simplicity. Not deciding this here — see
   `RULES.md`.
