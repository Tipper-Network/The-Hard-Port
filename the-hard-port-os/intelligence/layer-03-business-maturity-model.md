---
id: CIS-L03
title: Business Maturity Model
system: Consulting Intelligence System
version: 0.1.0
status: draft
owner: The Hard Port
last_updated: 2026-07-18
depends_on:
  - CIS-L00
  - CIS-L01
  - CIS-L02
used_by:
  - CIS-L04
  - CIS-L07
  - CIS-L08
---

# Business Maturity Model

## Purpose

Describe a business's current capabilities without reducing the entire organization to one misleading score.

Maturity is assessed by domain. A business may have mature customer relationships and fragile operations at the same time. The resulting maturity profile should expose constraints, not reward a high average.

## Scope

Version 0.1 assesses eight domains:

- Leadership
- Operations
- Customers
- Community
- Partnerships
- Knowledge
- Technology
- Measurement

Financial health remains part of diagnosis and environment context but requires a dedicated model before it becomes a scored maturity domain.

## Maturity Principles

1. A stage represents demonstrated capability, not age, revenue, headcount, or ambition.
2. Assign the highest stage for which all required conditions have evidence.
3. Intent, documentation, and purchased tools do not prove capability.
4. A business may regress under growth, turnover, disruption, or owner absence.
5. Stage 4 is not universally desirable; the target stage depends on owner goals and context.
6. Scores locate constraints. They are not grades or status symbols.
7. Contradictory evidence lowers confidence instead of being discarded.

## Universal Maturity States

### STATE-0 — Survival

#### Definition

The domain functions through immediate individual effort and reaction. Failure is prevented by people compensating manually.

#### Observable Conditions

- Work and decisions concentrate around the owner or one key person.
- Priorities change with the latest urgency.
- Knowledge is mostly tacit.
- Outcomes vary when specific people are absent.
- Problems recur without structural correction.

#### Exit Criteria

- Critical responsibilities are visible.
- Repeated work can be identified.
- Basic decisions and outcomes can be observed.
- Immediate failure no longer consumes all available attention.

### STATE-1 — Stabilization

#### Definition

Basic responsibilities and repeated practices exist, but they remain inconsistent and person-dependent.

#### Observable Conditions

- Key roles are informally understood.
- Some processes repeat predictably.
- Basic records or metrics exist.
- Delegation occurs but often returns to the owner.
- Improvement is episodic.

#### Exit Criteria

- Ownership and decision rights are explicit.
- Critical work has usable operating guidance.
- The domain has a stable review cadence.
- Performance can be compared against a baseline.

### STATE-2 — Structured Growth

#### Definition

The domain operates through explicit systems, distributed responsibility, and repeatable measurement.

#### Observable Conditions

- Systems survive normal staff absence.
- Teams execute routine decisions independently.
- Data informs recurring decisions.
- Exceptions are recorded and reviewed.
- Capacity can increase without proportional owner involvement.

#### Exit Criteria

- Feedback changes behavior or structure.
- Cross-domain dependencies are managed.
- Relationships and knowledge persist beyond individuals.
- Improvement can be repeated rather than improvised.

### STATE-3 — Community Business

#### Definition

The domain creates value through reciprocal relationships, participation, contribution, and external networks.

#### Observable Conditions

- Customers, partners, or community members contribute.
- Trust produces referrals and cooperation.
- Relationships are maintained intentionally.
- External feedback influences decisions.
- Network strength improves resilience or value creation.

#### Exit Criteria

- Adaptation occurs without owner initiation.
- Distributed sensing identifies meaningful change.
- The domain can redesign itself from evidence.
- Network effects do not depend on one central relationship holder.

### STATE-4 — Autonomous Business

#### Definition

The domain senses change, makes distributed decisions, learns from outcomes, and adapts within clear constraints.

#### Observable Conditions

- Owner absence does not materially degrade routine outcomes.
- Teams change systems using agreed evidence and authority.
- Feedback loops are monitored and deliberately influenced.
- Knowledge is captured and reused.
- The domain can absorb disruption and recover.

#### Maintenance Conditions

- Decision boundaries remain explicit.
- Measures remain useful and resistant to gaming.
- Capability survives turnover.
- Autonomy remains aligned with purpose and goals.

## Domain Maturity Rubrics

### DOMAIN-LEADERSHIP — Leadership

#### Stage 0

The owner makes nearly every meaningful decision and resolves most exceptions.

#### Stage 1

Responsibilities exist, but authority is unclear and delegated decisions are frequently rechecked.

#### Stage 2

Decision rights, escalation conditions, and role outcomes are explicit. Routine decisions are distributed.

#### Stage 3

Leaders coordinate across teams and external relationships. Decisions incorporate customer and community evidence.

#### Stage 4

Leadership capability is distributed. Teams adapt within strategic constraints without waiting for owner direction.

### DOMAIN-OPERATIONS — Operations

#### Stage 0

Work is reactive, undocumented, and dependent on individual memory.

#### Stage 1

Core routines exist, but adherence and exception handling are inconsistent.

#### Stage 2

Critical processes, owners, handoffs, controls, and measures are explicit and usable.

#### Stage 3

Operations coordinate reliably with customers, partners, and community contributors.

#### Stage 4

Teams detect constraints, test improvements, and update operating knowledge from measured outcomes.

### DOMAIN-CUSTOMERS — Customers

#### Stage 0

Customer knowledge is anecdotal. Acquisition and urgent complaints dominate attention.

#### Stage 1

Customer records and basic feedback exist, but learning is irregular.

#### Stage 2

Segments, journeys, retention, complaints, and outcomes inform decisions.

#### Stage 3

Customers participate, advocate, contribute knowledge, and maintain relationships beyond transactions.

#### Stage 4

Customer signals reliably drive adaptation while the business protects long-term trust from short-term optimization.

### DOMAIN-COMMUNITY — Community

#### Stage 0

The business has an audience or customer list but no meaningful member-to-member participation.

#### Stage 1

Events or interactions occur, usually initiated and sustained by the owner.

#### Stage 2

Participation has defined purpose, ownership, cadence, and measurement.

#### Stage 3

Members form relationships, contribute, invite others, and create value for one another.

#### Stage 4

Community leadership and adaptation are distributed without losing shared purpose or safety.

### DOMAIN-PARTNERSHIPS — Partnerships

#### Stage 0

Relationships are opportunistic, personal, and rarely reviewed.

#### Stage 1

Recurring partners exist, but expectations and value exchange remain implicit.

#### Stage 2

Active partnerships have shared outcomes, owners, commitments, and review measures.

#### Stage 3

Partners form a reliable network that creates referrals, capability, learning, or resilience.

#### Stage 4

The network identifies and acts on opportunities without depending on one relationship broker.

### DOMAIN-KNOWLEDGE — Knowledge

#### Stage 0

Critical knowledge exists in individual memory.

#### Stage 1

Some documentation exists but is incomplete, stale, or difficult to retrieve.

#### Stage 2

Critical knowledge has owners, retrieval paths, review cadence, and demonstrated use.

#### Stage 3

Knowledge moves across employees, customers, partners, and community where appropriate.

#### Stage 4

Learning from decisions and interventions routinely updates shared operating knowledge.

### DOMAIN-TECHNOLOGY — Technology

#### Stage 0

Tools are selected reactively and data is fragmented.

#### Stage 1

Core tools exist, but workarounds, duplicate entry, and owner administration remain common.

#### Stage 2

Technology supports defined workflows, access rules, integration, and recovery.

#### Stage 3

Technology enables customer, community, and partner participation without fragmenting the relationship.

#### Stage 4

Technical systems adapt from operational evidence while preserving human oversight and reversibility.

### DOMAIN-MEASUREMENT — Measurement

#### Stage 0

Performance is understood through memory, cash balance, and urgent events.

#### Stage 1

Basic metrics are collected inconsistently or without defined decisions.

#### Stage 2

Metrics have definitions, owners, cadence, baselines, and decision uses.

#### Stage 3

Relational and network effects are measured alongside financial and operational outcomes.

#### Stage 4

The business tests interventions, monitors unintended effects, and updates confidence from results.

## Maturity Profile Record

```yaml
assessment_id: MATURITY-YYYY-NNN
business_id: BUSINESS-NNN
assessment_date: YYYY-MM-DD
domain: DOMAIN-OPERATIONS
assigned_stage: STATE-1
target_stage: STATE-2
evidence:
  - OBS-001
  - OBS-004
missing_conditions:
  - explicit process ownership
  - exception review cadence
contradicting_evidence:
  - one workflow operates independently
confidence: 0.65
assessor: person-or-role
```

## Overall Classification Rules

Do not calculate a simple average.

Use three outputs:

1. **Domain profile:** The stage assigned to each domain.
2. **Governing constraint:** The lowest-capability domain currently limiting the stated goal.
3. **Dependency risk:** Any domain whose failure would materially degrade otherwise mature domains.

An optional headline stage may be used only when required for communication. It must be the stage of the governing constraint, accompanied by the full profile.

## Transition Rules

A domain advances only when:

- Every required condition for the stage is observed.
- Evidence comes from at least two sources or methods.
- Capability persists across an appropriate period or repeated event.
- Performance does not depend on hidden owner compensation.
- Adjacent domains can support the transition.

## Regression Indicators

- Decision authority returns to the owner.
- Processes fail after turnover or absence.
- Metrics continue to be collected but stop affecting decisions.
- Customer or community participation becomes one-way broadcasting.
- Documentation becomes stale or inaccessible.
- Growth increases defects, delays, and owner intervention.
- A tool change destroys previously stable capability.

## Invalid Assessments

An assessment is invalid when:

- It infers maturity from revenue, headcount, age, or software ownership.
- It relies only on owner self-report.
- It assigns a stage without evidence records.
- It averages away a critical constraint.
- It treats the target stage as automatically desirable.
- It confuses temporary heroic performance with durable capability.

## Open Questions

- Which domain conditions should be mandatory across every industry?
- What observation window is sufficient for each domain?
- How should seasonality affect stage confidence?
- Should resilience become its own domain in Version 0.2?
- What method best identifies the governing constraint across domains?

## Revision Log

### 0.1.0 — 2026-07-18

- Defined five universal maturity states and eight domain-specific rubrics.
- Established evidence, transition, regression, and overall classification rules.
