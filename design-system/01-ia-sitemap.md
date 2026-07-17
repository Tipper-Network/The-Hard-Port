# Information Architecture — the 9-rung ladder

One page, one continuous descent. This order is the whole IA — no rung skips ahead of another.

## The ladder

| # | Rung | What it does |
|---|------|---------------|
| 1 | **Hook (video)** | Off-site IG/YT "you vs you." Ends on a line that only resolves on-site. |
| 2 | **Identity Match** | "Your business isn't sinking — it's not going anywhere." Must land in the first 3 seconds of scroll. |
| 3 | **Agitation** | The canonical letter — long-form, uninterrupted. |
| 4 | **Mechanism** | Boosting vs. a Campaign, side-by-side contrast. |
| 5 | **Proof** | Anti-testimonial stats — the gap in traditional proof becomes the proof. |
| 6 | **Offer Stack** | Port / Sea / Ocean — a ladder being climbed, named for courage. |
| 7 | **Scarcity** | 2 free slots a month. Hard Port picks, not the applicant. |
| 8 | **Objection Handling** | FAQ — every answer matches the aggression of its question. |
| 9 | **Last Call** | Hardest line on the page. Single CTA. Nothing else competing. |

This matches `.cursor/rules/02-conversion-funnel.mdc`'s canonical ladder exactly — same 9 rungs,
same order, same descriptions. No conflict here; this doc is corroborating evidence for that rule.

## Live-site audit flags (from the source doc)

These were flagged against `thehardport.com` at the time the doc was written. Status below
reflects what's actually true in `apps/web` right now.

| Flag | Status | Note |
|------|--------|------|
| Scarcity (7) shipping before Offer Stack (6) | ✅ **Fixed** | `routes/index.tsx` now renders `PackagesSection` before `FreeSlotsSection`. |
| Off-ladder "Who We Are" block between pricing and FAQ | ✅ **Fixed** | Homepage `AboutSection` trimmed to a short teaser + link to `/about`; no longer a full competing block. |
| Banned words in the pricing comparison table ("Compare Features," "Detailed Breakdown," "Expand each feature") | ✅ **Fixed** | Tab labels rewritten in `packages-section.tsx`. |
| Cold nav skips the ladder (top nav exposes "Pricing"/"Who We Are" as jump links) | ⚠️ **Still live** | `site-header.tsx` nav links currently: The Truth, The Gap, Pricing, Who We Are, Apply free. A cold visitor can still jump straight to Pricing or About, skipping agitation/mechanism/proof. Not yet fixed — see `RULES.md`. |
| Two unlabeled sections need a home ("how it works" 4-step block, "gap: where you are / where you want to be" block) | ⚠️ **Partially addressed** | `ProcessSection` ("how it works") and `GapSection` both exist and render, but aren't explicitly folded into Mechanism (4) / Offer Stack (6) conceptually — they're separate named sections between rungs rather than sub-parts of a rung. Doc's suggestion: don't build new sections for these, fold their content into Mechanism/Offer Stack. Current implementation keeps them as standalone sections. Worth a deliberate decision, not an accident. |

## Extend later, don't build now

Collapse "Pricing" and "Who We Are" out of the cold top nav into the footer only. Testing-ground,
teaching, and "Tipper-intro" sites aren't designed this pass — keep nav/footer slots open for
them without restructuring the ladder.

> Note: "Tipper-intro" is verbatim from the source doc. It's almost certainly the same
> foreign-template leftover found in the `training-loop` skill (adapted from a "Tipper" project)
> — not a real Hard Port product. Read it as a placeholder for "whatever the next site/page in
> this network turns out to be," and don't build anything named "Tipper."
