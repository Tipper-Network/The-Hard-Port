---
id: CIS-L06
title: Metrics Dictionary
system: Consulting Intelligence System
version: 0.3.0
status: draft
owner: The Hard Port
last_updated: 2026-07-18
depends_on:
  - CIS-L00
  - CIS-L02
  - CIS-L04
  - CIS-L05
used_by:
  - CIS-L07
  - CIS-L08
  - CIS-L09
---

# Metrics Dictionary

## Purpose

Give every measurement one stable definition, formula, decision use, and system context.

A metric is admitted only when it informs a decision, tests a hypothesis, describes a relevant state, or protects against unintended harm.

## Measurement Principles

1. Establish the decision before selecting the metric.
2. Preserve raw observations separately from derived metrics.
3. Record numerator, denominator, unit, grain, window, source, and exclusions.
4. Use leading, lagging, and guardrail metrics together.
5. Never treat a proxy as the underlying construct.
6. Segment before concluding; totals can hide opposing behavior.
7. A changed metric does not prove the intervention caused the change.
8. Retire metrics that no longer affect decisions.

## Metric Types

- **Direct:** Counts or measures an observable event or property.
- **Derived:** Calculated from two or more values.
- **Proxy:** Indirectly represents a construct that cannot be observed directly.
- **Composite:** Combines multiple normalized metrics.
- **Leading:** Changes before the target outcome is expected.
- **Lagging:** Records the target outcome after system delays.
- **Guardrail:** Detects unacceptable side effects.

## Standard Metric Record

```yaml
metric_id: METRIC-EXAMPLE
name: Example Metric
definition: One unambiguous sentence.
type: derived
formula: numerator / denominator * 100
unit: percentage
grain: decision
window: rolling-30-days
cadence: weekly
source: named-system-or-observation
related_objects:
  - OBJ-EXAMPLE
related_stock: named-stock
related_flow: named-inflow-or-outflow
affected_decisions:
  - named-decision
limitations:
  - known-interpretation-risk
```

## Leadership Metrics

### METRIC-DECISION-DEPENDENCY — Decision Dependency

- **Definition:** Percentage of sampled business decisions that require owner action or approval before completion.
- **Why it matters:** Reveals functional reliance on the owner.
- **Formula:** Owner-required sampled decisions ÷ all sampled decisions × 100.
- **Unit / cadence:** Percentage; weekly during assessment, monthly afterward.
- **Related stock / flow:** Owner dependency / decisions routed to owner.
- **Affected decisions:** Delegation boundaries, role design, knowledge access.
- **Limitations:** Samples must include normal decisions and exceptions; high-impact strategic decisions should be segmented.

### METRIC-DECISION-DISTRIBUTION — Decision Distribution

- **Definition:** Share of completed decisions by role or authority level.
- **Why it matters:** Shows where decision activity actually sits.
- **Formula:** Decisions completed by role ÷ all sampled decisions × 100.
- **Unit / cadence:** Percentage by role; monthly.
- **Related stock / flow:** Distributed capability / decisions completed outside owner.
- **Affected decisions:** Authority allocation, coaching, escalation design.
- **Limitations:** More distributed is not always better; compare against defined decision rights and error rates.

### METRIC-OWNER-OPERATIONAL-HOURS — Owner Operational Hours

- **Definition:** Owner time spent delivering, administering, correcting, or approving routine work.
- **Why it matters:** Distinguishes operating load from leadership and chosen specialist work.
- **Formula:** Sum of classified owner operational time in the measurement window.
- **Unit / cadence:** Hours per week.
- **Related stock / flow:** Owner capacity / operational demand placed on owner.
- **Affected decisions:** Delegation, process repair, role allocation.
- **Limitations:** Self-tracking is vulnerable to missing interruptions and classification drift.

### METRIC-DELEGATION-COMPLETION — Delegation Completion

- **Definition:** Percentage of delegated outcomes completed within agreed boundaries without the owner taking the work back.
- **Why it matters:** Measures transfer of responsibility rather than assignment of tasks.
- **Formula:** Delegated outcomes completed without owner takeover ÷ delegated outcomes due × 100.
- **Unit / cadence:** Percentage; monthly.
- **Related stock / flow:** Team capability / independently completed delegated outcomes.
- **Affected decisions:** Scope progression, coaching, decision boundary changes.
- **Limitations:** Easy tasks can inflate the rate; segment by difficulty and consequence.

### METRIC-DECISION-REVERSAL-RATE — Decision Reversal Rate

- **Definition:** Percentage of delegated decisions subsequently reversed by the owner or higher authority.
- **Why it matters:** Frequent reversal can reveal unclear boundaries, weak information, low capability, or unsafe culture.
- **Formula:** Reversed delegated decisions ÷ reviewed delegated decisions × 100.
- **Unit / cadence:** Percentage; monthly.
- **Related stock / flow:** Decision confidence / decisions removed from delegated authority.
- **Affected decisions:** Coaching, authority design, information access.
- **Limitations:** A justified reversal is not automatically failure; code the reason.

## Operations Metrics

### METRIC-PROCESS-COVERAGE — Critical Process Coverage

- **Definition:** Percentage of identified critical processes with a usable owner, trigger, steps, controls, exceptions, and outcome.
- **Why it matters:** Indicates whether critical work can be understood and transferred.
- **Formula:** Critical processes meeting the usability standard ÷ all identified critical processes × 100.
- **Unit / cadence:** Percentage; quarterly or after major change.
- **Related stock / flow:** Operating knowledge / processes brought under explicit control.
- **Affected decisions:** Documentation priority, training, continuity planning.
- **Limitations:** Coverage does not prove adherence or effectiveness.

### METRIC-CYCLE-TIME — Cycle Time

- **Definition:** Elapsed time from a defined work start event to its completion event.
- **Why it matters:** Exposes queues, delays, and customer waiting.
- **Formula:** Completion timestamp minus start timestamp.
- **Unit / cadence:** Time, reported as median and distribution; weekly.
- **Related stock / flow:** Work in progress / completed work.
- **Affected decisions:** Constraint management, staffing, handoff redesign.
- **Limitations:** Averages hide long tails; definitions must remain stable.

### METRIC-ERROR-FREQUENCY — Error Frequency

- **Definition:** Count of defined errors in a period or activity sample.
- **Why it matters:** Locates recurring failure and tests process reliability.
- **Formula:** Count of events matching the error definition.
- **Unit / cadence:** Count per period and count per activity volume; weekly.
- **Related stock / flow:** Unresolved defects / new errors.
- **Affected decisions:** Root-cause analysis, controls, training.
- **Limitations:** Increased reporting can look like declining quality before the underlying rate changes.

### METRIC-REWORK-RATE — Rework Rate

- **Definition:** Percentage of completed work requiring correction or repetition before acceptance.
- **Why it matters:** Reveals hidden capacity consumption and quality failure.
- **Formula:** Work items requiring rework ÷ completed work items × 100.
- **Unit / cadence:** Percentage; weekly.
- **Related stock / flow:** Rework backlog / work returned for correction.
- **Affected decisions:** Process repair, quality controls, capability development.
- **Limitations:** Define acceptance and distinguish customer-requested changes from defects.

### METRIC-RECOVERY-TIME — Recovery Time

- **Definition:** Elapsed time from detection of a defined failure to restoration of the expected operating condition.
- **Why it matters:** Measures resilience, not merely failure prevention.
- **Formula:** Restored-condition timestamp minus detection timestamp.
- **Unit / cadence:** Time per incident; reviewed monthly.
- **Related stock / flow:** Unresolved incidents / incidents restored.
- **Affected decisions:** Escalation, buffers, recovery procedures.
- **Limitations:** “Restored” must include customer and downstream effects, not only internal closure.

## Customer Metrics

### METRIC-REPEAT-RATE — Repeat Customer Rate

- **Definition:** Percentage of eligible customers who make another purchase or use the service again within the defined window.
- **Why it matters:** Provides behavioral evidence of continued choice.
- **Formula:** Eligible customers with a repeat event ÷ eligible customers × 100.
- **Unit / cadence:** Percentage by cohort; monthly.
- **Related stock / flow:** Active customer relationships / customers returning.
- **Affected decisions:** Experience design, retention activity, offer cadence.
- **Limitations:** Eligibility and expected repurchase interval vary by offer.

### METRIC-RETENTION-RATE — Customer Retention Rate

- **Definition:** Percentage of customers active at the start of a period who remain active at its end.
- **Why it matters:** Measures preservation of customer relationships.
- **Formula:** Customers retained from opening cohort ÷ customers in opening cohort × 100.
- **Unit / cadence:** Cohort percentage; monthly or contract period.
- **Related stock / flow:** Active customers / retained customers and churn.
- **Affected decisions:** Recovery, relationship investment, product changes.
- **Limitations:** Define “active” and exclude new customers from the numerator.

### METRIC-REFERRAL-RATE — Customer Referral Rate

- **Definition:** Percentage of active customers who produce at least one attributable referral in the period.
- **Why it matters:** Provides behavioral evidence of advocacy and trust.
- **Formula:** Active customers making a referral ÷ active customers × 100.
- **Unit / cadence:** Percentage; monthly or quarterly.
- **Related stock / flow:** Customer advocacy / referrals produced.
- **Affected decisions:** Trust repair, referral enablement, community strategy.
- **Limitations:** Attribution is incomplete and incentives can reduce referral quality.

### METRIC-COMPLAINT-RATE — Complaint Rate

- **Definition:** Number of defined customer complaints relative to relevant transaction or service volume.
- **Why it matters:** Normalizes complaint count as the business changes size.
- **Formula:** Valid complaints ÷ relevant completed transactions × 100.
- **Unit / cadence:** Complaints per 100 transactions; weekly or monthly.
- **Related stock / flow:** Unresolved customer dissatisfaction / new complaints.
- **Affected decisions:** Quality priorities, expectation setting, recovery.
- **Limitations:** Low complaint rates may reflect inaccessible channels or low trust.

### METRIC-CUSTOMER-RECOVERY-TIME — Customer Recovery Time

- **Definition:** Elapsed time from a customer problem being reported or detected to an agreed resolution.
- **Why it matters:** Recovery behavior strongly affects trust after failure.
- **Formula:** Agreed-resolution timestamp minus report-or-detection timestamp.
- **Unit / cadence:** Time per case, reported as median and distribution; weekly.
- **Related stock / flow:** Unresolved customer problems / resolved problems.
- **Affected decisions:** Service authority, escalation, staffing.
- **Limitations:** Internal closure does not count without customer-visible resolution.

## Community Metrics

### METRIC-PARTICIPATION-RATE — Community Participation Rate

- **Definition:** Percentage of eligible community members who perform a defined meaningful action during the period.
- **Why it matters:** Separates active participation from audience size.
- **Formula:** Unique participating members ÷ eligible members × 100.
- **Unit / cadence:** Percentage; per event or monthly.
- **Related stock / flow:** Active participation / members becoming active.
- **Affected decisions:** Activity design, access, facilitation.
- **Limitations:** The action must create member value; views alone do not qualify.

### METRIC-CONTRIBUTION-RATE — Community Contribution Rate

- **Definition:** Percentage of active members who contribute knowledge, support, content, organization, or another defined resource.
- **Why it matters:** Indicates whether value creation extends beyond the business.
- **Formula:** Unique contributing members ÷ active members × 100.
- **Unit / cadence:** Percentage; monthly.
- **Related stock / flow:** Community-created value / member contributions.
- **Affected decisions:** Contribution roles, recognition, member support.
- **Limitations:** Contribution quality and burden must be reviewed alongside volume.

### METRIC-REPEAT-PARTICIPATION — Repeat Participation Rate

- **Definition:** Percentage of participants who take part again within the expected return window.
- **Why it matters:** Tests whether participation creates enough value to continue.
- **Formula:** Returning participants ÷ participants eligible to return × 100.
- **Unit / cadence:** Cohort percentage; monthly or per event series.
- **Related stock / flow:** Engaged members / participants returning.
- **Affected decisions:** Format, cadence, onboarding, member outcomes.
- **Limitations:** Expected frequency differs by community and activity.

### METRIC-MEMBER-INVITATION-RATE — Member Invitation Rate

- **Definition:** Percentage of active members who invite another eligible person during the period.
- **Why it matters:** Signals advocacy and confidence in the community experience.
- **Formula:** Active members making an invitation ÷ active members × 100.
- **Unit / cadence:** Percentage; monthly.
- **Related stock / flow:** Community advocacy / invitations issued.
- **Affected decisions:** Invitation mechanics, trust, experience repair.
- **Limitations:** Invitations do not prove fit, participation, or value.

### METRIC-MEMBER-CONNECTION-RATE — Member Connection Rate

- **Definition:** Percentage of active members who form at least one meaningful member-to-member connection in the period.
- **Why it matters:** Distinguishes community from centralized broadcasting.
- **Formula:** Active members with a qualifying peer interaction ÷ active members × 100.
- **Unit / cadence:** Percentage; monthly.
- **Related stock / flow:** Member relationships / new meaningful connections.
- **Affected decisions:** Introductions, group structure, facilitation.
- **Limitations:** Requires a behavior-based definition that respects private interactions.

## Partnership Metrics

### METRIC-ACTIVE-PARTNERSHIPS — Active Partnerships

- **Definition:** Count of partnerships with a shared outcome and qualifying joint activity inside the review window.
- **Why it matters:** Prevents inactive contacts from inflating partnership strength.
- **Formula:** Count of partnerships meeting both conditions.
- **Unit / cadence:** Count; monthly or quarterly.
- **Related stock / flow:** Active partner relationships / partnerships activated or lapsed.
- **Affected decisions:** Relationship investment, portfolio focus.
- **Limitations:** Count does not represent value, reciprocity, or concentration risk.

### METRIC-PARTNERSHIP-CONTRIBUTION — Partnership Contribution

- **Definition:** Defined value produced through a partnership during the period.
- **Why it matters:** Connects partnership activity to outcomes.
- **Formula:** Context-specific sum of attributed outcomes, reported by value type rather than forced into one unit.
- **Unit / cadence:** Referrals, revenue, reach, capability, or resources; quarterly.
- **Related stock / flow:** Partnership value / value created.
- **Affected decisions:** Renewal, expansion, resource allocation.
- **Limitations:** Attribution is shared and non-financial value should not be assigned arbitrary money values.

### METRIC-PARTNERSHIP-RECIPROCITY — Partnership Reciprocity

- **Definition:** Balance between agreed contributions delivered by each partner.
- **Why it matters:** Persistent imbalance can weaken trust and continuation.
- **Formula:** Smaller fulfilled contribution ratio ÷ larger fulfilled contribution ratio, bounded from 0 to 1.
- **Unit / cadence:** Ratio; quarterly.
- **Related stock / flow:** Partnership trust / reciprocal commitments completed.
- **Affected decisions:** Expectation reset, scope, renewal.
- **Limitations:** Equal volume is not equal value; partners must define contribution units.

### METRIC-PARTNER-DEPENDENCY — Partner Dependency

- **Definition:** Percentage of a critical outcome supplied by the largest single partner.
- **Why it matters:** Reveals concentration and continuity risk.
- **Formula:** Outcome attributable to largest partner ÷ total partner-attributable outcome × 100.
- **Unit / cadence:** Percentage; quarterly.
- **Related stock / flow:** External dependency / outcome supplied by dominant partner.
- **Affected decisions:** Diversification, continuity planning, relationship protection.
- **Limitations:** High dependency may be rational when switching costs and reliability are understood.

### METRIC-PARTNERSHIP-RENEWAL — Partnership Renewal Rate

- **Definition:** Percentage of partnerships eligible for continuation that renew active commitments.
- **Why it matters:** Provides behavioral evidence of durable mutual value.
- **Formula:** Renewed eligible partnerships ÷ partnerships eligible for renewal × 100.
- **Unit / cadence:** Percentage; quarterly or annually.
- **Related stock / flow:** Active partnerships / renewed and lapsed partnerships.
- **Affected decisions:** Partnership design, review, termination.
- **Limitations:** Automatic continuation without active commitment does not qualify.

## Knowledge-Engine Metrics

These metrics describe the health of The Hard Port's research engine. They measure qualified movement through the engine, not raw activity or popularity.

### METRIC-QUALIFIED-QUESTIONS — Qualified Questions Generated

- **Definition:** Count of new, non-duplicate research questions accepted into the question registry during the period.
- **Why it matters:** Measures whether media, conversations, audits, and consulting expose useful uncertainties.
- **Formula:** Count of distinct `QUESTION-*` records created in the period that pass the qualification gate.
- **Qualification gate:** The question is specific, connected to an ontology object and decision, investigable, and not already answered or duplicated.
- **Unit / cadence:** Count by source; weekly and monthly.
- **Related stock / flow:** Active research agenda / qualified questions entering investigation.
- **Affected decisions:** Research priorities, interview topics, media agenda, audit focus.
- **Limitations:** More questions can indicate poor synthesis; track closure, merging, and age alongside generation.

### METRIC-BUSINESS-CONVERSATIONS — Business Conversations Completed

- **Definition:** Count of substantive conversations with a business stakeholder that produce a complete `CONVERSATION-*` research record.
- **Why it matters:** Measures access to operating reality rather than casual contact volume.
- **Formula:** Count of distinct completed conversation records passing the evidence and context requirements.
- **Completion gate:** Participant role, business context, linked question, claims or observations, reuse boundary, and resulting questions are recorded.
- **Unit / cadence:** Count by participant role, business context, and source; weekly and monthly.
- **Related stock / flow:** Business research access / completed evidence-producing conversations.
- **Affected decisions:** Research agenda, audit recruitment, hypothesis selection.
- **Limitations:** Conversation count does not measure truth or representativeness; repeated participants and businesses must remain identifiable in aggregation.

### METRIC-FRAMEWORK-IMPROVEMENTS — Framework Improvements Accepted

- **Definition:** Count of versioned framework changes accepted because they improve explanatory, diagnostic, intervention, or measurement usefulness.
- **Why it matters:** Measures whether evidence changes The Hard Port's intellectual property.
- **Formula:** Count of distinct `IMPROVEMENT-*` records merged into a canonical framework during the period.
- **Acceptance gate:** The previous state, change, evidence or reasoning, expected improvement, validation method, author, and reviewer are recorded.
- **Unit / cadence:** Count by framework and change reason; monthly and quarterly.
- **Related stock / flow:** Validated intellectual property / accepted framework revisions.
- **Affected decisions:** Framework maintenance, research priorities, training readiness.
- **Limitations:** High change volume may indicate instability; wording corrections and formatting changes do not qualify.

### METRIC-HYPOTHESES-SUPPORTED — Hypotheses Supported

- **Definition:** Count of hypotheses that newly reach supported status from measured evidence during the period.
- **Why it matters:** Measures whether investigation increases justified confidence in useful explanations or predictions.
- **Formula:** Count of distinct `HYP-*` records crossing to evidence level `E3` or higher and confidence `0.60` or higher during the period.
- **Unit / cadence:** Count by domain and evidence level; monthly and quarterly.
- **Related stock / flow:** Supported knowledge / hypotheses crossing the support threshold.
- **Affected decisions:** Framework revision, replication, intervention design, Tipper pattern review.
- **Limitations:** “Supported” is not “confirmed.” Track hypotheses weakened, contested, and retired beside this metric to resist confirmation bias.

### METRIC-NEW-PATTERNS — New Patterns Promoted

- **Definition:** Count of pattern records promoted to a higher evidence status during the period.
- **Why it matters:** Measures whether repeated cases are becoming reusable knowledge.
- **Formula:** Count of distinct `PATTERN-*` records moving from candidate to provisional, provisional to supported, or supported to operational.
- **Unit / cadence:** Count segmented by exact status transition; monthly and quarterly.
- **Related stock / flow:** Reusable patterns / patterns passing an evidence gate.
- **Affected decisions:** Replication studies, framework changes, software opportunities.
- **Limitations:** Never combine status transitions into an apparent quality score; candidate-to-provisional is not equivalent to supported-to-operational.

### METRIC-INBOUND-INTERVIEW-REQUESTS — Inbound Interview Requests

- **Definition:** Count of unique businesses that ask The Hard Port to interview them or include their business in research.
- **Why it matters:** Measures whether media creates voluntary access to business reality.
- **Formula:** Count of unique eligible businesses making at least one inbound interview request during the period.
- **Eligibility gate:** The requester represents or can provide legitimate access to an operating small business and explicitly requests research participation.
- **Unit / cadence:** Unique businesses by source and business context; weekly and monthly.
- **Related stock / flow:** Voluntary research access / businesses entering the research pipeline.
- **Affected decisions:** Interview selection, research sampling, media topics, audit invitations.
- **Limitations:** Requests may overrepresent highly engaged, visible, or problem-aware businesses; duplicate requests do not increase the count.

### METRIC-BUSINESS-AUDITS — Business Audits Completed

- **Definition:** Count of bounded business audits that pass the audit completion gate.
- **Why it matters:** Measures production of structured, comparable evidence across businesses and domains.
- **Formula:** Count of distinct `AUDIT-*` records completed during the period.
- **Completion gate:** Boundary, question, domains, evidence sources, observations, diagnoses, unknowns, maturity profile, and next research action are present.
- **Unit / cadence:** Count by domain, business context, and audit depth; monthly and quarterly.
- **Related stock / flow:** Structured business evidence / completed audits entering the knowledge base.
- **Affected decisions:** Research priorities, framework validation, consulting design, pattern review.
- **Limitations:** A shallow audit and a full-system audit are not equivalent; segment by declared depth and evidence coverage.

### METRIC-RETURNING-COMMENTERS — Returning Commenters

- **Definition:** Count of unique people who make a substantive media comment in the current period and had made at least one substantive comment before the period.
- **Why it matters:** Indicates repeated public participation and a growing pool of people willing to challenge, extend, or contextualize the research.
- **Formula:** Count of unique current-period substantive commenters with at least one qualifying comment before the period start.
- **Companion rate:** Returning commenters ÷ all substantive commenters in the current period × 100.
- **Unit / cadence:** Unique people and percentage by channel; weekly and monthly.
- **Related stock / flow:** Returning research community / participants returning to public inquiry.
- **Affected decisions:** Media formats, follow-up questions, conversation invitations, community research design.
- **Limitations:** Returning commentary is a media and community signal, not proof of understanding; define “substantive” behaviorally and do not reward controversy alone.

### METRIC-USEFUL-DISAGREEMENTS — Useful Disagreements Captured

- **Definition:** Count of distinct disagreements that introduce evidence, a counterexample, a missing condition, or an alternative causal explanation.
- **Why it matters:** Measures whether public conversation makes the research harder to fool.
- **Formula:** Count of distinct disagreement records passing the usefulness gate during the period.
- **Usefulness gate:** The disagreement changes a question, hypothesis boundary, confidence score, evidence plan, or framework review.
- **Unit / cadence:** Count by source and affected research record; weekly and monthly.
- **Related stock / flow:** Contradictory evidence / useful challenges entering investigation.
- **Affected decisions:** Follow-up interviews, confidence updates, framework review, content clarification.
- **Limitations:** Sentiment, hostility, and comment volume do not qualify; multiple comments making the same challenge count once.

### METRIC-BUSINESS-OWNERS-CONTACTED — Business Owners Contacted

- **Definition:** Count of unique small-business owners who receive a research-specific invitation from The Hard Port during the period.
- **Why it matters:** Measures deliberate outbound research access and helps reveal sampling concentration.
- **Formula:** Count of unique eligible owners receiving at least one documented research invitation.
- **Unit / cadence:** Unique owners segmented by business context, research question, and channel; weekly and monthly.
- **Related stock / flow:** Potential research access / owners invited into research.
- **Affected decisions:** Recruitment mix, outreach cadence, underrepresented contexts.
- **Limitations:** Contact is not participation; duplicate outreach does not increase the count and unsolicited mass promotion does not qualify.

### METRIC-INTERVIEWS-COMPLETED — Research Interviews Completed

- **Definition:** Count of completed investigative interviews that produce a valid `CONVERSATION-*` record and research outputs.
- **Why it matters:** Measures structured investigation rather than podcast or meeting volume.
- **Formula:** Count of distinct interview records passing the interview completion gate.
- **Completion gate:** Business context, linked question, substantive claims or observations, reuse boundary, counterexamples, and next research action are recorded.
- **Unit / cadence:** Count by participant role, context, and research question; weekly and monthly.
- **Related stock / flow:** Interview evidence / completed investigations entering the repository.
- **Affected decisions:** Hypothesis review, follow-up observation, framework review, audit selection.
- **Limitations:** Interviews produce reported evidence unless direct observation is separately recorded; repeated interviews with one context can distort apparent breadth.

### METRIC-NEW-OBSERVATIONS — New Observations Recorded

- **Definition:** Count of distinct `OBS-*` records accepted into the evidence repository during the period.
- **Why it matters:** Measures whether research activity produces structured evidence.
- **Formula:** Count of non-duplicate observation records passing the observation-language and source requirements.
- **Unit / cadence:** Count by object, domain, evidence type, and source; weekly and monthly.
- **Related stock / flow:** Structured evidence / accepted observations.
- **Affected decisions:** Question priority, hypothesis generation, diagnosis, framework review.
- **Limitations:** High volume may indicate fragmentation; one event split into multiple records must not inflate the count.

### METRIC-NEW-HYPOTHESES — New Hypotheses Registered

- **Definition:** Count of distinct falsifiable hypotheses accepted into the hypothesis registry during the period.
- **Why it matters:** Measures whether observations are producing explanations that can be challenged and tested.
- **Formula:** Count of new `HYP-*` records passing the hypothesis qualification gate.
- **Qualification gate:** Context, condition, mechanism, expected outcome, supporting evidence, disconfirming evidence, owner, and next test are present.
- **Unit / cadence:** Count by domain, object, and originating source; weekly and monthly.
- **Related stock / flow:** Active hypotheses / qualified explanations entering investigation.
- **Affected decisions:** Research agenda, interviews, audits, intervention tests.
- **Limitations:** More hypotheses can create an unmanaged backlog; track testing, merging, contesting, and retirement.

### METRIC-NEW-VOCABULARY — New Vocabulary Accepted

- **Definition:** Count of new or materially revised canonical terms accepted because they improve distinction, observation, or reasoning.
- **Why it matters:** Measures growth in the language The Hard Port uses to understand businesses.
- **Formula:** Count of distinct vocabulary records added to or materially revised within the canonical ontology or glossary.
- **Acceptance gate:** The term has a definition, boundary, aliases, examples, non-examples, affected records, and evidence that existing language is insufficient.
- **Unit / cadence:** Count by ontology area and change type; monthly and quarterly.
- **Related stock / flow:** Shared research language / accepted distinctions.
- **Affected decisions:** Ontology revisions, interview language, framework clarity, data migration.
- **Limitations:** Naming ordinary ideas does not create useful vocabulary; unnecessary terms increase translation cost and fragmentation.

## Composite Constructs

Composite constructs summarize multiple signals. They must never hide their component values.

### CONSTRUCT-CUSTOMER-LOYALTY — Customer Loyalty

- **Definition:** The strength of repeated customer choice, relationship continuity, and advocacy.
- **Components:** Repeat rate, retention rate, referral rate, recovery behavior, and relevant qualitative evidence.
- **Rule:** Do not publish one index until component normalization and weighting are validated.

### CONSTRUCT-OWNER-DEPENDENCY — Owner Dependency

- **Definition:** The degree to which business outcomes rely on the owner's continuous operational presence.
- **Components:** Decision dependency, owner operational hours, process coverage, owner-only critical work, and outcomes during absence.
- **Rule:** Segment chosen specialist work from work retained because the system cannot perform it.

### CONSTRUCT-COMMUNITY-STRENGTH — Community Strength

- **Definition:** The capacity of a community to sustain useful participation and member relationships.
- **Components:** Participation, contribution, repeat participation, invitations, and member connections.
- **Rule:** Membership or follower count is context only, not evidence of strength.

### CONSTRUCT-OPERATIONAL-INDEPENDENCE — Operational Independence

- **Definition:** The ability of routine operations to maintain outcomes without a specific individual.
- **Components:** Process coverage, decision distribution, cycle time stability, error rate, and absence performance.
- **Rule:** Independence requires demonstrated behavior under absence or transfer, not documentation alone.

## Data Quality Rules

- Store the exact metric version with every measurement.
- Never compare values produced by materially different formulas.
- Record missing data; do not silently replace it with zero.
- Preserve source timestamps and collection windows.
- Identify manual edits and exclusions.
- Segment when composition changes could explain movement.
- Record known incentives that may encourage gaming.
- Every dashboard value must link back to its definition.

## Open Questions

- Which metrics are mandatory in every baseline?
- How should small samples display uncertainty?
- Which component weights, if any, produce useful composite indices?
- What data can small businesses collect without creating disproportionate burden?
- Which metrics need industry-specific definitions?

## Revision Log

### 0.3.0 — 2026-07-18

- Added six public-research metrics for useful disagreements, owner outreach, interviews, observations, hypotheses, and vocabulary.
- Defined qualification gates to prevent activity volume from masquerading as research progress.

### 0.2.0 — 2026-07-18

- Added eight knowledge-engine metrics covering research questions, conversations, framework improvements, hypothesis support, pattern promotion, inbound interview requests, audits, and returning commenters.
- Defined “Hypotheses Supported” instead of claiming hypotheses are confirmed.

### 0.1.0 — 2026-07-18

- Defined twenty-five leadership, operations, customer, community, and partnership metrics.
- Separated direct metrics from four unvalidated composite constructs.
