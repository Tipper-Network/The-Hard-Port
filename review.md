# The Hard Port — Project Review

**As of:** 2026-07-22  
**Scope:** Website, intake API, operator tooling, positioning alignment, and readiness to attract first applicants.

---

## Executive summary

THP has crossed from **prototype agency site** to **operating intake architecture**. The public funnel, backend, and reviewer path are wired and aligned with `THP-SMB-SERVICE-001`. The site can accept applications today in dev/local; **YouTube and paid diagnostic CTAs should wait** until commercial/legal gates and qualification workflow are closed.

**One-line state:** Infrastructure is ahead of operations — you can collect applications, but you are not yet fully ready to process one through to a paid diagnostic conclusion.

---

## Architecture (current)

```
Public applicant                         THP operator
────────────────                         ────────────
/  (homepage)                            /sign-in
  Hero + letter (eager)                    Google / Meta OAuth
  ↓ lazy sections                        ↓
/work-with-us  →  /apply                 /auth/callback → /review
  Service explanation                      JWT → GET /intake/applications
  Engagement Readiness form
       ↓ server action
Nest POST /intake/applications
       ↓
Postgres (applications table)
```

| Layer | Choice | Notes |
|---|---|---|
| Web | Next.js 15 App Router | Migrated from TanStack Start; homepage ~118 kB first load |
| API | NestJS + Prisma 7 | Multi-file schema under `apps/api/prisma/models/` |
| DB | Postgres (Dokploy / local) | Was Neon; local via `127.0.0.1`, database `THP` |
| Deploy | Docker Compose | Web standalone + API; see `DOCKER.md` |

### Auth boundary (non-negotiable, now enforced in code + rules)

- **Applicants:** no sign-in. Public `/apply` only.
- **Operators:** OAuth + JWT. `/sign-in` → `/review`.
- Do not conflate application, qualification, diagnostic, or intervention in copy or routes.

---

## What shipped (this cycle)

### Web platform

- [x] Next.js migration with App Router routes: `/`, `/work-with-us`, `/apply`, `/about`, `/sign-in`, `/review`, `/auth/callback`, `/auth/error`
- [x] Homepage lazy loading (`LazySection` + `next/dynamic`) — hero + letter eager; seven SERVICE-001 sections below fold
- [x] Legacy agency homepage retired from live page (packages, free slots, old `#apply` form still exist as dead files)
- [x] Header/footer/sticky CTAs → `/work-with-us` and `/apply`
- [x] Homepage copy aligned to SERVICE-001 ladder: condition → how it works → proof → not-promise → capacity → FAQ → last call

### Backend & intake

- [x] Engagement Readiness form → Nest `POST /intake/applications` → Postgres
- [x] Server action submit (`THP_API_URL` server-side)
- [x] OAuth (Google + Meta) + JWT on API
- [x] Protected `GET /intake/applications` for reviewers
- [x] Minimal review dashboard (table list)

### Governance (Cursor)

- [x] New rule: `06-web-platform-architecture.mdc`
- [x] Funnel, copy, UX rules updated for SERVICE-001 (not legacy agency funnel)
- [x] Skills/instincts updated; new `web-platform` skill and `applicant-not-operator` instinct

---

## Performance

| Metric | Before (TanStack) | After (Next.js + lazy) |
|---|---|---|
| Homepage first-load JS | ~284 kB chunk (~90 kB gzip) | **~118 kB** |
| Below-fold sections | All imported eagerly | Viewport + code-split |

Hero video still loads on first paint — acceptable tradeoff for hook; poster + `preload="metadata"` in place.

---

## Positioning alignment

| Area | Status |
|---|---|
| Public site vs SERVICE-001 | **Aligned** — homepage and `/work-with-us` describe Level 1 service, diagnostic, intervention ladder |
| Legacy agency language | **Removed from live funnel** — banned in copy rules; dead component files remain |
| Brand letter (canonical) | **Kept** — emotional center unchanged; CTAs updated |
| `/about` | Partially updated — still contains some legacy tone (free-slot bullet in "No spin" list); lower priority |

---

## Readiness gates (first client / YouTube)

From `THP-FIRST-CLIENT-READINESS-CHECKLIST.md`:

| Gate | Status |
|---|---|
| Application destination live | **Done** |
| Public service explanation | **Done** |
| Client workspace template | **Done** |
| Pipeline tracker in active use | **Open** — CSV exists; not yet single source of truth |
| Commercial readiness (payment, entity, delivery period) | **Open** — drafts exist; not operational |
| Legal review of templates | **Open** — drafts exist; lawyer pass required |
| Qualification workflow beyond list view | **Open** — review page lists apps; no accept/reject/qualify actions |
| Field validation after first entity | **Pending** — no first client yet |

**YouTube (`THP-YOUTUBE-001`):** Architecture doc exists; site CTAs not yet wired for YouTube-specific entry (still todo: route video CTAs → `/work-with-us` → `/apply`).

**Recommendation:** Do not publish Video 1 with a hard apply CTA until pipeline tracker is live and you can act on submissions within 48 hours.

---

## Environment & production

| Item | Status |
|---|---|
| Local dev (web + api + DB) | Working |
| Docker Compose | Configured; `NEXT_PUBLIC_THP_API_URL` at build time |
| Dokploy Postgres (internal hostname) | Documented; use internal URL on server |
| OAuth creds in production | **Open** — set callback URLs to public API |
| `AUTH_ALLOWLIST` in production | **Optional, not set** — recommended before go-live |
| Legacy `VITE_THP_API_URL` | Retired — use `NEXT_PUBLIC_THP_API_URL` |

---

## Known gaps & tech debt

1. **Review UI is read-only** — no qualification outcomes, no link to client folder, no detail view per application.
2. **Legacy landing components** — nine unused files under `apps/web/src/landing/`; safe to delete when you want a clean tree.
3. **`/about` copy drift** — still references free-slot mechanic in one bullet.
4. **`brand.ts` `freeSlots`** — constant still exists; not used on live homepage but may confuse future edits.
5. **First-client checklist** still mentions Neon in one line — cosmetic; DB is Postgres/Dokploy.
6. **No applicant confirmation email** — form shows in-UI success; no automated follow-up.
7. **metadataBase** — Next build warns about OG image base URL; set before production SEO matters.

---

## Recommended next steps (priority order)

1. **Operational:** Put pipeline tracker in daily use; define who reviews applications and within what SLA.
2. **Review UI:** Add application detail view + qualification status updates (even manual at first).
3. **Commercial/legal:** Close payment method, issuing entity, delivery period; legal review of agreement/SOW/privacy.
4. **Production:** Deploy with `AUTH_ALLOWLIST`, OAuth callbacks, `NEXT_PUBLIC_THP_API_URL`, Dokploy internal `DATABASE_URL`.
5. **YouTube:** Wire video/end-screen CTAs to `/work-with-us` then `/apply`; script Video 1 per `THP-YOUTUBE-001`.
6. **Cleanup:** Delete legacy landing components; trim `brand.ts` free-slot constants if no longer policy.

---

## Decision log (recent)

| Decision | Outcome |
|---|---|
| TanStack Start vs Next.js | **Next.js** — migrated; no re-platform needed for performance now |
| Applicant auth | **None** — public apply only |
| Homepage structure | **SERVICE-001 ladder** — legacy agency funnel retired |
| Scarcity copy | **One active client** — replaces "2 free slots" on public site |
| Cursor rules | **Updated** — platform, funnel, copy, instincts reflect current architecture |

---

## Bottom line

You have a **coherent minimum intake operation**: public explanation, public apply, stored applications, operator sign-in, application list. That is the hard structural work.

What you do **not** yet have is the **operating loop** that turns a submission into a qualification decision and, if accepted, a paid diagnostic engagement with legal and commercial rails attached.

The site is ready for **soft testing** (send a trusted founder to `/work-with-us` → `/apply`). It is not yet ready for **broadcast attraction** (YouTube CTA at scale) until operations and legal/commercial gates close.
