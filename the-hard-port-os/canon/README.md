---
id: CANON-INDEX
title: The Hard Port Canon
document_type: canon-governance
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
canonicality: canonical
related_documents:
  - ../KNOWLEDGE_ARCHITECTURE.md
  - ../docs/00-foundations/THP-FOUNDATIONAL-PHILOSOPHY.md
  - ../docs/00-foundations/THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md
  - ./CANON_STATUS.md
  - ./CANON_CITATION_STANDARD.md
supersedes: []
superseded_by: []
---

# The Hard Port Canon

## What the Canon Is

The Hard Port Canon is the authoritative synthesis layer of The Hard Port. It organizes sufficiently stable, accepted, and source-backed knowledge into eight coherent volumes.

The Hard Port studies how conscious beings construct, inhabit, transcend, and reconstruct the systems that define their reality.

Philosophical assumptions behind that inquiry are defined in [`../docs/00-foundations/THP-FOUNDATIONAL-PHILOSOPHY.md`](../docs/00-foundations/THP-FOUNDATIONAL-PHILOSOPHY.md). Institutional purpose and boundaries are defined in [`../docs/00-foundations/THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md`](../docs/00-foundations/THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md). The Canon does not duplicate those definitions here.

Small businesses are the first bounded research environment. The Canon must preserve the difference between that operating focus and broader philosophical questions still under investigation.

The Canon is not a dump of every document produced by The Hard Port. It does not replace the working repository.

## Why It Exists

Research, proposals, decisions, system specifications, and procedures answer different questions. Without synthesis, readers must reconstruct accepted knowledge from incompatible drafts and operational records.

The Canon provides a reviewed account of what The Hard Port currently considers authoritative, why, within which boundaries, and from which sources.

## The Eight Volumes

1. [`Volume I — The Operating System`](./volume-01-operating-system/) — how The Hard Port produces, decides, operationalizes, and synthesizes knowledge.
2. [`Volume II — The Philosophy`](./volume-02-philosophy/) — foundational questions, worldview, concepts, and principles.
3. [`Volume III — Organizational Intelligence`](./volume-03-organizational-intelligence/) — organizational perception, memory, sensemaking, coordination, learning, and adaptation.
4. [`Volume IV — The Research Method`](./volume-04-research-method/) — questions, hypotheses, experiments, evidence, contradiction, findings, and research boundaries.
5. [`Volume V — Business Ontology`](./volume-05-business-ontology/) — entities and relationships required to describe small businesses as systems.
6. [`Volume VI — The Tipper Protocol`](./volume-06-tipper-protocol/) — Tipper's bounded role as an implementation and research instrument.
7. [`Volume VII — Governance`](./volume-07-governance/) — authority, legitimacy, permissions, accountability, disputes, and stewardship.
8. [`Volume VIII — Evolution`](./volume-08-evolution/) — change, adaptation, obsolescence, forks, reconstruction, and continuity.

## Relationship to the Working Repository

- `../research/` investigates reality.
- `../rfcs/` proposes meaningful changes or system designs.
- `../decisions/` records accepted institutional decisions and rationale.
- `../adrs/` records accepted technical architecture decisions.
- `../systems/` defines current operational reality.
- `../sops/` defines repeatable execution.
- `../intelligence/` contains working frameworks, models, and consulting intelligence.
- `../archive/` preserves obsolete, superseded, or session-specific material.

Canon chapters cite and synthesize these sources. Source documents remain in their working folders and retain their own status, evidence, and history.

## Conditions for Entry

Things become canonical when they finish their designated loop ([`DEC-003`](../decisions/DEC-003-canon-requires-decision-record.md)).

```text
Research → RFC → Decision → System → Canon
```

Content may enter the Canon only when:

1. That loop is complete, or a Decision explicitly scopes which stages are not applicable and why.
2. Its source documents are identifiable and cited.
3. Relevant research and contradictions have been reviewed (unless scoped out).
4. Material decisions are explicit in accepted `DEC-*` records.
5. Operational claims match current system specifications, or the Decision states no system change is required yet.
6. Confidence, evidence, scope, and boundaries are stated using the descriptive evidence vocabulary ([`DEC-002`](../decisions/DEC-002-descriptive-evidence-vocabulary.md)).
7. Conflicting sources are resolved or visibly retained.
8. A named human decision owner accepts that the loop is complete; the chapter's `canonicality` is intentionally set to `canonical`.

Age, polish, repetition, assistant authorship, an incomplete Decision stamp, or location in `intelligence/` or `canon/` does not satisfy these conditions.

## Challenge, Revision, Supersession, and Removal

Any Canon claim may be challenged by new evidence, contradiction, operational drift, or a disputed decision.

A challenge begins in the working layer. Material returns through research or RFC review. Accepted changes produce a decision, system update where relevant, and a versioned Canon revision.

Superseded Canon chapters retain history and reciprocal links. Removed claims are not silently erased; their status and reason remain visible. Obsolete source material moves to `archive/` only after references are preserved.

## Citation

Every substantive Canon claim must cite source documents according to [`CANON_CITATION_STANDARD.md`](./CANON_CITATION_STANDARD.md).

A Canon citation records the source path, identifier when available, version or update date, relevant section, source status, and canonicality. Citation does not promote a source to canonical status.

## Tipper's Role

Tipper is the first operational implementation through which The Hard Port studies these relationships, rules, communities, entities, behaviors, and economic structures.

Tipper is also a research instrument because operation can return observations and outcomes to the working layer.

Tipper is not identical to The Hard Port. The Hard Port is the research, knowledge, governance, and synthesis institution. Tipper is one bounded implementation of what that institution learns.

## What Belongs Here

Reviewed synthesis that meets the entry conditions and chapter seed files awaiting that work.

## What Does Not Belong Here

Raw observations, speculative hypotheses, undecided RFCs, unaccepted system designs, procedures, marketing copy, or source files moved for convenience.

## How Documents Enter

Through the lifecycle in [`../KNOWLEDGE_ARCHITECTURE.md`](../KNOWLEDGE_ARCHITECTURE.md), using the chapter template and citation standard.

## How Documents Leave or Become Superseded

Through a versioned challenge, RFC, decision, and replacement or deprecation record. Canon history is retained.

## Related Folders

The working folders listed above remain the evidence and operational substrate of the Canon.
