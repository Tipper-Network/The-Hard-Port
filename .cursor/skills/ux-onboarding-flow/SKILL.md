---
name: ux-onboarding-flow
description: Audits and tests The Hard Port applicant and operator onboarding UX against the live flow. Runs the feedback loop in FEEDBACK-LOOP.yaml. Use when editing apps/web routes, apply form, review UI, CTAs, lazy homepage, or when the user asks for UX review or onboarding flow testing.
---

# Skill — Onboarding Flow UX

Read `.cursor/rules/04-ux-friction.mdc` and `.cursor/rules/06-web-platform-architecture.mdc` first.  
Canonical flow map: [ONBOARDING-FLOW.md](ONBOARDING-FLOW.md).  
Test cases: [FEEDBACK-LOOP.yaml](FEEDBACK-LOOP.yaml).

## When to run

- Before shipping any change to `/`, `/work-with-us`, `/apply`, `/sign-in`, `/review`
- After funnel, CTA, or auth changes
- When user says "UX review," "onboarding," "friction," or "does the flow work"

## Procedure

### 1. Walk the applicant path (cold)

Simulate a YouTube visitor on mobile:

1. `/` — hero loads without full-page stall; letter readable; CTAs go to `/work-with-us` or `#letter`, not `#apply` / free slot
2. Scroll — below-fold sections lazy-mount (network tab: separate chunks after scroll)
3. `/work-with-us` — SERVICE-001 copy; CTA to `/apply`
4. `/apply` — **no sign-in**; form submits; success state; no dead air

Log each step against [FEEDBACK-LOOP.yaml](FEEDBACK-LOOP.yaml) `applicant_path` cases.

### 2. Walk the operator path

1. `/sign-in` — states operators only; OAuth links use `NEXT_PUBLIC_THP_API_URL`
2. OAuth callback → `/review` (never `/apply`)
3. `/review` — list loads with JWT; Open → `/review/[id]`
4. Pipeline form saves lifecycle, next_action, capacity slot

Log against `operator_path` cases.

### 3. Run automated checks

```bash
node .cursor/skills/ux-onboarding-flow/scripts/run-flow-checks.mjs
```

Fix any `fail` before shipping. `warn` items need human judgment — note in report.

### 4. Feedback loop (end of session)

Append results to `.cursor/skills/ux-onboarding-flow/ROLLOUT.yaml`:

```yaml
- id: ux-YYYYMMDD-HHMM
  at: "2026-07-22"
  flow: applicant_path | operator_path | automated
  case_id: AP-01
  outcome: pass | fail | warn
  note: "what broke or passed"
  artifact: ux-onboarding-flow
```

If the same case fails 3×, flag for `evolve` or rule update in `04-ux-friction.mdc`.

### 5. Report format

```markdown
## UX onboarding review — [date]

### Applicant path
- AP-01: pass/fail — note

### Operator path
- OP-01: pass/fail — note

### Automated
- [script output summary]

### Blockers (must fix)
- ...

### Warnings (human decides)
- ...
```

## Hard fails (never ship)

- Applicant must sign in to apply
- OAuth callback lands on `/apply`
- Primary CTA uses `#apply` or "free slot" language
- Homepage eagerly loads all landing sections in one bundle
- Operator auth mixed into applicant scroll (except footer "Team sign-in")

## Related

- `section-audit` — per-section copy/funnel
- `web-platform` — stack and env checklist
- `applicant-not-operator` instinct — auth boundary gut-check
