---
id: DEC-003
title: Canon is completion of the designated loop
status: accepted
version: 0.1.1
date: 2026-07-18
decision_owners:
  - The Hard Port
related_rfc: []
related_systems: []
related_research: []
related_documents:
  - ../KNOWLEDGE_ARCHITECTURE.md
  - ../canon/README.md
  - ../canon/volume-01-operating-system/02-knowledge-architecture.md
  - ../templates/DOCUMENT_METADATA_STANDARD.md
supersedes: []
superseded_by: []
---

# DEC-003 — Canon is completion of the designated loop

## Context

Canon chapters and some architecture docs can be written fluently by assistants. Without a gate, prose quality and repository location can be mistaken for authority. A Decision Record alone can also be mistaken for the whole gate if treated as an editorial stamp.

## Decision

Things become canonical when they finish their designated loop.

Canon is not a label applied to unfinished work. It is the completion state of the knowledge path:

```text
Research
  ↓
RFC
  ↓
Decision
  ↓
System
  ↓
Canon
```

Nothing becomes Canon because an assistant wrote it, because a file sits under `canon/`, or because a Decision exists while earlier or later stages of the loop remain unfinished.

Minimum requirements before canonicity:

1. The designated loop for that material has been completed (or a Decision explicitly scopes which stages are not applicable and why).
2. Relevant research and contradictions have been reviewed (or explicitly scoped as not applicable for a pure governance decision).
3. An RFC or equivalent proposal has been reviewed when the change is material.
4. An accepted Decision Record (`DEC-*`) affirms the claim, model, or promotion.
5. Where the claim is operational, a current system specification matches it or the Decision states that no system change is required yet.
6. A named human decision owner accepts that the loop is complete and the Canon status may change. Instruction files and chat sessions do not grant canonicity.

**Forward-looking rule:** no new `canonicality: canonical` marks without a completed designated loop and at least one accepted `DEC-*` citing that completion.

**Retrospective rule:** documents already marked `canonical` without a completed loop (for example early architecture standards) remain operationally in force but require retrospective Decision Records or explicit reaffirmation before they may be treated as settled Canon doctrine in later volume synthesis.

## Reasoning

Research investigates. RFCs propose. Decisions accept. Systems operationalize. Canon synthesizes what has finished that loop.

Skipping stages collapses proposal into authority. Treating Decision Records as the whole ceremony also collapses the loop into a stamp.

## Alternatives Considered

| Alternative | Why not selected |
|---|---|
| Canon by editorial polish or age | Confuses writing quality with acceptance |
| Canon by assistant output | No accountable human owner |
| Canon directly from research findings | Skips proposal, alternatives, and acceptance |
| Canon from system specs alone | Operational reality without institutional acceptance |

## Consequences

- Volume I Chapter 02 remains `candidate` until its designated loop is complete and canonicity review cites this Decision.
- Assistants may draft candidate chapters; they may not flip `canonicality` to `canonical`.
- Decision Records record acceptance inside the loop; they do not replace unfinished research, RFC, or system stages.
- Incomplete loops stay `candidate` or earlier, even if prose is strong.

## Risks

- Overhead for small clarifications — mitigate by allowing governance-only Decisions that explicitly scope which loop stages are not applicable.
- Existing premature `canonical` marks may confuse readers until retrospective review.
- People may treat “we wrote a DEC” as loop completion — validation must check the whole path.

## Validation Conditions

- Canonicity review checklist verifies loop completion, not only a Decision Record citation.
- Spot-check: any new `canonicality: canonical` change links a `DEC-*` and states which loop stages were completed or scoped out.
- Chapter 02 validation criteria reference this Decision.

## Related Documents

- [`../KNOWLEDGE_ARCHITECTURE.md`](../KNOWLEDGE_ARCHITECTURE.md)
- [`../canon/README.md`](../canon/README.md)
- [`../canon/volume-01-operating-system/02-knowledge-architecture.md`](../canon/volume-01-operating-system/02-knowledge-architecture.md)
- [`DEC-001-separate-knowledge-and-people-journeys.md`](./DEC-001-separate-knowledge-and-people-journeys.md)
- [`DEC-002-descriptive-evidence-vocabulary.md`](./DEC-002-descriptive-evidence-vocabulary.md)

## Revision History

### 0.1.1 — 2026-07-18

- Clarified: things become canonical when they finish their designated loop; Decision Records record that completion, they do not substitute for it.

### 0.1.0 — 2026-07-18

- Accepted: Canon requires Research → RFC → Decision → System → Canon, with human Decision owners.
