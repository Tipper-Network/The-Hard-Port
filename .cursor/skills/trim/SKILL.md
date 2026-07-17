---
name: trim
description: Audits token economy — what always-on rules cost every turn, and whether recent tasks over-processed, over-read, or over-tooled. Use when the user says "run trim," asks what's eating context, or a new alwaysApply rule is added.
---

# Skill — Trim (token economy loop)

Read `.cursor/skills/training-loop/trim/TRIM-LOOP.md` first — this skill executes it.

**Core decision:** don't waste time, energy, or agent tokens. Every turn pays a fixed cost
(always-on rules), a process cost (which pipeline/skill got invoked), a read/tool cost, and a
session cost. Trim keeps those proportional to the work.

## Procedure (seven steps)

1. **Baseline.** Run `bash .cursor/skills/training-loop/trim/scripts/inventory.sh` from repo
   root. This measures the **fixed per-turn tax** — always-on rule bytes — one proxy, not the
   whole picture.

2. **Profile.** Review recent session patterns: did any task pull in a whole rule when a
   `globs:`-scoped one would do? Did an instinct/skill get read but not used? Any repeated
   over-explaining across turns that a handoff-style summary would have avoided?

3. **Analyze.** Rank the four taxes for what's actually dominating right now:

   | Tax | What burns tokens |
   |-----|-------------------|
   | Fixed per-turn | `alwaysApply: true` rules injected every message |
   | Process per-task | Wrong skill/pipeline for a small task |
   | Read & tool | Reading a large file when a link/summary would do; unused MCP servers |
   | Session | Long threads re-explaining context |

4. **Verdicts.** For each segment reviewed: **cut** (relocate/shrink), **keep** (justified as-is),
   or **ask** (needs the user's call — e.g. disabling an MCP server). Ground every verdict in
   token cost, not file size alone. Update `trim/INVENTORY.yaml`.

5. **Gate.** Stop. Show the user the exact proposed edits before touching anything.

6. **Apply.** Once approved: cap at **3 file edits**. Relocate content, don't delete brand/product
   truth — move detail to a doc or `globs:`-scoped rule instead of erasing it.

7. **Re-measure.** Re-run `inventory.sh`, note the before/after delta, write
   `trim/LAST_TRIM.md` with the estimated tokens saved per turn x expected turns in a session.

## What NOT to cut

- `00-brand-core.mdc` — the one rule everything else reports to.
- Any rule the user explicitly flagged as load-bearing.
- Product/brand truth — relocate it, don't erase it.

Cutting law to save bytes but causing rework burns **more** tokens than it saves. Trim is
economy, not amnesia.

## Success = tokens saved, not bytes moved

A good trim moves a big table out of an always-on rule into a linked doc so it's still there
when needed, just not paid for every turn. A bad trim deletes it and makes the agent guess.
