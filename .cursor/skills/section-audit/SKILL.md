---
name: section-audit
description: Audits new or edited page sections against funnel, copy, and brand standards before shipping. Use before shipping any new or edited page section for The Hard Port.
---

# Skill — Section Audit

Read `.cursor/rules/00-brand-core.mdc` first.

1. State which rung of the funnel ladder (`.cursor/rules/02-conversion-funnel.mdc`) this section
   serves. If none, stop — it doesn't belong yet.
2. Scan copy against the banned-words list in `.cursor/rules/01-copywriting-standards.mdc`.
3. Compare its tone against the section immediately above it — must feel equal or more
   confrontational, never softer (`aggression-calibration` sets the ceiling on how far,
   copywriting standards set the floor).
4. Run the portability check: could this sit on a competitor's site unedited? If yes, rewrite.
5. Check the CTA (if present) against the escalation copy set — does the label match this
   section's position in the funnel?
6. Run the `small-business-psychology` instinct — does this section speak to what this reader
   actually fears/wants, or generic business copywriting?
