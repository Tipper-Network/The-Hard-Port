# First-Client Readiness

## Purpose

Establish the minimum operational infrastructure required to receive and process THP's first entity safely and consistently.

This is **not** another institutional-design phase. Build only what is necessary before a public application CTA.

## Required Before Public Application CTA

- [x] Usable application form — [`intake/`](./intake/) · live route `/apply` in `apps/web`
- [x] Public service explanation — [`public/thp-service-explanation.md`](./public/thp-service-explanation.md) · live route `/work-with-us`
- [x] Client workspace template — [`../../clients/_TEMPLATE/`](../../clients/_TEMPLATE/)
- [x] Lifecycle tracker — [`templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv`](./templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv) · DB source: `applications` table
- [x] Diagnostic offer summary — [`THP-MINIMUM-COMMERCIAL-READINESS.md`](./THP-MINIMUM-COMMERCIAL-READINESS.md)
- [ ] Payment process documented
- [x] Minimum privacy and service documents — [`templates/legal/`](./templates/legal/)
- [x] Evidence-storage rule — [`THP-EVIDENCE-STORAGE-RULE.md`](./THP-EVIDENCE-STORAGE-RULE.md)
- [x] One-active-client capacity limit — see below
- [x] Field-validation record — [`templates/THP-FIRST-CLIENT-FIELD-VALIDATION.md`](./templates/THP-FIRST-CLIENT-FIELD-VALIDATION.md)
- [x] Intake API — `apps/api` (Nest + Prisma + Neon)

Full checklist: [`THP-FIRST-CLIENT-READINESS-CHECKLIST.md`](./THP-FIRST-CLIENT-READINESS-CHECKLIST.md)

## One-Active-Client Capacity Limit

**Field-validation cycle:** THP accepts only **one active diagnostic or intervention client** at a time.

The first entity tests qualification, diagnostic usefulness, founder workload, evidence availability, intervention phase order, deliverable burden, pricing assumptions, Tipper hypotheses, and proof collection.

Multiple simultaneous clients would make failures difficult to interpret.

Record capacity status in the [lifecycle pipeline tracker](./templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv).

## Readiness Gate (publish CTA when all five are true)

1. A viewer has somewhere to apply (`/apply`).
2. THP can decide whether to accept them (qualification workspace + tracker).
3. THP can explain the paid diagnostic (`/work-with-us` + commercial summary).
4. Client evidence can be stored responsibly (client folder + storage rule).
5. THP can process one entity from application to conclusion (folder template + pipeline).

## Client Data Separation

| Location | Contents |
|---|---|
| `clients/{CLIENT-ID}/` | Client source data, deliverables, engagement records |
| `clients/{CLIENT-ID}/09-institutional-learning/` | THP internal learning only — separate from client-facing folders |
| Institutional docs in `knowledge/` | Frameworks — not client case data |

## Not Required Yet

- Client portal
- Custom CRM software
- Tipper automation
- Multiple service packages
- Diagnostic scoring rubric
- Levels 4–7
- Full multi-country legal library

## Related Architecture

- [`THP-SMB-ENGAGEMENT-001`](../../knowledge/smb-engagement/THP-SMB-ENGAGEMENT-001-client-lifecycle.md)
- [`THP-SMB-SERVICE-001`](../../knowledge/smb-service/THP-SMB-SERVICE-001-offer-architecture.md)
- [`THP-SMB-RESEARCH-001`](../../knowledge/smb-research/THP-SMB-RESEARCH-001-evidence-data-consent-system.md)

## Active Task

YouTube Attraction Architecture — with this intake prerequisite built **alongside**, not instead of content design. See [`active/CURRENT_TASK.md`](../../active/CURRENT_TASK.md).
