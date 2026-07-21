---
id: THP-SMB-INSTRUMENT-002
title: First-Onboarder Diagnostic
document_type: maturity_instrument
status: working
version: 1.0.0
created: 2026-07-21
updated: 2026-07-21
authors:
  - The Hard Port
owners:
  - Tarek
confidence: developing
evidence_level: founder_hypothesis
canonicality: working
qualification_gate: complete
parent_model: THP-SMB-LEVELS-001
depends_on:
  - THP-SMB-LEVEL-01
  - THP-SMB-LEVEL-02
  - THP-SMB-LEVELS-001
  - METHOD-EPDA-APP-001
related_documents:
  - ../levels/THP-SMB-LEVEL-01-established-but-surviving.md
  - ../levels/THP-SMB-LEVEL-02-stable-preparing-for-growth.md
  - ../THP-SMB-LEVELS-001-maturity-model.md
  - ./templates/THP-SMB-TEMPLATE-001-qualification-record.md
  - ../../../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md
  - ../../../docs/03-methods/entity-assessment/ENTITY-POSITION-AND-DIRECTION-ASSESSMENT.md
  - ../../../intelligence/layer-07-consulting-methodology.md
  - ../../../docs/04-market/first-onboarder/THP-SMB-001-FIRST-ONBOARDER.md
  - ../../../businesses/THP-SMB-001.md
  - ../../../active/forms/THP-SMB-002-level-1-to-level-2-transition.md
supersedes: []
superseded_by: []
---

# First-Onboarder Diagnostic

> **Qualification gate:** structurally complete (`qualification_gate: complete`). **Not canonical.** No numeric scoring.  
> **Blank record:** [`THP-SMB-TEMPLATE-001`](./templates/THP-SMB-TEMPLATE-001-qualification-record.md)  
> **Maturity references:** [`THP-SMB-LEVEL-01`](../levels/THP-SMB-LEVEL-01-established-but-surviving.md) · [`THP-SMB-LEVEL-02`](../levels/THP-SMB-LEVEL-02-stable-preparing-for-growth.md)

## THP SMB Engagement Sequence

Application → Qualification → Diagnostic → Consulting Assessment → Intervention → Reassessment

| Step | Document / phase |
|---|---|
| Application | [`THP-ENGAGEMENT-READINESS-APPLICATION`](../../../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md) |
| Qualification | **This instrument (sections 1–13 below)** |
| Diagnostic | This instrument (sections 14–18, **next task**) |
| Consulting Assessment | [`ENTITY-POSITION-AND-DIRECTION-ASSESSMENT`](../../../docs/03-methods/entity-assessment/ENTITY-POSITION-AND-DIRECTION-ASSESSMENT.md) + [`layer-07`](../../../intelligence/layer-07-consulting-methodology.md) |
| Intervention | Level 1-to-Level 2 (deferred) |
| Reassessment | Transition evidence (deferred) |

The application gathers **claims**.

The qualification gate verifies whether the business should enter diagnosis.

The diagnostic determines maturity conditions and Level 2 gaps.

## Qualification outcomes (not maturity levels)

Do **not** describe a qualification result as Level 0, Level 1, or Level 2.

| Outcome | ID |
|---|---|
| Proceed to diagnostic | `qualified` |
| Preparation required | `conditionally_qualified` |
| Level 1 entry gate not met | `too_early` |
| Refer or defer — external blocker | `outside_current_scope` |
| Founder cannot participate | `not_ready_for_thp` |

## Application inputs

Preliminary information from [`THP-ENGAGEMENT-READINESS-APPLICATION`](../../../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md). Application answers remain **`self_reported`** until reviewed through this gate.

| Application input | Qualification use | Verification required |
|---|---|---|
| Defined offer | Level 1 entry gate | Yes |
| Paying customers | Level 1 entry gate | Yes |
| Repeated delivery | Level 1 entry gate | Yes |
| Operating status | Level 1 entry gate | Yes |
| Founder intention | Level 1 entry gate | Direct confirmation |
| Current problems | Scope review | Usually |
| Expected outcome | Readiness review | Direct confirmation |
| Available records | Evidence inventory | Yes |
| Willingness to receive feedback | Founder readiness | Direct confirmation |
| Legal, financial, or operational crisis | Scope / referral | As appropriate |

Application routing results are **signals only**. Final decision: this instrument.

## Founder-source alignment

Informed by institutional-readiness principles in [`businesses/THP-SMB-001.md`](../../../businesses/THP-SMB-001.md) — historical founder input, **not** an operational acceptance instrument.

THP does not require founders to blame or condemn themselves.

It requires them to examine business assumptions, decisions, evidence, and outcomes without treating criticism of the business as criticism of their personal worth.

## Instrument scope

| Phase | Sections | Status |
|---|---|---|
| Qualification Gate | 1–13 below | **Complete** |
| Level 1 Diagnostic (A–H) | 14–18 | **Next task** — not yet designed |

---

# Purpose

Determine whether a business and its founder should proceed into the complete THP Level 1 diagnostic.

The qualification gate answers:

> Should THP diagnose this business?

It does not yet answer:

> What is wrong with the business?

That question belongs to the diagnostic across dimensions A–H.

---

# 1. Qualification Principles

## Qualification is evidence-based

Application answers are treated as self-reported claims until they are supported through records, examples, direct clarification, or observable business activity.

## Qualification is not maturity scoring

A business is not given a numeric score during qualification.

The qualification process uses:

* Mandatory gates.
* Evidence status.
* Readiness conditions.
* Scope conditions.
* Blocking conditions.

## Qualification is not a promise of acceptance

A struggling business may genuinely be Level 1 while still being unsuitable for THP’s current intervention.

## Qualification examines conditions, not personal worth

THP does not require founders to blame or condemn themselves.

THP requires them to examine business assumptions, decisions, evidence, and outcomes without treating criticism of the business as condemnation of the person.

---

# 2. Evidence Statuses

Every important claim should receive one evidence status.

## Self-reported

The founder has stated the claim, but THP has not reviewed supporting evidence.

## Supported

The founder has provided credible examples or records consistent with the claim.

## Verified

THP has reviewed sufficiently clear evidence to rely on the claim for a qualification decision.

Qualification does not require formal auditing. Verification means the evidence is sufficient for THP’s current decision.

## Contradicted

Available evidence conflicts with the founder’s claim.

## Unavailable

The evidence does not exist, cannot be reconstructed, or has not been provided.

## Not applicable

The evidence is irrelevant to this business model.

A claim marked `self-reported` should not be treated as verified merely because it appears plausible.

---

# 3. Gate Types

## Mandatory gate

Must be satisfied before the business can enter the full diagnostic.

## Conditional gate

May be completed through a defined preparation assignment.

## Scope gate

Determines whether the business’s primary problem falls within THP’s current capabilities.

## Readiness gate

Determines whether the founder can participate productively.

## Referral gate

Identifies another problem that must be addressed before THP’s work can be useful.

---

# 4. Qualification Interview

## Section A — Business Existence

### Question A1

**What does the business currently sell?**

Required response:

* Core offer.
* Current price or pricing method.
* Who receives it.
* What the customer receives.

Evidence:

* Product or service page.
* Menu, proposal, invoice, listing, or direct offer message.
* Example of completed delivery.

Gate:

* A defined offer must exist.

Failure condition:

* The business remains an idea, audience, concept, or undefined collection of services.

---

### Question A2

**Who has paid for the offer?**

Required response:

* Examples of unrelated paying customers.
* Approximate number of completed customer relationships or transactions.
* Whether any customers are friends, relatives, employees, investors, or affiliated parties.

Evidence:

* Redacted invoices.
* Transaction records.
* Order records.
* Booking history.
* Customer correspondence.
* Platform sales records.

Gate:

* Multiple unrelated paying customers must exist.

“Unrelated” means that the purchase was not primarily caused by family obligation, ownership connection, employment, or another pre-existing duty to support the founder.

---

### Question A3

**Has the offer been delivered repeatedly?**

Required response:

* Description of at least two completed deliveries.
* How delivery occurred.
* Whether the customer received the intended outcome.
* Whether problems, refunds, complaints, or incomplete delivery occurred.

Evidence:

* Fulfilment records.
* Customer messages.
* Delivery logs.
* Completed project records.
* Repeat-order history.

Gate:

* The business must have delivered its offer successfully more than once.

---

### Question A4

**Is the business currently operating?**

Required response:

* Date of most recent sale or delivery.
* What business activity is happening now.
* Whether the business is paused, seasonal, inactive, or closing.

Evidence:

* Recent activity.
* Current customer work.
* Recent order, booking, sale, or delivery.
* Active storefront or communication channel.

Gate:

* The business must remain active or be in a legitimate operating cycle.

A temporary seasonal pause does not automatically mean the business is inactive.

---

### Question A5

**Does the founder intend to continue building it?**

Required response:

* Founder’s current intention.
* Expected level of commitment.
* Any plans to close, sell, abandon, or fundamentally replace the business.

Evidence:

* Direct founder confirmation.
* Current operating commitments.
* Existing obligations or plans.

Gate:

* The founder must intend to continue operating the business long enough for an intervention to matter.

---

## Section B — First-Onboarder Fit

### Question B1

**How does the business depend on the internet?**

Examine:

* Customer discovery.
* Communication.
* Sales.
* Delivery.
* Customer support.
* Reputation.
* Community relationships.

Fit condition:

The business must be online, online-dependent, or materially affected by its online presence.

A physical business may qualify when digital communication or customer relationships materially affect its survival and stability.

---

### Question B2

**How large is the operating organization?**

Examine:

* Founder involvement.
* Number of active workers.
* Decision structure.
* Whether the business is still directly observable by the founder.

Fit condition:

The business should be a microbusiness or very small business in which the founder remains directly involved.

Larger organizations may require a different diagnostic and consulting system.

---

### Question B3

**What does the founder currently believe is wrong?**

Look for concerns involving:

* Demand.
* Customer understanding.
* Retention.
* Community.
* Positioning.
* Communication.
* Content.
* Business identity.
* Operational stability.
* Founder dependency.
* Decision-making.

Fit condition:

At least one central problem should fall within the Level 1-to-Level 2 transition.

---

### Question B4

**What has already been attempted?**

Ask for:

* Content production.
* Trend-based content.
* Paid promotion.
* Rebranding.
* Pricing changes.
* New offers.
* Hiring marketers or content creators.
* Platform changes.
* Partnerships.
* Discounts.
* Customer research.

Purpose:

Determine whether the business has accumulated disconnected actions without a reliable interpretation system.

This is not a mandatory gate by itself.

---

### Question B5

**What result does the founder expect from THP?**

Acceptable expectations include:

* Understanding the business’s condition.
* Clarifying the customer and offer.
* Identifying barriers to stability.
* Organizing evidence and feedback.
* Clarifying business identity.
* Building a more deliberate operating and communication system.

Readiness concern:

* “Make us viral.”
* “Guarantee sales.”
* “Run everything for us.”
* “Confirm that our existing strategy is correct.”
* “Post consistently without questioning the business.”
* “Bring customers without requiring our participation.”

---

### Question B6

**Why does the founder want help now?**

Purpose:

Identify whether the business has reached a genuine decision point.

Useful signals include:

* Existing methods have stopped producing learning.
* The founder no longer knows which problem to solve.
* Survival pressure is increasing.
* The founder is considering abandoning the business.
* Growth attempts are creating instability.
* The founder recognizes that content alone is insufficient.

Urgency alone does not qualify the business.

There must also be readiness to investigate.

---

# 5. Founder-Readiness Interview

## Question R1 — Assumptions

**Which belief about the business might be wrong?**

Positive signal:

The founder can identify at least one assumption that should be tested.

Readiness concern:

The founder believes only customers, platforms, staff, competitors, or algorithms can be wrong.

---

## Question R2 — Evidence

**What business information are you willing to share?**

Positive signal:

The founder will provide relevant records, with reasonable redaction where necessary.

Critical failure:

The founder refuses to provide any evidence while expecting a definitive diagnosis.

---

## Question R3 — Customer feedback

**What customer feedback would be hardest to hear?**

Positive signal:

The founder can acknowledge that customer evidence may challenge their identity, offer, pricing, or communication.

Critical failure:

The founder only accepts positive feedback or dismisses customers who disagree.

---

## Question R4 — Participation

**What time and attention can you give this process?**

Positive signal:

The founder can participate in interviews, evidence collection, decisions, and review.

Critical failure:

The founder expects THP to diagnose and rebuild the business without meaningful founder participation.

---

## Question R5 — Existing activity

**Which current actions could you pause if evidence does not support them?**

Positive signal:

The founder is willing to reduce or stop disconnected activity.

Readiness concern:

The founder insists that all current tactics must continue regardless of evidence.

---

## Question R6 — Responsibility

**Which business decisions remain your responsibility?**

Positive signal:

The founder accepts responsibility for decisions without converting responsibility into personal shame.

Critical failure:

The founder expects THP to assume ownership of decisions that legally and operationally belong to the business.

---

## Question R7 — Outcome expectations

**What would make this process unsuccessful?**

Positive signal:

The founder understands that clarity, evidence, and corrected decisions may be valuable even before revenue increases.

Critical failure:

The founder defines success only as an immediate guaranteed commercial result.

---

# 6. Minimum Qualification Evidence

The complete diagnostic should not begin until THP has enough evidence to establish that the business is real and diagnosable.

## Required business evidence

At least:

* A clear description of the offer.
* Current pricing or pricing method.
* Evidence that the offer is currently available.
* Basic operating history.
* Description of the current team and founder role.

## Required customer evidence

At least:

* Evidence of multiple unrelated paying customers.
* Examples of completed delivery.
* At least one example of customer response after delivery.
* Available repeat, referral, complaint, or disengagement evidence.

The business does not need all categories to qualify, but it must have enough customer evidence for meaningful examination.

## Required transaction evidence

At least:

* Approximate recent sales pattern.
* Evidence of real transactions.
* Identification of the most frequently or successfully sold offer.
* Basic awareness of costs, even if financial records remain incomplete.

Formal accounting records are not required at qualification.

Refusal to provide any commercial evidence is disqualifying.

## Required communication evidence

At least:

* Primary social, website, marketplace, messaging, or storefront channels.
* Examples of recent communication.
* Examples of previous promotional or content activity.
* Available platform performance information.

## Required operational evidence

At least:

* Description of one complete customer cycle.
* Explanation of how the offer is delivered.
* Identification of who performs the main work.
* Description of a recent delivery problem or operational difficulty.

---

# 7. The Complete Customer Cycle

For qualification purposes, a customer cycle contains:

1. Customer discovery or contact.
2. Customer question, request, order, or commitment.
3. Purchase or payment.
4. Delivery.
5. Customer response.
6. Repeat, referral, disengagement, complaint, or another observable outcome.
7. Business interpretation or follow-up.

The business must have completed enough cycles to make examination meaningful.

There is no universal required transaction count beyond the confirmed requirement for multiple unrelated customers and repeated delivery.

THP may conditionally qualify a business when the cycles exist but the evidence has not yet been organized.

---

# 8. Scope and Referral Review

THP should determine whether another problem prevents the business from benefiting from diagnosis.

## Immediate financial crisis

Refer or defer when:

* The business cannot meet urgent obligations.
* Immediate debt or insolvency action is required.
* The founder primarily needs licensed accounting, debt, or financial restructuring support.

THP may later work with the business after the immediate crisis is stabilized.

## Legal or regulatory crisis

Refer when:

* The business may be operating unlawfully.
* Licensing or ownership problems block normal operations.
* Active legal disputes determine whether the business can continue.
* The offer presents unresolved safety or compliance concerns.

## Product or delivery failure

Defer when:

* The business cannot reliably deliver the basic offer at all.
* The product is unsafe or unusable.
* A critical technical failure prevents transactions or delivery.

## Ownership or founder conflict

Refer or defer when:

* Ownership is disputed.
* Founders cannot agree who has decision authority.
* Internal conflict prevents evidence access or implementation.

## Emergency financing need

Refer when the founder primarily needs capital to avoid immediate closure and expects THP’s diagnostic to substitute for financing.

## Pre-business validation

Route as `too_early` when:

* There are no unrelated paying customers.
* The offer has not been repeatedly delivered.
* The project requires initial demand validation rather than Level 1 diagnosis.

---

# 9. Critical Readiness Failures

The following conditions normally produce `not_ready_for_thp`:

* Refusal to provide basic evidence.
* Refusal to engage with customer feedback.
* Demand for guaranteed sales or virality.
* Expectation that THP will operate the business independently.
* Unwillingness to examine any founder assumption.
* Deliberate misrepresentation of business activity.
* Repeated contradiction between claims and evidence without willingness to clarify.
* Inability or unwillingness to participate.
* Insistence that THP only produce content without examining the business.
* Refusal to stop actions that evidence shows are harmful.

A founder may be invited to reapply when the blocking readiness condition changes.

---

# 10. Remediable Readiness Concerns

The following do not automatically disqualify the founder:

* Disorganized records.
* Embarrassment about weak results.
* Limited business vocabulary.
* Incomplete financial knowledge.
* Strong emotional attachment to the business.
* Previous poor decisions.
* Fear of customer criticism.
* Founder exhaustion.
* Difficulty delegating.
* Uncertainty about the business model.

These conditions may be part of the Level 1 problem.

They become disqualifying only when the founder refuses to examine or address them.

---

# 11. Qualification Decision Rules

## Qualified

Use when:

* All Level 1 entry requirements are supported or verified.
* The business matches the first-onboarder profile.
* No blocking scope condition exists.
* No critical readiness failure exists.
* Minimum evidence is available.
* The founder can participate.

Next action:

> Proceed to the complete diagnostic across dimensions A–H.

---

## Conditionally Qualified

Use when:

* The business appears to meet the Level 1 entry gate.
* The first-onboarder fit is strong.
* The founder is ready.
* Evidence is incomplete but recoverable.
* No external crisis blocks the work.

Next action:

> Issue a defined diagnostic-preparation assignment.

The assignment must identify:

* Missing evidence.
* How it should be gathered.
* What constitutes sufficient completion.
* Who is responsible.
* The next review point.

Conditional qualification must not become indefinite.

---

## Too Early

Use when:

* No defined offer exists.
* Multiple unrelated paying customers do not exist.
* Repeated delivery has not occurred.
* The business is still an idea, pre-launch project, hobby, or audience without a functioning offer.

Next action:

> Do not enter the Level 1 diagnostic.

Record what evidence would be required for future reconsideration.

---

## Outside Current Scope

Use when:

* The business exists.
* The founder may be ready.
* Another legal, financial, technical, product, ownership, or crisis issue must be resolved first.

Next action:

> Refer, defer, or require external resolution before qualification is reconsidered.

---

## Not Ready for THP

Use when:

* The business technically exists.
* No external issue necessarily blocks it.
* The founder cannot or will not participate under THP’s evidence and learning conditions.

Next action:

> Reject or defer the engagement and record the exact readiness condition that must change.

---

# 12. Decision Priority

When more than one outcome appears possible, use this order:

1. Too early.
2. Outside current scope.
3. Not ready for THP.
4. Conditionally qualified.
5. Qualified.

This prevents THP from describing an unestablished project as “not ready” when it is actually too early, or treating a legal or financial crisis as a founder-readiness problem.

---

# 13. Qualification Decision Record

Complete one [`THP-SMB-TEMPLATE-001`](./templates/THP-SMB-TEMPLATE-001-qualification-record.md) per attempt. Structure below — use the template for blank instances.


## Business Identification

* Business name:
* Founder:
* Date:
* Reviewer:
* Core offer:
* Operating history:
* Primary digital channels:

## Application Routing Result

* ready_for_qualification_review
* missing_application_information
* likely_too_early
* likely_outside_current_scope
* readiness_concern_identified

## Level 1 Entry Gate

| Requirement                         | Evidence status | Evidence reviewed | Finding |
| ----------------------------------- | --------------- | ----------------- | ------- |
| Defined offer                       |                 |                   |         |
| Multiple unrelated paying customers |                 |                   |         |
| Repeated delivery                   |                 |                   |         |
| Currently operating                 |                 |                   |         |
| Founder intends continuation        |                 |                   |         |

## First-Onboarder Fit

| Requirement                                   | Result | Evidence |
| --------------------------------------------- | ------ | -------- |
| Online or online-dependent                    |        |          |
| Microbusiness or very small business          |        |          |
| Founder directly involved                     |        |          |
| Problem falls within Level 1-to-Level 2 scope |        |          |
| Business activity is observable               |        |          |

## Founder Readiness

| Condition                                        | Result | Evidence or note |
| ------------------------------------------------ | ------ | ---------------- |
| Willing to examine assumptions                   |        |                  |
| Willing to provide evidence                      |        |                  |
| Open to customer feedback                        |        |                  |
| Able to participate                              |        |                  |
| Accepts THP’s limitations                        |        |                  |
| Willing to stop unsupported actions              |        |                  |
| Accepts responsibility without self-condemnation |        |                  |

## Scope Review

* Financial crisis:
* Legal or regulatory crisis:
* Product or technical failure:
* Ownership conflict:
* Emergency financing need:
* Other referral requirement:

## Evidence Status Summary

* Verified:
* Supported:
* Self-reported:
* Contradicted:
* Unavailable:
* Not applicable:

## Final Qualification Result

* qualified
* conditionally_qualified
* too_early
* outside_current_scope
* not_ready_for_thp

## Reasoning

## Missing Evidence

## Blocking Conditions

## Preparation Assignment

## Referral Requirement

## Conditions for Reconsideration

## Next Action

---

# 14. Level 1 Diagnostic Interview (deferred)

**Next task:** Build diagnostic questions across dimensions A–H.

Use evidence statuses (`self_reported`, `supported`, `verified`, `contradicted`, `unavailable`, `not_applicable`), dimension findings, mandatory gates, and constraint identification.

**No numeric scoring.**

Assess using [`THP-SMB-LEVELS-001`](../THP-SMB-LEVELS-001-maturity-model.md#eight-assessment-dimensions). Record overall level (weakest mandatory gate) and per-dimension maturity separately.

## Evidence terminology (diagnostic phase)

Qualification uses **evidence statuses** (claim-level). The Entity Position assessment uses a parallel **evidence separation** vocabulary (founder testimony, THP observation, operational data, interpretation, hypothesis) — see [`ENTITY-POSITION-AND-DIRECTION-ASSESSMENT`](../../../docs/03-methods/entity-assessment/ENTITY-POSITION-AND-DIRECTION-ASSESSMENT.md#evidence-separation). These axes serve different phases; neither replaces the other.

Document-level `evidence_level` in frontmatter (e.g. `founder_hypothesis`, `self_reported`) describes source support for a **document**, not per-claim status during qualification.

---

# 15. Level 1 Classification (deferred)

Reference: [`THP-SMB-LEVEL-01`](../levels/THP-SMB-LEVEL-01-established-but-surviving.md)

---

# 16. Level 2 Gap Assessment (deferred)

Reference: [`THP-SMB-LEVEL-02`](../levels/THP-SMB-LEVEL-02-stable-preparing-for-growth.md)

---

# 17. Diagnostic Conclusion (deferred)

Structured conclusion — not a numeric score.

---

# 18. Reassessment (deferred)

---

## Revision History

### 1.0.0 — 2026-07-21

- Qualification gate structurally complete: principles, evidence statuses, gate types, interviews, minimum evidence, customer cycle, scope/referral, readiness failures/concerns, decision rules, priority, decision record.
- Source: [`READ_FROM.md`](../../../READ_FROM.md). Level 1 entry gate confirmed.

### 0.3.0 — 2026-07-21

- Engagement sequence; application mapping; L1 entry gate confirmed in prior pass.

### 0.1.0 — 2026-07-21

- Initial structure.
