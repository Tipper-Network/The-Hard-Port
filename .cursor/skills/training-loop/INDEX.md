# The Hard Port — training loop hub

**Home for agent improvement loops** — quality (evolve) and size (trim).

![Six-stage training loop](./diagram.png)

## Loops

| Loop | Purpose | Home |
|------|---------|------|
| **Evolve** (SkillOpt) | Train behavior — rules, instincts, skills | [TRAINING-LOOP.md](./TRAINING-LOOP.md) |
| **Trim** (Trim Hero -> Cursor) | Shrink token spend — fixed + process + reads | [trim/INDEX.md](./trim/INDEX.md) |

---

## Evolve (quality)

| Read first | Purpose |
|------------|---------|
| [TRAINING-LOOP.md](./TRAINING-LOOP.md) | First principles — stage mapping |
| [ROLLOUT.yaml](./ROLLOUT.yaml) | Stage 2 — forward pass (scored trajectories) |
| [HELDOUT.yaml](./HELDOUT.yaml) | Stage 6 — validation gate |
| [LAST_EVOLVE.md](./LAST_EVOLVE.md) | Last backward + gate report |
| [forward.yaml](./forward.yaml) | Stage 2 instinct — when to log rollout |

**Invoke:** `Run evolve` · Skill: [`evolve`](../evolve/SKILL.md)

---

## Trim (token economy)

**Core:** Don't waste time, energy, or agent tokens. Invoke: `Run trim` · Docs: [trim/TRIM-LOOP.md](./trim/TRIM-LOOP.md)

Fixed per-turn target: always-on rules kept lean (`00-brand-core.mdc` is the only `alwaysApply: true` rule right now).

---

## Six stages -> files (evolve)

| Stage | Name | Artifact |
|-------|------|----------|
| 1 | **PARAMETER** | [`../../rules/`](../../rules/) · [`../../instincts/`](../../instincts/INDEX.md) · [`../*/`](../) |
| 2 | **FORWARD** | [`ROLLOUT.yaml`](./ROLLOUT.yaml) — written at end of session when notable |
| 3 | **BACKWARD** | [`../evolve/SKILL.md`](../evolve/SKILL.md) |
| 4 | **BOUNDED UPDATE** | evolve report — <= 3 file edits default |
| 5 | **CANDIDATE** | proposed diffs — no write until gate + approval |
| 6 | **VALIDATION GATE** | [`HELDOUT.yaml`](./HELDOUT.yaml) |

---

## Connected layers

| Layer | Path | Role |
|-------|------|------|
| **Rules** | [`../../rules/`](../../rules/) | Frozen law — brand constitution + funnel/copy/visual/UX rules |
| **Instincts** | [`../../instincts/`](../../instincts/INDEX.md) | Judgment calls — invoked on relevant context |
| **Skills** | [`../`](../) | Procedures — invoked by name for a specific job |
| **Trim** | [`trim/`](./trim/INDEX.md) | Payload audit |

---

## When to run evolve

| Trigger | Action |
|---------|--------|
| End of a session that tested a rule/instinct/skill | Append 0-5 rows to `ROLLOUT.yaml` |
| `last_run` >= 14 days | Run **`evolve`** |
| `ROLLOUT.yaml` >= 3 **corrections** on the same artifact | Run **`evolve`** |
| User: **Run evolve** | Full loop, stages 2-6 |

## When to run trim

| Trigger | Action |
|---------|--------|
| "What's eating context?" | **`trim`** audit |
| A new `alwaysApply: true` rule is added | **`trim`** check |
| `LAST_TRIM.md` stale (>90 days) | Re-audit |
