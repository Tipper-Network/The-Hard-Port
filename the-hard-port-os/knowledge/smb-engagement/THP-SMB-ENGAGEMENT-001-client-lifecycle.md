---
document_id: THP-SMB-ENGAGEMENT-001
id: THP-SMB-ENGAGEMENT-001
title: THP SMB Client Engagement Lifecycle
document_type: smb_engagement_definition
domain: smb_engagement
status: working
canonicality: candidate
version: 1.0.1
created: 2026-07-21
updated: 2026-07-21
authors:
  - The Hard Port
owners:
  - Tarek
confidence: developing
evidence_level: founder_hypothesis
source_document: ../../READ_FROM.md
field_validation: pending_first_entity
commercial_validation: pending
legal_validation: pending
depends_on:
  - METHOD-EPDA-APP-001
  - THP-SMB-INSTRUMENT-002
  - THP-SMB-INTERVENTION-001
related_documents:
  - ../../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md
  - ../smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md
  - ../smb-intervention/THP-SMB-INTERVENTION-001-level-1-to-level-2.md
  - ../smb-service/THP-SMB-SERVICE-001-offer-architecture.md
  - ../smb-research/THP-SMB-RESEARCH-001-evidence-data-consent-system.md
  - ../smb-proof/THP-SMB-PROOF-001-case-study-and-proof-system.md
  - ../../intelligence/layer-07-consulting-methodology.md
  - ./templates/THP-SMB-TEMPLATE-004-stage-transition-record.md
  - ./templates/THP-SMB-TEMPLATE-005-engagement-lifecycle-record.md
supersedes: []
superseded_by: []
---

# THP SMB Client Engagement Lifecycle

> **Status:** `working` · `canonicality: candidate` · **Not canonical.**  
> `field_validation: pending_first_entity` · `commercial_validation: pending` · `legal_validation: pending`

## Lifecycle sequence

Discovery → Application → Application Review → Qualification → Diagnostic Preparation → Diagnostic → Findings Presentation → Engagement Decision → Agreement and Payment → Kickoff → Intervention → Progress Review → Level 2 Reassessment → Completion or Exit

## Working Payment Boundary

> **Working recommendation — not confirmed price policy.** Detail: [`THP-SMB-SERVICE-001` § Working Commercial Defaults](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#working-commercial-defaults)

- Discovery and application are currently assumed to be free.
- Qualification is free during first-client validation.
- Formal diagnosis is a paid, fixed-scope professional service.
- Intervention begins only after agreement and the required initial payment.
- Optional execution services must be explicitly included or separately priced.
- Final commercial structure remains pending.

## Offer and service links

| Lifecycle stage | Service reference |
|---|---|
| Stage 6 — Diagnostic | [`Business Reality Diagnostic`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#business-reality-diagnostic) |
| Stage 11 — Intervention | [`Level 1-to-Level 2 Stability Intervention`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#level-1-to-level-2-stability-intervention) |
| Stage 11 — Execution work | [`Optional Execution Services`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#optional-execution-services) — separately scoped |
| Stage 13–14 — Completion | [`Completion Standard`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#completion-standard) · [`Continuation Offers`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#continuation-offers) |

## 1. Purpose

The THP SMB Client Engagement Lifecycle establishes:

* How a prospective business enters THP.
* When THP begins evaluating the business.
* When acceptance occurs.
* When diagnostic and intervention work begins.
* When payment is required.
* What responsibilities belong to THP and the founder.
* What documents and evidence are produced.
* How consent and client information are handled.
* When an engagement may be paused, referred, continued, completed, or terminated.

The lifecycle prevents THP from treating every conversation as an informal consulting engagement.

---

## 2. Lifecycle Principle

The lifecycle follows this sequence:

> Discover → Apply → Qualify → Diagnose → Decide → Contract → Intervene → Reassess → Conclude

Each stage has a distinct purpose.

A business does not automatically move forward because it completed the previous form or meeting.

Every transition requires an explicit gate.

---

## 3. Lifecycle Stages

## Stage 1 — Discovery

### Purpose

Allow a business owner to recognize themselves in the problem THP addresses and understand whether THP may be relevant.

Discovery may occur through:

* YouTube.
* Social content.
* Referral.
* Direct outreach.
* Event.
* Partner organization.
* Existing THP relationship.
* Tipper-related activity.
* Founder network.

### THP Actions

THP should:

* Explain the Level 1-to-Level 2 problem clearly.
* Explain what THP does and does not do.
* Provide the application route.
* Avoid diagnosing the business publicly or casually.
* Avoid promising acceptance.
* Avoid giving away a full intervention during discovery.

### Business Actions

The owner decides whether the problem described by THP resembles their situation.

### Documents Produced

* Discovery page or explanation.
* Initial service boundary.
* Link to the Engagement Readiness Application.

### Decision Owner

The prospective client decides whether to apply.

### Payment Boundary

No payment is required merely to encounter THP or review public information.

### Exit Conditions

The business either:

* Applies.
* Does not apply.
* Returns later.
* Is routed to another public resource.

---

## Stage 2 — Engagement Readiness Application

### Purpose

Collect preliminary self-reported information about the business and founder.

The application helps THP decide whether a qualification review is worthwhile.

It does not determine final acceptance.

### THP Actions

THP should:

* Provide the application.
* Explain how the information will be used.
* State that answers remain self-reported until reviewed.
* Request only information necessary for routing and qualification.
* Avoid requesting sensitive client data that is not yet necessary.

### Business Actions

The founder provides:

* Business identity.
* Core offer.
* Operating history.
* Customer activity.
* Current challenges.
* Previous attempts.
* Expected outcomes.
* Available evidence.
* Participation capacity.
* Immediate legal, financial, technical, or ownership concerns.

### Documents Produced

* Completed Engagement Readiness Application.
* Application routing result.

### Possible Routing Results

* `ready_for_qualification_review`
* `missing_application_information`
* `likely_too_early`
* `likely_outside_current_scope`
* `readiness_concern_identified`

### Decision Owner

THP owns the routing decision.

### Payment Boundary

The working default is that the application is unpaid.

This remains subject to commercial design.

### Exit Conditions

The application is:

* Accepted for qualification review.
* Returned for missing information.
* Deferred.
* Declined.
* Referred elsewhere.

---

## Stage 3 — Application Review

### Purpose

Determine whether the application contains enough information to justify a qualification conversation or evidence request.

### THP Actions

THP should:

* Review the business-existence claims.
* Review apparent first-onboarder fit.
* Review expectations.
* Identify missing information.
* Identify obvious scope or readiness concerns.
* Determine whether qualification should continue.

### Business Actions

The founder may be asked to:

* Clarify an answer.
* Supply a missing example.
* Confirm current operating status.
* Identify available evidence.
* Explain an immediate blocking condition.

### Documents Produced

* Application review note.
* Preliminary concern list.
* Qualification invitation, preparation request, deferral, or decline notice.

### Decision Owner

THP.

### Payment Boundary

No intervention payment begins here.

Whether qualification review later becomes paid remains a commercial decision.

### Exit Conditions

The business is:

* Invited to qualification.
* Asked to complete missing application information.
* Classified as likely too early.
* Routed outside current scope.
* Declined because of a critical readiness concern.

---

## Stage 4 — First-Onboarder Qualification

### Purpose

Determine whether THP should accept the business into the full Level 1 diagnostic.

Qualification establishes:

* Whether the business meets the Level 1 entry gate.
* Whether it matches the first-onboarder profile.
* Whether the founder can participate productively.
* Whether minimum evidence exists.
* Whether another crisis or specialist need blocks THP’s work.

### THP Actions

THP should:

* Conduct the qualification interview.
* Review minimum evidence.
* Assign evidence statuses.
* Assess founder readiness.
* Review scope and referral conditions.
* Record the final decision.

### Business Actions

The founder should:

* Participate honestly.
* Provide basic evidence.
* Clarify contradictions.
* Confirm expectations.
* Confirm participation capacity.
* Disclose blocking conditions.

### Documents Produced

* Qualification Record.
* Evidence-status summary.
* Qualification decision.
* Preparation assignment, where relevant.
* Referral or reconsideration conditions, where relevant.

### Qualification Outcomes

* `qualified`
* `conditionally_qualified`
* `too_early`
* `outside_current_scope`
* `not_ready_for_thp`

### Decision Owner

THP owns the qualification decision.

The founder may challenge factual errors, but acceptance remains THP’s decision.

### Payment Boundary

The commercial model may later choose one of three structures:

1. Free qualification.
2. Paid qualification credited toward diagnosis.
3. Qualification included inside a paid diagnostic.

No final choice is made in this lifecycle document.

### Exit Conditions

Only `qualified` businesses proceed directly.

`Conditionally_qualified` businesses proceed after completing a preparation assignment.

The remaining outcomes exit or pause the lifecycle.

---

## Stage 5 — Diagnostic Preparation

### Purpose

Prepare the records, access, consent, and founder availability required for a useful diagnostic.

### THP Actions

THP should:

* Issue the diagnostic evidence request.
* Identify required records.
* Clarify privacy and redaction expectations.
* Schedule interviews or evidence reviews.
* Establish the diagnostic boundary.
* Confirm who may participate.

### Business Actions

The founder should:

* Gather requested evidence.
* Organize customer, transaction, communication, and operational records.
* Provide appropriate access.
* Remove or redact unnecessary personal information.
* Confirm team participation.
* Avoid major uncoordinated business changes before baseline review.

### Documents Produced

* Diagnostic Preparation Checklist.
* Evidence Request.
* Access and consent record.
* Diagnostic scope.
* Initial scheduling plan.

### Decision Owner

THP determines whether preparation is sufficient.

### Payment Boundary

The diagnostic should not begin until its commercial terms are accepted.

The exact point of payment will be finalized in the service structure.

Recommended default:

> Diagnostic payment is confirmed before intensive evidence review or formal diagnostic interviews begin.

### Exit Conditions

The business is:

* Ready for diagnosis.
* Missing recoverable evidence.
* Paused.
* Returned to conditional qualification.
* Referred or terminated if a new blocking condition appears.

---

## Stage 6 — Level 1 Diagnostic

**Offer:** [`Business Reality Diagnostic`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#business-reality-diagnostic) — paid, fixed-scope; purchasable without intervention commitment.

### Purpose

Determine what is happening inside the business and identify the conditions preventing Level 2.

The diagnostic assesses dimensions A–H:

* Demand.
* Customer understanding.
* Retention and community.
* Financial stability.
* Operations.
* Founder dependency.
* Evidence and decision-making.
* Identity and market position.

### THP Actions

THP should:

* Review evidence.
* Interview the founder and relevant participants.
* Identify supported, contradicted, and uncertain findings.
* Determine the overall maturity condition.
* Identify Level 2 gates already present.
* Identify missing Level 2 gates.
* Identify the suspected primary constraint.
* Identify immediate risks.
* Record what THP should not do yet.

### Business Actions

The founder should:

* Participate in interviews.
* Explain business context.
* Provide missing evidence.
* Correct factual errors.
* Avoid attempting to influence the conclusion through unsupported claims.
* Continue normal operations unless a serious risk requires immediate action.

### Documents Produced

* Diagnostic Findings Record.
* Dimension findings.
* Evidence-status summary.
* Level 1 classification.
* Level 2 gap assessment.
* Primary and secondary constraint hypothesis.
* Immediate-risk register.
* Initial intervention recommendation.

### Decision Owner

THP owns the diagnostic interpretation.

The founder owns business decisions arising from it.

### Payment Boundary

The diagnostic is a professional service and should normally be paid.

The diagnostic fee may later be:

* Standalone.
* Credited toward intervention.
* Included in a larger engagement.

### Exit Conditions

The diagnostic is complete when:

* Findings are documented.
* Evidence and uncertainty are visible.
* The primary constraint is sufficiently defined for presentation.
* Immediate risks are recorded.
* THP can make an engagement recommendation.

---

## Stage 7 — Findings Presentation

### Purpose

Present the diagnostic truthfully and determine whether the founder is willing to proceed under the identified conditions.

### THP Actions

THP should present:

* What is supported.
* What remains uncertain.
* Where founder assumptions conflict with evidence.
* The Level 1 condition.
* Existing Level 2 strengths.
* Missing Level 2 gates.
* The suspected primary constraint.
* Immediate risks.
* Recommended intervention direction.
* What THP should not do yet.
* Whether THP recommends proceeding.

### Business Actions

The founder should:

* Review the findings.
* Correct factual mistakes.
* Identify missing context.
* Decide whether they accept the intervention premise.
* Decide whether they are willing to perform the required work.
* Disclose any new constraint.

### Documents Produced

* Findings Presentation.
* Founder Response Record.
* Corrected Diagnostic Record, where factual corrections are justified.
* Engagement recommendation.

### Possible Recommendations

* Proceed to intervention proposal.
* Proceed only after a preparation condition.
* Conduct limited additional diagnosis.
* Refer to another specialist.
* Pause.
* End the process.

### Decision Owner

THP decides whether it is professionally willing to offer an intervention.

The founder decides whether to pursue it.

Both must agree for the engagement to continue.

### Payment Boundary

The diagnostic payment covers the findings presentation unless later commercial design states otherwise.

### Exit Conditions

The parties either:

* Proceed to commercial engagement.
* Request limited clarification.
* Pause.
* Refer.
* End the relationship.

---

## Stage 8 — Engagement Decision

### Purpose

Convert the findings into a defined intervention boundary.

This stage determines:

* What THP will address.
* What THP will not address.
* The intended Level 2 gates.
* Founder and THP responsibilities.
* Required execution services.
* Evidence and review expectations.

### THP Actions

THP should:

* Define the intervention objective.
* Select the initial intervention phases.
* Identify the primary constraint.
* Identify included and excluded work.
* Estimate resources.
* Define required client participation.
* Identify specialist or partner dependencies.
* Determine whether THP should proceed.

### Business Actions

The founder should:

* Confirm priorities.
* Confirm available participation.
* Confirm business constraints.
* Confirm decision authority.
* Accept or reject the proposed boundary.

### Documents Produced

* Engagement Decision Record.
* Intervention Scope Draft.
* Responsibility Summary.
* Required dependency list.

### Decision Owner

Mutual decision.

THP cannot be compelled to offer the engagement.

The founder cannot be compelled to purchase it.

### Payment Boundary

No intervention work begins until a formal agreement and payment condition are completed.

### Exit Conditions

The engagement is:

* Approved for proposal.
* Revised.
* Deferred.
* Declined.
* Referred.

---

## Stage 9 — Proposal, Agreement, Consent, and Payment

### Purpose

Create the formal commercial and information boundary for the intervention.

### THP Actions

THP should provide:

* Scope.
* Deliverables or institutional outputs.
* Responsibilities.
* Exclusions.
* Payment terms.
* Timing assumptions.
* Pause and termination conditions.
* Privacy and data terms.
* Research and publication consent choices.
* Ownership and usage rules.
* Communication expectations.

### Business Actions

The founder should:

* Review the proposal.
* Confirm authority to engage THP.
* Review privacy and evidence usage.
* Select or reject optional research and case-study consent.
* Sign the agreement.
* Complete required payment.

### Documents Produced

* Proposal.
* Engagement Agreement.
* Scope of Work.
* Privacy and Data Notice.
* Research Consent.
* Case-Study or Publication Consent, where applicable.
* Payment confirmation.
* Client contact and authority record.

### Decision Owner

Mutual agreement.

### Payment Boundary

The intervention begins only after:

* Agreement acceptance.
* Required consent.
* Initial payment or approved payment arrangement.
* Confirmation of required client authority.

### Consent Separation

The client must be able to distinguish between:

1. Evidence required to perform the service.
2. Internal THP learning.
3. Anonymized institutional research.
4. Public case-study use.
5. Content or media use.
6. Tipper-related data use.

Consent for the paid service must not automatically grant public publishing rights.

### Exit Conditions

The engagement becomes:

* Contracted and ready for kickoff.
* Under revision.
* Declined.
* Expired.
* Paused pending payment or authority.

---

## Stage 10 — Intervention Kickoff

### Purpose

Establish the working relationship, baseline, communication rhythm, and first intervention phase.

### THP Actions

THP should:

* Review the agreed scope.
* Confirm the intervention doctrine.
* Confirm the primary constraint.
* Confirm roles and decision owners.
* Establish communication channels.
* Confirm evidence storage.
* Confirm review rhythm.
* Confirm pause and escalation rules.
* Record the starting baseline.
* Open the intervention record.

### Business Actions

The founder should:

* Confirm participation.
* Introduce required team members.
* Confirm authority and responsibilities.
* Provide agreed access.
* Confirm current business conditions.
* Disclose material changes since diagnosis.
* Stop uncoordinated work that would invalidate the baseline.

### Documents Produced

* Kickoff Record.
* Baseline Record.
* Responsibility Map.
* Communication Protocol.
* Evidence Repository.
* Intervention Schedule.
* Initial phase plan.

### Decision Owner

THP owns process facilitation.

The founder owns business decisions and implementation commitments.

### Payment Boundary

Intervention work may begin only after the agreed initial payment condition is satisfied.

### Exit Conditions

The intervention is:

* Active.
* Delayed by missing access or evidence.
* Revised because circumstances changed.
* Paused.
* Terminated if the original engagement is no longer valid.

---

## Stage 11 — Intervention Execution

**Offer:** [`Level 1-to-Level 2 Stability Intervention`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#level-1-to-level-2-stability-intervention). Optional execution work follows [`Optional Execution Services`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#optional-execution-services) — separately scoped, not the intervention itself.

### Purpose

Perform the eight-phase Level 1-to-Level 2 intervention.

The working phase order is:

1. Business Reality.
2. Evidence Recovery.
3. Viable Core.
4. Constraint Diagnosis.
5. Identity Clarification.
6. Relationship Foundation.
7. Operating Foundation.
8. Level 2 Proof.

### THP Actions

THP should:

* Facilitate each phase.
* Review evidence.
* Produce recommendations.
* Record decisions.
* Provide or coordinate approved execution services.
* Monitor risks.
* Protect the viable core.
* Prevent unrelated work from overtaking the intervention.
* Record institutional learning separately from client delivery.

### Business Actions

The founder should:

* Attend required sessions.
* Provide evidence.
* Make decisions.
* Implement assigned actions.
* Participate in customer learning.
* Follow agreed capacity and quality boundaries.
* Report deviations and failures.
* Avoid concealed or uncoordinated changes.

### Documents Produced

Depending on the engagement:

* Current-business map.
* Evidence inventory.
* Viable-core definition.
* Primary-constraint diagnosis.
* Identity foundation.
* Relationship and feedback system.
* Operating foundation.
* Intervention Decision Records.
* Progress records.
* Risk and deviation records.

### Decision Owner

THP owns recommendations and methodology.

The founder owns final business decisions unless a different contractual authority is explicitly established.

### Payment Boundary

Payment follows the future commercial structure, potentially through:

* Upfront engagement fee.
* Phase payments.
* Monthly retainer.
* Hybrid diagnostic plus implementation structure.
* Separate execution-service fees.

No pricing structure is selected in this document.

### Exit Conditions

Execution continues until:

* A phase gate is completed.
* The intervention requires redesign.
* A review triggers continuation, pause, referral, or termination.
* The Level 2 Proof phase begins.

---

## Stage 12 — Progress Review

### Purpose

Determine whether the intervention is producing evidence of improved stability and whether the scope remains valid.

### Review Questions

* Is the primary constraint still the correct priority?
* Is the viable core being protected?
* Are founder responsibilities being completed?
* Are THP responsibilities being completed?
* Has new evidence changed the diagnosis?
* Are execution services producing the intended behavior?
* Are new risks emerging?
* Should the engagement continue as designed?

### THP Actions

THP should:

* Review evidence.
* Compare progress with baseline.
* Review Decision Records.
* Identify deviations.
* Update the constraint hypothesis where necessary.
* Recommend continuation, adjustment, pause, referral, or return to an earlier phase.

### Business Actions

The founder should:

* Provide implementation evidence.
* Explain deviations.
* Review customer and operational effects.
* Confirm whether commitments remain realistic.
* Make continuation decisions.

### Documents Produced

* Progress Review Record.
* Updated risk register.
* Scope change, where necessary.
* Revised actions.
* Payment or schedule adjustment, where contractually relevant.

### Decision Owner

Mutual for scope and commercial changes.

THP for methodological recommendations.

Founder for business implementation decisions.

### Exit Conditions

The intervention:

* Continues.
* Changes priority.
* Returns to an earlier phase.
* Expands through a formal scope change.
* Pauses.
* Refers.
* Terminates.
* Advances to Level 2 reassessment.

---

## Stage 13 — Level 2 Reassessment

**Completion evidence:** [`Completion Standard`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#completion-standard) · [`THP-SMB-PROOF-001`](../smb-proof/THP-SMB-PROOF-001-case-study-and-proof-system.md)

### Purpose

Determine whether the business has established the Level 2 operating foundation.

### THP Actions

THP should reassess:

* Demand clarity.
* Customer clarity.
* Retention and community evidence.
* Financial visibility.
* Operational consistency.
* Reduced founder reactivity.
* Evidence and learning.
* Identity clarity.

THP should compare:

* Starting baseline.
* Current evidence.
* Completed business cycles.
* Remaining weaknesses.
* Sustainability of new routines.
* Founder participation.
* Customer and community behavior.

### Business Actions

The founder should:

* Provide current evidence.
* Explain exceptions.
* Confirm which systems are actually in use.
* Review the findings.
* Decide the next strategic direction.

### Documents Produced

* Level 2 Reassessment.
* Gate-by-gate evidence record.
* Baseline comparison.
* Remaining-risk register.
* Completion recommendation.
* Candidate case-study evidence.
* Institutional Learning Record.

### Possible Outcomes

* `level_2_confirmed`
* `level_2_partially_established`
* `return_to_earlier_phase`
* `continued_stability_work_required`
* `referred_or_paused`
* `intervention_terminated`

### Decision Owner

THP owns the maturity conclusion.

The founder owns the decision about continued engagement or next-stage action.

### Payment Boundary

Any continued work after the original scope requires:

* Existing agreement coverage, or
* A formal continuation or new scope.

### Exit Conditions

The intervention moves to completion, continuation, referral, pause, or termination.

---

## Stage 14 — Completion and Handoff

**Continuation options:** [`Stability Stewardship`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#continuation-offers) · [`Level 3 Growth Experiment Support`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md#continuation-offers) (Level 2 confirmed only)

### Purpose

Close the engagement responsibly and preserve the business’s ability to continue operating without indefinite THP dependence.

### THP Actions

THP should:

* Present the final conclusion.
* Deliver the agreed records and systems.
* Explain remaining risks.
* Clarify what the business should continue.
* Clarify what the business should not attempt yet.
* Archive the engagement evidence.
* Separate client records from institutional learning.
* Confirm any future support arrangement.
* Request separate case-study or publication consent where relevant.

### Business Actions

The founder should:

* Review the conclusion.
* Accept custody of client-owned materials.
* Confirm remaining responsibilities.
* Decide whether to consolidate, continue, or prepare for Level 3.
* Confirm whether optional future contact is permitted.

### Documents Produced

* Completion Record.
* Final Intervention Summary.
* Level 2 conclusion.
* Remaining-risk register.
* Business continuation plan.
* Client handoff package.
* Institutional Learning Record.
* Separate publication or case-study decision.

### Completion Outcomes

#### Level 2 Confirmed

The business enters a consolidation period or prepares for Level 3.

#### Partial Level 2 Completion

The founder may:

* Continue with THP.
* Continue independently.
* Seek specialist support.
* Pause and reassess later.

#### Referral

The business exits THP temporarily or permanently to address another condition.

#### Termination

The engagement ends without normal completion.

### Decision Owner

THP owns its professional conclusion.

The founder owns the business’s next action.

### Payment Boundary

All final obligations should be resolved according to the engagement agreement.

### Exit Conditions

The engagement is formally closed or moved into a separately agreed continuation.

---

## 4. Lifecycle Statuses

Each business should have one current lifecycle status.

Recommended statuses:

* `discovered`
* `application_started`
* `application_submitted`
* `application_under_review`
* `qualification_invited`
* `qualification_active`
* `conditionally_qualified`
* `qualified`
* `too_early`
* `outside_current_scope`
* `not_ready_for_thp`
* `diagnostic_preparation`
* `diagnostic_active`
* `findings_ready`
* `findings_presented`
* `engagement_proposed`
* `agreement_pending`
* `payment_pending`
* `intervention_ready`
* `intervention_active`
* `intervention_paused`
* `referred`
* `reassessment_active`
* `completed_level_2`
* `completed_partial`
* `terminated`
* `withdrawn`

The lifecycle status must not replace maturity level.

A business may be:

> Lifecycle status: `diagnostic_active`
> Maturity classification: Level 1

These are separate dimensions.

---

## 5. Decision Authority

## THP controls

THP controls:

* Qualification.
* Professional acceptance.
* Diagnostic interpretation.
* Methodology.
* Recommendations.
* Maturity conclusions.
* Whether THP can responsibly continue.
* Referral and termination recommendations.

## Founder controls

The founder controls:

* Whether to apply.
* Whether to provide evidence.
* Whether to accept findings.
* Business decisions.
* Implementation decisions.
* Commercial acceptance.
* Whether to continue the business.
* Optional research and publication consent.

## Mutual decisions

Mutual agreement is required for:

* Commercial engagement.
* Intervention scope.
* Scope changes.
* Continuation after the initial engagement.
* Optional case-study or public use.
* Optional data use beyond service delivery.

---

## 6. Responsibility Boundary

THP is responsible for:

* Process integrity.
* Evidence-based interpretation.
* Clear recommendations.
* Agreed deliverables.
* Professional boundaries.
* Privacy and consent compliance.
* Honest reporting.
* Recording uncertainty.

The client is responsible for:

* Accurate disclosure.
* Evidence access.
* Business decisions.
* Implementation.
* Legal and financial authority.
* Team participation.
* Meeting agreed obligations.
* Disclosing material changes.

THP does not become the legal operator, owner, employer, accountant, lawyer, or guarantor of the client’s business.

---

## 7. Payment Architecture Boundary

The lifecycle establishes when payment may occur but does not set final prices.

The commercial design must later decide:

* Whether qualification is free.
* Whether the diagnostic is paid separately.
* Whether diagnostic fees are credited toward intervention.
* Whether intervention is fixed-fee, phase-based, retainer-based, or hybrid.
* Which execution services are included.
* How scope changes are priced.
* What happens on pause or termination.
* Whether reassessment is included.
* Whether post-completion support is separate.

Working recommendation:

> Public discovery and application remain free.
> Formal diagnosis is paid.
> Intervention begins only after agreement and initial payment.
> Execution services beyond the core scope are priced separately or explicitly included.

---

## 8. Privacy and Consent Boundary

THP should use separate permissions for separate purposes.

## Service permission

Allows THP to access information required to perform the engagement.

## Internal learning permission

Allows THP to improve its methodology using restricted internal observations.

## Anonymized research permission

Allows patterns to be used without identifying the client.

## Case-study permission

Allows a structured account of the engagement to be developed.

## Public content permission

Allows the business name, founder, quotes, visuals, or outcomes to be used publicly.

## Tipper data permission

Allows specific information to be entered, processed, or studied through Tipper.

No optional permission should be assumed because the client purchased the service.

---

## 9. Handoff Rule

Every stage transition should record:

* Previous stage.
* Gate completed.
* Evidence reviewed.
* Decision.
* Decision owner.
* Next stage.
* Required client action.
* Required THP action.
* Required document.
* Payment or consent condition.
* Deadline or review trigger, where relevant.

No stage should end only through an informal message such as:

> “Let us move forward.”

The transition should be visible and traceable.

---

## 10. Pause, Withdrawal, and Termination

## Pause

Use when the engagement may reasonably resume.

Examples:

* Temporary founder unavailability.
* Missing evidence.
* External crisis.
* Payment delay.
* Operational interruption.
* Specialist dependency.

## Withdrawal

Use when the client chooses to stop without misconduct.

The agreement should later define:

* Outstanding payments.
* Work already completed.
* Handoff obligations.
* Data retention.
* Reapplication conditions.

## Termination

Use when THP ends the relationship because continuation is irresponsible or the engagement conditions have been breached.

Examples:

* Misrepresentation.
* Repeated evidence refusal.
* Illegal or unsafe use.
* Harassment or abuse.
* Persistent non-payment.
* Repeated violation of agreed boundaries.
* Demand for unsupported guarantees.

---

## 11. Client-Facing Lifecycle Summary

A simplified client-facing explanation may be:

> First, you apply and tell us what is happening in your business.
> We review whether your business fits the type of work THP currently performs.
> If it qualifies, we examine the business and present what the evidence shows.
> We then decide together whether a THP intervention is appropriate.
> If we proceed, we agree on the scope, responsibilities, information use, and payment.
> During the intervention, we clarify the business’s viable core, primary constraint, identity, customer relationships, and operating foundation.
> We finish by reassessing whether the business has established the conditions required for Level 2 stability.

This explanation should not promise that every applicant will be accepted or that every client will reach Level 2.

---

## 12. Deferred Design

The following remain downstream:

* Exact prices.
* Contract language.
* Tax and invoicing process.
* Refund and cancellation terms.
* Phase durations.
* Meeting cadence.
* Client portal.
* CRM implementation.
* Automated lifecycle tracking.
* Final consent language.
* Data retention schedule.
* Country-specific legal compliance.
* Detailed diagnostic worksheets.
* Level 3 continuation offer.

---

## Revision History

### 1.0.1 — 2026-07-21

- Linked paid diagnostic, stability intervention, optional execution, completion, and continuation to [`THP-SMB-SERVICE-001`](../smb-service/THP-SMB-SERVICE-001-offer-architecture.md).
- Payment boundary aligned with working commercial defaults.

### 1.0.0 — 2026-07-21

- Complete lifecycle installed from founder source (`READ_FROM.md`).
- Fourteen stages; lifecycle statuses namespace defined (§4).
- Payment and consent boundaries recorded; commercial and legal validation pending.
