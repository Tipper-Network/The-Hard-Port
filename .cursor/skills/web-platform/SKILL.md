---
name: web-platform
description: Edits apps/web or intake/auth integration — Next.js routes, lazy homepage sections, server actions, operator vs applicant boundaries. Use when changing apps/web, intake submit, OAuth callback, review dashboard, or web Docker env.
---

# Skill — Web Platform Changes

Read `.cursor/rules/06-web-platform-architecture.mdc` first.

## Before editing

1. Confirm **audience**: applicant (public) vs operator (JWT). When in doubt, check route table in
   the rule file.
2. Confirm **commercial object**: application ≠ qualification ≠ diagnostic ≠ intervention —
   don't merge copy or API calls across these.

## Common tasks

| Task | Location |
|---|---|
| New public page | `apps/web/app/<route>/page.tsx` |
| Homepage section | `apps/web/src/landing/` + register in `lazy-home-sections.tsx` |
| Intake submit | `apps/web/src/lib/submit-intake.ts` (server action) |
| Reviewer fetch | `apps/web/src/lib/reviewer-api.ts` |
| OAuth URLs | `apps/web/src/lib/auth-session.ts` — `NEXT_PUBLIC_THP_API_URL` |
| Header/footer CTAs | `apps/web/src/shared/site-header.tsx`, `site-footer.tsx` |

## Checklist before merge

- [ ] Applicant path never requires OAuth
- [ ] Operator callback lands on `/review`, not `/apply`
- [ ] New homepage sections lazy-loaded (unless hero/letter)
- [ ] CTAs use `/work-with-us` and `/apply`, not `#apply` / free-slot language
- [ ] `pnpm --filter web build` passes
- [ ] Docker build args use `NEXT_PUBLIC_THP_API_URL` if OAuth links needed at build time

## API pairing

Nest intake: `apps/api/src/intake/`. Auth: `apps/api/src/auth/`. See `apps/api/AUTH_SETUP.md`.

**Database:** edit Prisma models only — never `migrations/**/migration.sql`. Human migrates.
See `.cursor/rules/07-prisma-database.mdc`.
