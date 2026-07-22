---
name: section-audit
description: Audits new or edited page sections against funnel, copy, platform, and brand standards before shipping. Use before shipping any new or edited page section for The Hard Port.
---

# Skill — Section Audit

Read `.cursor/rules/00-brand-core.mdc` first.

1. State which rung of the SERVICE-001 ladder (`.cursor/rules/02-conversion-funnel.mdc`) this
   section serves. If none, stop — it doesn't belong yet.
2. **SERVICE-001 check:** Does copy describe stability/diagnostic/intervention, or drift into
   content-calendar / rebrand / package-agency language? Rewrite if the latter.
3. **Auth boundary check:** Is this section for applicants or operators? Applicants never need
   sign-in. Operator UI belongs on `/sign-in` or `/review`, not mixed into `/apply`.
4. Scan copy against banned words in `.cursor/rules/01-copywriting-standards.mdc`.
5. Compare tone against the section immediately above — equal or more confrontational, never softer
   (`aggression-calibration` sets ceiling, copywriting standards set floor).
6. Run `could-exist-on-any-agency-site` — if yes, rewrite.
7. Check CTA against escalation set — label and href (`/work-with-us`, `/apply`) match rung.
8. Run `small-business-psychology` — speaks to what this reader fears/wants, not generic copy.
9. If homepage section: confirm lazy-load pattern unless hero or letter (see `06-web-platform-architecture.mdc`).
