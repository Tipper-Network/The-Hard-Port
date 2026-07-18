---
name: hard-port-os-work
description: >-
  Routes edits inside the-hard-port-os through the working vs Canon lifecycle.
  Use when editing the-hard-port-os/**, Canon chapters, research records, RFCs,
  decisions, systems, SOPs, archive, cursor.md, CURRENT_FOCUS.md,
  active/CURRENT_TASK.md, or when the user says hard-port-os, Activate Hard Port OS,
  Canon, or knowledge architecture.
---

# Skill — Hard Port OS Work

## Activation

Read in this order:

1. `the-hard-port-os/cursor.md` — permanent rules
2. `the-hard-port-os/CURRENT_FOCUS.md` — current milestone
3. `the-hard-port-os/active/CURRENT_TASK.md` — session assignment
4. `the-hard-port-os/KNOWLEDGE_ARCHITECTURE.md`
5. `the-hard-port-os/canon/README.md` when Canon or synthesis is involved
6. `the-hard-port-os/archive/session-01/CANON_SOURCE_MAPPING.md` before moving or promoting material

`CURRENT_TASK.md` is the session brief. Do not treat `cursor.md` as a place for temporary instructions.

If `CURRENT_TASK.md` conflicts with a later user message in the same turn, the later user message wins for scope; permanent rules in `cursor.md` still apply.

## Non-negotiables

1. Do not create new top-level folders under `the-hard-port-os/` unless the user explicitly requests them.
2. Do not silently promote material to `canonical`. Seed/candidate files are not doctrine.
3. Do not invent philosophical or technical claims to fill empty Canon chapters. Use TODO markers.
4. Tipper is an implementation and research instrument. Tipper is not The Hard Port.
5. Preserve existing sources. Prefer links, mapping, RFCs, and supersession over destructive moves.
6. Distinguish:
   - `status` — lifecycle maturity
   - `confidence` — epistemic confidence
   - `evidence_level` — available support
   - `canonicality` — whether Canon may treat it as authoritative
7. Institutional decisions go in `decisions/`. Technical architecture decisions go in `adrs/`.
8. Working layers investigate and operate. Canon synthesizes only after review.
9. Do not expand `cursor.md` with temporary task instructions. Put session work in `active/CURRENT_TASK.md`. Put multi-week priorities in `CURRENT_FOCUS.md`.

## Where work belongs

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
| Finished session task brief | `archive/session-XX/` |

## Procedure for Canon chapter work

1. Confirm the chapter path matches `CURRENT_TASK.md` and that no other Canon chapter should be modified unless requested.
2. Use `templates/CANON_CHAPTER_TEMPLATE.md` and `templates/DOCUMENT_METADATA_STANDARD.md`.
3. Synthesize only from existing repository sources; cite with relative links.
4. Leave unresolved areas as TODO.
5. Keep `canonicality: candidate` until an explicit review decision changes it.
6. Return: file path, definitions introduced, unresolved questions, conflicts with existing docs.

## Procedure for promotion or relocation

1. State current folder, proposed folder, and why.
2. Check whether an RFC or Decision is required.
3. Prefer mapping/recommendation over moving if maturity is unclear.
4. Never treat archive raw files as current authority.

## Session close

When the assignment is complete:

1. Leave produced work in its correct location.
2. Archive the finished task under `archive/session-XX/`.
3. Rewrite or clear `active/CURRENT_TASK.md`.
4. Update `CURRENT_FOCUS.md` only if the milestone changed.

## Instincts to apply when relevant

- Prefer observation before opinion.
- Prefer bounded claims over universal doctrine.
- Prefer evidence gates over polish.
- Prefer human judgment for acceptance and canonicity; software may supply evidence, not final authority.
