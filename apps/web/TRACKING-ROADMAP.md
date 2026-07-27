# THP Site Tracking — Roadmap & Todo

**Purpose:** Build a first-party drop-off map — entry → homepage depth → CTA → apply → submit — linked to `users` (role `user`) by email when known.

**Current baseline (shipped):** `page_view`, `cta_click`, `application_view`, `application_submit`, visitor ID in `localStorage`, batch flush to `POST /tracking/events`, email identify on blur/submit.

**Not yet:** section depth, form field progress, abandon events, attribution (UTM/ref), country/locale on entry, operator funnel UI, consent gate.

---

## Drop-off map — what “done” looks like

```
ENTRY ──► HOMEPAGE DEPTH (rungs 1–12) ──► CTA / ROUTE ──► APPLY OPEN ──► FORM PROGRESS ──► SUBMIT
  │              │                              │              │                │
  │              └── section_view (max rung)     │              └── form_step    └── application_submit
  │              └── scroll_depth_pct            └── cta_click       form_abandon
  └── session_start                              └── page_view (/work-with-us)
      entry_context (utm, ref, locale, tz)              │
      inferred_country (optional)                       └── application_view
```

**Leak questions this answers:**

| Stage | Question |
|-------|----------|
| Entry | Where did they come from? What locale/country? |
| Homepage | How far down the ladder did they scroll? Last section seen? |
| Mid-funnel | Did they hit `/work-with-us` or jump straight to `/apply`? |
| Apply | Opened form but never submitted? Which form block last touched? |
| Identity | Anonymous path → linked when email/phone appears |

---

## Phase 0 — Prerequisites (human)

- [x] **0.1** Run DB migration for existing tracking schema (`UserRole.user`, `user_events`, `applications.user_id`)
  ```bash
  pnpm db:migrate
  ```
- [ ] **0.2** Legal pass on privacy notice (apply form still says “pending legal review”)
- [ ] **0.3** Decide consent model (see **Cookie / consent** section below) before enabling Phase 1+ in production

---

## Phase 1 — Entry context (first hit)

Capture context once per browser session on first tracked page load. Store on events and optionally denormalize on `User` when identified.

### Todo

- [x] **1.1** Extend client `session_start` event on first `TrackingProvider` mount (after consent if gated)
  - Payload: `pathname`, `referrer` (document.referrer), `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `ref` (custom param for YouTube)
- [x] **1.2** Capture **soft locale signals** (no permission required):
  - `navigator.language` → e.g. `en-GB`
  - `Intl.DateTimeFormat().resolvedOptions().timeZone` → e.g. `Europe/London`
  - `screen.width` / `viewport` (optional, for layout debugging)
- [ ] **1.3** **Country / “phone code” reference** — clarify what we can actually get:

  | Signal | When | Accuracy | Notes |
  |--------|------|----------|-------|
  | Phone country code (e.g. +44) | Only when user **types phone** on apply form | Exact | Parse from `contactPhone` on submit/blur; store on `User` |
  | `navigator.language` region | First visit | Rough | `en-GB` → GB hint, not proof |
  | Timezone | First visit | Rough | `Europe/London` ≠ UK only |
  | IP geolocation | First API request | Medium | Server-side: Cloudflare `CF-IPCountry`, or MaxMind, etc. |

  **Recommendation:** Do **not** call it “phone code” until they enter a phone. Store:
  - `inferredCountry` (ISO 3166-1 alpha-2) from IP or CDN header when available
  - `locale` + `timezone` from browser on entry
  - `phoneCountryCode` only after form phone field parsed (lib: libphonenumber or simple regex on `+` prefix)

- [x] **1.4** API: add optional fields on `User` model
  - `locale`, `timezone`, `inferredCountry`, `phoneCountryCode` (all nullable)
  - Set on first identify / application submit; backfill not required for old rows
- [x] **1.5** API: enrich `POST /tracking/events` — on `session_start`, if `Accept-Language` or CDN country header present, merge into payload server-side
- [x] **1.6** Persist entry context on first event batch so later events inherit `sessionId` (client generates `thp_session_id` in sessionStorage, new per tab session)

**Exit criteria:** Every visit has `session_start` with UTM/ref + locale/tz; country populated when CDN/IP available; phone code populated when contact phone entered.

---

## Phase 2 — Homepage drop-off (section funnel)

Homepage rungs are defined in `apps/web/src/landing/sections.config.ts` (`hero` → `contact`, rungs 1–12).

### Todo

- [x] **2.1** Add `section_view` event when a homepage section enters viewport (IntersectionObserver, `threshold: 0.35`, fire once per section per session)
  - Payload: `{ sectionId, rung }` e.g. `{ sectionId: 'capacity', rung: 10 }`
- [x] **2.2** Track **max rung reached** in sessionStorage (`thp_max_rung`) — send on flush as `funnel_depth` snapshot event every N rungs or on pagehide
- [x] **2.3** Wire observer in lazy homepage wrapper (where sections mount — `lazy-home-sections.tsx` or per-section wrapper)
- [x] **2.4** Track **sticky CTA** impressions/clicks separately: `sticky_cta_view`, `sticky_cta_click` with `{ sectionId, rung, label, href }`
- [x] **2.5** Optional: `scroll_depth_pct` at 25/50/75/100 on homepage only (debounced, once per threshold per session)

**Exit criteria:** For homepage sessions, you can query last `section_view` / max rung before exit; compare rung 12 reach rate vs rung 3.

---

## Phase 3 — Route & CTA funnel (non-home)

### Todo

- [x] **3.1** Standardize `page_view` payload: `{ pathname, sessionId, maxRungFromHome? }`
- [x] **3.2** Track `/work-with-us`, `/business-levels`, `/about` as funnel steps (`funnel_step_view` alias or same `page_view` with `step` enum)
- [x] **3.3** Expand CTA tracking beyond `LinkButton` — header nav clicks (`nav_click`), footer links, in-section text links if any
- [x] **3.4** YouTube deep-link: read `?ref=youtube&video=…` on entry, store on session + pass to `discoverySource` prefill on apply form

**Exit criteria:** Full path reconstructable: `/` (rung 8) → `/work-with-us` → `/apply` → submit.

---

## Phase 4 — Apply form drop-off

### Todo

- [x] **4.1** Define form **steps** (logical blocks matching form UI):
  - `step_identity` — name, business, email, phone
  - `step_business` — offer, customers, delivery, status
  - `step_problems` — problems, records, discovery
  - `step_confirm` — willingness checkboxes + privacy
- [x] **4.2** Emit `form_step_view` when step scrolls into view or first field focused
- [x] **4.3** Emit `form_step_complete` when required fields in step valid (on blur or step exit)
- [x] **4.4** Emit **`form_abandon`** on `pagehide` if `application_view` fired and no `application_submit` in session
  - Payload: `{ lastStep, fieldsStarted: string[] }`
- [x] **4.5** Parse `contactPhone` on blur → `identifyVisitor({ phoneCountryCode })` + store on User
- [x] **4.6** Link abandon events to email if identity known before leave

**Exit criteria:** See “opened apply, reached step_business, abandoned” vs “reached step_confirm, no submit”.

---

## Phase 5 — Identity & linking

### Todo

- [x] **5.1** Merge anonymous `visitorId` path with `User` on email identify (already partial — verify backfill on all event types)
- [x] **5.2** On application submit: set `User.locale`, `timezone`, `inferredCountry`, `phoneCountryCode` from session + form
- [x] **5.3** If same email returns later (new session): append events to same `User`; do not create duplicate
- [x] **5.4** Document: applicant `user` role still cannot OAuth sign-in; country/locale is for ops context only

**Exit criteria:** Single user row per email with full event history and country/locale/phone-code fields populated when available.

---

## Phase 6 — Consent gate (recommended before production scale)

See **Cookie / consent** below. Implementation todos:

- [x] **6.1** Add `TrackingConsentProvider` — default **no flush** until choice stored
- [x] **6.2** Store choice: `thp_tracking_consent` = `accepted` | `rejected` in localStorage
- [x] **6.3** Minimal banner copy + link to privacy notice (not legalese wall)
- [x] **6.4** If rejected: no events sent, no visitor ID persistence (or ephemeral session only — pick one policy)
- [x] **6.5** Apply form privacy ack remains separate (data processing for application ≠ analytics)

---

## Phase 7 — Operator visibility (later)

- [ ] **7.1** API: `GET /tracking/users/:id/events` (reviewer JWT) — timeline for one applicant
- [ ] **7.2** API: `GET /tracking/funnel/summary` — counts by max rung, step, abandon (date range)
- [ ] **7.3** Review UI tab on `/review/[id]`: “Site path” — last 20 events + max homepage rung
- [ ] **7.4** Optional CSV export matching pipeline tracker

---

## Event catalog (target state)

| Event | Phase | Payload highlights |
|-------|-------|-------------------|
| `session_start` | 1 | utm_*, ref, referrer, locale, timezone |
| `page_view` | ✓ | pathname, sessionId |
| `section_view` | 2 | sectionId, rung |
| `funnel_depth` | 2 | maxRung, pathname |
| `scroll_depth` | 2 | pct, pathname |
| `cta_click` | ✓ | label, href |
| `sticky_cta_click` | 2 | sectionId, rung, label |
| `nav_click` | 3 | label, href |
| `application_view` | ✓ | — |
| `form_step_view` | 4 | step |
| `form_step_complete` | 4 | step |
| `form_abandon` | 4 | lastStep, fieldsStarted |
| `application_submit` | ✓ | businessName |
| `identify` | 5 | email hash? or server-only |

---

## Cookie / consent — do you need a banner?

**Short answer:** For UK/EU visitors, **yes — plan on one** before you treat analytics as production-ready. Not because of third-party ad cookies (you don’t have those), but because:

| What you store | Type under UK PECR / GDPR |
|----------------|---------------------------|
| `thp_visitor_id` in localStorage | Persistent identifier — **not** strictly necessary for the site to function |
| Behavioral event batching | **Non-essential** processing (funnel analytics) |
| Application form data | Separate — covered by apply privacy ack + legitimate interest / contract |

**What you do NOT need (probably):**
- A banner for **strictly necessary** cookies only (e.g. CSRF, auth session for operators) — operator JWT in localStorage is a separate discussion.

**Practical THP approach (recommended):**
1. **Minimal first-party banner** on first visit: “We log anonymous usage to see where the site loses people. No ads. [Accept] [Decline] [Privacy]”
2. **No tracking flush until Accept** (Phase 6)
3. **Privacy notice** page linked from footer + apply form — legal review still open per checklist
4. **Do not** use IP geolocation until legal confirms basis (often same consent bucket as analytics)

**If you skip the banner (not recommended for EU/UK):**
- Limit to strictly anonymous, aggregated, no persistent ID — weak fit for your current visitor-ID design
- Higher risk if you add IP country inference

**Flag for lawyer:** first-party analytics, localStorage visitor ID, optional IP country, applicant email linking, retention period (suggest 12–24 months for events).

---

## Phone country code — direct answer

- **On website entry alone:** you cannot read their phone’s country code. You can infer **region hints** (locale, timezone, IP country).
- **When they type phone on apply:** parse and store `phoneCountryCode` (e.g. `+254`) on the `User` row — that becomes the reliable reference if they “sign in” or apply later with the same email.
- **If they OAuth later as operator:** different flow — applicants blocked from operator sign-in today.

---

## Suggested build order

1. Phase 0 — migrate DB + legal/consent decision  
2. Phase 6 — consent gate (before scaling traffic)  
3. Phase 1 — entry context + session ID  
4. Phase 2 — homepage `section_view` (biggest drop-off insight)  
5. Phase 4 — form abandon  
6. Phase 3 — attribution / YouTube ref  
7. Phase 5 — identity fields on User  
8. Phase 7 — operator UI  

---

## Files to touch (by phase)

| Phase | Web | API |
|-------|-----|-----|
| 1 | `tracking-provider.tsx`, `event-store.ts` | `user.prisma`, `tracking.service.ts` |
| 2 | `sections.config.ts`, lazy section wrapper | — |
| 4 | `engagement-readiness-form.tsx` | `users.service.ts` |
| 6 | new `consent-banner.tsx`, gate in `flush-events.ts` | — |
| 7 | review panel | new tracking read endpoints |

---

*Last updated: 2026-07-27 — aligns with shipped baseline in `apps/web/src/lib/tracking/` and `apps/api/src/tracking/`.*
