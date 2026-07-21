# Intake Submission Setup

## Live application

| Item | Location |
|---|---|
| Public URL | `/apply` in `apps/web` |
| Form component | `apps/web/src/landing/engagement-readiness-form.tsx` |
| Method spec | [`THP-ENGAGEMENT-READINESS-APPLICATION`](../../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md) |

## Controlled review location (choose one)

Submissions must land in **one** place the reviewer checks daily:

### Option A — Webhook (recommended)

1. Create a Google Apps Script, Formspree, or Make/Zapier webhook.
2. Set `VITE_THP_INTAKE_WEBHOOK_URL` in `apps/web/.env`.
3. Webhook writes row to Google Sheet or sends email to `intake@` address.

### Option B — Dedicated email

1. Create `applications@thehardport.com` (or equivalent).
2. Configure webhook to email JSON/structured body.
3. File each application in `clients/{CLIENT-ID}/00-application/`.

### Option C — Manual (temporary only)

If webhook is not configured, the form displays a structured summary for applicant email to intake address. **Not acceptable for public CTA long-term.**

## On receipt

1. Assign provisional `CLIENT-ID` (e.g. `THP-CLIENT-001`).
2. Duplicate [`clients/_TEMPLATE/`](../../clients/_TEMPLATE/).
3. Save application export to `00-application/`.
4. Add row to [`THP-LIFECYCLE-PIPELINE-TRACKER.csv`](./templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv).
5. Set `engagement_lifecycle_status` → `application_submitted`.

## Environment variables

```env
# apps/web/.env
VITE_THP_INTAKE_WEBHOOK_URL=https://your-controlled-endpoint
```

See `apps/web/.env.example`.
