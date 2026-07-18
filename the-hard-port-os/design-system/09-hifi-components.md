# Hi-fi component specs — six core sections

Desktop (1440) + mobile (375) mockups for six sections. Each entry below: the doc's spec, then
how it maps to what's actually built in `apps/web/src/landing/`.

## 1. Hero — Identity Match → `hero.tsx`

**Doc spec:** Trimmed nav (logo + one link + one button — Pricing/About removed from cold nav,
per the IA flag). Video-bg placeholder, eyebrow line ("We give a f*ck. We just don't care."),
44px Anton headline "Your business isn't sinking. It's just not going anywhere.", 16px subhead
("That's worse. You're comfortable. Comfortable is just sinking politely."), CTA pair (solid
"Watch the truth" + ghost "Apply for the free slot"), caption ("2 slots a month. We pick. Prove
us wrong.").

**Live:** Headline matches near-verbatim ("Your business isn't sinking. / It's just not going
anywhere."). Subhead matches near-verbatim, plus "Hard a-port." tag-on. CTA pair exists (`Get the
brutal version` / `Apply for The free slot` — doc uses "Watch the truth," live uses "Get the
brutal version," both point at the letter/agitation section next, so functionally identical).
Caption matches in spirit ("2 businesses a month get our work for free... prove us wrong").
**Gap:** nav is *not* trimmed — `site-header.tsx` still exposes Pricing + Who We Are, contradicting
this spec and the IA flag in `01-ia-sitemap.md`. Background is video (doc uses a placeholder
pattern, not prescriptive) — live's actual video/poster implementation already exceeds the doc's
detail here.

## 2. The Letter — Agitation → `letter-section.tsx`

**Doc spec:** No nav row. Eyebrow ("The part nobody says out loud"), 32px Anton salutation ("Dear
business owner who thinks they're fine,"), 3 body paragraphs at 17px/1.75 line-height, single CTA
("Show me what I'm doing wrong"). Long-form, uninterrupted, generous side padding (90px desktop).

**Live:** Not diffed line-by-line here — `letter-section.tsx` already exists and was reviewed
earlier in this project's work for tone/apostrophe fixes. Worth a direct pass to confirm it opens
with a "Dear business owner..." salutation and ends on a single CTA, matching this structure.

## 3. Mechanism — Boosting vs. Campaign → `boosting-section.tsx`

**Doc spec:** Heading "The $20 lie", two-column contrast: `Boosting` (Rust-colored label, ✕
bullets, muted border) vs. `A campaign` (Gold-colored label, ✓ bullets, Gold border).

**Live:** Component already exists as `BoostingSection`, structurally identical: `boosting[]` vs
`campaign[]` arrays, ✕/✓ bullets, muted-gray-border-and-strikethrough for the losing column vs.
accent-border-and-glow for the winning column. This is the **closest 1:1 match** of any section
to the doc's spec — copy differs slightly (live has 6 bullets per column vs. doc's 3, live adds a
closing line "Boosting spends money. A campaign makes it.") but the mechanic, contrast, and
color-coding are the same idea already built. Only real gap: live uses accent (orange) for the
"winning" column border, doc specifies Gold as a *different* color from Rust (the ✕/losing
color) — see `02-color-tokens.md`, live currently has no separate rust/alert token so ✕ marks
inherit a generic muted white, not a distinct alert color.

## 4. Proof / Stats → `proof-section.tsx`

**Doc spec:** Heading "Marketers lie. We won't.", subhead about the gap in traditional proof
being the proof, 3-stat grid (11 strategies / 5 independent clients / $0 vs $270K return),
Gold-colored big numbers.

**Live:** Matches closely — same headline verbatim ("Marketers lie. We won't."), same core stats
(11 strategies, $0 documented return vs $270,000 return), same "gap is the proof" framing, same
accent-colored (orange, not gold) big numbers. Live's grid has 6 stats instead of 3 (adds brands
built, total clients, solo-run clients) — a superset of the doc's spec, not a conflict.

## 5. Pricing — Offer Stack → `packages-section.tsx`

**Doc spec:** Three tiers side-by-side (Port/Sea/Ocean), "RECOMMENDED" ribbon on exactly one tier
(controlled by a single `highlightTier` value, default `ocean`), Port priced "Custom" not "???",
tagline per tier ("Still scared of the water" / "People who actually want to move" / "Done
playing small"), CTA escalates per tier (Port: "Apply", Sea: "Commit", Ocean: "Let's talk").

**Live:** Already reworked in this project's earlier session — tabs renamed, Port price now shows
"FREE" with explainer text (doc shows "Custom" — live's "FREE" is arguably more accurate to the
actual free-slot mechanic, since Port isn't really a paid custom-quote tier, it's the gated free
slot). Per-tier CTA copy in `packages-features.ts` doesn't yet fully match the doc's escalating
verb set (Apply → Commit → Let's talk) — worth checking against current CTA labels directly.
Recommended-tier ribbon logic not yet confirmed as a single-source-of-truth toggle vs. hardcoded.

## 6. Last Call → `contact-section.tsx`

**Doc spec:** Nothing but a heading ("The only thing worse than sinking is staying still.") and
one CTA ("Apply for the free slot") plus a tiny caption ("2 slots a month. We pick."). No
secondary CTA, no nav, no other content — the starkest section on the page.

**Live:** `ContactSection` currently ships a headline ("Ready to give a f*ck, and not care???"),
a supporting paragraph, **two** CTAs side by side (`Apply for The free slot` + an email
`mailto:` link) plus a WhatsApp button below — three calls to action, not one. This is the
biggest structural gap of the six: the doc's Last Call rung is deliberately down to a single CTA
with nothing else competing, and live's version has three competing exits. Also decorative blur
elements (`bg-accent/20 blur-3xl` circles) that the doc's stark, empty-space treatment doesn't
use. Worth a deliberate look — this is the exact rung `01-ia-sitemap.md`'s rung-9 rule ("hardest
line on the page, single CTA, nothing else competing") is about, and it's the one hi-fi section
where live diverges from spec on structure, not just color/type.
