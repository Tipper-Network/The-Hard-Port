# Hard Port OS — Permanent Assistant Instructions

Rarely change this file. Temporary work belongs in [`CURRENT_FOCUS.md`](./CURRENT_FOCUS.md) and [`active/CURRENT_TASK.md`](./active/CURRENT_TASK.md).

## Activation Prompt

Copy into chat to start an OS session:

```text
Activate Hard Port OS.

Read and follow, in order:
1. the-hard-port-os/cursor.md
2. the-hard-port-os/CURRENT_FOCUS.md
3. the-hard-port-os/active/CURRENT_TASK.md
4. .cursor/skills/hard-port-os-work/SKILL.md
5. the-hard-port-os/KNOWLEDGE_ARCHITECTURE.md

Treat CURRENT_TASK.md as the session assignment.
Treat CURRENT_FOCUS.md as the current milestone.
Treat cursor.md as permanent rules.
Do not create new top-level folders unless explicitly requested.
Do not silently promote anything to canonical.
Tipper is not The Hard Port.
```

Shorter form:

```text
Activate Hard Port OS — follow cursor.md, CURRENT_FOCUS.md, and active/CURRENT_TASK.md.
```

## Instruction Layers

| File | Role | Change cadence |
|---|---|---|
| `cursor.md` | Permanent assistant rules | Rarely |
| `CURRENT_FOCUS.md` | Current Hard Port milestone | Every few weeks |
| `active/CURRENT_TASK.md` | Single session assignment | Every work session |
| `archive/session-XX/` | Completed tasks and session notes | After session close |

Do not expand this file with temporary task instructions.

## Permanent Non-Negotiables

1. Do not create new top-level folders under `the-hard-port-os/` unless the user explicitly requests them.
2. Do not silently promote material to `canonical`. Seed and candidate files are not doctrine.
3. Do not invent philosophical or technical claims to fill empty Canon chapters. Use TODO markers.
4. Tipper is an implementation and research instrument. Tipper is not The Hard Port.
5. Preserve existing sources. Prefer links, mapping, RFCs, and supersession over destructive moves.
6. Distinguish `status`, `confidence`, `evidence_level`, and `canonicality`. They are independent.
7. Institutional decisions go in `decisions/`. Technical architecture decisions go in `adrs/`.
8. Working layers investigate and operate. Canon synthesizes only after review.
9. When `CURRENT_TASK.md` conflicts with a later user message in the same turn, the later message wins for scope; these permanent rules still apply.
10. After a session completes, archive the finished task under `archive/session-XX/` rather than leaving obsolete assignments in `active/`.

## Required Reads by Work Type

- Any OS work: this file, `CURRENT_FOCUS.md`, `active/CURRENT_TASK.md`, `.cursor/skills/hard-port-os-work/SKILL.md`, `.cursor/rules/05-hard-port-os.mdc`
- Lifecycle / promotion / canonicity: `KNOWLEDGE_ARCHITECTURE.md`
- Canon synthesis: `canon/README.md`, `templates/CANON_CHAPTER_TEMPLATE.md`, `templates/DOCUMENT_METADATA_STANDARD.md`
- Source placement: `archive/session-01/CANON_SOURCE_MAPPING.md` before moving or promoting material

## Related Instincts

- `no-silent-canon-promotion`
- `tipper-is-not-the-company`
- `instruction-layers-stay-separate`

## Where Work Belongs

| Intent | Destination |
|---|---|
| Uncertainty / question | `research/questions/` |
| Coordinated inquiry | `research/` program |
| Falsifiable claim | `research/hypotheses/` |
| Bounded test | `research/experiments/` |
| Evidence | `research/observations/` |
| Counterevidence | `research/contradictions/` |
| Proposed change | `rfcs/` |
| Accepted institutional choice | `decisions/` |
| Accepted technical choice | `adrs/` |
| Current operational model | `systems/` |
| Repeatable execution | `sops/` |
| Reviewed authoritative synthesis | `canon/` |
| Superseded / session provenance | `archive/` |

## Session Close

When a task is complete:

1. Leave the produced work in its correct working or Canon location.
2. Move or copy the finished `active/CURRENT_TASK.md` into `archive/session-XX/` with a dated or numbered name.
3. Rewrite `active/CURRENT_TASK.md` for the next session, or leave a short placeholder stating no active task.
4. Update `CURRENT_FOCUS.md` only when the milestone itself changes.
