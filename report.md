# The Hard Port — Full Business & Architecture Report
**Prepared:** 2026-07-22  
**Revised:** 2026-07-27 — doc sync with codebase; launch scaffold + recommended plan for later  
**Scope:** Backend coherence, frontend coherence, OS-to-product harmony, skills/goals fit, and senior BA advice on user flow and design.

---

## Revision note (2026-07-27, update 3) — Doc sync & when-ready plan

**Purpose:** Align this report with the live codebase after tracking, launch scaffold, and intake fixes. **`review.md`** is the operational snapshot; this file keeps architecture analysis and the course-access spec.

### Shipped since update 2 (runtime section was stale)

| Item | Status |
|------|--------|
| `metadataBase` / `getSiteUrl()` | **Fixed** — `apps/web/app/layout.tsx` |
| Operator email on submit | **Done** — `IntakeNotificationService` (needs prod Resend) |
| `/apply/submitted` post-submit page | **Done** |
| `/about` brand rewrite | **Done** |
| `/privacy` placeholder + consent link | **Done** — legal copy pending (P02) |
| Operator pipeline PATCH UI | **Done** — `/review/[id]` Pipeline tab |
| Applicant confirmation | **Stub wired** — fill copy (P04) |
| Pipeline webhook | **Stub wired** — fill destination |
| `discoverySourceVideo` | **DB + API wired** — from `?ref=youtube&video=` |
| Launch ops checklists P01–P07 | **Scaffold** — `the-hard-port-os/operations/launch-scaffold/` |
| Tracking CSV export | **Stub** — `GET /tracking/funnel/export` |

### Five-item broadcast gate (updated)

| Gate | Status |
|------|--------|
| Intake → DB | Done |
| Operator review dashboard | Done |
| Operator can advance pipeline | Done |
| Notification on submit | Done in code — prod env required |
| Commercial placeholder | **Open** |

**Soft-launch apply:** OK. **YouTube at scale:** wait for launch gate (see `review.md` Phase A).

### Recommended plan when ready (do not reorder)

**Phase A — Launch gate** (human + config): P01 deploy → P02 legal → P03 ops SLA → P04 applicant email → commercial placeholder.

**Phase B — Course access** (below): only after Phase A. Model → API → guard → `/courses` routes → operator grants panel → content → Tipper webhook.

**Phase C — After first client:** design system (P07), maturity enum, real CSV export, real webhooks.

---

## Revision note (2026-07-27, update 2) — Courses Architecture: Tipper-Gated Access

### What was just shipped

Three commits landed today on top of the notification setup from earlier: **front end tracking** and **dashboard**.

What they contain:

| Area | What shipped |
|------|-------------|
| `TrackingAnalyticsService` | Funnel summary: sessions → apply opens → submits → abandons, section reach by rung, form step views/completes/abandons |
| `TrackingController` | `GET /tracking/funnel/summary` (reviewer-guarded), `GET /tracking/applications/:id/journey` (reviewer-guarded) |
| `FunnelAnalyticsDashboard` | First-party analytics tab on the operator review dashboard — stat cards, scroll depth ladder with progress bars, form step table, top events |
| `applicant-journey-panel.tsx` | Per-application pre-apply behaviour: what rungs they hit, what form steps they completed, whether they abandoned |
| `applications-list-panel.tsx` | Extracted from `review-dashboard.tsx` — list view now lives in its own component |
| `ReviewOperatorTabs` | Applications tab + Funnel analytics tab, operator dashboard now has two modes |
| Tracking primitives | `consent.ts`, `event-store.ts`, `flush-events.ts`, `session.ts`, `visitor-id.ts` in `lib/tracking/` — first-party, GDPR-consent-gated event pipeline |

**The funnel is now observable.** You can watch where visitors drop off on the ladder, which form steps lose people, and reconstruct the pre-apply journey for any individual applicant. This is a meaningful operational capability.

---

### Next step architecture: Courses with Tipper-gated access

> **When to build:** Phase B — after Phase A launch gate closes (`review.md`). Do not build course content before grants; do not build grants before the model.

**The constraint:** Access to courses is not a website-managed subscription. Tipper is the access layer. The website's job is to ask "does this user have access?" and render accordingly — it does not decide who gets access, it only enforces what Tipper has already decided.

**What this means in practice:**

Access grants are operator-created artefacts, not self-serve purchases. When a client completes a diagnostic, advances to a certain pipeline stage, or reaches a maturity level that Tipper recognises, an operator (or eventually Tipper itself) issues a `CourseGrant`. The website checks for that grant. If it exists, the door opens. If not, the visitor sees a gate that explains what they'd need to do to earn access — not a pricing page.

This maps cleanly onto what already exists: the `UserRole` enum, the JWT auth pattern, and the `ReviewerGuard` pattern all show how to express "this user is allowed here." A `CourseGrant` is the same idea applied to content instead of dashboard access.

---

### Prisma schema additions

Add a `courses/` domain folder to `apps/api/prisma/models/`:

```
apps/api/prisma/models/
  auth/
    user.prisma           (existing)
    enums.prisma          (existing — add CourseSlug enum here)
  intake/                 (existing)
  tracking/               (existing)
  courses/                ← new
    course-grant.prisma   ← who has access to what
```

**`courses/course-grant.prisma`**
```prisma
/// Access grant issued by Tipper or an operator after a qualifying event
model CourseGrant {
  id         String      @id @default(cuid())
  userId     String      @map("user_id")
  courseSlug CourseSlug  @map("course_slug")
  grantedAt  DateTime    @default(now()) @map("granted_at")
  grantedBy  String?     @map("granted_by")     // operator userId or "tipper"
  source     String?                              // e.g. "diagnostic_complete", "maturity_level_2"
  expiresAt  DateTime?   @map("expires_at")      // null = permanent

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, courseSlug])
  @@index([userId])
  @@map("course_grants")
}
```

**`CourseSlug` enum** (add to `auth/enums.prisma` or a new `courses/enums.prisma`):
```prisma
enum CourseSlug {
  foundations_level_1
  diagnostic_toolkit
  stable_ops
  // add as courses are created
}
```

No `Course` model yet — course content lives in the filesystem (MDX or static content), not the database. The database only records grants. When you have enough courses to need metadata management, add a `Course` model then. Not before.

---

### API additions

Add a `courses/` NestJS module alongside the existing ones:

```
apps/api/src/
  app.module.ts           (existing — register CoursesModule here)
  auth/                   (existing)
  intake/                 (existing)
  tracking/               (existing)
  prisma/                 (existing)
  users/                  (existing)
  courses/                ← new
    courses.module.ts
    courses.controller.ts
    courses.service.ts
    guards/
      course-access.guard.ts   ← checks CourseGrant, wraps JwtAuthGuard
    dto/
      grant-course.dto.ts
```

**Controller shape:**
```
GET  /courses                       → list slugs the authed user has grants for
GET  /courses/:slug/access          → 200 (has grant) or 403 (does not)
POST /courses/:slug/grants          → JwtAuthGuard + ReviewerGuard — create a grant (operator or Tipper webhook)
DEL  /courses/:slug/grants/:userId  → JwtAuthGuard + ReviewerGuard — revoke a grant
```

The `CourseAccessGuard` does one thing: given a JWT and a route param `slug`, check for an active `CourseGrant`. If not found or expired, throw `ForbiddenException`. This guard composes on top of `JwtAuthGuard`, same pattern as `ReviewerGuard` today.

---

### Web additions

```
apps/web/src/
  components/
    auth/                 (existing)
    courses/              ← new
      course-card.tsx           — thumbnail + title + lock/unlock state
      course-gate.tsx           — "you don't have access" wall; explains how to earn it
      lesson-layout.tsx         — shared wrapper for a lesson page
    landing/              (existing)
    review/               (existing)
    tracking/             (existing)
    ui/                   (existing)
  hooks/
    api/
      use-applications.ts (existing)
      use-auth.ts         (existing)
      use-courses.ts      ← new — useMyGrants(), useCourseAccess(slug)
      use-tracking.ts     (existing)
  lib/
    api/
      courses.ts          ← new — fetchMyGrants(), checkCourseAccess(slug)
      client.ts           (existing)
      query-keys.ts       (existing — add courses keys)
```

**Routes** (Next.js App Router — wherever `layout.tsx` / `page.tsx` currently live):
```
/courses                  → index; shows granted courses as unlocked cards, others as locked
/courses/[slug]           → course home; layout checks access via CourseAccessGuard pattern
/courses/[slug]/[lesson]  → individual lesson; inherits access from parent layout
```

The `/courses/[slug]/layout.tsx` calls `GET /courses/:slug/access` server-side. If 403, it renders `<CourseGate />` instead of the content. If 200, it renders `{children}`. No content is sent to the client until the server confirms the grant.

---

### Operator surface additions (review dashboard)

Add a third tab to `ReviewOperatorTabs`: **Access grants**.

```
apps/web/src/components/review/
  applicant-journey-panel.tsx    (existing)
  application-pipeline-form.tsx  (existing)
  application-review-panel.tsx   (existing)
  applications-list-panel.tsx    (existing)
  course-grants-panel.tsx        ← new — list + issue + revoke grants per user
  funnel-analytics-dashboard.tsx (existing)
  review-dashboard.tsx           (existing)
  reviewer-session-bar.tsx       (existing)
```

`CourseGrantsPanel` shows: which users have grants, to which courses, granted when, by whom. Operator can issue a new grant (dropdown: userId + courseSlug) or revoke an existing one. This is the Tipper-facing surface — when Tipper eventually issues grants programmatically via the `POST /courses/:slug/grants` endpoint with `grantedBy: "tipper"`, the panel shows that too.

---

### Sequencing

| Step | What | Why first |
|------|------|-----------|
| 1 | Add `CourseGrant` Prisma model + migrate | Everything else depends on the grant record existing |
| 2 | `CoursesModule` with access check + grant endpoints | API needs to exist before web can call it |
| 3 | `CourseAccessGuard` on the API | Validates grants server-side |
| 4 | `/courses` route tree in Next.js with server-side access check | Course pages need to be reachable before content matters |
| 5 | `CourseGrantsPanel` on review dashboard | Operator needs to be able to issue grants to test the whole chain |
| 6 | Add actual course content | Content is last because the access scaffolding has to exist first |
| 7 | Tipper webhook to `POST /courses/:slug/grants` | Automates what the operator currently does manually |

Don't build course content before you can gate it. Don't gate it before you can issue grants. Don't issue grants before the model exists. This is the right order.

---

## Revision note (2026-07-27) — Runtime Health Check

**Both apps build clean. Spot-checks below; re-run before prod deploy.**

| Check | Result |
|-------|--------|
| API build (`pnpm build`) | Clean |
| Web build (`pnpm build`) | Clean — 14 static/dynamic routes including `/privacy`, `/apply/submitted` |
| `metadataBase` | **Fixed** — `getSiteUrl()` in root layout |
| `POST /intake/applications` | Validates + writes; operator notification when Resend configured |
| `GET /tracking/funnel/summary` | Reviewer-guarded — funnel analytics |
| Operator pipeline `PATCH` | Functional on `/review/[id]` |

**Node version note:** `package.json` declares `engines: { node: "22.x" }`; align with Dokploy runtime to avoid pnpm warnings.

---

## Revision note (2026-07-26)

**Homepage funnel** now has **12 rungs** in `sections.config.ts` (was 9). Added SERVICE-001-aligned sections that replace the deleted legacy agency blocks without reviving Port/Sea/Ocean pricing:

| Rung | Section | Role |
|------|---------|------|
| 4 | `misdiagnosis-section` | Boosting vs scoped work — misdiagnosis, not a campaign upsell |
| 5 | `gap-section` | Here → diagnostic/constraint → stability (visual three-column map) |
| 7 | `execution-section` | Branding, strategy, campaigns as **instruments inside intervention** — not advertised menu |

Visual spec for rung 7 diagram: `apps/web/src/landing/execution-instruments-visual-brief.md`

**Report corrections vs 2026-07-22 draft:**

| Claim in original report | Actual state (Jul 26) |
|--------------------------|------------------------|
| Port / Sea / Ocean on live site | **Removed** — SERVICE-001; no pricing tiers shipped |
| Capacity = "2 slots/month" | **Wrong** — `capacity-section.tsx` says one active client |
| OS `01-ia-sitemap.md` matches live funnel | **Stale OS doc** — still references offer stack + free slots; live site follows `02-conversion-funnel.mdc` + expanded rungs above |
| Operator dashboard read-only | **Fixed** — `/review/[id]` + PATCH pipeline form ships |
| Contact section has email + WhatsApp | **Fixed** — dual path: ghost `/work-with-us` + primary Apply |
| Cold nav exposes Pricing jump link | **Partially fixed** — nav is How it works / The ladder / Who we are / Apply (Who we are still skips ladder) |

---

## Executive Summary

The Hard Port is a conceptually mature business running on a technically solid but operationally incomplete platform. The brand identity, philosophy, and funnel architecture are well-defined. The OS folder is genuinely impressive institutional infrastructure. The code is clean, modern, and production-grade. But there is a measurable gap between what the OS says should exist and what the product currently does — and a smaller but meaningful gap between what the product currently does and what the design system says it should look like. None of these gaps are critical. All of them are actionable.

The business is ready to receive and process applications in dev/local. **YouTube broadcast** should wait until Phase A launch gate closes (see update 3). Course access (Phase B) follows when ready.

---

## Part 1 — Coherence Audit: Backend vs. Frontend vs. OS

### 1.1 What Aligns

| Area | Backend | Frontend | OS |
|------|---------|----------|----|
| Homepage funnel | — | `sections.config.ts` — 12 rungs; lazy-loaded below letter | `02-conversion-funnel.mdc` (SERVICE-001); OS `01-ia-sitemap.md` **still stale** on offer stack |
| Application lifecycle | 27 `lifecycleStatus` values in Prisma schema | `pipeline-constants.ts` mirrors same values | OS describes multi-stage qualification → diagnostic → intervention journey |
| Scarcity mechanic | `activeCapacitySlot: Boolean` on Application model | `capacity-section.tsx` — **one active client** during field validation | Align `CURRENT_FOCUS.md` if it still says 2 free slots |
| Qualification gatekeeping | `willingnessExamine`, `willingnessEvidence`, `willingnessFeedback` booleans required | Form blocks submission until all three are checked | OS defines readiness as requiring owner willingness to examine evidence and receive feedback |
| Brand voice rules | — | No banned words found in active funnel copy | OS design-system/RULES.md — some flags reference deleted `packages-section.tsx` |
| Commercial model on site | Diagnostic + intervention in `/work-with-us` | No Port/Sea/Ocean grid; execution instruments section explains scoped work | SERVICE-001 offer architecture |
| Auth architecture | Google OAuth + Meta OAuth + JWT; role-based (reviewer/admin) | `/sign-in` → OAuth → `/auth/callback` → JWT in localStorage → `/review` (protected) | OS mentions operator workflow; AUTH_SETUP.md documents the full pattern |
| Tech stack maturity | NestJS + Prisma + PostgreSQL + Docker | Next.js 15 App Router + Tailwind 4 + shadcn | Stack choices are internally coherent and production-capable |

**Coherence verdict: Strong.** The core pipeline — visitor lands → reads funnel → applies → operator reviews → pipeline advances — is architecturally intact from OS spec to database row.

---

### 1.2 Where Coherence Breaks Down

These are not opinions. These are concrete gaps between what the OS specifies and what the product ships.

#### Gap 1 — Cold Nav Still Allows Ladder Skip (Medium Impact)
**OS says:** "One page, one continuous descent." Footer-only for secondary destinations.  
**Live site:** `site-header.tsx` — How it works, The ladder (`/#how-it-works`), Who we are, Apply. No Pricing jump link (fixed). **Who we are → `/about` still skips agitation.**  
**Impact:** Better than the old Pricing shortcut; `/about` legacy tone remains a leak.

#### Gap 2 — Last Call Has Dual CTAs (Low Impact — intentional)
**OS says (strict):** Single CTA on last rung.  
**Funnel rule (`02-conversion-funnel.mdc`):** Dual path — ghost "How THP works" + primary "Apply".  
**Live site:** `contact-section.tsx` matches the funnel rule, not the older OS single-CTA line. **Decide which spec wins** and update OS or code once.

#### Gap 3 — Scroll-Depth Darkening Not Implemented (Medium Impact)
**OS says:** Background darkens and type weight climbs as the visitor scrolls down the ladder.  
**OS provides:** A concrete formula (one `escalationIntensity` slider, 8 named sections, procedural `oklch()` lightness + font-weight per rung).  
**Live site:** Flat depth tokens throughout **12 rungs**. No scroll-intensity darkening yet.  
**Impact:** The experience the OS describes — where the descent is *felt*, not just read — does not exist. The visual emotional escalation is missing. This is the biggest design gap.

#### Gap 4 — Accent Color Conflict: Orange vs. Gold (Medium Impact)
**OS design-system proposes:** Gold (`oklch(0.80 0.14 85)`) as the primary CTA accent, and a separate Rust token for "wrong" states (agitation, boosting column ✕ marks).  
**Live site:** Orange (`#ff6b17`) accent with no separate alert/rust color.  
**Impact:** Orange and gold are different brand signals. More critically, without a separate rust/alert color, the "wrong" column in the mechanism section (Boosting vs. Campaign) visually competes with the apply CTA for the same attention. This is a functional design problem, not just an aesthetic one.

#### Gap 5 — Maturity Classification Is Free Text, Not Structured (Medium Impact — scaffold only)
**OS defines:** A maturity model — Level 1 (survival), Level 2 (stable), transition psychology, "founding ≠ managing" diagnosis, Tipper readiness as the gating concept.  
**Live schema:** `maturityClassification String?` — free text. Empty enum scaffold in `maturity-classifications.constants.ts`.  
**Impact:** Fill enum after first client patterns emerge (Phase C).

#### Gap 6 — No Notification System ~~(High Impact on Operations)~~ **FIXED (2026-07-27)**
**Was:** No email when application submitted.  
**Now:** `IntakeNotificationService` emails operator via Resend when `RESEND_API_KEY` + `INTAKE_NOTIFY_EMAIL` set.  
**Remaining:** Prod env + optional applicant confirmation (P04 stub).

#### Gap 7 — Applicant Post-Submit Experience ~~(Medium Impact)~~ **FIXED (2026-07-27)**
**Was:** Generic success flash only.  
**Now:** `/apply/submitted` with THP-voice copy; form redirects on success.

#### Gap 8 — /about Page Has Legacy Agency Tone ~~(Low-Medium Impact)~~ **FIXED (2026-07-27)**
**Was:** Legacy agency tone.  
**Now:** Rewritten to SERVICE-001 / brand voice. Nav link to `/about` still allows ladder skip (Gap 1).

#### Gap 9 — CTA Copy Does Not Escalate in Size/Weight (Low Impact)
**OS design-system (05-buttons-cta.md):** CTA copy escalates from 13px ("See the gap") → 14px ("Show me what I'm doing wrong") → 15px ("Prove us wrong") → 17px / weight 800 ("Stop being fine").  
**Live site:** Sticky CTA uses consistent text/size throughout. The weight-and-size escalation mechanic is not implemented.  
**Impact:** Low urgency — the copy itself escalates, but the visual intensity ramp of the button is missing.

---

## Part 2 — Harmony Assessment: Does the OS Drive the Product?

### 2.1 Where the OS and Product Are in Harmony

The knowledge architecture in `the-hard-port-os/` is not decoration. It is doing real work. Evidence:

- The 27 lifecycle statuses in the Prisma schema mirror the OS's understanding of the full service journey. Someone thought carefully about what happens between "application submitted" and "completed." That thinking lives in the OS and is reflected in the code.
- The qualification form's willingness checkboxes map directly to the OS's definition of client readiness. The form is not just collecting data — it is enforcing the OS's philosophical stance (we only work with people willing to be examined).
- The **12-rung funnel** in `sections.config.ts` cites `02-conversion-funnel.mdc` in its comment header.
- The `CURRENT_FOCUS.md` correctly identifies YouTube Attraction Architecture as the next macro goal, which is the logical next step given that the intake pipeline exists but has no top-of-funnel traffic.

**The OS is functioning as an institutional brain.** That is rare and valuable. Most agencies have brand guidelines in a PDF no one reads. The OS is queryable, versioned, and actively referenced in code.

### 2.2 Where the Harmony Breaks Down

**The OS is ahead of the product in two critical areas:**

**1. Operator tooling.** Pipeline PATCH, funnel analytics, site journey, and operator notification **ship**. **Still open:** maturity enum, applicant confirmation copy (P04), commercial placeholder, course grants (Phase B).

**2. The design system is aspirational, not implemented.** The `design-system/` folder in the OS contains a full specification: 4-step oklch depth scale, scroll-intensity formula, button variants with ghost/secondary, CTA size escalation, nautical icon system, hi-fi wireframe patterns. None of it is implemented. The live site is a first pass — coherent and functional, but missing the experiential depth the design system was built to deliver.

**The OS is also ahead of itself in one area:**

The intelligence architecture (Layers 00–09, Tipper, RFC-001 on community infrastructure) is philosophically sophisticated and genuinely interesting. But it is running significantly ahead of observable evidence. RFC-001 correctly identifies this: "Current evidence level: none." The instinct to build the knowledge framework before the product is the right order of operations — but only if the product catches up before the framework becomes orphaned institutional documentation.

---

## Part 3 — Skills, Instincts, and Goals Assessment

### 3.1 What the Codebase Reveals About Skills

The technical choices are mature and appropriate:

- **Next.js 15 App Router with lazy loading** — the right call for a landing-to-form funnel where above-fold performance is brand identity. 118 kB first-load JS is good.
- **NestJS + Prisma + PostgreSQL** — production-grade, typed, migratable. Not overengineered for the current volume; appropriately engineered for future scale.
- **Docker Compose with standalone Next.js output** — shows deployment literacy. This runs on Dokploy without surprise.
- **Modular Prisma schema** (separate `.prisma` files per domain) — shows architectural foresight. As the schema grows, this won't become unmanageable.
- **JWT in localStorage** — this is a deliberate tradeoff (simpler to implement than httpOnly cookies). Fine for an internal operator tool. Would be worth revisiting if the auth surface ever expands to clients.

**Skill gap identified:** Applicant confirmation copy and commercial placeholder still open. Resend operator path exists; extend for P04 when ready.

### 3.2 What the OS Reveals About Instincts

The instincts are sound and, in several cases, unusually good:

**Good instinct: Gate before you pitch.** The willingness checkboxes on the application form are a behavioral filter, not just form fields. The form is designed to pre-qualify the applicant's readiness before a human reviewer ever reads it. This is structurally correct for a high-touch service.

**Good instinct: Separate institutional knowledge from the product.** The OS lives in `the-hard-port-os/` as a structured, versioned knowledge base. The product lives in `apps/`. They reference each other but are not entangled. This separation means the OS can evolve (new research, new decisions, new SOPs) without breaking the product, and the product can ship without waiting for the OS to reach certainty.

**Good instinct: Build the qualification machine before the acquisition engine.** The intake form and review dashboard exist before YouTube is publishing. This is the right order. Publishing acquisition content before you can handle the intake creates brand damage (slow responses, missed applications).

**Instinct to watch: Intelligence architecture expanding faster than evidence.** The Tipper framework (Layers 00–09), the community infrastructure RFC, Research Program 001 — these are ambitious frameworks with zero supporting evidence yet. The instinct to theorize ahead of practice is intellectually honest (they acknowledge evidence levels are zero), but these frameworks can become a gravity well that pulls energy away from shipping the operations gate. Watch the ratio of OS-writing to client-onboarding.

### 3.3 Goals Alignment

| Stated Goal | Infrastructure Status | Gap |
|-------------|----------------------|-----|
| Receive 2 clients/month free | Application form → DB + pipeline UI | Prod Resend, ops SLA (P03), commercial rails |
| Qualify clients rigorously | Willingness gates + pipeline form | Structured maturity enum |
| Deliver Level 1 → Level 2 diagnostic | Pipeline statuses defined | No delivery workspace yet |
| YouTube → apply funnel | Tracking + prefill wired | Broadcast blocked until Phase A |
| Build Tipper intelligence framework | Layers 0–9 documented | Course grants Phase B; evidence after first client |

**Goals are coherent with the OS. The gap is execution depth.** The business knows what it wants to do and why. The question is sequencing and pace.

---

## Part 4 — Senior Business Analyst Advice

### 4.1 User Flow: What Is Working

The funnel architecture is genuinely good. The **12-rung ladder** is a correct model for a high-trust, high-scrutiny service sale.

The sticky CTA that escalates from "See how it works" → "Apply" as the visitor descends is correctly implemented and correctly signals the commitment gradient.

The form's willingness checkboxes are the best thing on the site. They are not UX friction — they are brand alignment in UI form.

### 4.2 User Flow: What Needs Work

**The cold nav still allows ladder skip via Who we are.**  
Pricing jump link is gone (fixed Jul 26). **Who we are → `/about`** still skips agitation. Optional fix: footer-only for `/about`, or merge into ladder.

**The last section uses dual CTAs by design.**  
`contact-section.tsx` — ghost "How THP works" + primary "Apply" per `02-conversion-funnel.mdc`. Report originally argued single CTA; funnel rule wins unless OS is updated.

**Post-submit experience — fixed.**  
See `/apply/submitted`. Applicant confirmation email still stub (P04).

**YouTube handoff — partially wired.**  
`?ref=youtube&video={ID}` prefill works. Video description template + broadcast decision: P06.

### 4.3 Design: What Needs Decisions, Not Just Work

There are two open design decisions that are blocking everything below them. They are named as open in the OS but not yet decided. Until they are decided, parts of the design system cannot be implemented.

**Decision 1 — Color System: Migrate, Adapt, or Ignore**  
The OS design-system (`02-color-tokens.md`) proposes replacing the current orange/navy hex system with an oklch 4-step depth scale + gold + rust. The live site uses orange (`#ff6b17`) and a single flat navy. These are different palettes. Three options:

- **Migrate (recommended):** Switch to the oklch system. This unlocks the scroll-depth darkening mechanic (the single biggest experiential gap), separates CTA gold from alert rust, and makes the design match what the OS specified. Cost: one design + dev pass on all components.
- **Adapt:** Keep orange, adopt the 4-step navy depth scale only. Smaller change, partial fix.
- **Ignore:** Keep the current system. Lose the depth mechanic entirely.

Pick one. This is the decision that unblocks the scroll-intensity implementation and the rust/gold split.

**Decision 2 — Nav Reduction**  
Collapse Pricing and Who We Are out of the cold top nav. This is not a debate — the OS RULES.md marks it "Still open" and the rationale is clear. Make the decision, implement the fix, move on.

### 4.4 Design: What Should Be Built Next (After Decisions)

Once the color decision is made, implement in this order:

1. **Scroll-depth darkening** — apply the formula from `07-depth-scroll-intensity.md` across all rungs (Phase C / P07).
2. **Ghost button variant** — the mechanism section (Boosting vs. Campaign) and the hero (Watch + Apply side-by-side) both need a primary + ghost CTA pair. Build the ghost variant as a shared component once the primary color is decided.
3. **Rust token for "wrong" states** — implement a separate alert color for the agitation column in the mechanism section. Currently all accent-colored elements compete for the same attention.
4. **CTA size/weight escalation** — match the font-size and weight ramp (13→17px, 700→800) to the copy escalation already in place.

### 4.5 Operations: The Five-Item Readiness Gate

The OS (`CURRENT_FOCUS.md`) states: "Publish application CTA only when the five-item readiness gate is satisfied." Based on the OS architecture and current product state, here is the gate as I read it:

| Gate Item | Status |
|-----------|--------|
| Intake form → database working | **Done** |
| Operator review dashboard functional | **Done** (list + detail + analytics) |
| Operator can advance pipeline state | **Done** |
| Intake notification on submission | **Done in code** — prod Resend required |
| Commercial placeholder (post-qualification) | **Open** |

Soft-launch apply is live. **YouTube broadcast** waits on commercial placeholder + Phase A (`review.md`). **Course access** waits on Phase B after Phase A.

### 4.6 The Tipper Question

RFC-001 asks whether Tipper should expand to community infrastructure. The current evidence level is zero. The current product has zero clients. The correct answer right now is: not yet.

Tipper is most valuable as the operationalization layer for what THP learns from actual client interventions. Before THP has done a diagnostic and seen what patterns emerge, Tipper is a framework without a subject. The energy currently going into Tipper's community infrastructure architecture would generate more institutional value if redirected into:

1. Completing the operator pipeline UX (so the first client can actually be processed end-to-end)
2. Running the first diagnostic (generating the first real evidence)
3. Documenting what the diagnostic revealed (feeding the knowledge engine with actual data)

Tipper will be better — more accurately scoped, more evidence-based — after the first client than before it.

---

## Part 5 — Prioritized Action List

**See `review.md` for the operational when-ready plan (Phase A → B → C).** Items below track report-era recommendations against current status.

### Done (2026-07-27)

- [x] Post-submit page — `/apply/submitted`
- [x] Submission notification — `IntakeNotificationService`
- [x] Operator pipeline UX — `/review/[id]` PATCH form
- [x] Rewrite `/about` — brand voice
- [x] `metadataBase` — `getSiteUrl()`
- [x] First-party funnel tracking + operator analytics dashboard
- [x] Launch scaffold P01–P07 — ops checklists + code stubs

### Still open — before YouTube broadcast (Phase A)

1. **Production deploy** — P01: OAuth, Resend, env, migrate, smoke test
2. **Legal minimum** — P02: `/privacy` final copy, apply ack, lawyer pass
3. **Ops loop** — P03: reviewer owner, 48h SLA habit
4. **Applicant confirmation email** — P04: fill stub copy + `INTAKE_APPLICANT_FROM`
5. **Commercial placeholder** — static post-qualification page (gate item 5)
6. **YouTube deep-link** — P06: `?ref=youtube&video=` in descriptions; broadcast gates

### Deferred — product expansion (Phase B, when Phase A closed)

7. **Course access scaffolding** — full spec in this report (update 2): `CourseGrant` → API → guard → `/courses` → grants panel → content → Tipper webhook
8. **Optional nav tweak** — move Who we are to footer only (Gap 1)

### After first client (Phase C)

9. Scroll-depth darkening (P07 / OS design system)
10. Structured maturity classification enum
11. Color system decision (oklch vs keep orange)
12. Ghost button + rust alert token
13. Real tracking CSV export + intake webhook destination

---

## Summary Assessment

| Dimension | Grade | Notes |
|-----------|-------|-------|
| Brand-to-product coherence | B+ | Core identity intact; `/about` nav skip remains |
| OS-to-code fidelity | B+ | Pipeline, tracking, notifications match; design system still aspirational |
| Technical architecture | A- | Stack clean, modular, production-grade |
| Operational readiness | B- | Can receive + process in dev; prod env + commercial placeholder open |
| Design system implementation | C | Flat backgrounds, no depth mechanic, accent conflict unresolved |
| Strategic sequencing | A | Intake → tracking → launch scaffold → courses (when ready) |
| Instinct quality | A | Gatekeeping, OS as institutional brain — sound |

**The Hard Port knows who it is, who it's for, and what it does.** Remaining work is Phase A launch gate, then Phase B course access per the recommended plan in `review.md`.

---

*Last synced with `apps/web`, `apps/api`, and `the-hard-port-os/` on 2026-07-27. Operational snapshot: `review.md`.*
