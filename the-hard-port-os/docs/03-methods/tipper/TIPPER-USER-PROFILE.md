---
id: METHOD-TIPPER-PROFILE-001
title: Tipper User Profile
document_type: method_definition
status: candidate
version: 0.1.0
created: 2026-07-19
updated: 2026-07-19
authors:
  - The Hard Port
owners:
  - Tarek
confidence: developing
evidence_level: operational
canonicality: non_canonical
philosophical_source: THP-PH-002
related_documents:
  - ./README.md
  - ../../00-foundations/THP-SELF-INTENTION-EXPRESSION.md
supersedes: []
superseded_by: []
---

# Tipper User Profile

> **Status:** `candidate`, `non_canonical`

## Identity Boundary

Tipper may support voluntary identity and lifestyle exploration, but it must not claim authority over a user's identity or secretly infer personal values and intentions without informed permission.

## Scope

User-visible profile data the user voluntarily provides or explicitly confirms — not inferred psychological identity.

## Permitted

- User-declared display information
- Voluntarily selected interests and communities
- User-correctable preference fields with provenance
- Skills and participation history the user chooses to record

## Prohibited

| Requirement | Status |
|---|---|
| Hidden-value inference without consent | **Prohibited** |
| Declaration of a user's true identity | **Prohibited** |
| Undisclosed psychological profiling | **Prohibited** |
| Irreversible inferred identity labels | **Prohibited** |

Tipper must not maintain a hidden "true self" profile derived from behavior without informed permission, visibility, and user correction.

## User Controls

Users must be able to inspect, correct, and remove profile fields and any provisional inferences tied to their account.
