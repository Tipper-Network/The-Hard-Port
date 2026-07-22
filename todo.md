# THP — Follow-up (website ↔ operating architecture)

> Applicants apply **without** sign-in. OAuth is for **THP operators/reviewers** only.

## Stack (decided)

- [x] **Web:** Next.js 15 App Router (migrated from TanStack Start)
- [x] **Homepage:** lazy below-fold sections (`LazySection` + `next/dynamic`)
- [x] **API:** Nest (unchanged)

## Public applicant path

- [x] Point header/footer CTAs to `/work-with-us` and `/apply`
- [ ] Retire legacy homepage sections (packages, free slots, old apply form) — still lazy-loaded for now
- [ ] Align homepage copy with SERVICE-001 (not branding/packages agency funnel)
- [ ] YouTube CTAs → `/work-with-us` then `/apply` (per YouTube architecture doc)

## Operator / reviewer path

- [ ] Add `/sign-in` (or `/review`) with Google + Meta OAuth links
- [ ] After OAuth callback, land operators on a **review surface** — not `/apply` (callback currently → `/`)
- [ ] Build minimal reviewer view: list applications from `GET /intake/applications` (JWT)
- [ ] Optional: `AUTH_ALLOWLIST` in production

## Docs / rules (after site alignment)

- [ ] Update skills/rules/instincts for backend, intake, auth boundaries, business analysis
- [ ] Resolve homepage vs `THP-SMB-SERVICE-001` positioning conflict in copy rules

## Already done (context)

- [x] `/apply` — Engagement Readiness form → Nest API → Postgres
- [x] `/work-with-us` — public service explanation
- [x] OAuth + JWT on API (Google, Meta)
- [x] DBeaver / local DB connection (`127.0.0.1`, database `THP`)

## Env (web)

- `THP_API_URL` — server-side intake submit (Docker: `http://api:3001`)
- `NEXT_PUBLIC_THP_API_URL` — browser OAuth login links (was `VITE_THP_API_URL`)
