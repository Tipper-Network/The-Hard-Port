---
id: METHOD-EPDA-APP-001
title: THP Engagement Readiness Application
document_type: method_definition
status: candidate
version: 0.6.0
created: 2026-07-21
updated: 2026-07-27
authors:
  - The Hard Port
owners:
  - Tarek
confidence: developing
evidence_level: self_reported
canonicality: non_canonical
role: intake_only
feeds_into:
  - THP-SMB-INSTRUMENT-002
  - THP-SMB-ENGAGEMENT-001
related_documents:
  - ../../04-market/first-onboarder/THP-SMB-001-FIRST-ONBOARDER.md
  - ./ENTITY-ENGAGEMENT-BOUNDARIES.md
  - ./ENTITY-POSITION-AND-DIRECTION-ASSESSMENT.md
  - ../../../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md
  - ../../../knowledge/smb-engagement/THP-SMB-ENGAGEMENT-001-client-lifecycle.md
  - ../../../knowledge/media/youtube/THP-MEDIA-002-first-12-video-test.md
  - ../../../knowledge/media/youtube/templates/THP-MEDIA-TEMPLATE-002-content-evidence-record.md
supersedes: []
supersedes_by: []
---

# THP Engagement Readiness Application

> **Status:** `candidate`, `non_canonical` — intake only (`role: intake_only`).  
> **Live form:** [`/apply`](../../../apps/web/src/routes/apply.tsx) · setup [`operations/first-client-readiness/intake/SUBMISSION-SETUP.md`](../../../operations/first-client-readiness/intake/SUBMISSION-SETUP.md)  
> **Authority:** Self-reported preliminary information (`evidence_level: self_reported`).  
> **Does not** make the final qualification or acceptance decision — see [`THP-SMB-INSTRUMENT-002`](../../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md).

## Purpose

Collect preliminary self-reported information required to determine whether a business should be reviewed through the THP First-Onboarder Qualification Gate.

Completion of this application does not mean the applicant has been accepted, diagnosed, or classified at a maturity level.

## Position in engagement sequence

See [`THP SMB Engagement Sequence`](../../knowledge/smb-maturity/README.md#thp-smb-engagement-sequence):

1. **This application** — self-reported intake
2. [`THP-SMB-INSTRUMENT-002`](../../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md) — qualification gate (authoritative)
3. Level 1 diagnostic (A–H) — post-qualification
4. [`ENTITY-POSITION-AND-DIRECTION-ASSESSMENT.md`](./ENTITY-POSITION-AND-DIRECTION-ASSESSMENT.md) + [`layer-07-consulting-methodology.md`](../../intelligence/layer-07-consulting-methodology.md) — downstream

The application collects self-reported information. The qualification gate determines whether THP should accept the business into the diagnostic process.

Application answers remain self-reported until reviewed through the qualification gate.

## Lifecycle Position

This application is **Stage 2** of the [THP SMB Client Engagement Lifecycle](../../../knowledge/smb-engagement/THP-SMB-ENGAGEMENT-001-client-lifecycle.md).

It follows public discovery and precedes application review and qualification.

Completion does not guarantee qualification, diagnosis, or commercial acceptance.

## Qualification field mapping

Operational form implemented in `apps/web/src/landing/engagement-readiness-form.tsx`. Fields map to qualification uses below.

| Planned application field | Qualification use | Instrument section |
|---|---|---|
| Business name | `routing_only` | Decision record — identification |
| Founder name | `routing_only` | Decision record — identification |
| Core offer description | `level_1_entry` | Business-existence interview (A1) |
| Paying customers — count and examples | `level_1_entry` | Business-existence interview (A2) |
| Delivery history | `level_1_entry` | Business-existence interview (A3) |
| Current operating status | `level_1_entry` | Business-existence interview (A4) |
| Founder continuation intention | `level_1_entry` | Business-existence interview (A5) |
| Online or online-dependent activity | `first_onboarder_fit` | First-onboarder fit (B1) |
| Business size / microbusiness indicators | `first_onboarder_fit` | First-onboarder fit (B2) |
| Founder direct involvement | `first_onboarder_fit` | First-onboarder fit (B3) |
| Primary channels and observable activity | `first_onboarder_fit` | First-onboarder fit (B4–B5) |
| Primary problems and desired outcome | `first_onboarder_fit` · `scope_review` | First-onboarder fit (B6) · Scope review |
| Available records and examples | `evidence_inventory` | Minimum qualification evidence |
| Willingness to examine assumptions | `founder_readiness` | Founder-readiness (R1) |
| Willingness to provide evidence | `founder_readiness` | Founder-readiness (R2) |
| Openness to customer feedback | `founder_readiness` | Founder-readiness (R3) |
| Availability to participate | `founder_readiness` | Founder-readiness (R4) |
| Understanding of THP limitations | `founder_readiness` | Founder-readiness (R5) |
| Willingness to stop unsupported actions | `founder_readiness` | Founder-readiness (R6) |
| Crisis or referral indicators | `scope_review` | Scope and referral review |
| Contact and scheduling preferences | `routing_only` | Application routing only |
| `discovery_source_video` | `routing_only` · `media_attribution` | Which THP video led the applicant here |
| Statement that felt most accurate | `first_onboarder_fit` · `media_attribution` | Self-reported recognition signal — intake only |
| What they believe is wrong | `first_onboarder_fit` · `scope_review` | Self-reported problem frame — not verified diagnosis |
| What they have already tried | `first_onboarder_fit` | Self-reported tactic history — intake only |
| What they expect THP to do | `founder_readiness` · `scope_review` | Self-reported service expectation — not verified scope agreement |

Qualification uses:

- `level_1_entry` — Level 1 entry gate verification
- `first_onboarder_fit` — first-onboarder profile fit
- `founder_readiness` — founder-readiness interview
- `evidence_inventory` — minimum evidence and records inventory
- `scope_review` — scope and referral review
- `routing_only` — intake logistics; does not feed a gate decision directly
- `media_attribution` — YouTube or media source tracking; informs institutional learning, not gate decisions alone

## Media source fields

These fields capture **intake inputs**, not verified diagnostic findings.

### `discovery_source_video`

Records which THP video (if any) led the applicant to the application.

- Format: video number and working title (e.g. `Video 12 — We Are Looking for the First THP Entity`) or `not_from_youtube` / `unknown`
- Use: media attribution, content-evidence loop, first-onboarder model refinement
- Distinct from general `discoverySource` (e.g. "YouTube") — this field ties to a specific video in [`THP-MEDIA-002`](../../../knowledge/media/youtube/THP-MEDIA-002-first-12-video-test.md)

### Media-attribution questions (intake only)

| Field | Question | Notes |
|---|---|---|
| `discovery_source_video` | Which video led you here? | Source-video attribution |
| Statement felt most accurate | Which statement in that video (or in THP content) felt most accurate? | Recognition signal — self-reported |
| What they believe is wrong | What do you currently believe is wrong with the business? | Problem frame — not verified |
| What they have already tried | What have you already tried? | Tactic history — self-reported |
| What they expect THP to do | What do you expect THP to do? | Scope expectation — may reveal agency misinterpretation |

Answers remain `self_reported` until reviewed through [`THP-SMB-INSTRUMENT-002`](../../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md).

Feed content-evidence records via [`THP-MEDIA-TEMPLATE-002`](../../../knowledge/media/youtube/templates/THP-MEDIA-TEMPLATE-002-content-evidence-record.md).

## What the Application Tests

Preliminary signals only — subject to verification at qualification:

- **Openness** — willingness to examine assumptions, patterns, and the founder's participation in outcomes
- **Responsibility** — capacity to acknowledge that the current approach may be insufficient without abandoning the entity
- **Operating history** — self-reported evidence the business is already operating, not merely planned
- **Information availability** — willingness to provide relevant operating information
- **Willingness to participate** — readiness for structured review and follow-through

## Explicit Boundaries

The application **must not** require applicants to:

- describe themselves as incompetent;
- label themselves as failures;
- declare themselves bad business owners;
- perform self-condemnation to qualify;
- accept THP's interpretation before assessment occurs.

Readiness is based on **openness and responsibility** — not shame, humiliation, or predetermined guilt.

## What the Application Is Not

- The First-Onboarder Qualification Gate ([`THP-SMB-INSTRUMENT-002`](../../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md))
- A marketing lead form optimized for volume
- A psychological screening
- A social-media follower threshold check
- A maturity classification or diagnostic
- A substitute for the Entity Position and Direction Assessment

## Application Output

The application may produce one of these **preliminary routing results** — routing signals only:

| Result | Meaning |
|---|---|
| **`ready_for_qualification_review`** | Sufficient intake to schedule qualification review |
| **`missing_application_information`** | Incomplete application; request before qualification |
| **`likely_too_early`** | Self-reported signals suggest Level 1 entry gate may not be met |
| **`likely_outside_current_scope`** | Self-reported signals suggest referral before THP |
| **`readiness_concern_identified`** | Self-reported signals suggest founder-readiness review needed |

The **final qualification decision** belongs to [`THP-SMB-INSTRUMENT-002`](../../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md).

## Relationship to Refusal

Preliminary routing may suggest delay — not a judgment that the applicant lacks legitimate worth, values, or potential.

See [`ENTITY-ENGAGEMENT-BOUNDARIES.md`](./ENTITY-ENGAGEMENT-BOUNDARIES.md).

## Design Status

| Component | Status |
|---|---|
| Form fields | **Implemented** — `/apply` |
| Webhook / review location | **Nest API + Neon** — `apps/api` · [`SUBMISSION-SETUP`](../../../operations/first-client-readiness/intake/SUBMISSION-SETUP.md) |
| Scoring | **Not designed** — no numeric scoring |
| Routing thresholds | **At qualification** — INSTRUMENT-002 |
| Integration with qualification gate | **Mapped** — see Qualification field mapping |

## Revision History

### 0.6.0 — 2026-07-27

- Added `discovery_source_video` and media-attribution intake fields.
- Linked to content-evidence record template and first 12-video test.

### 0.5.0 — 2026-07-21

- Operational form at `/apply`; intake setup in `operations/first-client-readiness/`.

### 0.4.0 — 2026-07-21

- Lifecycle Position added (Stage 2); linked to [`THP-SMB-ENGAGEMENT-001`](../../../knowledge/smb-engagement/THP-SMB-ENGAGEMENT-001-client-lifecycle.md).

### 0.3.0 — 2026-07-21

- Qualification field mapping added (`level_1_entry`, `first_onboarder_fit`, `founder_readiness`, `evidence_inventory`, `scope_review`, `routing_only`).
- Self-reported-until-qualification note added.

### 0.2.0 — 2026-07-21

- Reframed as intake only; feeds qualification gate; routing outputs defined.
- `role: intake_only`, `evidence_level: self_reported`, `feeds_into: THP-SMB-INSTRUMENT-002`.

### 0.1.0 — 2026-07-21

- Registered application purpose and non-condemnation boundaries as placeholder.
