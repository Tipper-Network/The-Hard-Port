# Launch scaffold — fill later

Operational and product placeholders for go-live priorities. **Scaffolding only** — checkboxes and code stubs wired but empty until you fill them.

| Priority | Ops doc | Code / route |
|----------|---------|--------------|
| P01 Production deploy | [P01-production-deploy.md](./P01-production-deploy.md) | `apps/api/.env.example`, `.env.docker.example` |
| P02 Legal & privacy | [P02-legal-privacy.md](./P02-legal-privacy.md) | `/privacy`, `templates/legal/` |
| P03 Intake ops loop | [P03-intake-ops-loop.md](./P03-intake-ops-loop.md) | `/review` (live) |
| P04 Applicant confirmation email | [P04-applicant-confirmation-email.md](./P04-applicant-confirmation-email.md) | `intake-applicant-confirmation.service.ts` |
| P05 Discovery source video | [P05-discovery-source-video.md](./P05-discovery-source-video.md) | `discoverySourceVideo` on Application |
| P06 YouTube launch | [P06-youtube-launch.md](./P06-youtube-launch.md) | `content/youtube/first-50-observational-videos/` |
| P07 Design system polish | [P07-design-system-polish.md](./P07-design-system-polish.md) | `the-hard-port-os/design-system/` |
| — Tracking CSV export | — | `GET /tracking/funnel/export` (stub) |
| — Pipeline webhooks | — | `intake-webhook.service.ts` (stub) |

**Suggested order:** P01 → P02 → P03 → P04 → P05 → P06 → P07

**When-ready plan (full sequencing):** see `review.md` → Phase A (launch gate) → Phase B (courses, `report.md`) → Phase C (design system + enums).

After each priority is filled, check its doc box and remove `TODO(scaffold)` markers in code.
