# Rules extracted from the design-system doc

Every normative statement ("must/never/always/only") in the source doc, consolidated. Written in
the same register as `.cursor/rules/*.mdc` so any of these can be promoted into an actual rule
file once a decision is made. Each rule notes whether it's **already enforced** by an existing
rule/skill, **already true on the live site**, or **still open**.

## Structure

1. **One page, one continuous descent — no rung skips ahead of another.**
   Already enforced: `.cursor/rules/02-conversion-funnel.mdc`. Already true on live site (after
   this session's reorder fix).

2. **Nothing mid-page should resolve tension early.**
   Still open. The cold top nav (`site-header.tsx`) exposes "Pricing" and "Who We Are" as jump
   links reachable from second one on the page — a cold visitor can skip agitation, mechanism,
   and proof entirely. This directly violates this rule. See `01-ia-sitemap.md`.

3. **Collapse "Pricing" and "Who We Are" out of the cold top nav into the footer only.**
   Still open — the specific fix for rule 2. Nav should trim to logo + one link + one button
   (see `09-hifi-components.md`, Hero section).

4. **The Last Call rung gets a single CTA. Nothing else competing.**
   Still open. `contact-section.tsx` currently ships 3 competing exits (apply CTA, email link,
   WhatsApp button) plus decorative blur elements. See `09-hifi-components.md` §6.

5. **Don't build new sections for "how it works" / "the gap" content — fold it into Mechanism
   (rung 4) or Offer Stack (rung 6) instead of leaving it as unnamed floating sections.**
   Still open (decision, not yet made) — live has both as standalone named sections
   (`ProcessSection`, `GapSection`). Not wrong content, just not folded into a named rung per this
   rule. See `01-ia-sitemap.md`.

6. **Banned words: "Compare Features," "Detailed Breakdown," "Expand each feature."**
   Already enforced: fixed in `packages-section.tsx` this session (tab labels renamed to "What
   Changes Per Lane" / "What You Actually Get").

7. **Don't design/build the testing-ground, teaching, or "Tipper-intro" sites this pass — just
   keep nav/footer slots open for them.**
   Already true — nothing has been built for these. Note: "Tipper-intro" is a foreign-template
   leftover, not a real product name; see the callout in `01-ia-sitemap.md`.

## Visual system

8. **Background darkens and type weight climbs as the visitor scrolls down the ladder — even at
   wireframe stage, the descent should be felt.**
   Partially enforced qualitatively by `.cursor/rules/03-ui-visual-system.mdc`. Not implemented
   as a concrete token/formula on the live site — flat single-color backgrounds throughout. See
   `07-depth-scroll-intensity.md` for the exact formula to implement against, contingent on rule
   10 below.

9. **Icon/motif direction: nautical only. No rockets, lightbulbs, or handshakes.**
   Consistent with existing brand voice rules. No icon system exists yet to check compliance
   against — open by omission, not violation. See `06-icons-motifs.md`.

10. **Color and type system — OPEN DECISION, not yet a rule.**
    The doc's oklch depth-scale + gold/rust palette and Anton/IBM Plex Sans type pairing conflict
    with the live hex-based navy/orange palette and Montserrat-only type system. This doc does
    not get to unilaterally overrule what's shipped — flagging as a decision required before any
    of rules 8–9 can be fully implemented. See `02-color-tokens.md` and `03-typography.md` for
    the three options (migrate / adapt / ignore).

## Pricing / offer stack

11. **Exactly one tier gets the "RECOMMENDED" ribbon at a time, controlled by a single toggle
    (default: the top tier, "Ocean").**
    Open — not yet confirmed whether `packages-section.tsx`'s recommended-tier logic is a single
    source of truth or hardcoded per-tier. See `09-hifi-components.md` §5.

12. **CTA copy escalates with commitment level: lower tiers use lower-commitment verbs (Apply),
    higher tiers use higher-commitment verbs (Commit → Let's talk).**
    Consistent with `.cursor/skills/cta-escalation/SKILL.md`. Open — worth confirming
    `packages-features.ts` CTA copy actually escalates this way per tier.

13. **Price display: never show a literal "???" for a variable-price tier — resolve to something
    concrete ("Custom," "FREE + explainer," etc.).**
    Already enforced — fixed in `packages-section.tsx` this session (Port tier now shows "FREE").

## CTA copy mechanic

14. **CTA copy escalates in aggression as the funnel deepens — same button, same color, later
    copy hits harder** ("See the gap" → "Show me what I'm doing wrong" → "Prove us wrong" →
    "Stop being fine").
    Already enforced conceptually: `.cursor/skills/cta-escalation/SKILL.md`. This doc adds a
    concrete font-size/weight ramp (13→17px, 700→800) to pair with the copy escalation — not yet
    matched anywhere in live CSS. See `05-buttons-cta.md`.

## What's NOT a rule here

The doc's specific pixel values, hex/oklch numbers, and exact copy strings (headlines, button
labels) are **reference content**, not rules — they're documented in `02`–`09` for reuse, but
none of them are "must" statements the way the items above are. Treat this file as the checklist;
treat `02`–`09` as the lookup tables you consult once a rule here says "go implement this."
