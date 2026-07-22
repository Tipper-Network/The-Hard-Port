# Onboarding Flow Map (live UI)

Last aligned: 2026-07-22. Update this file when routes or flow order change.

## Applicant onboarding (public)

| Step | Route | Purpose | Success signal |
|---|---|---|---|
| 1 | `/` | Hook + letter; SERVICE-001 sections lazy below | Hero + letter paint < 3s on 4G; no 300kb+ single chunk |
| 2 | `/work-with-us` | Full service explanation (optional but recommended) | Reader understands diagnostic ≠ audit |
| 3 | `/apply` | Engagement Readiness Application | POST succeeds; confirmation visible |
| 4 | (wait) | THP reviews within 48h | Applicant receives human contact — **not automated yet** |

**CTA escalation (homepage):**

- Top: Read letter / How THP works
- Mid: See how it works / Read the full picture → `/work-with-us`
- Late: Apply → `/apply`

**Never in applicant path:** `/sign-in`, `/review`, JWT, OAuth.

## Operator onboarding (THP staff)

| Step | Route | Purpose | Success signal |
|---|---|---|---|
| 1 | `/sign-in` | OAuth entry | Google/Meta redirect to API |
| 2 | `/auth/callback` | Token handoff | Token stored; redirect `/review` |
| 3 | `/review` | Application queue | List from `GET /intake/applications` |
| 4 | `/review/[id]` | Intake read + pipeline update | PATCH saves; capacity slot enforced |
| 5 | Export | CSV backup | `pnpm --filter api pipeline:export` |

See [`PIPELINE-TRACKER.md`](../../../the-hard-port-os/operations/first-client-readiness/PIPELINE-TRACKER.md).

## Pipeline stages (post-submit)

```
application_submitted
  → application_under_review (48h SLA)
  → qualification_invited | too_early | outside_current_scope | not_ready_for_thp
  → qualified | conditionally_qualified
  → diagnostic_preparation → diagnostic_active → …
```

## Env required for full flow test

| Variable | Test |
|---|---|
| `THP_API_URL` | Apply submit (server) |
| `NEXT_PUBLIC_THP_API_URL` | OAuth links (browser) |
| `DATABASE_URL` | Applications persist |
| OAuth creds | Operator sign-in works |

## Files to inspect when flow breaks

| Symptom | Check |
|---|---|
| Apply fails | `apps/web/src/lib/submit-intake.ts`, API logs, `THP_API_URL` |
| Review empty | JWT, `GET /intake/applications`, CORS |
| OAuth loop | `WEB_APP_URL`, callback URLs, `auth/callback/page.tsx` |
| Slow homepage | `lazy-home-sections.tsx`, `lazy-section.tsx` |
