# Last evolve

**last_run:** 2026-07-16 (run 2 — user invoked `tipper-evolve`)  
**Loop home:** `.cursor/training-loop/`  
**Edit budget:** 2 / 3 used

## Rollout batch (since prior last_run)

| id | artifact | outcome | note |
|----|----------|---------|------|
| obs-20260716-008 | tipper-evolve | pass | User invoked evolve; full loop executed |

*(Prior batch obs-001…007 already processed in run 1.)*

## Backward — patterns

| Pattern | Signal | Action |
|---------|--------|--------|
| `tipper-evolve` pass streak (4×) | Loop wiring works | **No edit** to evolve skill |
| `training-loop` folder move (2× pass) | Hub stable | **No edit** |
| Orphan `instincts/TRAINING-LOOP.md` | Stale duplicate — old paths, broken diagram ref | **Prune** |
| Git delta since last_run | None on `.cursor/` | Product instincts unchanged |
| Product focus (`inprogress.md`) | Bundle Program Stage 1 UI pending | Watch `money-patron-surfaces` on first ship |

## Bounded update (ranked, clipped)

1. **Prune** orphan `instincts/TRAINING-LOOP.md` — duplicate of `training-loop/TRAINING-LOOP.md` ✅ landed
2. Update `LAST_EVOLVE.md` — this report ✅ landed
3. Append `obs-20260716-008` to ROLLOUT ✅ landed
4. ~~Bump instinct confidences~~ — clipped; no repeated corrections since run 1

## Instinct inventory (unchanged)

13 domain instincts + `training-loop/forward.yaml`. All statuses hold. No promote-to-rule candidates — PC9/surfaces already in rules.

## Held-out gate (HELDOUT.yaml)

| id | result |
|----|--------|
| schema-hands-off | pass |
| community-anon-gate | pass |
| honest-mvp-wallet | pass |
| platform-plan-vs-kind-b | pass |
| walk-in-subscribe | pass |
| question-plan-first | pass |
| figma-mcp-direct | pass |
| patron-redeem-ui-premature | pass |
| training-loop-forward | pass |

**Gate:** ✅ all pass — candidate landed.

## Landed

- Deleted `.cursor/instincts/TRAINING-LOOP.md` (stale duplicate)
- Updated `training-loop/LAST_EVOLVE.md`
- Appended `obs-20260716-008` to `training-loop/ROLLOUT.yaml`

## Next forward pass

On **Bundle Program Stage 1** ship, log rollout for:

- `money-patron-surfaces` — Surface A only, no Stage 2 UI
- `affiliation-first-subscribe` — PC9 if subscribe/cash paths touched
- `honest-mvp-seams` — no fake wallet / redeem UI

**Next evolve due:** ~2026-07-30 or after ≥3 new corrections in ROLLOUT.
