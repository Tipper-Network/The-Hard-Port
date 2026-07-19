---
id: DEC-001
title: Separate knowledge lifecycle from people journey
status: accepted
version: 0.1.0
date: 2026-07-18
decision_owners:
  - The Hard Port
related_rfc: []
related_systems:
  - ../systems/intelligence/
related_research: []
related_documents:
  - ../KNOWLEDGE_ARCHITECTURE.md
  - ../intelligence/layer-00-knowledge-engine.md
  - ../canon/volume-01-operating-system/02-knowledge-architecture.md
supersedes: []
superseded_by: []
---

# DEC-001 — Separate knowledge lifecycle from people journey

## Context

Volume I Chapter 02 and Layer 00 appeared to present competing models:

1. The 14-stage knowledge lifecycle (`Question → … → Canon`)
2. The Media → consulting/Tipper institutional loop in Layer 00

Treating them as rival architectures created false conflict and risked nesting or deleting one into the other.

## Decision

These models describe different objects and must remain separate diagrams.

1. **Knowledge lifecycle** — how claims, evidence, proposals, decisions, systems, and Canon synthesis move. Owned by [`../KNOWLEDGE_ARCHITECTURE.md`](../KNOWLEDGE_ARCHITECTURE.md) and Canon Volume I Chapter 02.
2. **People / customer journey** — how attention, owners, clients, engagements, and Tipper participation move through The Hard Port's operating surface. Layer 00's Media → conversations → consulting → frameworks → Tipper loop is this class of model: a journey of people and engagements that produces access and evidence, not a substitute knowledge lifecycle.

They must not compete. They must not be collapsed into one flowchart.

Evidence produced by the people journey enters the knowledge lifecycle at the appropriate stage (typically Observation, Contradiction, Experiment, or Finding). Tipper remains an implementation and evidence-return instrument inside the people journey; it does not replace research, RFC, decision, or Canon stages.

## Reasoning

- A knowledge lifecycle answers: what do we claim, how supported is it, and what may become operational or canonical?
- A people journey answers: how do humans move through attention, transformation work, client relationship, and product participation?
- Forcing one diagram to contain both conflates epistemology with go-to-market and engagement design.

## Alternatives Considered

| Alternative | Why not selected |
|---|---|
| Nest Layer 00 under the 14-stage lifecycle | Treats engagement stages as knowledge stages; obscures both |
| Replace Layer 00 with the knowledge lifecycle | Deletes the institutional engagement model |
| Merge into a single hybrid flowchart | Preserves the confusion this decision removes |

## Consequences

- Architecture docs must label which diagram they are drawing.
- Layer 00 remains valid as a people/engagement model feeding the knowledge engine.
- Canon chapters must not require Layer 00 stages to map 1:1 onto Question/Hypothesis/RFC stages.
- Cross-links are allowed; identity of stages is not.

## Risks

- Readers may still treat "knowledge engine" branding in Layer 00 as identical to the knowledge lifecycle. Naming discipline is required.
- Future product diagrams may reintroduce rivalry unless they cite this decision.

## Validation Conditions

- Chapter 02 and Layer 00 each state that the other model is complementary, not competing.
- No new Canon or system doc presents a single flowchart that claims to be both.
- Tipper evidence-return is described as an input to the knowledge lifecycle, not as a Canon stage.

## Related Documents

- [`../KNOWLEDGE_ARCHITECTURE.md`](../KNOWLEDGE_ARCHITECTURE.md)
- [`../intelligence/layer-00-knowledge-engine.md`](../intelligence/layer-00-knowledge-engine.md)
- [`../canon/volume-01-operating-system/02-knowledge-architecture.md`](../canon/volume-01-operating-system/02-knowledge-architecture.md)
- [`DEC-003-canon-requires-decision-record.md`](./DEC-003-canon-requires-decision-record.md)

## Revision History

### 0.1.0 — 2026-07-18

- Accepted: knowledge lifecycle and people journey are distinct models.
