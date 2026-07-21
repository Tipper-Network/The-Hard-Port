# Intake Submission Setup

## Live application

| Item | Location |
|---|---|
| Public URL | `/apply` in `apps/web` |
| API | `POST /intake/applications` in `apps/api` (Nest + Prisma) |
| Form component | `apps/web/src/landing/engagement-readiness-form.tsx` |
| Server submit | `apps/web/src/lib/submit-intake.ts` → `THP_API_URL` |
| Method spec | [`THP-ENGAGEMENT-READINESS-APPLICATION`](../../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md) |

## Controlled review location (primary)

**Neon Postgres** — project `the-hard-port`, table `applications`.

Review options:

- `pnpm db:studio` — Prisma Studio
- Neon SQL editor
- Export/query for pipeline tracker sync

### Setup

1. Copy `apps/api/.env.example` → `apps/api/.env` with `DATABASE_URL` from Neon.
2. Set `JWT_SECRET` (required). Add Google/Meta OAuth creds when ready — see [`apps/api/AUTH_SETUP.md`](../../../apps/api/AUTH_SETUP.md).
3. Run migration: `pnpm db:migrate` (from repo root).
3. Set `THP_API_URL=http://localhost:3001` in `apps/web/.env`.
4. Start both apps: `pnpm dev` (or `pnpm dev:api` + `pnpm dev:web`).
5. Test submit at `/apply` — row appears in `applications`.

### Architecture

```text
/apply form  →  submitIntake (web server fn)  →  Nest API  →  Postgres (Neon)
```

Secrets stay server-side. The browser never talks to the database directly.

## Alternative — Google Sheet webhook

Legacy Option A docs remain in [`google-apps-script/`](./google-apps-script/) if needed. **Not recommended** now that the API exists.

## On receipt

1. Assign provisional `CLIENT-ID` (e.g. `THP-CLIENT-001`).
2. Update `applications.client_id` in the database.
3. Duplicate [`clients/_TEMPLATE/`](../../clients/_TEMPLATE/).
4. Save application export to `00-application/`.
5. Add row to [`THP-LIFECYCLE-PIPELINE-TRACKER.csv`](../templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv) or sync from DB.
6. Confirm `lifecycle_status` = `application_submitted`.

## Environment variables

```env
# apps/api/.env
DATABASE_URL=postgresql://…
PORT=3001
CORS_ORIGIN=http://localhost:3000

# apps/web/.env
THP_API_URL=http://localhost:3001
```

## Smoke test

```bash
pnpm dev:api
curl http://localhost:3001/intake/health
# → {"ok":true,"service":"thp-api"}

pnpm dev
# Submit test at http://localhost:3000/apply
```
