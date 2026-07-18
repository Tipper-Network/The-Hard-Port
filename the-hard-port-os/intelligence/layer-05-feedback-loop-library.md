---
id: CIS-L05
title: Feedback Loop Library
system: Consulting Intelligence System
version: 0.1.0
status: draft
owner: The Hard Port
last_updated: 2026-07-18
depends_on:
  - CIS-L00
  - CIS-L02
  - CIS-L04
used_by:
  - CIS-L06
  - CIS-L07
  - CIS-L08
---

# Feedback Loop Library

## Purpose

Record recurring causal structures that explain how business behavior sustains, accelerates, or corrects itself over time.

A loop is a hypothesis about system behavior, not a decorative diagram. Every loop used in a diagnosis must be grounded in observations from that business.

## Causal-Loop Notation

- `A ──+→ B` — when A changes, B tends to move in the same direction, all else equal.
- `A ──-→ B` — when A changes, B tends to move in the opposite direction, all else equal.
- `||` — a meaningful delay exists.
- `R` — reinforcing loop; change compounds in the same direction.
- `B` — balancing loop; change opposes movement away from a target or limit.

“Positive” and “negative” describe causal direction, not whether an outcome is desirable. A destructive loop can be reinforcing.

## Loop Validation Rules

1. Every causal link must name a plausible mechanism.
2. A loop must close; a chain is not a loop.
3. Record context and boundary conditions.
4. Record meaningful delays.
5. Link observations and metrics.
6. Treat leverage points as hypotheses until tested.
7. Preserve competing loop explanations.

## LOOP-CUSTOMER-TRUST — Customer Trust

- **Type:** Reinforcing (`R`)
- **Domains:** Customers, Operations, Community
- **Stock:** Customer trust
- **Objects:** Customer, Relationship, Offer, Operations, Resources

```text
Experience quality
  ──+→ Satisfaction
  ──+→ Reviews and referrals
  ──+→ Customer trust
  ──+→ Customers
  ──+→ Available resources
  ──+→ Experience quality
```

- **Mechanism:** Reliable outcomes increase credible advocacy, which lowers uncertainty for future customers and supplies resources for further delivery.
- **Delays:** Reviews and referrals may follow experience by days or months.
- **Metrics:** Repeat rate, referral rate, review rate, complaint rate, recovery time.
- **Leverage points:** Delivery consistency, expectation setting, recovery behavior, referral friction.
- **Failure mode:** Growth can overload operations, producing a second loop that reverses trust gains.

## LOOP-OWNER-DEPENDENCY — Owner Dependency

- **Type:** Reinforcing (`R`)
- **Domains:** Leadership, Operations, Knowledge
- **Stock:** Owner dependency
- **Objects:** People, Knowledge, Operations, Culture

```text
Owner intervention
  ──-→ Team decision practice
  ──+→ Team decision capability
  ──-→ Need for owner intervention
```

Two negative links produce a reinforcing loop: more intervention reduces practice; lower capability creates more need for intervention.

- **Mechanism:** The fastest short-term solution removes the team's opportunity to develop judgment.
- **Delays:** Capability loss is gradual and may remain hidden until owner absence.
- **Metrics:** Owner operational hours, decision dependency, decision distribution, escalation rate, reversal rate.
- **Leverage points:** Decision boundaries, coached review, information access, tolerable-error thresholds.
- **Failure mode:** Delegating tasks without authority preserves the loop.

## LOOP-FIREFIGHTING — Firefighting

- **Type:** Reinforcing (`R`)
- **Domains:** Leadership, Operations
- **Stock:** Unresolved structural problems
- **Objects:** Operations, People, Knowledge, Resources

```text
Urgent problems
  ──+→ Reactive work
  ──-→ Time for system repair
  ──-→ Structural problem resolution
  ──-→ Urgent problems
```

- **Mechanism:** Immediate response consumes the capacity required to remove recurrence.
- **Delays:** System repair pays off later; reactive work feels productive immediately.
- **Metrics:** Interruptions, repeated-error rate, reactive-work share, repair backlog, recurrence interval.
- **Leverage points:** Protected repair capacity, recurrence review, explicit triage, problem ownership.
- **Failure mode:** Increasing individual effort temporarily hides the growing stock of unresolved problems.

## LOOP-PROCESS-IMPROVEMENT — Process Improvement

- **Type:** Reinforcing (`R`)
- **Domains:** Operations, Knowledge, Measurement
- **Stock:** Reusable operating knowledge
- **Objects:** Operations, Knowledge, Metrics, People

```text
Process visibility
  ──+→ Useful feedback
  ──+→ Process learning
  ──+→ Operating knowledge
  ──+→ Process consistency
  ──+→ Process visibility
```

- **Mechanism:** Visible work produces comparable evidence, making improvement easier and increasing future visibility.
- **Delays:** Documentation and training precede reliable behavior.
- **Metrics:** Process coverage, adherence, exception capture, update rate, rework rate.
- **Leverage points:** Process ownership, point-of-work documentation, exception capture, review cadence.
- **Failure mode:** Documentation volume increases while actual use declines.

## LOOP-TEAM-CAPABILITY — Team Capability

- **Type:** Reinforcing (`R`)
- **Domains:** Leadership, Knowledge, Operations
- **Stock:** Team capability
- **Objects:** People, Knowledge, Culture, Operations

```text
Bounded decision opportunities
  ──+→ Decision practice
  ──+→ Capability
  ──+→ Decision quality
  ──+→ Leadership trust
  ──+→ Bounded decision opportunities
```

- **Mechanism:** Safe practice with feedback builds judgment, which earns broader authority.
- **Delays:** Capability develops across repeated decisions.
- **Metrics:** Decision distribution, decision error rate, escalation rate, delegation completion, review quality.
- **Leverage points:** Explicit boundaries, rapid feedback, increasing difficulty, blameless error review.
- **Failure mode:** A single early error causes authority to be withdrawn and activates owner dependency.

## LOOP-CUSTOMER-RETENTION — Customer Retention

- **Type:** Reinforcing (`R`)
- **Domains:** Customers, Operations
- **Stock:** Active customer relationships
- **Objects:** Customer, Relationship, Offer, Knowledge, Resources

```text
Retained customers
  ──+→ Customer knowledge
  ──+→ Relevance of experience
  ──+→ Customer value
  ──+→ Retention
  ──+→ Retained customers
```

- **Mechanism:** Longer relationships reveal needs and context, enabling more relevant value.
- **Delays:** Relationship knowledge accumulates over repeated interactions.
- **Metrics:** Retention, repeat rate, time between visits, complaint recovery, customer outcome attainment.
- **Leverage points:** Feedback use, continuity, memory, expectation management.
- **Failure mode:** Personalization depends on one employee and disappears during absence.

## LOOP-REPUTATION-REFERRAL — Reputation and Referral

- **Type:** Reinforcing (`R`)
- **Domains:** Customers, Community, Partnerships
- **Stock:** Credible reputation
- **Objects:** Relationship, Customer, Community, Environment

```text
Credible outcomes
  ──+→ Advocacy
  ──+→ Qualified referrals
  ──+→ Expectation fit
  ──+→ Successful outcomes
  ──+→ Credible outcomes
```

- **Mechanism:** Customers who understand the value refer better-fit customers, increasing the likelihood of another credible outcome.
- **Delays:** Reputation changes more slowly than individual experiences.
- **Metrics:** Referral rate, referral conversion, fit-related churn, review specificity, outcome attainment.
- **Leverage points:** Outcome clarity, referral language, recovery, visible proof.
- **Failure mode:** Incentivized referrals increase volume while lowering fit and credibility.

## LOOP-COMMUNITY-PARTICIPATION — Community Participation

- **Type:** Reinforcing (`R`)
- **Domains:** Community, Customers
- **Stock:** Community participation
- **Objects:** Community, Relationship, Knowledge, Customer

```text
Useful participation
  ──+→ Member value
  ──+→ Repeat participation
  ──+→ Member relationships
  ──+→ Contributions
  ──+→ Useful participation
```

- **Mechanism:** Participation becomes self-reinforcing when members create value for one another.
- **Delays:** Trust and member relationships require repeated interaction.
- **Metrics:** Participation rate, contribution rate, repeat participation, member connections, invitations.
- **Leverage points:** Useful roles, rituals, introductions, recognition, contribution prompts.
- **Failure mode:** More members reduce interaction quality and weaken participation.

## LOOP-PARTNERSHIP-VALUE — Partnership Value

- **Type:** Reinforcing (`R`)
- **Domains:** Partnerships
- **Stock:** Partnership trust
- **Objects:** Relationship, Resources, Knowledge, Customer

```text
Reliable commitments
  ──+→ Partnership trust
  ──+→ Shared activity
  ──+→ Mutual value
  ──+→ Willingness to commit
  ──+→ Reliable commitments
```

- **Mechanism:** Reliable exchange lowers coordination risk and supports larger joint commitments.
- **Delays:** Trust may grow slowly and fall quickly after a broken commitment.
- **Metrics:** Commitment completion, reciprocity, shared outcomes, response time, renewal.
- **Leverage points:** Small reliable commitments, shared outcome definition, review cadence, reciprocal ownership.
- **Failure mode:** Informal value becomes invisible and one side perceives exploitation.

## LOOP-CAPACITY-CONSTRAINT — Capacity Constraint

- **Type:** Balancing (`B`)
- **Domains:** Operations, Resources, Customers
- **Stock:** Available operating capacity
- **Objects:** Resources, Operations, Customer, Offer

```text
Customer demand
  ──+→ Workload
  ──-→ Available capacity
  ──+→ Delivery quality
  ──+→ Customer demand
```

One negative link makes this balancing: demand eventually constrains the conditions that produced it.

- **Mechanism:** Demand consumes finite capacity; beyond a threshold, quality and future demand decline.
- **Delays:** Quality decline may precede visible churn or reputation damage.
- **Metrics:** Capacity utilization, queue time, cycle time, defects, complaints, churn.
- **Leverage points:** Demand shaping, constraint elevation, scope control, capacity buffers.
- **Failure mode:** Revenue rises while trust and team health deteriorate.

## LOOP-CASH-CONSTRAINT — Cash Constraint

- **Type:** Reinforcing (`R`)
- **Domains:** Resources, Operations, Customers
- **Stock:** Available cash reserve
- **Objects:** Resources, Operations, Offer, Customer

```text
Cash pressure
  ──+→ Short-term decisions
  ──-→ Investment in capability
  ──+→ Delivery constraints
  ──-→ Customer value
  ──-→ Cash generation
  ──-→ Cash pressure
```

- **Mechanism:** Cash pressure privileges immediate receipts over capability, reducing future value and preserving pressure.
- **Delays:** Capability underinvestment may affect outcomes months later.
- **Metrics:** Cash reserve, payment delay, margin, maintenance backlog, customer retention.
- **Leverage points:** Cash visibility, payment terms, offer simplification, constraint-focused investment.
- **Failure mode:** Cost cutting removes the capability required to recover.

## Loop Instance Record

The library defines reusable structures. Each business requires a separate instance:

```yaml
loop_instance_id: LOOPINST-YYYY-NNN
loop_id: LOOP-OWNER-DEPENDENCY
business_id: BUSINESS-NNN
observations:
  - OBS-001
  - OBS-004
active_links:
  - owner-intervention-to-practice
  - practice-to-capability
context: refund decisions
metrics:
  - METRIC-DECISION-DEPENDENCY
  - METRIC-DECISION-ERROR-RATE
confidence: 0.62
counteracting_loops:
  - LOOP-TEAM-CAPABILITY
```

## Open Questions

- Which loops consistently interact in owner-dependent businesses?
- How should loop dominance be assessed from limited data?
- Which delays can be estimated before an intervention?
- What visual notation should be generated for client use later?
- When should a recurring loop be split into industry-specific variants?

## Revision Log

### 0.1.0 — 2026-07-18

- Defined causal notation, validation rules, and ten initial business loops.
- Correctly classified owner dependency as a reinforcing loop.
