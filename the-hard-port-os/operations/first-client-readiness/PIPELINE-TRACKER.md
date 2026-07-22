# Pipeline Tracker — Operating Procedure

> **Source of truth:** Postgres `applications` table (via Nest API).  
> **CSV mirror:** export with `pnpm --filter api pipeline:export`  
> **Template reference:** [`templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv`](./templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv)

## When an application arrives

1. Applicant submits at `/apply` → `lifecycle_status` = `application_submitted`, `next_action` = `Review application within 48h`.
2. Operator signs in at `/sign-in` → `/review`.
3. Open application → set:
   - `lifecycle_status` → `application_under_review`
   - `assigned_reviewer` → your name/email
4. Read intake responses on the detail page. Decide within **48 hours**.

## Review decisions (early pipeline)

| Decision | Set lifecycle | Set qualification_result | Typical next_action |
|---|---|---|---|
| Proceed to qualification | `qualification_invited` | — | Schedule qualification call |
| Need more info | `application_under_review` | — | Email founder for missing fields |
| Too early | `too_early` | `too_early` | Close; revisit in 6 months |
| Out of scope | `outside_current_scope` | `outside_current_scope` | Close with reason in notes |
| Not ready for THP | `not_ready_for_thp` | `not_ready_for_thp` | Close; explain in notes |
| Qualified after gate | `qualified` | `qualified` | Send diagnostic proposal |
| Conditional | `conditionally_qualified` | `conditionally_qualified` | Assign preparation task |

Authoritative status list: [`THP-SMB-ENGAGEMENT-001` §4](../../knowledge/smb-engagement/THP-SMB-ENGAGEMENT-001-client-lifecycle.md#4-lifecycle-statuses).

## Capacity slot (one active client)

During field validation, only **one** application may hold `active_capacity_slot = true`.

- Set when diagnostic or intervention begins.
- API rejects a second slot until the first is cleared.
- Shown on `/review` list as `[slot]` badge.

## Client folder

When qualification proceeds:

1. Assign `client_id` (e.g. `THP-SMB-001`) in pipeline form.
2. Duplicate [`clients/_TEMPLATE/`](../../clients/_TEMPLATE/) to `clients/{CLIENT-ID}/`.
3. Record permissions in tracker when consents are collected (export columns reserved).

## Export / backup

```bash
pnpm --filter api pipeline:export
```

Writes to [`exports/THP-LIFECYCLE-PIPELINE-TRACKER-export.csv`](./exports/THP-LIFECYCLE-PIPELINE-TRACKER-export.csv).

Run weekly or before any operational review. Do not edit the export file and expect it to sync back — **update via `/review/{id}`**.

## API endpoints (operators)

| Method | Path | Purpose |
|---|---|---|
| GET | `/intake/applications` | List |
| GET | `/intake/applications/:id` | Detail + intake fields |
| PATCH | `/intake/applications/:id` | Update pipeline fields |

All require Bearer JWT.

## Readiness checklist link

This procedure satisfies **First-Client Readiness §4** (pipeline tracker in active use) when:

- [x] DB holds pipeline columns
- [x] Review UI updates them
- [x] Export command produces CSV
- [ ] Operator runs first real application through this flow
