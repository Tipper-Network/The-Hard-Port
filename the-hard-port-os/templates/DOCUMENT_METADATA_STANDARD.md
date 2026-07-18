---
id: STD-DOC-001
title: Document Metadata Standard
document_type: standard
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
supersedes: []
superseded_by: []
---

# Document Metadata Standard

## Purpose

Provide a shared metadata vocabulary for substantive knowledge documents without retrofitting every existing file in one pass.

## Standard Frontmatter

```yaml
---
id:
title:
document_type:
status:
version:
created:
updated:
authors: []
owners: []
confidence:
evidence_level:
canonicality:
related_documents: []
supersedes: []
superseded_by: []
---
```

Additional fields may be defined by a document-type template. They must not change the meaning of these shared fields.

## Field Meanings

- `id`: Permanent identifier. A renamed document retains its ID.
- `title`: Human-readable document title.
- `document_type`: The document's function, such as `research-question`, `rfc`, `decision`, `system-specification`, `sop`, `canon-chapter`, `standard`, or `report`.
- `status`: Maturity and lifecycle state.
- `version`: Semantic document version.
- `created`: Original creation date in `YYYY-MM-DD`.
- `updated`: Most recent substantive update date in `YYYY-MM-DD`.
- `authors`: People or entities who wrote the document.
- `owners`: People or entities accountable for review and maintenance.
- `confidence`: Epistemic confidence in the document's principal claims.
- `evidence_level`: Strongest available support relevant to those claims.
- `canonicality`: Whether the Canon may treat the document as authoritative.
- `related_documents`: Material dependencies, sources, or relevant records.
- `supersedes`: Earlier documents this document replaces.
- `superseded_by`: Later documents that replace this document.

## Lifecycle Statuses

- `seed`: Structure or initial idea exists; substantive work is incomplete.
- `draft`: Content is being developed.
- `active`: In current use but not necessarily accepted or canonical.
- `under-review`: Submitted for explicit review or decision.
- `accepted`: Approved for its stated operational purpose.
- `canonical`: Accepted into the Canon as authoritative synthesis.
- `superseded`: Replaced by a named document.
- `deprecated`: Still present but should not be used for new work.
- `archived`: Retained only for provenance or history.

## Confidence Values

- `unknown`: Confidence has not been assessed.
- `low`: Evidence or reasoning is limited.
- `medium`: Multiple observations or coherent evidence support the claim, with material uncertainty remaining.
- `high`: Strong evidence and review support the claim within a defined boundary.

Confidence is not correctness and does not determine canonicality.

## Evidence Levels

- `none`: No supporting evidence has been attached.
- `anecdotal`: One or more reported examples.
- `observational`: Structured observations support the claim.
- `experimental`: A bounded intervention or experiment produced relevant evidence.
- `replicated`: Comparable evidence has repeated across contexts.
- `operational`: The model has demonstrated continued use in operating conditions.

Evidence level does not determine whether a document is accepted.

## Canonicality Values

- `non-canonical`: The Canon may cite the document as a source but must not treat its claims as authoritative.
- `candidate`: The document may contribute to Canon synthesis after review.
- `canonical`: The document is an authoritative part of the Canon within its stated scope and version.

## Four Independent Dimensions

`status` describes maturity and lifecycle.

`confidence` describes epistemic confidence.

`evidence_level` describes available support.

`canonicality` describes whether the Canon may treat the claim as authoritative.

These dimensions must not be collapsed. An active system specification can remain non-canonical. A high-confidence research finding can remain a candidate. A canonical document may contain explicitly unresolved questions.

## Application Rules

1. Apply this standard to newly created substantive framework documents.
2. Do not bulk-edit existing documents solely to add metadata.
3. Preserve legacy evidence scales in existing records until a deliberate migration is approved.
4. A document becomes canonical only through the lifecycle defined in `KNOWLEDGE_ARCHITECTURE.md`.
5. Superseded and archived documents remain addressable for citation.
6. Source documents do not inherit canonical status when cited by the Canon.

## Revision History

### 0.1.0 — 2026-07-18

- Established shared metadata fields and controlled lifecycle vocabularies.
