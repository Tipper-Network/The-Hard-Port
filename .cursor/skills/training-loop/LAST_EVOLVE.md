# Last evolve

**last_run:** 2026-07-17 (run 0 — bootstrap; this is the loop's first real run in this repo)
**Loop home:** `.cursor/skills/training-loop/`
**Edit budget:** 0 / 3 used

## What run 0 actually was

This loop was copy-pasted wholesale from a different project ("Tipper," a creator-subscription
app) and had never been adapted or run here. Run 0 is that adaptation, not a normal evolve pass:

- Rewrote `TRAINING-LOOP.md` and `INDEX.md` — fixed every path, dropped the `tipper-` prefix,
  pointed the PARAMETER stage at this repo's real `rules/instincts/skills` layout.
- Replaced all 12 `HELDOUT.yaml` scenarios — the originals tested a fintech app's schema
  migrations, subscription tiers, and wallet UI. New scenarios pressure-test this repo's actual
  rules/instincts/skills (fake testimonials, generic CTAs, funnel reordering, fake scarcity,
  fake guarantees, etc.).
- Reset `ROLLOUT.yaml` — cleared the other project's fake observation history, seeded 6 real
  rows from today's actual session work.
- Created the two operator skills the docs referenced but that never existed:
  `.cursor/skills/evolve/SKILL.md` and `.cursor/skills/trim/SKILL.md`.
- Created `.cursor/instincts/INDEX.md` — the parameter inventory the loop docs pointed at but
  that was never built.
- Fixed and ran `trim/scripts/inventory.sh` for real — see `trim/LAST_TRIM.md` for the first
  honest token-economy baseline (well under budget; no cuts needed).

## Held-out gate (HELDOUT.yaml) — not yet run

The new scenario set has not been run end-to-end yet. Next evolve run should open with a full
gate pass to confirm all 12 scenarios hold, since this is fresh content.

## Instinct inventory

9 instincts, all `active`, confidence `0.7` baseline (authored today, no rollout evidence yet).
See `.cursor/instincts/INDEX.md`.

## Next forward pass

Log to `ROLLOUT.yaml` as real tasks test these rules/instincts/skills. First full evolve run
(stages 2-6) should happen once `ROLLOUT.yaml` has meaningfully more than today's 6 seed rows —
don't force a full loop with only bootstrap data to reflect on.

**Next evolve due:** ~2026-07-31, or sooner if 3+ corrections land on the same artifact.
