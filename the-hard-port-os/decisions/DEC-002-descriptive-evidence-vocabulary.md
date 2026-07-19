---
id: DEC-002
title: Adopt descriptive evidence_level vocabulary
status: accepted
version: 0.1.0
date: 2026-07-18
decision_owners:
  - The Hard Port
related_rfc: []
related_systems:
  - ../systems/intelligence/
related_research: []
related_documents:
  - ../templates/DOCUMENT_METADATA_STANDARD.md
  - ../intelligence/README.md
  - ../canon/volume-01-operating-system/02-knowledge-architecture.md
supersedes: []
superseded_by: []
---

# DEC-002 — Adopt descriptive evidence_level vocabulary

## Context

The repository used two evidence scales:

1. Legacy Intelligence scale: `E0`–`E5`
2. Metadata standard: `none`, `anecdotal`, `observational`, `experimental`, `replicated`, `operational`

Dual vocabularies create false precision differences and migration debt.

## Decision

Use descriptive evidence levels as the only forward vocabulary:

| Value | Meaning |
|---|---|
| `none` | No supporting evidence has been attached |
| `anecdotal` | One or more reported examples |
| `observational` | Structured observations support the claim |
| `experimental` | A bounded intervention or experiment produced relevant evidence |
| `replicated` | Comparable evidence has repeated across contexts |
| `operational` | The model has demonstrated continued use in operating conditions |

Legacy codes map as follows for migration and reading old records:

| Legacy | Descriptive |
|---|---|
| E0 | `none` |
| E1 | `anecdotal` |
| E2 | `observational` |
| E3 | `observational` (measured relationship without intervention) or `experimental` when an intervention measurement is present — prefer the stronger accurate label |
| E4 | `experimental` |
| E5 | `replicated` |

`operational` has no exact legacy equivalent; use it when a model is sustained in operating conditions beyond replication of a single intervention pattern.

Humans write and read the words. Machines may store internal enums that map to these strings. New documents must not use `E0`–`E5`.

## Reasoning

Descriptive names are memorable and resist empty numeric authority. Computers do not need humans to speak in codes.

## Alternatives Considered

| Alternative | Why not selected |
|---|---|
| Keep E0–E5 only | Harder for humans; conflicts with metadata standard |
| Keep both indefinitely | Preserves the conflict |
| Invent a third hybrid scale | Adds noise |

## Consequences

- [`../templates/DOCUMENT_METADATA_STANDARD.md`](../templates/DOCUMENT_METADATA_STANDARD.md) is the controlling vocabulary.
- Intelligence README and related docs must present descriptive names, with legacy mapping only as migration aid.
- Existing `E0`–`E5` values should be migrated when a document is next substantively edited.

## Risks

- Partial migration leaves mixed files temporarily.
- E3's split mapping requires judgment; wrong choice understates or overstates support.

## Validation Conditions

- New research, RFC, decision, and Canon docs use descriptive values only.
- Intelligence README no longer presents E0–E5 as the primary scale.
- Spot-check after migration: no new `evidence_level: E[0-5]` introduced.

## Related Documents

- [`../templates/DOCUMENT_METADATA_STANDARD.md`](../templates/DOCUMENT_METADATA_STANDARD.md)
- [`../intelligence/README.md`](../intelligence/README.md)
- [`../research/hypotheses/HYP-001-external-system-shaping-behavior.md`](../research/hypotheses/HYP-001-external-system-shaping-behavior.md)
- [`../rfcs/RFC-001-tipper-community-infrastructure.md`](../rfcs/RFC-001-tipper-community-infrastructure.md)

## Revision History

### 0.1.0 — 2026-07-18

- Accepted descriptive evidence vocabulary; deprecated E0–E5 for new work.
