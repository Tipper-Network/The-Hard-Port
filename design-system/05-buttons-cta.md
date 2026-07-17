# Buttons & CTA escalation

## Button variants (from the doc)

| Variant | Style |
|---------|-------|
| Primary — default | Gold fill (`oklch(0.80 0.14 85)`), dark text (`oklch(0.14 0.03 250)`), no border, `border-radius: 2px`, bold uppercase, hover darkens to `oklch(0.70 0.15 80)` |
| Primary — disabled | Flat gray fill (`oklch(0.40 0.02 250)`), muted gray text (`oklch(0.65 0.02 250)`), same shape |
| Secondary — ghost | Transparent fill, 1.5px Ink-colored border, Ink text, hover swaps border+text to Gold |

Shape is near-square (`2px` radius) across all variants — reads as sharp/industrial, not soft.

## Live comparison

`link_button.tsx`'s current CTA: `bg-accent` (orange), white text, **no border-radius class at
all** (square corners — actually even sharper than the doc's 2px, no real conflict there), bold
uppercase, `hover:-translate-y-0.5` (lift on hover, doc uses a color-shift hover instead — these
aren't mutually exclusive, could combine both). Tailwind config also defines an unused
`--radius-button: 0.25rem` (4px) token that nothing currently applies. Shape-wise: close enough,
not worth reconciling urgently. Color-wise: same orange-vs-gold conflict as `02-color-tokens.md`.

No ghost/secondary or disabled button variant exists yet in the codebase as a shared component —
worth building once the primary color decision is made, since the mechanism section ("Boosting
vs. Campaign") and hero ("Watch the truth" + "Apply for the free slot" side-by-side) both use a
primary+ghost pair.

## CTA escalation copy (the actual point of this section)

The doc's CTA copy examples **escalate in aggression as font-size climbs** — same button, same
color, later-funnel copy hits harder:

| Size | Copy | Reads as |
|------|------|----------|
| 13px | "See the gap" | Low commitment, early funnel |
| 14px | "Show me what I'm doing wrong" | Mid-funnel, self-directed challenge |
| 15px | "Prove us wrong" | Higher stakes, confrontational |
| 17px, weight 800 | "Stop being fine" | Last Call — hardest line, heaviest weight |

This is a visual encoding of `24-skill-cta-escalation.mdc`'s "CTAs escalate with funnel depth"
rule — same mechanic, this doc just adds a concrete size/weight ramp (13→17px, 700→800 weight) to
pair with it. Actual per-rung CTA copy used elsewhere in the doc's hi-fi mockups:

- Hero: "Watch the truth" (primary) / "Apply for the free slot" (ghost)
- Letter (Agitation): "Show me what I'm doing wrong"
- Scarcity: generic "CTA" placeholder (not specified)
- Pricing — Port: "Apply" / Sea: "Commit" / Ocean: "Let's talk"
- Last Call: "Apply for the free slot" (only CTA on the page at this point — nothing else
  competing, matches the ladder's rung-9 rule)
