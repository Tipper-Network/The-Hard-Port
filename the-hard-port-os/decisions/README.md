---
id: DEC-INDEX
title: Decisions
document_type: folder-index
status: active
version: 0.1.0
created: 2026-07-18
updated: 2026-07-18
authors:
  - The Hard Port
owners:
  - The Hard Port
confidence: high
evidence_level: operational
canonicality: non-canonical
related_documents:
  - ../KNOWLEDGE_ARCHITECTURE.md
  - ./DECISION_TEMPLATE.md
supersedes: []
superseded_by: []
---

# Decisions

## Accepted Decisions

| ID | Title | Status |
|---|---|---|
| [`DEC-001`](./DEC-001-separate-knowledge-and-people-journeys.md) | Separate knowledge lifecycle from people journey | accepted |
| [`DEC-002`](./DEC-002-descriptive-evidence-vocabulary.md) | Adopt descriptive evidence_level vocabulary | accepted |
| [`DEC-003`](./DEC-003-canon-requires-decision-record.md) | Canon is completion of the designated loop | accepted |

## What Belongs Here

Accepted or proposed institutional and cross-system decision records explaining what was decided, why, alternatives, consequences, risks, and validation conditions.

Use `DEC-001-short-decision-title.md`.

## What Does Not Belong Here

- Research that has not reached a decision
- Open proposals without a decision owner
- Current system specifications
- Procedures
- Canon chapters
- Narrow technical architecture choices that belong in `../adrs/`

## How Documents Enter

A reviewed RFC normally produces a proposed `DEC-*` record. Decision owners move its status only when they explicitly accept, reject, defer, or supersede the decision.

No accepted decision should be inferred from repository structure or existing prose.

## How Documents Leave or Become Superseded

Decision records are not deleted. A later decision may supersede one by linking both `supersedes` and `superseded_by`. Superseded records remain available for rationale and history.

## ADR Boundary

`decisions/` covers institutional policy and choices spanning systems.

`adrs/` remains the technical subset for software and architecture decisions. An ADR may link to an institutional decision but does not replace it.

## Related Folders

- `../rfcs/` contains proposals and review.
- `../adrs/` contains technical architecture decisions.
- `../systems/` implements accepted decisions as operational specifications.
- `../sops/` makes systems executable.
- `../canon/` may synthesize accepted decisions.
- `../archive/` preserves retired supporting material.
