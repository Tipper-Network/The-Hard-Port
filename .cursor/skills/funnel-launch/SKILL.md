---
name: funnel-launch
description: Launches new landing pages or funnel entry points using the canonical SERVICE-001 ladder. Use when creating a campaign page, city page, YouTube destination, or new video funnel entry for The Hard Port.
---

# Skill — Launching a New Page / Funnel Entry Point

Read `.cursor/rules/00-brand-core.mdc`, `.cursor/rules/02-conversion-funnel.mdc`, and
`.cursor/rules/06-web-platform-architecture.mdc` first.

1. Start from the **SERVICE-001 ladder** (hook → letter → condition → mechanism → proof →
   boundaries → capacity → FAQ → last call) — don't invent a new structure per campaign.
2. Run the `positioning-audience` skill first if the new page targets a different angle or segment.
3. Reuse the canonical letter, or a tonally-matched variant, for the agitation rung — extend the
   existing emotional core rather than writing a new one from scratch each time.
4. **YouTube / social entry:** CTA destination is `/work-with-us` then `/apply`. Never `#apply`,
   never legacy free-slot copy, never operator sign-in.
5. Add as a Next.js App Router route under `apps/web/app/` — reuse `LazySection` + `next/dynamic`
   for any section stack longer than hero + letter.
6. Confirm mobile-first layout and load-speed budget per `.cursor/rules/04-ux-friction.mdc`
   before adding heavy media.
7. Run the `section-audit` skill on every section before launch.
