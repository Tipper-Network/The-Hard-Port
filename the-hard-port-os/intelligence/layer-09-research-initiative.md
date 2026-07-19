---
id: CIS-L09
title: The Hard Port — Research Initiative
system: Consulting Intelligence System
version: 0.1.0
status: active
owner: The Hard Port
last_updated: 2026-07-18
depends_on:
  - CIS-L00
  - CIS-L02
  - CIS-L06
  - CIS-L08
related_documents:
  - ../docs/knowledge-system/research-methodology.md
  - ../docs/00-foundations/THP-FOUNDATIONAL-PHILOSOPHY.md
  - ../docs/00-foundations/THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md
  - ../KNOWLEDGE_ARCHITECTURE.md
used_by: []
---

# The Hard Port — Research Initiative

> We are not building a consulting company.
>
> We are building an understanding of how small businesses work.

## Purpose

The Hard Port exists to develop a modern philosophy of small businesses.

Small businesses are more than economic units. They are social infrastructure. They shape neighborhoods, relationships, culture, opportunity, and identity.

Rather than distributing generic business advice, The Hard Port observes, documents, questions, tests, and explains how small businesses actually operate.

Philosophical assumptions inherited by this work are defined in [`../docs/00-foundations/THP-FOUNDATIONAL-PHILOSOPHY.md`](../docs/00-foundations/THP-FOUNDATIONAL-PHILOSOPHY.md). Institutional purpose and boundaries are defined in [`../docs/00-foundations/THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md`](../docs/00-foundations/THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md). This layer does not duplicate them.

Everything produced through media, research, consulting, frameworks, or Tipper must contribute to that understanding or put supported understanding to work.

## Mission

Develop a body of knowledge about small businesses through observation, conversation, experimentation, and systems thinking.

That knowledge should produce:

- Better consulting
- Better frameworks
- Better tools
- Better communities
- Better software through Tipper

The institutional architecture behind this mission is defined in [The Hard Port Knowledge Engine](./layer-00-knowledge-engine.md).

How knowledge progresses through the repository lifecycle — stage gates, advancement, and return paths — is defined in [`../docs/knowledge-system/research-methodology.md`](../docs/knowledge-system/research-methodology.md). That document is authoritative for operational methodology; this layer describes mission, beliefs, and public-facing research loops.

## Core Beliefs

### 1. Observation Before Opinion

We do not begin with answers.

We begin by paying attention to behavior, structure, decisions, relationships, friction, and outcomes.

### 2. Businesses Are Living Systems

Businesses are collections of people, relationships, behaviors, incentives, routines, resources, knowledge, and feedback loops.

Understanding interactions matters more than optimizing isolated parts.

### 3. Every Business Can Teach Us Something

Every engagement can produce new knowledge.

Every interview can improve our understanding.

Every substantive conversation can become research.

None of them becomes knowledge automatically. Claims must be recorded, contextualized, challenged, and connected to evidence.

### 4. We Publish Ideas, Not Certainty

Ideas exist at different evidence levels and confidence scores.

We state uncertainty, boundary conditions, and counterexamples instead of performing certainty for an audience.

### 5. Contradiction Is Useful

A disagreement, failed intervention, or counterexample can improve the system more than another confirming anecdote.

The objective is not to defend The Hard Port's ideas. It is to make them harder to fool.

## Public Research Cycle

```text
Observe
  ↓
Develop a hypothesis
  ↓
Publish with its evidence state
  ↓
Generate conversation
  ↓
Collect observations and counterexamples
  ↓
Refine confidence and understanding
  ↓
Update the framework
  ↓
Repeat
```

This is the public-facing research loop. It feeds the wider knowledge engine rather than replacing the consulting and intervention cycle.

## Three Operating Systems

### 1. Research

#### Purpose

Develop, test, and revise observations about small businesses.

#### Inputs

- Business behavior
- Interviews
- Audits
- Consulting evidence
- Public conversation
- Existing research
- Tipper outcomes

#### Outputs

- Notes
- Observations
- Hypotheses
- Supported principles
- Open questions
- Vocabulary
- Framework improvements

### 2. Content

#### Purpose

Turn research into public thinking that allows other people to see, challenge, and extend the work.

#### Inputs

- Qualified research questions
- Observations
- Hypotheses
- Principles
- Counterexamples
- Frameworks

#### Outputs

- Videos
- Articles
- Diagrams
- Essays
- Visual models
- Public questions

Content must preserve the evidence state of the idea it communicates.

### 3. Conversation

#### Purpose

Allow business owners, workers, customers, partners, and communities to challenge, improve, contextualize, or support the research.

#### Inputs

- Published content
- Open research questions
- Interview requests
- Business examples

#### Outputs

- Comments
- Interviews
- Direct messages
- Business conversations
- Counterexamples
- Case studies
- New questions

Everything returns to Research.

## Research Record

Every investigated idea should use this structure:

```yaml
research_id: RESEARCH-YYYY-NNN
title: Short descriptive title
objects:
  - OBJ-EXAMPLE
origin:
  type: conversation
  record_id: CONVERSATION-YYYY-NNN
observation: What was noticed without explanation.
hypothesis: A falsifiable explanation or prediction.
supporting_examples:
  - OBS-YYYY-NNN
counterexamples:
  - OBS-YYYY-NNN
open_questions:
  - QUESTION-YYYY-NNN
evidence_level: E1
confidence: 0.25
status: active
owner: person-or-role
next_action: interview
```

## Research Workflow

### Observation

What did we notice?

Record the behavior, structure, decision, friction, interaction, or outcome without embedding an explanation.

### Hypothesis

Why might this be happening?

State the relevant context, mechanism, and expected consequence. Also state what evidence would reduce confidence.

### Supporting Examples

Which observations are consistent with the hypothesis?

Examples must remain linked to their business context and source.

### Counterexamples

Where does the hypothesis fail, reverse, or require another condition?

Do not bury exceptions. They define the boundary of the idea.

### Open Questions

What remains unknown?

Every open question should identify why its answer would change a decision, framework, intervention, or interpretation.

### Evidence and Confidence

Use the system-wide evidence levels:

- `E0` — Assumption
- `E1` — Anecdote
- `E2` — Repeated observation
- `E3` — Measured relationship
- `E4` — Tested intervention
- `E5` — Replicated pattern

Use the system-wide confidence scale:

- `0.00–0.19` — Speculative
- `0.20–0.39` — Weak
- `0.40–0.59` — Provisional
- `0.60–0.79` — Supported
- `0.80–1.00` — Strong

No state is called “validated.” Evidence can support an idea without making it permanently correct.

## Content Philosophy

The primary job of content is not instruction.

It is perspective.

A successful piece helps someone notice a structure, behavior, relationship, or assumption they could not previously see. Any claimed behavioral change belongs downstream and requires evidence.

Content should:

- Begin with a real question.
- Distinguish observation from explanation.
- Use examples without pretending they are universal.
- State the idea's evidence level.
- Invite useful counterexamples.
- Return resulting observations to the research system.

Content should not:

- Manufacture certainty.
- Turn one business story into a universal law.
- Publish a framework only because it is easy to package.
- Reward agreement over useful disagreement.
- Produce attention that cannot return learning.

## Video Structure

Every research video should follow:

```text
Question
  ↓
Observation
  ↓
Example
  ↓
Provisional principle
  ↓
Open question
```

### Example

```text
Why do some cafés become third places?
  ↓
What repeated behavior did we observe?
  ↓
Which café or customer interaction makes it visible?
  ↓
What provisional idea might explain it?
  ↓
Where have you seen this work differently?
```

The final question should seek evidence, conditions, or counterexamples—not generic engagement.

## First Video Series

### Small Businesses 101

#### Purpose

Develop a shared language around what small businesses are, how they behave, and why they matter.

#### Research Questions

1. What is a small business?
2. What do businesses sell beyond products and services?
3. Why do some cafés become neighborhood infrastructure?
4. How does trust move through a local economy?
5. Why do customers become regulars?
6. In what sense are businesses social infrastructure?
7. Where does the owner end and the business begin?
8. Why do some partnerships compound while others die?
9. What do communities actually buy, exchange, or preserve?
10. How do small businesses shape culture?

Each episode requires:

- A registered research question
- At least one observation
- A declared evidence level
- A request for specific counterexamples
- A post-publication research review

## Interview Philosophy

We are not creating podcasts.

We are conducting investigations.

The role of the interviewer is to understand how the business works, what behavior repeats, where the owner's explanation is uncertain, and which questions deserve direct observation.

### Avoid

- “Tell us your story.”
- “What is the secret to your success?”
- “What advice would you give?”
- “How did you build such a great culture?”

These prompts invite rehearsed narratives and conclusions.

### Prefer

- “When did you notice something about the business that surprised you?”
- “What do customers consistently misunderstand?”
- “Which decision keeps returning to you?”
- “What behavior repeats even after you try to change it?”
- “What works when you are absent?”
- “What breaks when one person is unavailable?”
- “What evidence changed your mind?”
- “Where might your explanation be wrong?”

### Interview Output

Every completed interview should produce:

- A `CONVERSATION-*` record
- At least one observation or clearly labeled reported claim
- New or updated questions
- Supporting examples and counterexamples
- A decision about whether a framework should be reviewed

An interview need not improve a framework directly. It must improve the evidence available to one, challenge one, or show that no change is justified.

## Research Metrics

Traditional platform metrics remain useful as distribution and attention diagnostics:

- Views
- Watch time
- Shares
- Saves
- Followers

They do not measure research quality.

Canonical research metrics are defined in the [Metrics Dictionary](./layer-06-metrics-dictionary.md):

- `METRIC-QUALIFIED-QUESTIONS` — Qualified Questions Generated
- `METRIC-USEFUL-DISAGREEMENTS` — Useful Disagreements Captured
- `METRIC-BUSINESS-OWNERS-CONTACTED` — Business Owners Contacted
- `METRIC-INTERVIEWS-COMPLETED` — Research Interviews Completed
- `METRIC-NEW-OBSERVATIONS` — New Observations Recorded
- `METRIC-NEW-HYPOTHESES` — New Hypotheses Registered
- `METRIC-HYPOTHESES-SUPPORTED` — Hypotheses Supported
- `METRIC-FRAMEWORK-IMPROVEMENTS` — Framework Improvements Accepted
- `METRIC-NEW-VOCABULARY` — New Vocabulary Accepted
- `METRIC-INBOUND-INTERVIEW-REQUESTS` — Inbound Interview Requests
- `METRIC-BUSINESS-CONVERSATIONS` — Business Conversations Completed
- `METRIC-BUSINESS-AUDITS` — Business Audits Completed
- `METRIC-RETURNING-COMMENTERS` — Returning Commenters

Research metrics must be reviewed as a system. None is a standalone North Star.

## Knowledge States

These states classify the role of an idea. They do not replace evidence levels.

### Open Question

Something intentionally unresolved whose answer could change understanding or action.

Record ID: `QUESTION-*`

### Observation

Something noticed or recorded without a causal explanation.

Record ID: `OBS-*`

### Hypothesis

A falsifiable explanation or prediction that needs testing.

Record ID: `HYP-*`

### Supported Principle

A concise claim that has survived repeated observation or intervention within a stated boundary.

Record ID: `PRINCIPLE-*`

A principle must declare:

- Context
- Evidence level
- Confidence
- Supporting records
- Counterexamples
- Last review date

Principles remain editable and may become contested or retired.

## Research Repository

The logical repository should become:

```text
research/
├── businesses/
├── interviews/
├── concepts/
│   ├── community/
│   ├── trust/
│   ├── identity/
│   ├── partnerships/
│   ├── leadership/
│   └── operations/
├── observations/
├── hypotheses/
├── principles/
├── open-questions/
└── case-studies/
```

This is a proposed data repository, not a requirement to create empty folders. Records should be separated only when there is a real record to store and a retrieval need.

## Rules

### Rule 1

Never confuse confidence with correctness.

### Rule 2

Never publish certainty where only observation exists.

### Rule 3

Every piece of content should contribute to research, test distribution, or deliberately communicate established knowledge.

### Rule 4

Every interview must improve the evidence available to at least one question, hypothesis, principle, or framework.

### Rule 5

Every framework remains editable.

Nothing is finished. Everything is versioned.

### Rule 6

Record the disagreement that changes the boundary of an idea, not every argument in the comments.

### Rule 7

Never let platform incentives decide what The Hard Port believes.

## Long-Term Vision

The Hard Port becomes a public research institute dedicated to understanding small businesses.

```text
Content attracts conversation.
Conversation generates research.
Research improves frameworks.
Frameworks improve consulting.
Consulting generates structured knowledge.
Structured knowledge powers Tipper.
Tipper produces new evidence.
Everything feeds everything else.
```

The result is not a pile of content, consulting deliverables, or software features.

It is a compounding body of knowledge that becomes harder to fool and easier to apply.

## Validation Rules

- Public content links to a research question, observation, hypothesis, or supported principle.
- Published hypotheses declare evidence level and confidence.
- Interview claims remain distinguishable from direct observations.
- Counterexamples are retained.
- Framework changes are versioned and evidence-linked.
- Research metrics use the canonical definitions in Layer 06.
- Tipper patterns follow the promotion gates in Layer 08.

## Open Questions

- Which Small Businesses 101 episode should establish the first canonical object?
- What makes a disagreement useful enough to record?
- When should public comments become business conversations?
- What is the minimum evidence required before publishing a provisional principle?
- Which research records can be public by default?
- What cadence keeps research capture from becoming content administration?

## Version History

### 0.1.0 — 2026-07-18

- Established the public research philosophy and cycle.
- Defined Research, Content, and Conversation as connected operating systems.
- Defined content, video, interview, metric, knowledge-state, and repository standards.
- Harmonized evidence and confidence with the wider Consulting Intelligence System.
