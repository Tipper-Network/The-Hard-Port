# Last trim report

**last_run:** 2026-07-17 (run 1 — first real audit; the loop itself was adapted from a different project and had never been run against this repo before)
**Operator:** trim

## Before / after

There is no "before" — this is the first audit. Baseline for this repo:

| Metric | Value |
|--------|-------|
| Always-on rules (`alwaysApply: true`) | 3,605 bytes (~901 est tokens) — just `00-brand-core.mdc` |
| Path-scoped rules (`alwaysApply: false`) | 9,486 bytes — loaded only when globs match |
| Instincts | 12,164 bytes — invoked on relevant context |
| Skills | 15,947 bytes — invoked on demand |
| AGENTS.md | 0 bytes — doesn't exist yet |
| **Per-turn estimate** | **3,605 bytes (~901 tokens)** |
| Budget target | 20,480 bytes (~5,120 tokens) |

**Verdict: well under budget.** No trim action needed. The repo only has one `alwaysApply: true`
rule, and it's a reasonable size. This is a healthy starting point, not a Tipper-style situation
that needed active trimming.

---

## Verdicts (audit)

| Segment | Bytes | Verdict | Mechanism |
|---------|-------|---------|-----------|
| 00-brand-core.mdc | 3,605 | keep | Only always-on rule; under budget |
| 01-copywriting-standards.mdc | 2,748 | keep | Path-scoped (tsx/jsx/md/content) |
| 02-conversion-funnel.mdc | 2,741 | keep | Path-scoped (tsx/jsx/app/pages/components) |
| 03-ui-visual-system.mdc | 2,103 | keep | Path-scoped (css/tsx/tailwind/components/styles) |
| 04-ux-friction.mdc | 1,894 | keep | Path-scoped (tsx/jsx/app/pages/forms) |
| instincts (9 files) | 12,164 | keep | Invoked on context, not injected every turn |
| skills (10 files incl. evolve/trim) | 15,947 | keep | Invoked by name |
| AGENTS.md | 0 | n/a | Doesn't exist — nothing to trim |
| `~/.cursor/mcp.json` | n/a | **ask** | Audit which MCP servers get used for Hard Port work; disable unused ones locally |

---

## Landed (this run)

Nothing landed — no cuts needed. This run's output is the baseline itself:

1. Fixed `inventory.sh` (was hardcoded to a different project's paths and skill-naming
   convention — pointed at a `tipper-*/SKILL.md` glob that would never match anything here).
2. Generated real `INVENTORY.yaml` for this repo (previous version was another project's fake
   audit data, wrong file names, wrong byte counts).
3. Wrote this report as an honest first baseline instead of a copied one.

---

## Next trim candidates (not applied — nothing over budget)

1. If a second `alwaysApply: true` rule gets added later, re-check total against the 20,480-byte
   budget.
2. **MCP** — audit `~/.cursor/mcp.json` for servers unused on this project (ask, per developer).
3. If instincts grow past ~15 of them, consider whether any should merge or shrink to a
   one-line pointer under a rule instead of staying a full instinct.

**Re-audit:** >90 days, or whenever per-turn exceeds ~15 KB.
