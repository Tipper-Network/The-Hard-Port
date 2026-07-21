---
id: CIS-L07
title: Consulting Methodology
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
  - CIS-L04
  - CIS-L05
  - CIS-L06
used_by:
  - CIS-L08
---

# Consulting Methodology

## Purpose

Define the gated process through which The Hard Port observes, diagnoses, changes, measures, and learns from a business.

The methodology protects the quality of reasoning. It prevents a preferred service, tool, or idea from becoming the answer before the business is understood.

## Engagement Boundary

This methodology applies **after** a business has passed the [First-Onboarder Qualification Gate](../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md).

It does **not** determine whether the business should be accepted into the THP diagnostic process.

**Upstream sequence:**

1. [Engagement Readiness Application](../docs/03-methods/entity-assessment/THP-ENGAGEMENT-READINESS-APPLICATION.md) — self-reported intake
2. [First-Onboarder Qualification Gate](../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md) — accept into diagnostic or not
3. [Level 1 Diagnostic](../knowledge/smb-maturity/instruments/THP-SMB-INSTRUMENT-002-first-onboarder-diagnostic.md) (A–H) — maturity condition

This methodology begins with the **interpretation and intervention work** that follows those stages — including Entity Position and Direction Assessment and the gated lifecycle below.

**Note:** METHOD-01 Discovery defines engagement scope for an **accepted** client. It is an **intervention progression gate**, not an initial engagement-acceptance gate. Initial acceptance is upstream (application → qualification → diagnostic).

## Relationship to Level 1-to-Level 2 Intervention

The consulting methodology governs the reasoning and professional conduct used within the intervention.

The [Level 1-to-Level 2 Intervention](../knowledge/smb-intervention/THP-SMB-INTERVENTION-001-level-1-to-level-2.md) defines the SMB-specific sequence of work.

Neither document replaces the other.

### Intervention phase → consulting method map

| Intervention phase | Primary consulting methods | Notes |
|---|---|---|
| 1. Business Reality | METHOD-01 Discovery · METHOD-02 Observation | Shared current-state map for accepted client |
| 2. Evidence Recovery | METHOD-02 Observation | Evidence inventory and classification |
| 3. Viable Core | METHOD-03 Diagnosis · METHOD-04 System Mapping | Core relationship identification |
| 4. Constraint Diagnosis | METHOD-03 Diagnosis · METHOD-05 Priority Selection | Primary constraint and deferred problems |
| 5. Identity Clarification | METHOD-06 Intervention Design | Communication foundation — not decoration-first |
| 6. Relationship Foundation | METHOD-06 Intervention Design · METHOD-07 Implementation | Feedback and relationship systems |
| 7. Operating Foundation | METHOD-04 System Mapping · METHOD-07 Implementation | Workflow, capacity, decision rhythm |
| 8. Level 2 Proof | METHOD-08 Measurement · METHOD-09 Iteration | Maturity reassessment — not deliverable review |

**Reported tensions (not silently rewritten):**

1. **Linear lifecycle vs phased intervention** — This document's Engagement Lifecycle presents nine methods in a single linear order. The intervention reorders and repeats method types across eight phases (e.g. Observation before Viable Core diagnosis). The intervention sequence is the SMB operational authority; methods describe *how* to think within each phase.
2. **Discovery placement** — METHOD-01 Discovery scopes an accepted engagement. Upstream qualification and diagnostic (INSTRUMENT-002) precede intervention entry. Phase 1 Business Reality operationalizes discovery for Level 1→2 without replacing upstream gates.
3. **Entity Position Assessment** — Listed as first paid engagement in Level 2 docs; may overlap METHOD-03 Diagnosis. Reconcile when Client Engagement Lifecycle is designed — do not merge documents here.

## Method Principles

1. Begin with the client's desired condition and constraints.
2. Observe actual work, not only descriptions of work.
3. Separate evidence, interpretation, diagnosis, and recommendation.
4. Model interactions before optimizing isolated parts.
5. Prioritize constraints, not the longest list of problems.
6. Design the smallest intervention capable of testing the hypothesis.
7. Establish baseline, outcome, guardrail, and review timing before implementation.
8. Measure after the system has had time to respond.
9. Record unexpected and contradictory outcomes.
10. Leave the business with greater learning capability, not greater consultant dependency.

## Engagement Lifecycle

```text
Discovery
  ↓
Observation
  ↓
Diagnosis
  ↓
System Mapping
  ↓
Priority Selection
  ↓
Intervention Design
  ↓
Implementation
  ↓
Measurement
  ↓
Iteration
```

## METHOD-01 — Discovery

### Objective

Define the engagement boundary, desired conditions, decision makers, constraints, and initial assumptions.

### Inputs

- Client request
- Business context
- Known goals
- Existing records
- Stakeholder list

### Activities

- Clarify why action is being considered now.
- Separate symptoms, desired outcomes, and proposed solutions.
- Identify stakeholders and decision rights.
- Establish access, evidence availability, and constraints.
- Record assumptions and exclusions.

### Outputs

- Engagement question
- Initial system boundary
- Stakeholder map
- Desired-condition statement
- Assumption register
- Access and evidence plan

### Deliverables

- Discovery record
- Engagement charter
- Initial evidence request

### Process Metrics

- Required access confirmed
- Stakeholder coverage
- Unresolved scope conflicts

### Exit Criteria

- The engagement question is explicit.
- The client agrees on the desired condition and non-goals.
- Required access and authority are available.
- No unmanageable conflict of interest or missing decision maker remains.

## METHOD-02 — Observation

### Objective

Collect evidence of behavior, structures, decisions, friction, outputs, and unknowns without prescribing solutions.

### Inputs

- Engagement charter
- System boundary
- Evidence plan
- Ontology
- Maturity domains

### Activities

- Observe work and interactions.
- Interview multiple relevant roles.
- Trace decisions and workflows.
- Review artifacts and system records.
- Establish baseline measures.
- Record unknowns and contradictions.

### Outputs

- Observation records
- Evidence inventory
- Baseline dataset
- Provisional maturity profile
- Unknowns register

### Deliverables

- Observation brief
- Evidence map
- Baseline report

### Process Metrics

- Evidence-source diversity
- Domain coverage
- Observation sample
- Unknowns capable of reversing interpretation

### Exit Criteria

- Material claims link to observation records.
- Owner report is corroborated or explicitly marked uncorroborated.
- Baseline quality is sufficient for the engagement question.
- Critical unknowns have a resolution plan.

## METHOD-03 — Diagnosis

### Objective

Explain the observed gap through testable causal hypotheses and dependencies.

### Inputs

- Observation records
- Baseline measures
- Maturity profile
- Desired condition

### Activities

- Write bounded problem statements.
- Generate competing root-cause hypotheses.
- Test hypotheses against supporting and contradictory evidence.
- Identify affected ontology objects and dependencies.
- Assign evidence levels and confidence.

### Outputs

- Diagnostic records
- Causal hypotheses
- Dependency map
- Confidence assessment

### Deliverables

- Diagnostic brief
- Evidence appendix

### Process Metrics

- Diagnoses with alternatives
- Diagnoses with contradictory evidence
- Unsupported-claim count
- Critical unknown count

### Exit Criteria

- Each diagnosis passes the diagnostic validation gate.
- Alternative explanations have been considered.
- The client can challenge factual errors without being asked to accept a recommendation.
- No proposed intervention is embedded in the diagnosis.

## METHOD-04 — System Mapping

### Objective

Show how relevant objects, stocks, flows, constraints, delays, and feedback loops produce current behavior.

### Inputs

- Validated diagnoses
- Ontology records
- Feedback-loop library
- Baseline metrics

### Activities

- Define the system boundary.
- Identify important stocks and flows.
- Map causal links and delays.
- Instantiate relevant feedback loops.
- Identify constraints and possible leverage points.
- Test the map against observed behavior.

### Outputs

- Business-specific system map
- Loop instances
- Constraint statement
- Candidate leverage points

### Deliverables

- System map
- Map narrative
- Assumption and boundary notes

### Process Metrics

- Causal links with evidence
- Unvalidated links
- Observed behavior explained
- Relevant delays identified

### Exit Criteria

- The map explains the material observations within its stated boundary.
- Causal claims name mechanisms and evidence.
- Known counteracting loops and delays are visible.
- Leverage points remain hypotheses rather than recommendations.

## METHOD-05 — Priority Selection

### Objective

Choose the constraint or opportunity that should receive limited attention and resources first.

### Inputs

- Diagnostic records
- System map
- Client goals
- Resource and authority constraints

### Activities

- Score impact, urgency, leverage, tractability, evidence, and dependency.
- Identify prerequisites.
- Compare action, delay, and no-action scenarios.
- Record strategic overrides.
- Select one primary priority and limited secondary priorities.

### Outputs

- Ranked priority records
- Selected constraint
- Deferred-item register
- Decision rationale

### Deliverables

- Priority decision brief

### Process Metrics

- Priorities with complete evidence
- Active priority count
- Unresolved prerequisites

### Exit Criteria

- One governing priority is explicit.
- The client accepts the trade-offs and deferred work.
- Required authority and resources exist.
- Selection is not based solely on ease or consultant capability.

## METHOD-06 — Intervention Design

### Objective

Design the smallest safe change capable of testing the causal hypothesis.

### Inputs

- Selected priority
- Validated diagnosis
- System map
- Baseline metrics
- Constraints

### Activities

- State the intervention hypothesis.
- Define the expected mechanism.
- Specify behavior and structural changes.
- Select leading, lagging, and guardrail metrics.
- Estimate delays.
- Define ownership, review, and reversal conditions.
- Check likely effects on adjacent loops and stakeholders.

### Outputs

- Intervention record
- Measurement plan
- Implementation plan
- Risk and unintended-effect register

### Deliverables

- Intervention design
- Decision and role changes
- Measurement specification

### Process Metrics

- Baseline completeness
- Guardrail coverage
- Dependencies resolved
- Reversibility

### Exit Criteria

- The intervention links to one or more diagnostic records.
- Mechanism and expected outcome are explicit.
- Baseline, outcome, guardrail, and delay are defined.
- An accountable owner and reversal condition exist.
- A smaller valid test has been considered.

## METHOD-07 — Implementation

### Objective

Introduce the intervention while preserving enough fidelity to evaluate what occurred.

### Inputs

- Approved intervention design
- Implementation plan
- Measurement plan
- Responsible owners

### Activities

- Communicate changed behavior, authority, and boundaries.
- Prepare required knowledge, tools, and access.
- Run the intervention.
- Record deviations, resistance, failures, and contextual changes.
- Support capability without taking ownership back.

### Outputs

- Implemented change
- Implementation log
- Deviation records
- Updated risk register

### Deliverables

- Working operating change
- Training or point-of-work knowledge where required
- Implementation record

### Process Metrics

- Adoption
- Implementation fidelity
- Deviations
- Unplanned owner intervention
- Guardrail status

### Exit Criteria

- The intervention operated for the defined test period.
- Material deviations and context changes are recorded.
- Guardrails remained acceptable or triggered an explicit response.
- The intervention was not quietly replaced by the old behavior.

## METHOD-08 — Measurement

### Objective

Determine what changed, what did not, what else changed, and how confidence should move.

### Inputs

- Baseline
- Intervention and implementation records
- Outcome data
- Guardrail data
- Context and deviation records

### Activities

- Validate data comparability.
- Compare baseline and follow-up.
- Segment relevant populations and periods.
- Account for expected delay.
- Review unintended and qualitative effects.
- Consider alternative explanations.
- Update confidence.

### Outputs

- Outcome record
- Confidence update
- Unexpected-effect record
- Data limitations

### Deliverables

- Measurement report
- Evidence package

### Process Metrics

- Metric completeness
- Baseline comparability
- Expected delay elapsed
- Alternative explanations assessed

### Exit Criteria

- Results distinguish observation from causal interpretation.
- Missing or poor-quality evidence is visible.
- Guardrail and unintended outcomes are included.
- The result supports continuation, modification, reversal, or further observation.

## METHOD-09 — Iteration

### Objective

Turn the result into the next business decision and reusable organizational knowledge.

### Inputs

- Measurement report
- Updated confidence
- Client feedback
- System and loop maps

### Activities

- Decide whether to retain, adapt, expand, reverse, or stop.
- Update processes, knowledge, and decision rights.
- Record the learned pattern and its context.
- Reassess the governing constraint.
- Define the next observation or intervention.

### Outputs

- Iteration decision
- Updated business system
- Pattern candidate
- New or revised priority

### Deliverables

- Learning record
- Updated operating knowledge
- Next-cycle charter or closure record

### Process Metrics

- Learning captured
- Decisions updated
- Recurrence after intervention
- Capability retained without consultant

### Exit Criteria

- The business has incorporated or rejected the change explicitly.
- Learning is accessible to the people who need it.
- A next cycle is justified, or the engagement closes.
- Pattern evidence is sent to the Tipper intelligence layer where appropriate.

## Decision Rights

### Client

- Owns business goals and acceptable trade-offs.
- Approves access, priority, and intervention.
- Assigns internal ownership.
- Decides whether to continue after results.

### The Hard Port

- Owns methodological integrity.
- Refuses unsupported diagnosis or outcome claims.
- Makes uncertainty and contradictory evidence visible.
- Records patterns without exposing client-confidential information.

### Shared

- Define success and guardrails.
- Interpret context.
- Review unintended effects.
- Decide how learning changes the next cycle.

## Non-Negotiable Gates

```text
No intervention without a diagnostic record.
No diagnosis without observation evidence.
No priority without stated trade-offs.
No implementation without baseline and guardrails.
No claimed result before the expected delay.
No reusable pattern without context and counterexamples.
```

## Engagement Refusal

THP may refuse an engagement without declaring that the client's entire value system is wrong.

Refusal means THP will not participate under current conditions — not that the participant lacks legitimate values, identity, or worth.

### Refusal conditions

Proceeding requires, at minimum:

- explicit invitation and informed consent;
- a defined scope within THP competence;
- honest participation in the gated process;
- and absence of foreseeable harm or fundamental incompatibility with THP's values and responsibilities.

THP may refuse when:

- the client is unwilling to examine assumptions relevant to scope;
- the client refuses to participate honestly in the process;
- the client insists on a predetermined answer;
- the client demands symptom relief without examining underlying patterns;
- expectations exceed THP competence or defined scope;
- informed consent cannot be established;
- foreseeable harm to affected parties or THP personnel is likely;
- or the engagement is incompatible with THP's own values and responsibilities.

Access to private information does not independently create authority to proceed beyond defined scope.

Full boundary definitions: [`docs/03-methods/entity-assessment/ENTITY-ENGAGEMENT-BOUNDARIES.md`](../docs/03-methods/entity-assessment/ENTITY-ENGAGEMENT-BOUNDARIES.md). Philosophical source: [`THP-VALUES-PRINCIPLES-WILL.md`](../docs/00-foundations/THP-VALUES-PRINCIPLES-WILL.md) (`THP-PH-003`).

## Engagement Closure

An engagement closes with:

- Final maturity profile
- Completed diagnostic and intervention records
- Baseline and outcome data
- Remaining risks and unknowns
- Retained operating knowledge
- Named owner for continued review
- Pattern candidates stripped of client-identifying information
- Explicit statement of what was not proven

## Open Questions

- What minimum evidence package should each engagement require?
- Which stages can overlap without weakening the gates?
- How should client disagreement with a diagnosis be recorded?
- What implementation support preserves client ownership?
- When should a failed intervention trigger remapping rather than modification?

## Revision Log

### 0.1.2 — 2026-07-21

- Engagement boundary added; upstream sequence (application → qualification → diagnostic) documented.

### 0.1.1 — 2026-07-21

- Added engagement refusal conditions and links to THP-PH-003 engagement boundaries.

### 0.1.0 — 2026-07-18

- Defined nine gated consulting stages with inputs, activities, outputs, deliverables, metrics, and exit criteria.
