---
id: CIS-L00
title: The Hard Port Knowledge Engine
system: Consulting Intelligence System
version: 0.1.0
status: draft
owner: The Hard Port
last_updated: 2026-07-18
depends_on: []
used_by:
  - CIS-L01
  - CIS-L02
  - CIS-L03
  - CIS-L04
  - CIS-L05
  - CIS-L06
  - CIS-L07
  - CIS-L08
  - CIS-L09
---

# The Hard Port Knowledge Engine

## Mission

> Understand how small businesses work.

The Hard Port is a research institute disguised as a media company.

Media, consulting, frameworks, data, and Tipper are not separate businesses. They are stages of one knowledge engine.

## Institutional Model

```text
Media
  attracts attention and exposes questions
        ↓
Business conversations
  produce observations and access
        ↓
Consulting
  tests diagnoses and interventions in real businesses
        ↓
Frameworks
  turn repeated learning into reusable intellectual property
        ↓
Structured data
  preserves evidence, context, outcomes, and counterexamples
        ↓
Tipper
  operationalizes supported patterns
        ↓
Behavior and outcomes
  produce new evidence
        ↓
Media, research, and frameworks improve
```

The engine compounds only when every stage returns what it learns. A stage that produces output without returning evidence breaks the loop.

## What Each Stage Does

### Stage 1 — Media as Observatory

Media is not only acquisition. It is a public research surface.

It should:

- Expose unresolved questions about small-business behavior.
- Give owners language for patterns they recognize but cannot yet name.
- Attract informed disagreement and counterexamples.
- Identify owners willing to discuss or expose how their businesses operate.
- Reveal which problems recur across contexts.
- Turn returning participation into business conversations and research access.

Media does not prove a hypothesis. Comments, views, and stories generate questions and candidate observations.

### Stage 2 — Consulting as Field Research

Consulting is where ideas meet operating reality.

It should:

- Observe behavior and structure inside real businesses.
- Test whether public narratives match actual work.
- Produce evidence-backed diagnoses.
- Run bounded human interventions.
- Measure expected and unexpected outcomes.
- Record context, implementation deviations, and counterexamples.

Client outcomes matter. They are also the evidence through which The Hard Port learns whether its models survive contact with reality.

### Stage 3 — Frameworks as Intellectual Property

Frameworks codify what remains useful across engagements.

They should:

- Define stable language and objects.
- Preserve causal mechanisms rather than slogans.
- State context, boundary conditions, and uncertainty.
- Become easier to test with each revision.
- Change when evidence contradicts them.

A framework is not intellectual property because it has a name or diagram. It becomes intellectual property when it reliably improves observation, diagnosis, intervention, or prediction.

### Stage 4 — Data as Institutional Memory

Data preserves the evidence trail that memory and anecdotes destroy.

It should connect:

```text
Question
  ↓
Observation
  ↓
Hypothesis
  ↓
Diagnosis
  ↓
Intervention
  ↓
Outcome
  ↓
Pattern
  ↓
Framework revision
```

Data without context cannot support learning. Every reusable record must retain the business context, source, metric version, confidence, contradictions, and limits.

### Stage 5 — Tipper as Operationalization

Tipper turns supported knowledge into repeated action.

It should:

- Detect when a supported pattern may apply.
- Ask for missing evidence.
- Explain the matching pattern and its limitations.
- Recommend a bounded human action.
- Support implementation.
- Measure outcomes and guardrails.
- Return evidence to the knowledge engine.

Tipper is not the destination of the engine. It is both an operational layer and a new observation instrument.

## Research Objects

### QUESTION-* — Research Question

A specific uncertainty whose answer could change a framework, diagnosis, intervention, or product decision.

Required fields:

- Question
- Origin
- Relevant ontology objects
- Why the answer matters
- Current assumptions
- Evidence needed
- Owner
- Status
- Duplicate or related questions

### CONVERSATION-* — Business Conversation

A substantive exchange with a business owner, worker, customer, partner, or community member that produces a research record.

Required fields:

- Participant role
- Business context
- Research question
- Observations or claims
- Follow-up evidence
- Consent and reuse boundary
- New questions

### HYP-* — Hypothesis

A falsifiable explanation or prediction connecting a condition, mechanism, and expected outcome.

Required fields:

- Context
- Condition
- Mechanism
- Expected outcome
- Evidence that would increase confidence
- Evidence that would reduce confidence
- Current evidence level
- Confidence
- Status

### AUDIT-* — Business Audit

A bounded assessment that produces evidence, observations, diagnoses, and a maturity profile for a business or domain.

Required fields:

- Business and system boundary
- Assessment question
- Domains covered
- Evidence sources
- Observations
- Diagnoses
- Unknowns
- Maturity profile
- Recommended next research action

### IMPROVEMENT-* — Framework Improvement

A versioned change to a framework caused by evidence, contradiction, simplification, or increased diagnostic usefulness.

Required fields:

- Framework and version
- Previous claim or structure
- Change
- Evidence or reasoning
- Expected improvement
- Validation method
- Author and reviewer

## Research Pipeline

### 1. Capture

Collect questions from media, conversations, audits, consulting, outcomes, and Tipper.

### 2. Qualify

Reject or merge questions that are:

- Duplicates
- Too broad to investigate
- Unconnected to a decision
- Already answered by available evidence
- Outside the mission

### 3. Prioritize

Prioritize by:

- Frequency across businesses
- Consequence if misunderstood
- Ability to observe or test
- Relevance to current frameworks
- Potential to improve client outcomes
- Potential to become a supported software capability

### 4. Investigate

Use conversations, observation, audits, existing records, and bounded interventions.

### 5. Evaluate

Update confidence. Preserve contradictory evidence. Do not convert every result into a success story.

### 6. Codify

Update a framework, metric, diagnostic, loop, pattern, or operating rule.

### 7. Operationalize

Use consulting first. Promote into Tipper only after the evidence gates in Layer 08 are met.

### 8. Publish

Return useful questions and supported learning to media without exposing confidential business information or overstating certainty.

## Knowledge-Engine Metrics

The engine is monitored through:

- Qualified Questions Generated
- Business Conversations Completed
- Framework Improvements Accepted
- Hypotheses Supported
- New Patterns Promoted
- Inbound Interview Requests
- Business Audits Completed
- Returning Commenters

Canonical definitions and formulas live in the [Metrics Dictionary](./layer-06-metrics-dictionary.md).

No single metric is the North Star. Optimizing one in isolation can damage the engine:

- More questions can create noise.
- More conversations can produce no evidence.
- More framework changes can create instability.
- More supported hypotheses can indicate weak falsification.
- More patterns can lower quality.
- More commenters can reward entertainment instead of understanding.

The unit that matters is a completed learning cycle: a qualified question that produces evidence and changes a decision, framework, intervention, or supported pattern.

## Operating Cadence

### Daily

- Capture questions and observations.
- Classify each idea by object, problem, behavior, metric, loop, and intervention.
- Link conversations and comments to existing questions where possible.

### Weekly

- Qualify and deduplicate questions.
- Review new conversations and audit evidence.
- Select active hypotheses.
- Record counterexamples.
- Decide whether any framework improvement is justified.

### Monthly

- Review knowledge-engine metrics as a system.
- Promote, contest, or retire patterns.
- Audit framework changes against evidence.
- Identify where the engine is losing information between stages.
- Set the next research agenda.

### Quarterly

- Review whether the mission is producing useful knowledge.
- Test whether frameworks improve diagnostic or intervention quality.
- Review Tipper opportunities and failed replications.
- Retire vanity metrics, stale questions, and unsupported claims.

## Failure Modes

- Treating media reach as knowledge
- Treating owner stories as verified causes
- Letting consulting delivery prevent research capture
- Naming frameworks before testing their usefulness
- Counting framework churn as improvement
- Keeping only successful interventions
- Removing context to make a pattern appear universal
- Building Tipper features before human validation
- Allowing Tipper to consume evidence without returning outcomes
- Optimizing research activity instead of learning quality

## Validation Rules

- Every active research question has an owner and decision use.
- Every hypothesis states disconfirming evidence.
- Every audit produces structured records, not only a report.
- Every framework improvement links to evidence or explicit reasoning.
- Every promoted pattern includes counterexamples and context.
- Every Tipper capability returns outcome and guardrail data.
- Every public claim states no more certainty than the evidence supports.

## Open Questions

- What constitutes a completed learning cycle in Version 0.1?
- Which media formats generate the strongest research access rather than the most reach?
- What consent and reuse boundaries should govern business conversations?
- How should failed interventions influence framework versions?
- Which research questions deserve longitudinal studies?
- When does a framework become stable enough to teach or license?

## Revision Log

### 0.1.0 — 2026-07-18

- Established The Hard Port's mission and five-stage knowledge engine.
- Defined research objects, pipeline, cadence, metrics, and failure modes.
