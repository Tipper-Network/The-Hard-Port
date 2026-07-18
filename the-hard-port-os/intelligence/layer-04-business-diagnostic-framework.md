---
id: CIS-L04
title: Business Diagnostic Framework
system: Consulting Intelligence System
version: 0.1.0
status: draft
owner: The Hard Port
last_updated: 2026-07-18
depends_on:
  - CIS-L00
  - CIS-L01
  - CIS-L02
  - CIS-L03
used_by:
  - CIS-L05
  - CIS-L06
  - CIS-L07
  - CIS-L08
---

# Business Diagnostic Framework

## Purpose

Turn observations into bounded, evidence-backed diagnoses without allowing opinions or preferred solutions to masquerade as causes.

## Scope

Version 0.1 provides diagnostic coverage for:

- Leadership
- Operations
- Customers
- Community
- Partnerships

Knowledge, technology, measurement, finance, and environment must still be examined as dependencies. They are not yet complete standalone diagnostic modules.

## Diagnostic Principles

1. Observe before interpreting.
2. Record what happened separately from what someone says happened.
3. Describe the problem before naming a cause.
4. Keep multiple causal hypotheses alive until evidence separates them.
5. Do not include a recommendation in an observation or diagnosis.
6. Link every priority to impact, urgency, tractability, and dependency.
7. Treat every intervention as a testable hypothesis.
8. Record unknowns and contradictory evidence.

## Diagnostic Sequence

```text
Observation
  ↓
Evidence
  ↓
Problem Statement
  ↓
Root-Cause Hypotheses
  ↓
Dependency Analysis
  ↓
Impact
  ↓
Priority
  ↓
Intervention
  ↓
Measurement
```

Each arrow is a gate. Later records link backward; they do not overwrite earlier records.

## Evidence Types

### Direct Observation

Behavior, work, interaction, or output witnessed by the assessor.

### System Record

Timestamped data from a business system, document, transaction, or log.

### Artifact

A process, policy, schedule, message, report, or work product.

### Reported Experience

A statement from an owner, employee, customer, partner, or community member.

### Derived Measure

A calculation produced from defined source data.

Reported experience is evidence of the speaker's experience. It is not automatically evidence that the speaker's explanation is correct.

## Observation Record

```yaml
observation_id: OBS-YYYY-NNN
date: YYYY-MM-DD
domain: DOMAIN-OPERATIONS
objects:
  - OBJ-OPERATIONS
  - OBJ-PEOPLE
evidence_type: direct-observation
source: workflow-shadowing
statement: Three routine refund requests waited for owner approval.
context: weekday service shift
frequency: 3-of-3-observed-cases
affected_output: refund cycle time
unknowns:
  - whether approval is legally required
  - whether staff have a defined threshold
observer: person-or-role
```

### Observation Language Rules

Use:

- “Three requests waited more than 24 hours.”
- “Two employees separately asked the owner to approve the same class of decision.”
- “The process document was last updated eleven months ago.”

Do not use:

- “The owner is controlling.”
- “The team lacks initiative.”
- “The process is bad.”
- “They need automation.”

## Problem Statement

A valid problem statement contains:

```text
Observed condition
+ affected object or outcome
+ context
+ consequence
+ evidence boundary
```

Example:

> Routine refunds under the stated threshold waited for owner approval in all three observed cases, increasing customer recovery time by 24–48 hours during the observation window.

## Diagnostic Record

```yaml
diagnostic_id: DIAG-YYYY-NNN
problem_statement: Routine refunds wait for owner approval.
observations:
  - OBS-001
  - OBS-002
affected_objects:
  - OBJ-OPERATIONS
  - OBJ-CUSTOMER
root_cause_hypotheses:
  - id: H1
    statement: Staff do not have explicit decision authority.
    supporting_evidence:
      - OBS-003
    contradicting_evidence: []
  - id: H2
    statement: Staff have authority but fear reversal.
    supporting_evidence:
      - OBS-004
    contradicting_evidence:
      - OBS-005
dependencies:
  - OBJ-KNOWLEDGE
  - OBJ-CULTURE
related_loops:
  - LOOP-OWNER-DEPENDENCY
impact:
  customer: delayed recovery
  operational: repeated queue
  owner: interruption
confidence: 0.58
evidence_level: E2
unknowns:
  - actual refund error rate
```

## Priority Record

Score each factor from 0 to 4. Keep the component scores visible.

- **Impact:** Magnitude of the consequence if unchanged
- **Urgency:** Rate at which delay increases harm or removes opportunity
- **Leverage:** Expected cross-system effect
- **Tractability:** Ability to test change with available authority and resources
- **Evidence:** Strength of the diagnosis
- **Dependency penalty:** Degree to which unresolved prerequisites block action

```text
Priority score =
Impact + Urgency + Leverage + Tractability + Evidence - Dependency penalty
```

The score orders discussion; it does not make the decision. Record strategic reasons for overriding it.

## Intervention Record

```yaml
intervention_id: INT-YYYY-NNN
diagnostic_id: DIAG-YYYY-NNN
hypothesis: If staff receive explicit refund authority up to X, routine refund cycle time will fall without increasing refund error rate.
mechanism: Move bounded decision authority from owner to service staff.
changes:
  behavior: Staff decide within threshold.
  structure: Decision rule and escalation boundary become explicit.
owner: service-lead
start_date: YYYY-MM-DD
review_date: YYYY-MM-DD
leading_metrics:
  - METRIC-DECISION-DISTRIBUTION
lagging_metrics:
  - METRIC-RECOVERY-TIME
guardrail_metrics:
  - METRIC-DECISION-ERROR-RATE
expected_delay: 14-days
reversal_condition: Error rate exceeds agreed threshold.
```

## Diagnostic Domains

### DOMAIN-LEADERSHIP — Leadership

#### Core Questions

- Who makes which decisions?
- Which decisions cannot happen without the owner?
- What authority has been explicitly delegated?
- Which delegated decisions are rechecked or reversed?
- How are priorities set when goals conflict?
- What happens when the owner is unavailable?

#### Observable Evidence

- Decision queues
- Approval paths
- Escalations
- Meeting decisions
- Role definitions
- Owner interruptions
- Outcomes during absence

#### Initial Metrics

- `METRIC-DECISION-DEPENDENCY`
- `METRIC-DECISION-DISTRIBUTION`
- `METRIC-OWNER-OPERATIONAL-HOURS`
- `METRIC-DELEGATION-COMPLETION`
- `METRIC-DECISION-REVERSAL-RATE`

#### Common Hypotheses

- Authority is undefined.
- Authority exists but reversal makes its use unsafe.
- Capability is insufficient for the delegated decision.
- Required information is inaccessible.
- Incentives punish independent judgment.

### DOMAIN-OPERATIONS — Operations

#### Core Questions

- Which activities repeatedly create customer value?
- Are critical processes explicit and usable?
- Can another capable person perform key work?
- Where do queues, handoffs, rework, and exceptions occur?
- Which failures recur?
- How is operating knowledge updated?

#### Observable Evidence

- Workflow traces
- Process artifacts
- Work queues
- Error and rework records
- Handoff delays
- Exception handling
- Performance during absence

#### Initial Metrics

- `METRIC-PROCESS-COVERAGE`
- `METRIC-CYCLE-TIME`
- `METRIC-ERROR-FREQUENCY`
- `METRIC-REWORK-RATE`
- `METRIC-RECOVERY-TIME`

#### Common Hypotheses

- Work is not defined.
- The process is defined but not usable.
- A constraint is creating a queue.
- Exceptions bypass learning.
- Local optimization harms the full workflow.

### DOMAIN-CUSTOMERS — Customers

#### Core Questions

- Who buys, uses, pays, and benefits?
- What outcome is the customer trying to achieve?
- What evidence exists beyond owner impressions?
- Where do customers hesitate, complain, leave, return, or refer?
- Are relationships transactional or persistent?
- How does feedback alter decisions?

#### Observable Evidence

- Purchase and usage records
- Interviews
- Support requests
- Complaints
- Returns
- Reviews
- Referrals
- Churn behavior

#### Initial Metrics

- `METRIC-REPEAT-RATE`
- `METRIC-RETENTION-RATE`
- `METRIC-REFERRAL-RATE`
- `METRIC-COMPLAINT-RATE`
- `METRIC-CUSTOMER-RECOVERY-TIME`

#### Common Hypotheses

- The offer does not produce the expected outcome.
- Inconsistent delivery is eroding trust.
- The business misunderstands why customers leave.
- Feedback is collected but does not reach decisions.
- Trust attaches to the owner rather than the business.

### DOMAIN-COMMUNITY — Community

#### Core Questions

- Is there a community or only an audience?
- Do members interact with one another?
- What do members contribute?
- What causes repeat participation?
- Who initiates activity?
- Does participation create value beyond promotion?

#### Observable Evidence

- Event attendance
- Member-to-member interaction
- Contributions
- Invitations
- Repeat visits
- Volunteer behavior
- Shared rituals

#### Initial Metrics

- `METRIC-PARTICIPATION-RATE`
- `METRIC-CONTRIBUTION-RATE`
- `METRIC-REPEAT-PARTICIPATION`
- `METRIC-MEMBER-INVITATION-RATE`
- `METRIC-MEMBER-CONNECTION-RATE`

#### Common Hypotheses

- Participation lacks a clear member outcome.
- Activity depends entirely on owner initiation.
- Members have no useful way to contribute.
- Broadcasting is being mistaken for community.
- The environment does not support trust or safety.

### DOMAIN-PARTNERSHIPS — Partnerships

#### Core Questions

- Which relationships repeatedly create mutual value?
- Are expectations, commitments, and outcomes explicit?
- Does the partnership survive outside the owner relationship?
- How is value exchanged and reviewed?
- Which partnerships create dependency without resilience?
- What complementary capability is missing?

#### Observable Evidence

- Joint activity
- Shared commitments
- Referral records
- Response patterns
- Partnership reviews
- Relationship ownership
- Outcomes during personnel changes

#### Initial Metrics

- `METRIC-ACTIVE-PARTNERSHIPS`
- `METRIC-PARTNERSHIP-CONTRIBUTION`
- `METRIC-PARTNERSHIP-RECIPROCITY`
- `METRIC-PARTNER-DEPENDENCY`
- `METRIC-PARTNERSHIP-RENEWAL`

#### Common Hypotheses

- The value exchange is one-sided.
- The relationship depends on one individual.
- No shared outcome governs activity.
- The partnership is inactive but remains counted.
- Coordination cost exceeds created value.

## Diagnostic Validation Gate

A diagnosis may proceed to prioritization only when:

- The problem statement contains observable evidence.
- At least one alternative explanation is recorded.
- Relevant ontology objects and dependencies are linked.
- Unknowns that could reverse the diagnosis are identified.
- Confidence and evidence level are declared.
- No solution language has been smuggled into the problem definition.

An intervention may proceed only when:

- A diagnostic record passed validation.
- The expected mechanism is explicit.
- Baseline, outcome, and guardrail metrics exist.
- A review date accounts for expected delay.
- Responsibility and reversal conditions are clear.

## Open Questions

- Which financial diagnostics are required before any intervention?
- How should interview evidence be weighted against system records?
- What minimum observation sample is appropriate by business type?
- Which priority factors should be context-dependent?
- How should interacting diagnoses be represented without duplicating evidence?

## Revision Log

### 0.1.0 — 2026-07-18

- Defined gated observation, diagnostic, priority, and intervention records.
- Added five initial domain modules and diagnostic validation rules.
