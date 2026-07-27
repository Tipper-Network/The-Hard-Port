# P03 — Intake ops loop

**Status:** scaffold  
**Primary reviewer:** _fill_  
**SLA:** Review within **48h** of `application_submitted`

## Daily loop

1. [ ] Check `/review` (or operator email) for new applications
2. [ ] Open application → **Intake** tab → read responses
3. [ ] **Site journey** tab → drop-off context (if tracking accepted)
4. [ ] **Pipeline** tab → set lifecycle status, qualification, next action
5. [ ] Log decision in `notes` / pipeline tracker CSV export

## Qualification outcomes (when ready)

| Outcome | Set `qualification_result` | Set `lifecycle_status` |
|---------|---------------------------|-------------------------|
| Qualified | `qualified` | _fill_ |
| Conditional | `conditionally_qualified` | _fill_ |
| Too early | `too_early` | _fill_ |
| Outside scope | `outside_current_scope` | _fill_ |
| Not ready | `not_ready_for_thp` | _fill_ |

## Escalation

_fill_

## Pipeline tracker

- DB is source of truth for applications
- CSV export: `pnpm --filter api pipeline:export`
- Sync cadence with spreadsheet (if any): _fill_

## Notes

_fill_
