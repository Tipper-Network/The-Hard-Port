---
id: THP-YOUTUBE-001
title: THP YouTube Attraction Architecture
document_type: media_system_specification
status: working
version: 0.1.0
created: 2026-07-21
updated: 2026-07-21
authors:
  - The Hard Port
owners:
  - Tarek
confidence: developing
evidence_level: founder_hypothesis
canonicality: non_canonical
field_validation: pending_first_publish_cycle
depends_on:
  - THP-SMB-LEVEL-01
  - THP-SMB-LEVEL-02
  - THP-SMB-ENGAGEMENT-001
  - THP-ENGAGEMENT-READINESS-APPLICATION
related_documents:
  - ../../knowledge/smb-maturity/levels/THP-SMB-LEVEL-01-established-but-surviving.md
  - ../../knowledge/smb-maturity/levels/THP-SMB-LEVEL-02-stable-preparing-for-growth.md
  - ../../knowledge/smb-engagement/THP-SMB-ENGAGEMENT-001-client-lifecycle.md
  - ../../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md
  - ../first-client-readiness/README.md
  - ../first-client-readiness/public/thp-service-explanation.md
supersedes: []
superseded_by: []
---

# THP YouTube Attraction Architecture

> **Purpose:** Attract established Level 1 microbusiness owners, help them recognize survival-mode condition, establish THP's interpretive authority, and route suitable viewers to the Engagement Readiness Application — without giving away the intervention or pretending THP is a marketing agency.  
> **Not canonical** until first publish cycle validates language, CTA conversion, and application quality.

## Central question

What should THP publish so the correct business owner recognizes their real condition, trusts THP's interpretation, and chooses to enter application and qualification?

## Channel thesis

**The Hard Port on YouTube is not a marketing tips channel.** It is a recognition-and-interpretation channel for online microbusiness owners who are *doing fine* — which is the problem.

THP publishes structural diagnoses of Level 1 survival patterns: irregular demand, founder dependency, false marketing explanations, and the gap between activity and stability. The channel does not promise growth hacks. It names the condition, explains why common fixes fail, and points serious owners toward a professional diagnostic — not a free audit.

**One-line thesis:** You are not failing at marketing. You are operating a business that has not yet become stable.

## Target viewer

| Attribute | Definition |
|---|---|
| Business type | Online or online-dependent microbusiness with a defined offer |
| Maturity | Level 1 — established but surviving ([`THP-SMB-LEVEL-01`](../../knowledge/smb-maturity/levels/THP-SMB-LEVEL-01-established-but-surviving.md)) |
| Revenue | Has multiple unrelated paying customers; not pre-launch |
| Founder state | Quietly aware something is off; still working hard; tired of generic advice |
| Not for | Pre-revenue founders, hobby pages, people wanting reassurance, agencies shopping for execution |

**First-onboarder fit:** Matches [`THP-SMB-INSTRUMENT-002`](../../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md) §1–3 profile — not the full instrument on video.

## Viewer psychological progression

Each piece of content should move the viewer one rung — never skip rungs in a single video.

| Rung | Viewer state | Content job |
|---|---|---|
| 1 — Drift | "I'm busy but not sure I'm going anywhere" | Recognition: name the pattern without blaming |
| 2 — Misdiagnosis | "Maybe I need better ads/content/branding" | Interpretation: replace marketing explanations with structural ones |
| 3 — Discomfort | "That sounds like my business and I don't like it" | Transition: confront false comfort; introduce stability vs survival |
| 4 — Authority | "These people see something I haven't articulated" | Institutional thesis: THP's model, boundaries, diagnostic logic |
| 5 — Decision | "I should find out if I'm actually Level 1" | CTA: `/work-with-us` then `/apply` |

Escalation rule: early videos may use soft CTAs (subscribe, comment). Application CTAs appear only after Recognition + Interpretation content exists and the [intake readiness gate](../first-client-readiness/README.md) is satisfied.

## Content categories

Five categories map to funnel depth. Tag every video with one primary category.

### 1. Recognition

Name observable Level 1 symptoms the viewer already lives with — without requiring THP vocabulary.

**Examples:** irregular sales, founder doing everything, followers who don't buy, revenue spikes that don't repeat, "fine" as a trap.

**Evidence standard:** Ground claims in patterns from Level 1 dimensions A–H. No fabricated client stories.

### 2. Interpretation

Explain *why* the symptom persists — structural cause, not tactic failure.

**Examples:** why posting more won't fix irregular demand; why rebranding before stability is rearranging deck chairs; why the owner can't see their own constraint.

**Evidence standard:** Tie interpretation to maturity model language internally; keep public language plain.

### 3. Transition

Introduce Level 1 → Level 2 as a real destination without teaching the full intervention.

**Examples:** what stability looks like vs survival; what changes when evidence replaces hope; what THP does *not* do in transition work.

**Evidence standard:** Align with [`THP-SMB-LEVEL-02`](../../knowledge/smb-maturity/levels/THP-SMB-LEVEL-02-stable-preparing-for-growth.md) exit/entry gates — do not oversell Level 3.

### 4. Institutional thesis

THP's operating beliefs — application ≠ qualification ≠ diagnosis; diagnostic ≠ marketing audit; one active client during field validation.

**Examples:** "We give a f*ck. We just don't care." applied to business condition; why THP rejects some applicants; what the Business Reality Diagnostic is.

**Evidence standard:** Must match [`/work-with-us`](../../../apps/web/src/routes/work-with-us.tsx) and SERVICE-001 boundaries. No Tipper product promotion without field evidence.

### 5. Proof and field learning

Document what THP learns from the first entity — anonymized unless consent exists.

**Examples:** field-validation insights, methodology revisions, "what we got wrong" — only with [`THP-SMB-PROOF-001`](../../knowledge/smb-proof/THP-SMB-PROOF-001-case-study-and-proof-system.md) permission levels.

**Evidence standard:** No invented case studies. Default to `internal_learning_record` or `anonymous_evidence_note` until consent captured.

## Core series architecture

Three series carry the channel — not twelve disconnected topics.

### Series A — "You're Not Stuck in Marketing"

**Category mix:** Recognition → Interpretation  
**Job:** Displace false marketing diagnoses with structural ones.  
**Format:** 8–14 min focus videos; one symptom per episode.  
**Cadence:** Backbone of the first 12-video test (videos 1–6).

### Series B — "Level 1 Is a Real Condition"

**Category mix:** Interpretation → Transition  
**Job:** Introduce maturity framing without academic lecture.  
**Format:** 10–18 min; dimension-led (demand, retention, founder dependency, evidence).  
**Cadence:** Videos 7–10 of first test.

### Series C — "How THP Works"

**Category mix:** Institutional thesis  
**Job:** Pre-qualify viewers before application — filter out wrong fits.  
**Format:** 6–12 min direct address; confrontational tone allowed.  
**Cadence:** Videos 11–12 of first test; ongoing as boundaries evolve.

**Deferred series:** Proof and field learning (Series D) begins after first client engagement produces consented material.

## Focus-video formats

| Format | Length | Use |
|---|---|---|
| **Pattern callout** | 6–10 min | Single Level 1 symptom + "if this is you" |
| **False fix autopsy** | 10–15 min | Popular advice that fails at Level 1 |
| **Dimension brief** | 12–18 min | One A–H dimension explained for owners |
| **Direct thesis** | 6–12 min | THP boundary, process, or rejection criteria |
| **Field note** | 5–8 min | Anonymized learning post-validation (later) |

**Production minimum:** Face or voice + clear structure. No dependency on shorts volume, paid media, or daily posting.

## Institutional thesis videos (priority list)

Publish before heavy application CTAs:

1. **What THP is not** — not a content agency, not a free audit shop  
2. **Application vs qualification vs diagnostic** — three separate gates  
3. **Why the Business Reality Diagnostic is not a marketing audit**  
4. **Who THP accepts and rejects** — Level 1 entry gate in plain language  
5. **One client at a time** — capacity limit as quality signal, not scarcity marketing

## Calls to action

CTAs escalate with funnel depth — see [`cta-escalation`](../../../.cursor/skills/cta-escalation/SKILL.md) skill.

| Content depth | Primary CTA | Secondary CTA |
|---|---|---|
| Recognition / early Interpretation | Subscribe · comment with their pattern | Link to `/work-with-us` in description |
| Transition | `/work-with-us` — read how THP works | Comment: "which dimension is weakest?" |
| Institutional thesis | `/apply` — Engagement Readiness Application | `/work-with-us` for skeptics |
| Proof (later) | `/apply` with evidence of process | Consent-appropriate proof asset |

**Hard rules:**

- Never promise acceptance, results, or Level 2 outcome in a CTA.  
- Never route to legacy homepage `#apply` free-slot form — use `/apply` only.  
- Do not publish `/apply` CTAs until [readiness gate](../first-client-readiness/README.md) is complete (webhook configured, commercial summary finalized, legal review started).

## Viewer-to-application journey

```text
YouTube video (Recognition / Interpretation)
        ↓
Optional: second video (Transition or Thesis)
        ↓
/work-with-us — self-filter: "Is this me? Do I accept the boundaries?"
        ↓
/apply — Engagement Readiness Application (self-reported intake)
        ↓
THP qualification (off-channel) — not YouTube
```

**Discovery attribution:** Application form captures `discoverySource`. Tag YouTube links with `?ref=youtube` where analytics allow; record series/episode in pipeline tracker notes when applicant arrives.

## Content evidence standards

| Rule | Requirement |
|---|---|
| Client stories | Consent per [`THP-SMB-RESEARCH-001`](../../knowledge/smb-research/THP-SMB-RESEARCH-001-evidence-data-consent-system.md) — default: none until first entity |
| Statistics | Cite source or label as founder observation |
| Level claims | Align with LEVEL-01/02 definitions — no invented Level 4+ content |
| Competitor framing | Attack false categories (marketing audit industrial complex), not named small businesses |
| Tipper | Manual-first boundary — no product CTAs without field validation |

Record content insights in [`THP-FIRST-CLIENT-FIELD-VALIDATION`](../first-client-readiness/templates/THP-FIRST-CLIENT-FIELD-VALIDATION.md) § Content Insights after applications arrive.

## Publishing and review rhythm

**First cycle (field validation):**

| Element | Working default |
|---|---|
| Publish rate | 1 video per 7–10 days |
| Batch | Script → record → publish → review applications/comments within 48h |
| Review | Founder reviews: voice litmus, boundary check, CTA tier |
| Learning capture | Weekly: top comments, objection phrases, unqualified applicants → pipeline tracker + field validation |

**Not active:** daily shorts program, paid YouTube ads, multi-platform syndication, founder lifestyle content.

## First 12-video test

Hypothesis: Level 1 owners will recognize themselves in Series A, accept structural framing in Series B, and self-select into application after Series C — without THP giving away intervention detail.

| # | Series | Category | Working title | Primary CTA |
|---|---|---|---|---|
| 1 | A | Recognition | You're busy. That doesn't mean you're building. | Subscribe |
| 2 | A | Recognition | "Fine" is the most expensive word in your business | Subscribe |
| 3 | A | Interpretation | Irregular sales aren't a ads problem | Comment |
| 4 | A | Interpretation | Why your audience isn't your customer base | Comment |
| 5 | A | Interpretation | Founder dependency isn't hustle — it's a system failure | `/work-with-us` |
| 6 | A | Interpretation | You can't optimize what you haven't defined | `/work-with-us` |
| 7 | B | Transition | Level 1 vs Level 2 — survival vs stability | `/work-with-us` |
| 8 | B | Transition | What changes when you stop guessing | `/work-with-us` |
| 9 | B | Transition | Evidence beats hope — what that actually requires | `/work-with-us` |
| 10 | B | Transition | The exit from survival mode (without a rebrand fantasy) | `/work-with-us` |
| 11 | C | Institutional | What THP is — and what we refuse to do | `/apply` * |
| 12 | C | Institutional | The diagnostic is not a marketing audit | `/apply` * |

\* Videos 11–12 publish `/apply` CTAs only after intake readiness gate is green.

**Success criteria for the test:**

- ≥1 qualified application from YouTube-attributed traffic  
- Comment language matches Level 1 dimensions (not "what tool should I use")  
- Unqualified applicants self-identify in comments or application ("I'm pre-launch") — filter working  
- Founder workload sustainable at 1 video / 7–10 days alongside qualification work

## Metrics and learning questions

Track manually in spreadsheet or pipeline tracker — no custom analytics software yet.

| Metric | Learning question |
|---|---|
| Views / retention at 30s, 50%, end | Which hooks name the condition fastest? |
| Comments — pattern language | What words do owners use for their condition? |
| `/work-with-us` clicks (UTM) | Do interpretation videos drive self-filtering? |
| Applications with `discoverySource: YouTube` | Does CTA escalation convert without over-promising? |
| Qualification outcomes of YouTube applicants | Is the channel attracting Level 1 or noise? |
| Time from first view to application | How many videos does a serious owner consume? |
| Founder hours per video | Is publish rhythm compatible with one active client? |

**Field-validation questions** (answer after first entity):

- Did any video create wrong-fit applications?  
- Which thesis video reduced unqualified volume?  
- What content did the first client say they watched before applying?  
- What should become repeatable vs removed?

## Explicitly deferred

- Daily posting calendar and short-form volume  
- Paid media amplification  
- Broad founder-brand / lifestyle content  
- Levels 4–7 media  
- Tipper product promotion without field evidence  
- Client portal, CRM, automated scoring  
- Multi-package offer comparison content

## Revision history

### 0.1.0 — 2026-07-21

- Initial working architecture: thesis, progression, three series, first 12-video test, CTA map, metrics.
