---
name: applicant-not-operator
description: Instinct that prevents conflating public intake with operator auth. Applicants never sign in; OAuth is for THP reviewers only. Use when editing auth, apply flow, CTAs, or API routes.
---

# Instinct — Applicant, Not Operator

Read `.cursor/rules/06-web-platform-architecture.mdc` first.

When touching auth, forms, or CTAs, ask: **who is this for?**

| Who | Path | Auth |
|---|---|---|
| Business owner applying | `/apply` | None — ever |
| THP reviewer | `/sign-in` → `/review` | OAuth + JWT |

## Instant fail

- Requiring login before submit on Engagement Readiness form
- OAuth callback landing on `/apply`
- "Sign in to apply" anywhere on the public funnel
- Using `GET /intake/applications` from a public page without JWT
- Applicant-facing copy mentioning "your account" or "dashboard"

## Terminology

- **Application** — what the visitor submits (public)
- **Qualification** — THP's decision after review (operator)
- **Diagnostic** — paid engagement (commercial, post-qualification)

Don't use these interchangeably in UI labels or error messages.

## When adding features

If the feature needs persisted user identity on the applicant side, stop and ask the human —
the default architecture is **stateless public apply + operator JWT**, not applicant accounts.
