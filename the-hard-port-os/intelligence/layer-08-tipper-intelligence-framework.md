---
id: CIS-L08
title: Tipper Intelligence Framework
system: Consulting Intelligence System
version: 0.2.0
status: draft
owner: The Hard Port
last_updated: 2026-07-18
depends_on:
  - CIS-L00
  - CIS-L02
  - CIS-L03
  - CIS-L04
  - CIS-L05
  - CIS-L06
  - CIS-L07
used_by:
  - CIS-L09
---

# Tipper Intelligence Framework

## Purpose

Define how repeated consulting evidence may become a recommendation, workflow, or capability in Tipper.

Tipper must not automate The Hard Port's guesses. Software opportunities emerge only after human observation, diagnosis, intervention, and measurement expose a repeatable pattern.

## Scope

Version 0.1 defines:

- Pattern records
- Evidence and confidence progression
- Promotion rules
- Software opportunity records
- Required data classes
- Initial candidate capability areas
- Human oversight and prohibited automation

It does not define Tipper's product roadmap, interface, technical architecture, or onboarding flow.

## Role in the Knowledge Engine

Tipper is the operationalization stage of [The Hard Port Knowledge Engine](./layer-00-knowledge-engine.md).

Its upstream inputs are:

- Questions generated through media and business conversations
- Observations and diagnoses produced by audits and consulting
- Intervention outcomes
- Versioned frameworks and metrics
- Supported patterns with context and counterexamples

Its downstream responsibilities are:

- Put supported knowledge in front of a business at the moment of decision.
- Ask for missing evidence instead of guessing.
- Support a bounded human action.
- Observe resulting behavior.
- Measure outcomes and guardrails.
- Return evidence that strengthens, weakens, contests, or retires the originating pattern.

Tipper does not merely consume The Hard Port's research. It becomes an observation instrument that expands the research loop without replacing human judgment.

## Intelligence Boundary

The Consulting Intelligence System learns:

- Which conditions recur
- In which business contexts they recur
- Which causal explanations remain plausible
- Which human interventions were attempted
- Which outcomes followed
- Which unintended effects occurred
- How confidence should change

Tipper may later:

- Detect a condition
- Ask for missing evidence
- Surface a relevant pattern
- Recommend a bounded human action
- Support execution
- Measure the result
- Return evidence to the intelligence system

Tipper must not present correlation as diagnosis or recommendation as certainty.

## Pattern Lifecycle

```text
Observation
  ↓
Repeated Condition
  ↓
Pattern Hypothesis
  ↓
Human Intervention
  ↓
Measured Outcome
  ↓
Replication
  ↓
Software Opportunity
  ↓
Monitored Capability
```

## Pattern Record

```yaml
pattern_id: PATTERN-YYYY-NNN
name: Short descriptive name
status: candidate
business_context:
  industries:
    - restaurant
  size:
    employees: 5-20
  operating_model:
    - location-based
observed_condition:
  statement: Low repeat visits and weak local participation appear together.
  diagnostics:
    - DIAG-REDACTED-001
objects:
  - OBJ-CUSTOMER
  - OBJ-COMMUNITY
loops:
  - LOOP-CUSTOMER-RETENTION
  - LOOP-COMMUNITY-PARTICIPATION
metrics:
  - METRIC-REPEAT-RATE
  - METRIC-PARTICIPATION-RATE
causal_hypothesis: Limited recurring participation reduces relationship formation and reasons to return.
human_interventions:
  - INT-REDACTED-001
outcomes:
  - OUTCOME-REDACTED-001
sample:
  businesses: 1
  interventions: 1
counterexamples: []
evidence_level: E1
confidence: 0.25
software_opportunity: null
```

## Pattern Statuses

### Candidate

One or more observations suggest a possible recurring relationship.

### Provisional

The condition has repeated across businesses or periods, but intervention evidence is limited.

### Supported

A defined intervention produced measured outcomes in multiple comparable contexts.

### Operational

The pattern is used in a monitored Tipper capability with explicit eligibility and guardrail rules.

### Contested

Material counterexamples or later evidence weaken the pattern.

### Retired

The pattern is invalid, obsolete, redundant, harmful, or no longer decision-useful.

## Promotion Rules

### Observation to Candidate Pattern

Requires:

- A bounded observed condition
- Linked ontology objects
- At least one diagnostic hypothesis
- Context and evidence source
- Explicit unknowns

### Candidate to Provisional Pattern

Requires:

- Repetition across at least three independent cases or meaningful time periods
- Stable metric definitions
- A plausible causal mechanism
- Recorded counterexamples
- No unresolved privacy or consent issue

The threshold is a starting rule, not statistical proof.

### Provisional to Supported Pattern

Requires:

- At least two measured human interventions
- Baselines and follow-up measures
- Comparable context
- Leading, lagging, and guardrail outcomes
- Material implementation deviations recorded
- Alternative explanations considered
- Confidence of at least `0.60`

### Supported Pattern to Software Opportunity

Requires:

- A repeated decision or action that software can improve
- Required data available at proportionate cost
- A useful recommendation even when confidence is displayed
- Human override and reversal paths
- Defined success and harm measures
- Clear conditions under which no recommendation is shown

### Software Opportunity to Operational Capability

Requires:

- Product and technical validation
- Data quality monitoring
- Eligibility and exclusion rules
- Explanation available to the user
- Human override
- Outcome and guardrail telemetry
- Rollback mechanism
- Review owner and expiry date

## Software Opportunity Record

```yaml
opportunity_id: OPP-YYYY-NNN
name: Community participation prompt
source_patterns:
  - PATTERN-YYYY-NNN
target_user: business-owner
trigger:
  conditions:
    - repeat-rate below context baseline
    - participation-rate below context baseline
  exclusions:
    - insufficient observation window
    - active service failure unresolved
required_data:
  - repeat-visit-events
  - participation-events
  - customer-cohort
recommended_human_action: Test one recurring event for a defined customer cohort.
mechanism: Create a repeated reason for customers to interact and form relationships.
success_metrics:
  - METRIC-REPEAT-PARTICIPATION
  - METRIC-REPEAT-RATE
guardrails:
  - complaint-rate
  - staff-workload
explanation_required: true
human_override: true
review_delay: 8-weeks
failure_condition: Participation increases without repeat visits or member value.
```

## Recommendation Record

Every generated recommendation must preserve its reasoning:

```yaml
recommendation_id: REC-YYYY-NNN
business_id: BUSINESS-NNN
opportunity_id: OPP-YYYY-NNN
trigger_data:
  metric_versions:
    METRIC-REPEAT-RATE: 0.1.0
  measurement_window: YYYY-MM-DD/YYYY-MM-DD
matched_context:
  industry: restaurant
  size: 12-employees
missing_data: []
pattern_confidence: 0.68
explanation: The current condition resembles a supported retention-participation pattern.
recommended_action: Run a bounded recurring-event test.
alternatives:
  - investigate service recovery first
user_decision: pending
created_at: timestamp
expires_at: timestamp
```

Recommendations expire because business conditions and pattern evidence change.

## Required Data Classes

### Business Context

- Business type
- Operating model
- Size and relevant capacity
- Location context
- Seasonality
- Business maturity profile

### Observation and Diagnostic Data

- Observation records
- Evidence types
- Diagnostic records
- Confidence
- Unknowns and counterexamples

### Behavioral Events

- Purchase
- Visit
- Participation
- Contribution
- Invitation
- Referral
- Complaint
- Recovery
- Decision
- Escalation
- Partnership activity

### Intervention Data

- Hypothesis
- Eligibility
- Start and review dates
- Implementation fidelity
- Deviations
- Responsible owner
- Reversal condition

### Outcome Data

- Baseline
- Leading metrics
- Lagging metrics
- Guardrails
- Expected delay
- Unexpected effects
- Confidence update

### Governance Data

- Source
- Consent or lawful basis
- Sensitivity classification
- Access
- Retention
- Metric and pattern version
- Human decisions and overrides

## Data Design Rules

1. Store events separately from interpretations.
2. Version ontology objects, metrics, patterns, and recommendation logic.
3. Keep business-identifying data separate from cross-business learning records.
4. Use the minimum data required for the decision.
5. Record missingness instead of converting it to zero.
6. Preserve the exact context in which a pattern was learned.
7. Never train on a consultant conclusion without its evidence trail.
8. Allow a business to inspect and correct relevant source data.

## Candidate Capability Areas

These are research areas, not committed features.

### Events

- **Potential pattern:** Recurring, useful participation may strengthen member relationships and return behavior.
- **Human solution first:** Design and run a bounded event experiment.
- **Possible software role:** Cohort selection, invitation, attendance, follow-up, contribution capture, and outcome measurement.
- **Required evidence:** Participation, repeat participation, customer return, workload, and qualitative member value.

### Membership

- **Potential pattern:** Explicit continuity and belonging may improve retention when ongoing value exists.
- **Human solution first:** Define the continuing outcome, member role, and exchange.
- **Possible software role:** Membership state, renewal, contribution, benefits, and retention measurement.
- **Required evidence:** Eligibility, usage, retention, contribution, churn reasons, and margin.

### Feedback

- **Potential pattern:** Short feedback-to-decision cycles may improve experience and trust.
- **Human solution first:** Establish a response, decision owner, and visible closure behavior.
- **Possible software role:** Collection, routing, classification, decision tracking, response, and learning capture.
- **Required evidence:** Feedback source, topic, response, decision, recovery time, and subsequent behavior.

### Partnerships

- **Potential pattern:** Reciprocal partnerships may expand capability, trust, and customer access.
- **Human solution first:** Define shared outcome, commitments, ownership, and review.
- **Possible software role:** Partner records, commitments, activity, reciprocity, referrals, and renewal.
- **Required evidence:** Joint activity, fulfilled commitments, attributed value, reciprocity, and concentration.

## Recommendation Eligibility

Tipper should make a recommendation only when:

- The business matches the pattern's defined context.
- Required metrics use compatible definitions and windows.
- Data quality exceeds the pattern's threshold.
- No exclusion condition is active.
- The expected mechanism can be explained plainly.
- The action is within the user's authority and capacity.
- Outcome and guardrail measurement can be established.

If these conditions fail, Tipper should ask for evidence or show an uncertainty—not fill the gap with confidence.

## Human Oversight

The user must be able to:

- See why a recommendation appeared.
- Inspect the relevant data and time window.
- See pattern confidence and limitations.
- Reject the recommendation.
- Record contextual information the model lacks.
- Stop or reverse an intervention.
- Report an unintended effect.

The system owner must be able to:

- Disable a pattern globally.
- Limit it by context.
- Inspect recommendations and overrides.
- Compare expected and actual outcomes.
- Lower confidence when replication fails.
- Identify expired or drifting patterns.

## Prohibited Automation

Tipper must not:

- Diagnose a business from industry averages alone.
- Infer causation from correlation.
- Hide low confidence or missing data.
- Recommend an intervention without a measurable outcome.
- Optimize one metric while ignoring defined guardrails.
- Present a composite construct as a directly observed fact.
- Reuse client-confidential data as an identifiable example.
- Automate consequential people decisions from weak proxies.
- Continue recommending a pattern after its eligibility or expiry conditions fail.

## Learning Return Path

```text
Media question or business conversation
  ↓
Consulting observation and intervention
  ↓
Framework and pattern
  ↓
Tipper recommendation
  ↓
User decision
  ↓
Human implementation
  ↓
Behavioral events
  ↓
Outcome and guardrails
  ↓
Pattern confidence update
  ↓
Framework and recommendation logic review
  ↓
New media question or research priority
```

No capability is complete unless it returns outcome evidence to the system that justified it.

## Open Questions

- What minimum sample and replication threshold should vary by intervention risk?
- How should confidence update mathematically as counterexamples accumulate?
- Which data remains client-owned versus reusable in de-identified pattern records?
- What explanation is sufficient for each recommendation type?
- How should recommendation expiry respond to business context changes?
- Which candidate capability should be tested first through human consulting?

## Revision Log

### 0.2.0 — 2026-07-18

- Positioned Tipper as the operationalization and evidence-return stage of The Hard Port Knowledge Engine.
- Connected media, consulting, frameworks, patterns, recommendations, and new research priorities into one loop.

### 0.1.0 — 2026-07-18

- Defined pattern lifecycle, promotion gates, software opportunities, data requirements, and human oversight.
- Kept Events, Membership, Feedback, and Partnerships as evidence-dependent research areas.
