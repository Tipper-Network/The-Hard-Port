---
id: CIS-L02
title: Business Ontology
system: Consulting Intelligence System
version: 0.1.0
status: draft
owner: The Hard Port
last_updated: 2026-07-18
depends_on:
  - CIS-L00
  - CIS-L01
used_by:
  - CIS-L03
  - CIS-L04
  - CIS-L05
  - CIS-L06
  - CIS-L08
  - CIS-L09
---

# Business Ontology

## Purpose

Define the canonical objects, boundaries, and relationships used to describe a business as a living system.

Without a shared ontology, observations cannot be compared, diagnoses drift between consultants, metrics lose context, and Tipper receives inconsistent data.

## Scope

Version 0.1 defines the minimum objects required to model a small business:

```text
Business Entity
├── Purpose
├── Goals
├── People
├── Customers
├── Community
├── Products and Services
├── Operations
├── Resources
├── Knowledge
├── Relationships
├── Culture
├── Technology
├── Metrics
└── Environment
```

Objects may overlap in real life but must remain conceptually distinguishable. For example, a customer is a person, but `Customer` describes that person's relationship and role relative to the business.

## Ontology Rules

1. Every observation must identify at least one object.
2. Every object must have an explicit boundary.
3. Relationships are first-class records, not implied prose.
4. A metric measures a property or behavior; it is not the object itself.
5. Technology supports behavior and process; it does not substitute for their definition.
6. Objects may contain subtypes, but subtypes inherit the parent definition.
7. New objects require evidence that existing objects cannot represent the distinction.

## Root Object

### OBJ-BUSINESS — Business Entity

- **Definition:** A coordinated system that creates and exchanges value through people, resources, relationships, and repeated activity.
- **Why it exists:** To pursue a purpose by producing outcomes for customers, owners, workers, partners, and communities.
- **Boundary:** The legal entity may inform the boundary but does not define it completely. Include actors, systems, and relationships the business controls or materially depends upon.
- **Influenced by:** Every contained object and the external environment.
- **Influences:** Every contained object and affected external stakeholder.
- **Observed through:** Decisions, behaviors, interactions, processes, exchanges, outputs, and outcomes.
- **Measured through:** A profile of operational, relational, financial, learning, and resilience metrics.
- **Primary failure mode:** Treating the business as a collection of departments instead of an interacting system.

## Object Definitions

### OBJ-PURPOSE — Purpose

- **Definition:** The durable reason the business chooses to exist and the value it intends to create.
- **Why it exists:** To constrain goals and coordinate decisions beyond immediate transactions.
- **Boundary:** Purpose states intended contribution; it is not a slogan, target, or current activity.
- **Influenced by:** Founders, customers, community, history, ownership, and environment.
- **Influences:** Goals, culture, products, priorities, partnerships, and resource allocation.
- **Observed through:** Trade-offs, repeated priorities, rejected opportunities, and leadership decisions.
- **Measured through:** Decision alignment, employee interpretation consistency, and resource alignment.
- **Failure modes:** Decorative purpose, conflicting purposes, or purpose contradicted by incentives.

### OBJ-GOAL — Goal

- **Definition:** A desired future condition with a defined horizon and evidence of completion.
- **Why it exists:** To translate purpose into coordinated direction.
- **Boundary:** A goal describes an outcome; tasks and projects are means.
- **Influenced by:** Purpose, constraints, owners, environment, and current performance.
- **Influences:** Decisions, priorities, metrics, resource allocation, and behavior.
- **Observed through:** Plans, trade-offs, review cadence, and resource commitments.
- **Measured through:** Progress, completion, time variance, and outcome quality.
- **Failure modes:** Conflicting goals, output-only goals, invisible goals, and goals without owners.

### OBJ-PEOPLE — People

- **Definition:** Individuals who perform, govern, enable, receive, or influence the business's work.
- **Why it exists:** Businesses act through human behavior, judgment, knowledge, and relationships.
- **Boundary:** Includes owners, employees, contractors, advisors, and relevant external actors; role determines subtype.
- **Influenced by:** Goals, incentives, capability, workload, culture, relationships, and environment.
- **Influences:** Decisions, operations, knowledge, customer experience, culture, and outcomes.
- **Observed through:** Behavior, decisions, interactions, work products, absence effects, and learning.
- **Measured through:** Role coverage, decision distribution, capability, workload, retention, and reliability.
- **Failure modes:** Role ambiguity, concentrated capability, conflicting incentives, and invisible labor.

### OBJ-CUSTOMER — Customer

- **Definition:** A person or organization that chooses, receives, uses, or pays for the business's value.
- **Why it exists:** Customers create demand and provide evidence that an offered outcome matters.
- **Boundary:** Distinguish payer, buyer, user, beneficiary, prospect, and former customer where necessary.
- **Influenced by:** Needs, alternatives, trust, experience, price, community, and environment.
- **Influences:** Revenue, product development, reputation, operations, and community.
- **Observed through:** Purchases, usage, questions, complaints, referrals, contributions, and departures.
- **Measured through:** Retention, repeat rate, satisfaction evidence, referral rate, participation, and lifetime value.
- **Failure modes:** Treating all customers as identical, confusing acquisition with value, and ignoring churned customers.

### OBJ-COMMUNITY — Community

- **Definition:** A network whose members share identity, interest, place, practice, or relationship around or beyond the business.
- **Why it exists:** Communities create belonging, shared knowledge, trust, participation, and network effects.
- **Boundary:** An audience consumes; a community has member-to-member relationships and contribution.
- **Influenced by:** Shared identity, rituals, leadership, safety, reciprocity, and useful participation.
- **Influences:** Trust, advocacy, retention, knowledge, partnerships, and reputation.
- **Observed through:** Member interaction, contribution, invitations, events, mutual support, and repeated participation.
- **Measured through:** Active participation, contribution rate, repeat attendance, member connections, and advocacy.
- **Failure modes:** Calling an audience a community, extracting attention, and measuring only membership size.

### OBJ-OFFER — Products and Services

- **Definition:** The organized means through which the business produces and exchanges value.
- **Why it exists:** To resolve a customer need or enable a desired outcome.
- **Boundary:** Includes the core offer, supporting experience, delivery conditions, and explicit promise.
- **Influenced by:** Customer needs, capability, resources, technology, regulation, and strategy.
- **Influences:** Customer outcomes, operations, revenue, reputation, and required capability.
- **Observed through:** Delivery, usage, defects, support, adaptation, and customer outcomes.
- **Measured through:** Adoption, completion, quality, margin, outcome attainment, complaints, and returns.
- **Failure modes:** Feature accumulation, unclear promise, unprofitable complexity, and outcome-delivery mismatch.

### OBJ-OPERATIONS — Operations

- **Definition:** The repeated activities, decisions, flows, and controls that produce and deliver value.
- **Why it exists:** To make intended outcomes repeatable under real constraints.
- **Boundary:** Includes normal work, exception handling, handoffs, controls, and improvement activity.
- **Influenced by:** Goals, people, knowledge, resources, technology, demand, and constraints.
- **Influences:** Quality, speed, cost, workload, customer experience, and resilience.
- **Observed through:** Workflows, queues, handoffs, errors, delays, rework, and escalation.
- **Measured through:** Cycle time, throughput, error rate, process coverage, rework, and recovery time.
- **Failure modes:** Invisible work, local optimization, undocumented exceptions, and owner-dependent execution.

### OBJ-RESOURCE — Resources

- **Definition:** Assets and capacities consumed, allocated, preserved, or transformed by the business.
- **Why it exists:** Activity requires finite capacity.
- **Boundary:** Includes cash, time, attention, equipment, space, inventory, access, and capacity.
- **Influenced by:** Revenue, allocation decisions, operations, environment, and constraints.
- **Influences:** Feasibility, speed, resilience, quality, and opportunity.
- **Observed through:** Budgets, schedules, utilization, inventory, bottlenecks, and shortages.
- **Measured through:** Availability, utilization, burn, replenishment rate, reserve, and opportunity cost.
- **Failure modes:** Treating all resources as money, ignoring attention, and maximizing utilization until resilience disappears.

### OBJ-KNOWLEDGE — Knowledge

- **Definition:** Information understood well enough to support action, judgment, or prediction.
- **Why it exists:** The business must retain learning beyond individual memory and isolated events.
- **Boundary:** Data is recorded fact; information adds context; knowledge enables a decision or action.
- **Influenced by:** Experience, observation, research, feedback, documentation, and social exchange.
- **Influences:** Decisions, capability, operations, adaptation, and innovation.
- **Observed through:** Explanations, decisions, records, training, retrieval, and transfer.
- **Measured through:** Accessibility, freshness, coverage, reuse, transfer time, and decision effectiveness.
- **Failure modes:** Knowledge trapped in individuals, documentation without use, and outdated instructions.

### OBJ-RELATIONSHIP — Relationship

- **Definition:** A persistent pattern of interaction, expectation, trust, and exchange between entities.
- **Why it exists:** Repeated coordination depends on expectations that survive individual transactions.
- **Boundary:** A contact is not automatically a relationship; persistence and mutual expectation are required.
- **Influenced by:** Reliability, communication, reciprocity, history, power, and shared outcomes.
- **Influences:** Trust, access, referrals, resilience, cooperation, and reputation.
- **Observed through:** Repeated interaction, commitments, recovery behavior, contribution, and mutual support.
- **Measured through:** Interaction frequency, reciprocity, retention, referral, response, and recovery.
- **Failure modes:** One-sided extraction, hidden dependency, neglected maintenance, and confusing reach with relationship.

### OBJ-CULTURE — Culture

- **Definition:** The repeated behaviors and norms that a group rewards, tolerates, discourages, or makes unsafe.
- **Why it exists:** Groups develop default behavior when formal instructions are absent or contested.
- **Boundary:** Culture is demonstrated behavior and consequence, not stated values alone.
- **Influenced by:** Leadership behavior, incentives, hiring, stories, decisions, and consequences.
- **Influences:** Judgment, communication, learning, risk, retention, quality, and adaptation.
- **Observed through:** Responses to mistakes, disagreement, pressure, success, and rule violations.
- **Measured through:** Behavioral consistency, speaking-up behavior, decision patterns, turnover, and learning response.
- **Failure modes:** Measuring sentiment alone, declared-value conflict, and tolerated destructive behavior.

### OBJ-TECHNOLOGY — Technology

- **Definition:** Tools and technical systems that extend, constrain, automate, record, or connect business activity.
- **Why it exists:** To increase capability, consistency, reach, memory, or speed.
- **Boundary:** Includes software, hardware, integrations, data stores, and automated rules.
- **Influenced by:** Process design, user capability, vendors, resources, security, and regulation.
- **Influences:** Workflow, access, measurement, customer experience, risk, and scale.
- **Observed through:** Usage, workarounds, failures, integrations, data quality, and support demand.
- **Measured through:** Adoption, reliability, task completion, error reduction, cost, and recovery.
- **Failure modes:** Automating broken processes, tool proliferation, lock-in, and data fragmentation.

### OBJ-METRIC — Metric

- **Definition:** A defined method for quantifying a property, event, relationship, or change.
- **Why it exists:** To reduce ambiguity in observation and support decisions.
- **Boundary:** A metric is not the goal, object, interpretation, or decision.
- **Influenced by:** Definition, instrumentation, behavior, sampling, and data quality.
- **Influences:** Attention, decisions, incentives, and intervention evaluation.
- **Observed through:** Collection, calculation, review, interpretation, and use.
- **Measured through:** Completeness, accuracy, timeliness, stability, and decision usefulness.
- **Failure modes:** Proxy capture, vanity measurement, inconsistent formulas, and measures without decisions.

### OBJ-ENVIRONMENT — Environment

- **Definition:** External conditions the business does not directly control but must sense and respond to.
- **Why it exists:** No business operates as a closed system.
- **Boundary:** Includes market, economy, regulation, technology shifts, geography, ecology, and social conditions.
- **Influenced by:** Many actors, including the business where its effect is material.
- **Influences:** Demand, constraints, costs, risk, behavior, and opportunity.
- **Observed through:** External data, stakeholder behavior, policy, competitor action, and local conditions.
- **Measured through:** Context-specific indicators, rates of change, exposure, and response time.
- **Failure modes:** Treating external change as internal failure, fatalism, and assuming historical stability.

## Relationship Types

### REL-CONTAINS — Contains

One object includes another within the chosen system boundary.

### REL-DEPENDS — Depends On

One object's continued function materially requires another.

### REL-PRODUCES — Produces

Activity in one object creates an output, state, or object.

### REL-CONSTRAINS — Constrains

One object limits the possible behavior or state of another.

### REL-INFLUENCES — Influences

Change in one object tends to change another without asserting sole causation.

### REL-MEASURES — Measures

A metric quantifies a property or event associated with an object.

### REL-PARTICIPATES — Participates In

An actor contributes to an operation, relationship, community, or decision.

### REL-EXCHANGES — Exchanges With

Objects transfer value, information, commitments, or resources.

## Relationship Record

```yaml
relationship_id: RELREC-001
type: REL-INFLUENCES
source: OBJ-RELATIONSHIP
target: OBJ-CUSTOMER
description: Reliable relationships increase the likelihood of customer return.
direction: positive
context: repeat-service businesses
evidence_level: E1
confidence: 0.30
```

## Ontology Validation Rules

- Every object has one canonical ID and definition.
- Every relationship names source, target, type, direction, and context.
- A relationship must not imply causation unless a mechanism and evidence are recorded.
- Observations use the narrowest valid object.
- Subtypes must state what distinction changes diagnosis or intervention.
- Synonyms belong in an alias field; they do not create duplicate objects.
- Deleting an object requires migration of every dependent record.

## Open Questions

- Should ownership and governance become a separate object from People?
- Should decisions become first-class objects in Version 0.2?
- When does a process require its own object rather than remaining within Operations?
- Which environmental subtypes are mandatory for all assessments?
- How should non-human agents be represented when they hold delegated decision authority?

## Revision Log

### 0.1.0 — 2026-07-18

- Defined the root object, fourteen foundational objects, and eight relationship types.
- Established boundaries, observations, measures, and failure modes for each object.
