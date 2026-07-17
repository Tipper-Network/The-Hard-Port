# Last evolve

**last_run:** 2026-07-17 (run 1 — first real evolve pass since bootstrap)
**Loop home:** `.cursor/skills/training-loop/`
**Edit budget:** 2 / 3 used

## What run 1 actually was

Run 0 (bootstrap) seeded 6 rollout rows and 9 instincts but never exercised the loop end-to-end.
This session's visual-escalation work (Hero, Letter, Boosting, Packages, FAQ, depth tokens) gave
real forward-pass evidence, so this is the first genuine backward → bounded update → gate → land
cycle.

### Stage 2 — Forward (appended to `ROLLOUT.yaml`)

4 new rows, `obs-20260717-007` through `-010`, all against `03-ui-visual-system.mdc`: 1 `fail`
(depth-ramp floor), 2 `correction` (Hero CTA hierarchy, featured-tier elevation), 1 `pass`
(letter panel lift-off).

### Stage 3 — Backward

`03-ui-visual-system.mdc` hit 3 fail/correction rows in one batch — the loop's own "3+
corrections on the same artifact" trigger, exactly. Root cause: the rule stated the *goal*
("intensity increases with depth") with no checkable criteria, so drift shipped quietly until a
live-site read caught it. Everything else tested clean this session (copy rules, funnel order,
offer construction) — no edits made there, per "resist over-editing what's working."

### Stage 4 — Bounded update (2 files used / 3 cap, 1 new instinct / 2 cap, 0 rule promotions)

1. **Landed.** `03-ui-visual-system.mdc` — added 3 hard criteria (no-floor depth ramp, one-CTA-
   full-weight-per-section, featured-choice-needs-elevation) and de-staled the scroll-indicator /
   sticky-CTA sections to point at the components that now actually ship them
   (`distance-meter.tsx`, `sticky-cta.tsx`).
2. **Landed.** New instinct `mockup-is-reference-not-truth` — design-system HTML mockups are
   style/intent references, never a silent source of truth over already-shipped live copy;
   surfaced twice this session (proof-section stats, letter-section salutation).
3. **Clipped.** Considered editing `cta-escalation` (copy-only skill) — checked, it's already
   correctly scoped to copy, not visual weight. No change needed; didn't spend budget on it.

### Stage 6 — Validation gate

Ran all 12 `HELDOUT.yaml` scenarios against the candidate text before landing. All 12 passed —
the edits are additive/clarifying inside `03-ui-visual-system.mdc` and one new instinct; nothing
touches copy rules, funnel order, guarantees, or the "avoid" list. `nautical-metaphor-break` (the
one scenario scoped to this file) passes since the "what to avoid" section was untouched.
`training-loop-forward` passes by construction — this run followed the report → gate → approve →
land sequence instead of editing rules mid-task.

## Instinct inventory

10 instincts now (9 from bootstrap + `mockup-is-reference-not-truth`), all `active`, confidence
`0.7` baseline except none yet adjusted by rollout evidence. See `.cursor/instincts/INDEX.md`.

## Next forward pass

Keep logging real rollout rows as tasks test these rules/instincts. Next full evolve run should
happen at `last_run` + 14 days (~2026-07-31), or sooner if 3+ corrections land on the same
artifact again — same trigger that fired this run.

**Next evolve due:** ~2026-07-31, or sooner on a 3x-correction trigger.
