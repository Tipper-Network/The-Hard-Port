# P04 — Applicant confirmation email

**Status:** scaffold — service stub wired, template empty  
**Owner:** _fill_

## Checklist

- [ ] Write applicant email copy (THP voice — not reassurance fluff)
- [ ] Set `INTAKE_APPLICANT_FROM` in API env
- [ ] Implement HTML/text in `intake-applicant-confirmation.service.ts`
- [ ] Test submit → applicant receives email within 1 minute
- [ ] Confirm subject line: _fill_
- [ ] Unsubscribe / reply expectations: _fill_

## Copy draft (fill)

**Subject:** _fill_

**Body:**

```
_fill — what happens next, 48h review, no guarantee language_
```

## Code

| File | Role |
|------|------|
| `apps/api/src/intake/intake-applicant-confirmation.service.ts` | Resend to applicant |
| Called from `intake.service.ts` after create | Non-blocking |

## Notes

_fill_
