# Last trim report

**last_run:** 2026-07-17  
**Operator:** tipper-trim (Trim Hero → Cursor adaptation)

## Before / after

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Always-on rules | 28,560 bytes | 25,206 bytes | **-11.7%** |
| AGENTS.md | 3,055 bytes | 1,403 bytes | **-54.1%** |
| Per-turn (rules + AGENTS) | 31,615 bytes (~7,903 tok) | 26,609 bytes (~6,652 tok) | **-15.8%** |
| `tipper-product-persona.mdc` | 14,513 bytes | 11,155 bytes | **-23.1%** |

**Budget target:** 20,480 bytes always-on rules — **still over by ~4.7 KB** (next trim candidate: surface-access Stage 2 table → skill).

---

## Verdicts (audit)

| Segment | Bytes (after) | Verdict | Mechanism |
|---------|---------------|---------|-----------|
| tipper-product-persona | 11,155 | **cut** → landed | Stocks tables → `docs/reference/platform/agent-persona-stocks.md` |
| AGENTS.md | 1,403 | **cut** → landed | Pointer table; detail in README |
| tipper-surface-access | 4,001 | keep | Core gate law |
| tipper-coding-discipline | 3,002 | keep | Discipline law |
| question-means-plan-first | 2,147 | keep | Plan-first law |
| tipper-agent-harness | 2,087 | keep | Harness + trim pointer |
| tipper-enums | 1,494 | keep | Enum law |
| schema-migrations-hands-off | 1,320 | keep | Schema law |
| tipper-web-nextjs | 7,544 | keep | Path-scoped (web) |
| tipper-api-module-structure | 2,594 | keep | Path-scoped (api) |
| tipper-domain-events | 2,017 | keep | Path-scoped (api) |
| ~/.cursor/mcp.json | n/a | **ask** | Disable unused MCP servers locally |

---

## Landed (this run)

1. `.cursor/training-loop/trim/` — TRIM-LOOP, INDEX, INVENTORY, inventory.sh, LAST_TRIM
2. `.cursor/skills/tipper-trim/SKILL.md`
3. `docs/reference/platform/agent-persona-stocks.md` — relocated stocks tables
4. `.cursor/rules/tipper-product-persona.mdc` — trimmed; links to reference doc
5. `AGENTS.md` — slim entry pointer
6. Wired: sprint, handoff, prompts, README, training-loop INDEX, harness

---

## Next trim candidates (not applied)

1. **surface-access** — move Stage 2 money surface table to `tipper-surface-check` or money instinct (ask)
2. **MCP** — audit `~/.cursor/mcp.json`; disable Neon/Playwright if unused (global, per dev)
3. **persona rule** — further shorten persona blurbs to product-persona.json links only (ask — risks review quality)

**Re-audit:** >90 days or when per-turn exceeds ~30 KB again.
