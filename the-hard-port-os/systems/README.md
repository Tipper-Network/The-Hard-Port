---
id: SYS-INDEX
title: Systems
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
  - ./SYSTEM_TEMPLATE.md
supersedes: []
superseded_by: []
---

# Systems

## What Belongs Here

Versioned specifications of The Hard Port's current operational models: entities, states, rules, roles, interfaces, permissions, invariants, failure modes, and validation conditions.

System specifications describe what currently operates after an accepted decision. They are not Canon chapters.

## What Does Not Belong Here

- Questions, hypotheses, experiments, or raw observations
- Undecided proposals
- Decision rationale
- Step-by-step operating procedures
- Client-facing positioning
- Canonical synthesis

## How Documents Enter

1. Research or operational evidence identifies a need.
2. An RFC proposes the system or meaningful change.
3. A decision accepts the operational direction.
4. A specification is created from `SYSTEM_TEMPLATE.md`.
5. Validation confirms that it describes current reality.

Existing operational reality may be documented before an RFC, but unresolved design choices must remain explicit.

## How Documents Leave or Become Superseded

A specification is revised through an accepted decision. Replaced versions identify `supersedes` and `superseded_by`. Obsolete specifications move to `archive/` after links and history are preserved.

## Areas

- [`identity/`](./identity/)
- [`entities/`](./entities/)
- [`communities/`](./communities/)
- [`relationships/`](./relationships/)
- [`membership/`](./membership/)
- [`activities/`](./activities/)
- [`governance/`](./governance/)
- [`economy/`](./economy/)
- [`reputation/`](./reputation/)
- [`intelligence/`](./intelligence/)
- [`evolution/`](./evolution/)

## Related Folders

- `../research/` investigates reality.
- `../rfcs/` proposes changes.
- `../decisions/` records accepted institutional decisions.
- `../adrs/` records accepted technical architecture decisions.
- `../sops/` defines repeatable execution.
- `../canon/` synthesizes stable accepted knowledge.
- `../archive/` preserves superseded material.
