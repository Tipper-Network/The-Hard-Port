# The Hard Port — Project Review

**As of:** 2026-07-27  
**Scope:** Website, intake API, operator tooling, tracking, launch readiness, and positioning alignment.

---

## Executive summary

THP has moved from **intake prototype** to **observable funnel + operator pipeline**. Applications land in Postgres, operators get email notification (when Resend is configured), the review dashboard supports pipeline updates and first-party analytics, and applicants get a branded post-submit page.

**One-line state:** You can receive and process applications end-to-end in dev/local. **YouTube broadcast** should wait until production deploy, legal minimum, ops SLA habit, and commercial placeholder are closed. **Course access (Tipper-gated)** is specced in `report.md` — build when the launch gate is ready.

---

## Architecture (current)

```
Public applicant                         THP operator
────────────────                         ────────────
/  (homepage, 12 rungs)                  /sign-in
  Consent banner → tracking (opt-in)       Google / Meta OAuth
  ↓ lazy sections                        ↓
/work-with-us  →  /apply                 /review
  Engagement Readiness form                Applications | Funnel analytics
       ↓ server action                   /review/[id]
Nest POST /intake/applications             Intake | Site journey | Pipeline
       ↓
Postgres (applications, users, user_events)
       ↓
Resend → operator email (optional)
Resend → applicant confirmation stub (optional)
```

| Layer | Choice | Notes |
|---|---|---|
| Web | Next.js 15 App Router | ~14 routes; homepage lazy-loaded |
| API | NestJS + Prisma 7 | Multi-file schema under `apps/api/prisma/models/` |
| DB | Postgres (Dokploy / local) | Tracking + `discovery_source_video` need migrations if not applied |
| Deploy | Docker Compose | `NEXT_PUBLIC_THP_API_URL` + `NEXT_PUBLIC_SITE_URL` at web build |

### Auth boundary

- **Applicants:** no sign-in. Public `/apply` only. Visitor ID + events if consent accepted.
- **Operators:** OAuth + JWT. `/sign-in` → `/review`. Applicant `user` role blocked from operator sign-in.

---

## What shipped (cumulative through 2026-07-27)

### Web platform

- [x] Next.js App Router: `/`, `/work-with-us`, `/apply`, `/apply/submitted`, `/about`, `/privacy`, `/sign-in`, `/review`, `/review/[id]`, `/business-levels`, `/auth/callback`, `/auth/error`
- [x] Homepage **12 rungs** (`sections.config.ts`) — SERVICE-001 ladder; legacy Port/Sea/Ocean removed from live funnel
- [x] `/apply/submitted` — THP-voice confirmation; form redirects on success
- [x] `/about` rewritten — brand voice; no free-slot mechanic
- [x] `/privacy` placeholder — consent banner links here; legal copy pending (P02)
- [x] `metadataBase` via `getSiteUrl()` in root layout
- [x] First-party tracking: consent gate, session/entry context, homepage section views, scroll depth, form steps/abandon, nav clicks, batch flush to API
- [x] YouTube prefill: `?ref=youtube&video=` → `discoverySource` + `discoverySourceVideo` on submit

### Backend & intake

- [x] Engagement Readiness form → `POST /intake/applications` → Postgres
- [x] Operator notification on submit — `IntakeNotificationService` (Resend)
- [x] Applicant confirmation **stub** — `IntakeApplicantConfirmationService` (needs copy + `INTAKE_APPLICANT_FROM`)
- [x] Pipeline webhook **stub** — `IntakeWebhookService` on lifecycle change
- [x] OAuth + JWT; `ReviewerGuard` on intake list/detail/patch + tracking analytics
- [x] `PATCH /intake/applications/:id` — lifecycle, qualification, notes, capacity slot, etc.
- [x] Visitor tracking: `UserEvent`, `POST /tracking/events`, link by email/visitorId
- [x] Analytics: `GET /tracking/funnel/summary`, `GET /tracking/applications/:id/journey`
- [x] CSV export **stub**: `GET /tracking/funnel/export`

### Operator UI

- [x] `/review` — application list + **Funnel analytics** tab
- [x] `/review/[id]` — Intake responses, **Site journey**, **Pipeline** form
- [x] Qualification workflow **scaffold** on Pipeline tab (fill via P03)

### Ops scaffolding

- [x] Launch checklists P01–P07: `the-hard-port-os/operations/launch-scaffold/`

---

## Readiness gates

### Five-item gate (YouTube broadcast — from `report.md`)

| Gate | Status |
|---|---|
| Intake form → database | **Done** |
| Operator review dashboard | **Done** |
| Operator can advance pipeline state | **Done** |
| Notification on submission | **Done in code** — needs prod Resend env |
| Commercial placeholder (post-qualification) | **Open** |

### Launch scaffold (fill before scale)

| Priority | Doc | Status |
|---|---|---|
| P01 Production deploy | `launch-scaffold/P01-production-deploy.md` | Scaffold — fill env + smoke test |
| P02 Legal & privacy | `P02-legal-privacy.md` | Scaffold — `/privacy` placeholder live |
| P03 Intake ops loop | `P03-intake-ops-loop.md` | Scaffold — 48h SLA, daily loop |
| P04 Applicant confirmation | `P04-applicant-confirmation-email.md` | Stub wired — fill copy |
| P05 Discovery source video | `P05-discovery-source-video.md` | DB field wired — optional form UI |
| P06 YouTube launch | `P06-youtube-launch.md` | Scaffold — pre-broadcast gates |
| P07 Design system polish | `P07-design-system-polish.md` | Defer until after first client feedback |

**Soft-launch apply:** OK today. **YouTube at scale:** wait for P01–P04 minimum + gate item 5.

---

## Known gaps & tech debt

1. **Maturity classification** — still free text; enum scaffold empty (`maturity-classifications.constants.ts`).
2. **Design system** — no scroll-depth darkening; orange vs gold/rust unresolved (P07).
3. **Cold nav** — Who we are → `/about` still skips ladder agitation (report Gap 1).
4. **Last rung dual CTA** — intentional per funnel rule; OS single-CTA line still conflicts (decide once).
5. **Legacy landing files** — unused components under `apps/web/src/landing/`; safe to delete when cleaning tree.
6. **OS `01-ia-sitemap.md`** — stale vs live 12-rung funnel.
7. **Tracking CSV export** — header-only stub; implement aggregation (TRACKING-ROADMAP §7.4).
8. **Courses / Tipper grants** — specced in `report.md`; not built.

---

## Recommended plan (when ready)

Use this order when moving from soft-launch to product expansion. **Do not skip steps.**

### Phase A — Launch gate (human + config)

1. P01 production deploy (OAuth callbacks, env, migrate, smoke test)
2. P02 legal minimum (`/privacy`, apply ack, lawyer pass on drafts)
3. P03 ops loop — owner + 48h SLA habit on `/review`
4. P04 applicant confirmation email (copy + `INTAKE_APPLICANT_FROM`)
5. Commercial placeholder — static “what happens after qualification” page (report gate item 5)

### Phase B — Course access scaffolding (per `report.md` § Courses)

1. `CourseGrant` Prisma model + migrate
2. `CoursesModule` — access check + grant/revoke endpoints
3. `CourseAccessGuard` (composes on `JwtAuthGuard`)
4. `/courses` route tree — server-side gate before content
5. `CourseGrantsPanel` — third tab on `/review`
6. Course content (filesystem/MDX) — **only after 1–5 work**
7. Tipper webhook → `POST /courses/:slug/grants`

### Phase C — After first client

- P07 design system (oklch depth, rust/gold decision, scroll darkening)
- Structured maturity enum
- Tracking CSV export (real data)
- Intake webhook (real destination)

---

## Environment & production

| Item | Status |
|---|---|
| Local dev (web + api + DB) | Working |
| Docker Compose | Configured |
| OAuth in production | **Open** — set callback URLs |
| `AUTH_ALLOWLIST` | **Recommended** — not required locally |
| Resend (operator + applicant) | **Open** — set in prod |
| `NEXT_PUBLIC_SITE_URL` | Set at web build for OG/metadata |

---

## Bottom line

You have a **coherent intake operation with observability**: public apply, stored applications, operator pipeline UI, funnel analytics, per-applicant site journey, and notification hooks.

What you do **not** yet have: **production-hardened ops** (deploy, legal, SLA habit), **commercial rails**, or **course access layer**.

The site is ready for **soft testing**. It is not ready for **broadcast attraction** until Phase A closes. Phase B (courses) follows when Phase A is done.

For full architecture analysis and course spec detail, see **`report.md`**.
