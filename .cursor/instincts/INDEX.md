# Instincts — parameter inventory

Judgment calls for situations no explicit rule covers. Tracked here for the training loop's
stage-1 (PARAMETER) bookkeeping — `confidence`/`status` live in this index, not in the
individual `SKILL.md` files, to keep each skill file clean.

| id | domain | status | confidence | last_evidence |
|----|--------|--------|------------|----------------|
| `small-business-psychology` | copy, offers | active | 0.7 | 2026-07-17 |
| `aggression-calibration` | copy, tone | active | 0.7 | 2026-07-17 |
| `godin-remarkable` | copy, offers, positioning | active | 0.7 | 2026-07-17 |
| `hormozi-value` | offers, pricing, guarantees | active | 0.75 | 2026-07-22 |
| `would-this-reassure` | copy, UX | active | 0.7 | 2026-07-17 |
| `performing-honesty` | copy | active | 0.7 | 2026-07-17 |
| `could-exist-on-any-agency-site` | copy, UI, sections | active | 0.8 | 2026-07-22 |
| `whos-asking-whom` | copy, UX, positioning | active | 0.75 | 2026-07-22 |
| `ladder-still-makes-sense` | funnel, sections | active | 0.8 | 2026-07-22 |
| `applicant-not-operator` | web, auth, intake | active | 0.85 | 2026-07-22 |
| `mockup-is-reference-not-truth` | copy, UI, design-system | active | 0.7 | 2026-07-17 |
| `no-silent-canon-promotion` | os, canon, research | active | 0.7 | 2026-07-18 |
| `tipper-is-not-the-company` | os, tipper, canon | active | 0.7 | 2026-07-18 |
| `instruction-layers-stay-separate` | os, process | active | 0.7 | 2026-07-18 |

**Confidence baseline:** all instincts start at `0.7` (authored, not yet battle-tested against
real rollout data). The `evolve` skill adjusts this based on `ROLLOUT.yaml` outcomes:

| outcome | effect |
|---------|--------|
| `pass` streak | no change — resist over-editing something that's working |
| `correction` (3x same instinct) | flag as an edit candidate in the next evolve run |
| `fail` | flag as a priority edit candidate |

**Status values:**

- `active` — in normal use, invoked when relevant.
- `mirrored` — the behavior is now fully owned by a rule; this file should shrink to a short
  pointer rather than duplicate the rule's text.
- `promoted` — folded into a rule; the instinct file can be deleted once the rule covers it.

## When an instinct repeats and stabilizes

Promote to a rule (`.cursor/rules/*.mdc`) if the judgment call has become a hard "always/never,"
or merge it into a skill if it's really a step in an existing procedure. See
`.cursor/skills/training-loop/TRAINING-LOOP.md` for the full promotion path.

## Recent platform alignment (2026-07-22)

- Funnel ladder updated to SERVICE-001 in `02-conversion-funnel.mdc`
- Web stack/auth in `06-web-platform-architecture.mdc`
- New instinct: `applicant-not-operator`
- New skills: `web-platform`, `ux-onboarding-flow`
