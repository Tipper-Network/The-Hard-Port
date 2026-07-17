---
name: evolve
description: Runs the backward pass, bounded update, and validation gate of the training loop (stages 3-6) — turns ROLLOUT.yaml observations into ranked, capped edits to rules/instincts/skills, gated by HELDOUT.yaml before landing. Use when the user says "run evolve," or when ROLLOUT.yaml has 3+ corrections on the same artifact, or last_run is 14+ days old.
---

# Skill — Evolve (training loop, stages 3-6)

Read `.cursor/skills/training-loop/TRAINING-LOOP.md` first — this skill executes it.

## Procedure

1. **Check whether evolve is due.** Read `.cursor/skills/training-loop/LAST_EVOLVE.md` for
   `last_run`. Read `ROLLOUT.yaml` for rows where `at > last_run`. If there are zero new
   observations and zero repo changes to `.cursor/rules|instincts|skills` since `last_run`, say
   so and skip — don't force an evolve run with nothing to reflect on.

2. **Backward (stage 3).** Group the new rollout rows by `artifact` and `outcome`:
   - **Patterns:** any artifact with >= 2 `correction`/`fail` rows.
   - **Wins:** pass streaks — note them, but resist editing something that's already working.
   - **Repo delta:** check git history since `last_run` for changes to brand/funnel/offer truth
     that might make an instinct or rule stale.

3. **Bounded update (stage 4).** Turn patterns into ranked edit proposals:
   - Rank: (1) repeated correction/fail, (2) brand-truth mismatch, (3) stale wording, (4) nice-to-have.
   - Cap at **3 file edits**, **~40 lines changed per file**, **2 new instincts**, **1 rule
     promotion** — unless the user explicitly raises the budget for this run.
   - Drop (clip) anything past the cap and say so in the report.

4. **Candidate (stage 5).** Show the exact proposed diffs to the user. **Do not write files
   yet.** Wait for the user to say implement / approve / go ahead.

5. **Validation gate (stage 6).** Before landing, mentally run every scenario in
   `.cursor/skills/training-loop/HELDOUT.yaml` against the **candidate text** (as if the edit
   were already applied). Report pass/fail per scenario.
   - All pass -> land the candidate.
   - Any fail -> do not land; either fix the candidate or tell the user why the artifact needs
     to stay as-is.
   - Skips need a documented reason; max 2 skips per run.

6. **Land and record.** Once the gate passes and the user has approved:
   - Apply the capped edits.
   - Update `.cursor/skills/training-loop/LAST_EVOLVE.md` with the batch processed, the ranked
     proposals (landed vs. clipped), and the held-out gate results.
   - Bump `last_run` to today.
   - Trim `ROLLOUT.yaml` to the last 50 rows if it's grown large (archive older rows to
     `ROLLOUT.archive.yaml`).

## Anti-patterns

- Editing `.cursor/rules/*.mdc` directly to "fix" one task instead of proposing a candidate and
  running it through the gate.
- Writing files before the user approves the candidate.
- Promoting more than 1 instinct to a rule in a single run without the user expanding budget.
- Running the full loop when there's nothing new in `ROLLOUT.yaml` and nothing changed in the repo.
