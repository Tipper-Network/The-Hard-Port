# THP — Follow-up (website ↔ operating architecture)

> Applicants apply **without** sign-in. OAuth is for **THP operators/reviewers** only.

## Stack (decided)

- [x] **Web:** Next.js 15 App Router (migrated from TanStack Start)
- [x] **Homepage:** lazy below-fold sections (`LazySection` + `next/dynamic`)
- [x] **API:** Nest (unchanged)

## Public applicant path

- [x] Point header/footer CTAs to `/work-with-us` and `/apply`
- [x] Retire legacy homepage sections (packages, free slots, old apply form)
- [x] Align homepage copy with SERVICE-001 (condition → ladder → proof → capacity → apply)
- [ ] YouTube CTAs → `/work-with-us` then `/apply` (per YouTube architecture doc)

## Operator / reviewer path

- [x] Add `/sign-in` with Google + Meta OAuth links
- [x] After OAuth callback, land operators on `/review`
- [x] Build minimal reviewer view: list applications from `GET /intake/applications` (JWT)
- [x] Pipeline tracker in DB + `/review/[id]` update form + CSV export
- [ ] Process first real application through pipeline SOP
- [ ] Optional: `AUTH_ALLOWLIST` in production

## UX

- [x] `ux-onboarding-flow` skill with FEEDBACK-LOOP.yaml + automated checks

## Docs / rules (after site alignment)

- [x] Update skills/rules/instincts for backend, intake, auth boundaries, business analysis
- [x] Resolve homepage vs `THP-SMB-SERVICE-001` positioning conflict in copy rules

## Already done (context)

- [x] `/apply` — Engagement Readiness form → Nest API → Postgres
- [x] `/work-with-us` — public service explanation
- [x] OAuth + JWT on API (Google, Meta)
- [x] DBeaver / local DB connection (`127.0.0.1`, database `THP`)

## Env (web)

- `THP_API_URL` — server-side intake submit (Docker: `http://api:3001`)
- `NEXT_PUBLIC_THP_API_URL` — browser OAuth login links (was `VITE_THP_API_URL`)

## Legacy files (unused, safe to delete later)

- `src/landing/packages-section.tsx`, `free-slots-section.tsx`, `apply-form.tsx`, `boosting-section.tsx`, `branding-section.tsx`, `strategy-section.tsx`, `process-section.tsx`, `gap-section.tsx`, `about-section.tsx`

## Cursor layers updated (2026-07-22)

- **Rule:** `.cursor/rules/06-web-platform-architecture.mdc` (new)
- **Rules updated:** `01-copywriting-standards`, `02-conversion-funnel`, `04-ux-friction`
- **Skills updated:** funnel-launch, cta-escalation, section-audit, component-conversion, offer-construction, positioning-audience
- **Skill new:** `web-platform`, `ux-onboarding-flow`
- **Instinct new:** `applicant-not-operator`
- **Rule new:** `07-prisma-database` (models only — human migrates)
- **Instincts updated:** ladder-still-makes-sense, hormozi-value, could-exist-on-any-agency-site, whos-asking-whom
