---
id: CANON-CITATION-001
title: Canon Citation Standard
document_type: canon-standard
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
  - ./README.md
  - ../templates/DOCUMENT_METADATA_STANDARD.md
supersedes: []
superseded_by: []
---

# Canon Citation Standard

## Purpose

Preserve traceability between Canon synthesis and the working documents that support, challenge, or constrain it.

## Required Citation Data

Each substantive source citation should identify:

- Relative repository path
- Permanent document ID, when available
- Title
- Version or last-updated date
- Relevant heading or record
- Status
- Canonicality
- Citation role

## Citation Roles

- `supports`: Supplies evidence or accepted reasoning.
- `defines`: Supplies an operational definition or specification.
- `decides`: Records the accepted rationale.
- `contradicts`: Supplies material counterevidence.
- `limits`: Defines scope, boundary, risk, or exclusion.
- `supersedes`: Replaces an earlier source.
- `context`: Provides relevant history without supporting the claim.

## Inline Form

Use a relative Markdown link and identify the source role in prose.

```markdown
The operational lifecycle is defined by
[`ARCH-KNOWLEDGE-001`, version 0.1.0, “Stage 13 — Canonical Synthesis”](../KNOWLEDGE_ARCHITECTURE.md)
(`defines`; status `active`; canonicality `canonical`).
```

## Source Register Form

Every Canon chapter must list its sources under `## Source Documents`:

```yaml
- path: ../../research/example.md
  id: HYP-000
  version: 0.1.0
  section: Hypothesis
  status: active
  canonicality: non-canonical
  role: context
```

## Rules

1. Prefer repository-relative links.
2. Cite the specific section or record used.
3. Do not cite an archive source as current authority.
4. Do not convert source status or canonicality in the citation.
5. Cite contradictions beside supporting sources.
6. When a source changes materially, review every chapter citing it.
7. Broken or uncertain links block canonical acceptance.
8. External sources must include a stable URL, access date, and relevant section.

## What Belongs Here

Rules for traceability and source representation in Canon chapters.

## What Does Not Belong Here

Bibliographic interpretation, research findings, or claims about source quality.

## How Documents Enter

Citation rules change through RFC and decision review because they affect every volume.

## How Documents Leave or Become Superseded

A replacement standard links both versions and requires a citation migration plan.

## Related Folders

- `../research/` provides evidence.
- `../decisions/` provides accepted rationale.
- `../systems/` provides operational definitions.
- `../archive/` provides provenance only.

## Revision History

### 0.1.0 — 2026-07-18

- Defined source roles, required fields, inline form, and source registers.
