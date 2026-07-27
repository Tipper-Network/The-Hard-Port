# First-Client Readiness Checklist

> Operational gate before publishing a direct application CTA.  
> Status: working — complete items before YouTube routes to `/apply`.

## 1. Application destination

- [x] Live form at `/apply` (or equivalent published URL)
- [x] Collects minimum intake fields per [`THP-ENGAGEMENT-READINESS-APPLICATION`](../../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md)
- [x] States that applying does not guarantee acceptance
- [x] Includes basic privacy notice
- [x] Records how applicant discovered THP
- [x] Submissions route to one controlled review location — Nest API + Neon `applications` table ([`intake/SUBMISSION-SETUP.md`](./intake/SUBMISSION-SETUP.md))

## 2. Public service explanation

- [x] Live page at `/work-with-us` (or equivalent)
- [x] Who THP currently helps
- [x] What condition those businesses experience
- [x] What THP does and does not promise
- [x] What happens after applying
- [x] Why diagnostic ≠ marketing audit

## 3. Client workspace template

- [x] [`clients/_TEMPLATE/`](../../clients/_TEMPLATE/) duplicated per entity
- [x] Client source and institutional learning folders separated
- [x] README in template (stage mapping documented)

## 4. Pipeline tracker

- [x] [`THP-LIFECYCLE-PIPELINE-TRACKER.csv`](./templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv) created
- [x] In active use — Postgres `applications` + `/review` UI + [`PIPELINE-TRACKER.md`](./PIPELINE-TRACKER.md)
- [ ] First real application processed end-to-end through operator flow

## 5. Minimum commercial readiness

- [x] Diagnostic named: **Business Reality Diagnostic**
- [x] Includes / excludes documented — [`THP-MINIMUM-COMMERCIAL-READINESS.md`](./THP-MINIMUM-COMMERCIAL-READINESS.md)
- [ ] Approximate delivery period set
- [ ] Payment method chosen
- [ ] Invoice or receipt process defined
- [ ] Cancellation and pause rules drafted
- [ ] Legal issuing entity identified

## 6. Minimum legal and privacy readiness

- [x] Service agreement draft — [`templates/legal/SERVICE-AGREEMENT-DRAFT.md`](./templates/legal/SERVICE-AGREEMENT-DRAFT.md)
- [x] Scope of Work (diagnostic) — [`templates/legal/SCOPE-OF-WORK-DIAGNOSTIC-DRAFT.md`](./templates/legal/SCOPE-OF-WORK-DIAGNOSTIC-DRAFT.md)
- [x] Privacy notice — [`templates/legal/PRIVACY-NOTICE-DRAFT.md`](./templates/legal/PRIVACY-NOTICE-DRAFT.md)
- [x] Data-access permission — [`templates/legal/DATA-ACCESS-PERMISSION-DRAFT.md`](./templates/legal/DATA-ACCESS-PERMISSION-DRAFT.md)
- [x] Confidentiality terms included in agreement
- [x] Optional research and public-content consents separate — [`templates/legal/OPTIONAL-CONSENTS-DRAFT.md`](./templates/legal/OPTIONAL-CONSENTS-DRAFT.md)
- [x] Evidence storage and deletion rule — [`THP-EVIDENCE-STORAGE-RULE.md`](./THP-EVIDENCE-STORAGE-RULE.md)
- [ ] Documents reviewed under applicable law (**legal review required**)

## 7. Capacity limit

- [x] One active diagnostic or intervention client enforced for field-validation cycle
- [ ] Capacity recorded in pipeline tracker when first applicant arrives

## 8. Field-validation protocol

- [x] [`THP-FIRST-CLIENT-FIELD-VALIDATION.md`](./templates/THP-FIRST-CLIENT-FIELD-VALIDATION.md) template ready
- [ ] Completed after first engagement (or per milestone)

## Required Before Video 12 Application CTA

Videos 1–11 may be designed and produced while these items are being completed.

Do not publish Video 12 with a direct application CTA before the route is usable.

- [x] Public THP explanation is live — `/work-with-us`
- [x] Engagement Readiness Application is usable — `/apply`
- [x] Application submissions reach one controlled location — Nest API + Neon
- [x] Privacy notice is visible — on application form
- [ ] Application-source video is recorded — `discovery_source_video` field documented; form implementation pending
- [ ] Qualification review process is ready — `/review` in use; first entity pending
- [x] Paid diagnostic summary is ready — [`THP-MINIMUM-COMMERCIAL-READINESS.md`](./THP-MINIMUM-COMMERCIAL-READINESS.md)
- [x] One-client field-validation limit is stated — capacity rule documented

See also [`THP-MEDIA-002`](../../knowledge/media/youtube/THP-MEDIA-002-first-12-video-test.md) Video 12 publication gate.

## Readiness gate (all must be true to publish CTA)

- [x] Viewer has somewhere to apply
- [ ] THP can decide whether to accept them — tracker in use; qualification workflow in `/review` (first entity pending)
- [x] THP can explain the paid diagnostic
- [x] Client evidence can be stored responsibly
- [ ] THP can process one entity application → conclusion — pending first entity
