---
id: THP-SMB-INSTRUMENT-001
title: Growth Experiment Record
document_type: maturity_instrument
status: deferred_until_level_3_clients
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
parent_model: THP-SMB-LEVELS-001
related_documents:
  - ../levels/THP-SMB-LEVEL-02-stable-preparing-for-growth.md
  - ../levels/THP-SMB-LEVEL-03-attempting-growth.md
  - ../THP-SMB-LEVELS-001-maturity-model.md
supersedes: []
superseded_by: []
---

# Growth Experiment Record

> **Purpose:** Reusable record for a **deliberate growth experiment** — not a description of one specific experiment.  
> **Status:** `deferred_until_level_3_clients` — valid infrastructure; **not** part of the immediate first-onboarder workflow.  
> **Not canonical** until tested against an actual SMB case.  
> **Used at:** Level 2 preparation and Level 3 active experimentation ([`THP-SMB-LEVEL-03`](../levels/THP-SMB-LEVEL-03-attempting-growth.md)).

A business remains **Level 2** while an experiment is only **proposed** or **designed**. It becomes **Level 3** when the experiment is **active**.

## Experiment states

| State | Meaning |
|---|---|
| **proposed** | A growth hypothesis has been identified but not approved. |
| **designed** | Objective, hypothesis, boundaries, evidence, and review point are defined. |
| **active** | The experiment is currently being executed. |
| **under_review** | The test period or cycle has ended; evidence is being interpreted. |
| **invalid** | Execution, tracking, or external conditions make the result unreliable. |
| **failed** | The hypothesis was not supported or the experiment created unacceptable harm. |
| **inconclusive** | Evidence is insufficient or conflicting. |
| **promising** | Useful positive evidence; requires repetition. |
| **validated** | Repeated sufficiently under comparable conditions without violating protected-core thresholds. |
| **operationalized** | The validated mechanism is integrated into normal business operations. |

A single **promising** experiment does not complete Level 3. Level 4 requires a **validated** mechanism with repetition and emerging recognition.

---

## Identification

- **experiment_id**
- **business_id**
- **experiment_owner**
- **status** — one of the experiment states above
- **proposed_at**
- **started_at**
- **review_at**
- **completed_at**

## Growth objective

What specific business condition should increase or improve?

Examples: qualified customer acquisition; repeat purchasing; retention; referrals; community participation; capacity; partnership distribution; geographic reach; revenue from a proven offer; adoption of an additional channel.

"Get bigger" is not a valid growth objective.

## Identified constraint

What currently prevents that improvement?

Examples: insufficient qualified awareness; weak conversion; low retention; limited capacity; founder dependency; poor distribution; weak trust; unclear pricing; inconsistent communication; limited community participation; operational bottlenecks.

## Hypothesis

> If we take this action for this customer or context, then this result should change because of this reason.

## Intervention

What will the business actually do differently?

## Target customer, cohort, or context

Which customers, audience, location, channel, offer, or community will experience the test?

## Baseline evidence

What was normal performance before the experiment began? Required before a Level 3 entry gate is satisfied.

## Protected core

- **core_customer**
- **core_offer**
- **minimum_quality**
- **financial_survival_threshold**
- **operational_capacity_boundary**
- **protected_relationships**
- **protected_identity_elements**

Growth experiments must not consume survival resources or destroy the Level 2 viable core.

## Experiment boundaries

- **budget**
- **time_or_cycle_limit**
- **team_capacity**
- **operational_limit**
- **stopping_conditions**

## Evidence requirements

- **success_indicators**
- **partial_success_indicators**
- **failure_indicators**
- **harm_indicators** — signals that the core business is being damaged

## Observations

<!-- Record during execution -->

## Results

<!-- Quantitative and qualitative outcomes at review -->

## Interpretation

<!-- What the business believes the evidence shows; separate correlation from credible causal explanation -->

## Decision

One of:

- continue
- adjust
- repeat
- expand
- pause
- abandon
- investigate

## Learning captured

What reusable knowledge should inform the next experiment or consolidation?

## Related decisions

Links to prior experiments, strategic choices, or assessment records affected by this test.

---

## Revision History

### 0.1.1 — 2026-07-21

- Status set to `deferred_until_level_3_clients`; preserved for Level 3 operationalization.

### 0.1.0 — 2026-07-21

- Initial instrument template for Level 3 growth experimentation.
- Not canonical until validated against an actual SMB case.
