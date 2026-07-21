# THP SMB Research, Evidence, and Consent

## Purpose

Classify engagement data, separate consent permissions, and define evidence rules for SMB client work.

**Document:** [`THP-SMB-RESEARCH-001-evidence-data-consent-system.md`](./THP-SMB-RESEARCH-001-evidence-data-consent-system.md)

## Current Status

| Field | Value |
|---|---|
| `status` | `working` |
| `field_validation` | `pending_first_entity` |
| `commercial_validation` | `pending` |
| `legal_validation` | `pending` |

## Upstream Documents

- [`THP-SMB-ENGAGEMENT-001`](../smb-engagement/THP-SMB-ENGAGEMENT-001-client-lifecycle.md) — lifecycle consent stages
- [`THP-SMB-SERVICE-001`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md) — service boundaries

## Downstream Documents

- [`THP-TIPPER-BOUNDARY-001`](../tipper-boundary/THP-TIPPER-BOUNDARY-001-manual-first-smb-research.md) — Tipper data permission boundary
- [`THP-SMB-PROOF-001`](../smb-proof/THP-SMB-PROOF-001-case-study-and-proof-system.md) — public proof permissions
- [`THP-SMB-TEMPLATE-005`](../smb-engagement/templates/THP-SMB-TEMPLATE-005-engagement-lifecycle-record.md) — per-engagement consent fields

## Consent Namespace

Separate fields — do not collapse:

`service_permission` · `internal_learning_permission` · `anonymized_research_permission` · `case_study_permission` · `public_content_permission` · `tipper_data_permission`

Service purchase grants only service delivery permissions. Optional permissions are separately recorded.

## Field-Validation Boundary

Consent language, retention schedules, and data-processing agreements pending legal validation.

## Deferred Decisions

- Final privacy notice and consent form text
- Data retention and deletion schedule
- Cross-border processing rules
- Customer/participant sub-consent for community data

## Consent Conflicts Flagged

| Location | Issue |
|---|---|
| [`THP-SMB-ENGAGEMENT-001` Stage 9](../smb-engagement/THP-SMB-ENGAGEMENT-001-client-lifecycle.md) | Combined phrasing "Research and publication consent" in THP actions — §8 and this doc keep permissions separate |
| [`ENTITY-ENGAGEMENT-BOUNDARIES.md`](../../docs/03-methods/entity-assessment/ENTITY-ENGAGEMENT-BOUNDARIES.md) | Generic "informed consent" — map to six permission types in commercial/legal design |
