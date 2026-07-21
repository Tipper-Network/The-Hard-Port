---
template_id: THP-SMB-TEMPLATE-005
id: THP-SMB-TEMPLATE-005
title: Engagement Lifecycle Record
document_type: maturity_template
domain: smb_engagement
status: working
version: 1.0.1
created: 2026-07-21
updated: 2026-07-21
authors:
  - The Hard Port
owners:
  - Tarek
confidence: developing
evidence_level: founder_hypothesis
canonicality: working
depends_on:
  - THP-SMB-ENGAGEMENT-001
related_documents:
  - ../THP-SMB-ENGAGEMENT-001-client-lifecycle.md
  - ../templates/THP-SMB-TEMPLATE-004-stage-transition-record.md
supersedes: []
superseded_by: []
---

# Engagement Lifecycle Record

> **Reusable blank record** — one master record per business engagement.  
> **Not canonical.** Keep dimensions separate — do not collapse into one generic `status` field.

| Dimension | Field |
|---|---|
| Lifecycle position | `engagement_lifecycle_status` |
| Maturity | `maturity_classification` |
| Qualification gate | `qualification_result` |
| Claim-level evidence | evidence statuses (`self_reported`, `supported`, …) |
| Payment | `payment_status` |
| Consent | six permission fields below |
| Public proof | `proof_permission_level` |

# Business Identification

# Current Lifecycle Status

Use `engagement_lifecycle_status` namespace — see [`THP-SMB-ENGAGEMENT-001` §4](../THP-SMB-ENGAGEMENT-001-client-lifecycle.md#4-lifecycle-statuses).

# Current Maturity Classification

# Qualification Result

# Evidence Status Summary

# Proof Permission Level

One of: `internal_learning_record` · `anonymous_evidence_note` · `approved_case_study` · `public_media_story` — see [`THP-SMB-PROOF-001`](../smb-proof/THP-SMB-PROOF-001-case-study-and-proof-system.md).

# Engagement Timeline

| Stage | Entered | Exited | Decision | Record |
|---|---|---|---|---|

# Current Responsibilities

## THP

## Client

# Payment Status

# Consent Status

## Service Permission

`service_permission`:

## Internal Learning Permission

`internal_learning_permission`:

## Anonymized Research Permission

`anonymized_research_permission`:

## Case-Study Permission

`case_study_permission`:

## Public Content Permission

`public_content_permission`:

## Tipper Data Permission

`tipper_data_permission`:

# Active Blocking Conditions

# Current Risks

# Next Gate

# Exit Outcome

---

## Revision History

### 1.0.1 — 2026-07-21

- Added `proof_permission_level`; dimension separation table.

### 1.0.0 — 2026-07-21

- Initial blank master lifecycle record; consent permissions kept separate.
