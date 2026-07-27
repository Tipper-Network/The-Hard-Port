# P05 — Discovery source video (YouTube attribution)

**Status:** scaffold — DB column + API field wired; form UI optional  
**Spec:** `docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md`

## Checklist

- [ ] Decide URL pattern for videos: `?ref=youtube&video={ID}` (prefill works today)
- [ ] Show optional “Which video?” field on apply form when `ref=youtube`
- [ ] Map `discoverySourceVideo` in review dashboard / pipeline export
- [ ] YouTube description template includes site link with video ID

## Field mapping

| Layer | Field |
|-------|-------|
| URL param | `video` |
| Session / prefill | `getDiscoveryPrefill()` |
| DB | `applications.discovery_source_video` |
| API DTO | `discoverySourceVideo` |

## Review display

_fill — where operators see video ID in /review_

## Notes

_fill_
