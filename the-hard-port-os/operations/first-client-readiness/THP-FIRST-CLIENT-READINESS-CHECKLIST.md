# First-Client Readiness Checklist

> Operational gate before publishing a direct application CTA.  
> Status: working — complete items before YouTube routes to `/apply`.

## 1. Application destination

- [x] Live form at `/apply` (or equivalent published URL)
- [x] Collects minimum intake fields per [`THP-ENGAGEMENT-READINESS-APPLICATION`](../../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md)
- [x] States that applying does not guarantee acceptance
- [x] Includes basic privacy notice
- [x] Records how applicant discovered THP
- [ ] Submissions route to one controlled review location ([`intake/SUBMISSION-SETUP.md`](./intake/SUBMISSION-SETUP.md)) — configure `VITE_THP_INTAKE_WEBHOOK_URL`

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
- [ ] In active use (spreadsheet, Notion, or Airtable) as single source of truth

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

## Readiness gate (all must be true to publish CTA)

- [x] Viewer has somewhere to apply
- [ ] THP can decide whether to accept them — tracker in use + qualification workflow
- [x] THP can explain the paid diagnostic
- [x] Client evidence can be stored responsibly
- [ ] THP can process one entity application → conclusion — pending first entity
