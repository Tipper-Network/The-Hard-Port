# Evidence Storage Rule

> **Working rule — pending legal review.** Implements [`THP-SMB-RESEARCH-001`](../../knowledge/smb-research/THP-SMB-RESEARCH-001-evidence-data-consent-system.md).

## Principle

Client source data and THP institutional learning stay in **separate locations** within each client workspace.

## Client workspace

Duplicate [`clients/_TEMPLATE/`](../../clients/_TEMPLATE/) to `clients/{CLIENT-ID}/`.

| Folder | Stores | Does not store |
|---|---|---|
| `00-application/` through `08-proof/` | Client source materials, engagement deliverables, case evidence | Unredacted institutional learning for other clients |
| `09-institutional-learning/` | THP internal notes, methodology learnings, Tipper hypotheses | Raw client exports without access justification |

## Access

- Limit access to assigned reviewer + explicit need-to-know.
- Do not sync client folders to public cloud without encryption and access control.
- Do not use client evidence in Slack/email without redaction when unnecessary.

## Retention (working defaults — legal review required)

| Data type | Retention |
|---|---|
| Active engagement | Duration of engagement + reconciliation period |
| Completed engagement — client deliverables | Per agreement; client receives copies at handoff |
| Completed engagement — THP working analysis | 7 years or per tax/legal advice |
| Institutional learning (restricted) | Indefinite internal; no client identifiers without permission |
| Application from declined applicants | 12 months then delete unless applicant consents to future contact |

## Deletion

- On termination or client request, delete or return client source data per agreement within _[X days — legal review]_.
- Institutional learning records may retain **anonymized patterns** only if `anonymized_research_permission` granted.

## Prohibited

- Mixing multiple clients in one folder
- Using client DMs or financial records for public content without `public_content_permission`
- Entering client data into Tipper without `tipper_data_permission` and defined fields
