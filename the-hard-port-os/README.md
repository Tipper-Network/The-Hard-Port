# The Hard Port OS

The Hard Port OS is the institutional memory and knowledge-production repository for The Hard Port.

The Hard Port studies how conscious beings construct, inhabit, transcend, and reconstruct the systems that define their reality. Small businesses are the first bounded research environment.

Philosophical assumptions behind that inquiry are defined in [`docs/00-foundations/THP-FOUNDATIONAL-PHILOSOPHY.md`](./docs/00-foundations/THP-FOUNDATIONAL-PHILOSOPHY.md). Institutional purpose and boundaries are defined in [`docs/00-foundations/THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md`](./docs/00-foundations/THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md). This overview does not duplicate those definitions.

## Core Principle

```text
Reality
  ↓
Research
  ↓
Frameworks
  ↓
Decisions
  ↓
Systems and execution
  ↓
Canonical synthesis
  ↓
Tipper and other implementations
  ↓
Reality
```

## Two Repository Layers

### Working Knowledge-Production Layer

Research, hypotheses, observations, contradictions, RFCs, decisions, specifications, SOPs, field records, and implementations are created and challenged here.

Working documents may be active and useful without being canonical.

### Canonical Publication Layer

[`canon/`](./canon/) is The Hard Port Canon: the authoritative synthesis of knowledge that has become sufficiently stable, accepted, bounded, and source-backed.

The Canon references the working layer. It does not replace it.

## Repository Map

```text
the-hard-port-os/
├── README.md
├── cursor.md
├── CURRENT_FOCUS.md
├── active/
│   └── CURRENT_TASK.md
├── KNOWLEDGE_ARCHITECTURE.md
├── docs/
│   ├── 00-foundations/
│   │   ├── THP-FOUNDATIONAL-PHILOSOPHY.md
│   │   └── THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md
│   └── knowledge-system/
│       └── research-methodology.md
├── REPOSITORY_VALIDATION.md
├── canon/
├── systems/
├── decisions/
├── intelligence/
├── philosophy/
├── positioning/
├── research/
│   ├── questions/
│   ├── observations/
│   ├── hypotheses/
│   ├── principles/
│   ├── contradictions/
│   ├── concepts/
│   └── experiments/
├── rfcs/
├── adrs/
├── sops/
├── businesses/
├── interviews/
├── case-studies/
├── content/
├── design-system/
├── website/
├── templates/
└── archive/
```

## Assistant Instruction Layers

- [`cursor.md`](./cursor.md) — permanent instructions for AI assistants
- [`CURRENT_FOCUS.md`](./CURRENT_FOCUS.md) — current milestone
- [`active/CURRENT_TASK.md`](./active/CURRENT_TASK.md) — single session assignment
- [`archive/session-XX/`](./archive/) — completed tasks and session notes

## Primary References

- [Permanent Assistant Instructions](./cursor.md)
- [Current Focus](./CURRENT_FOCUS.md)
- [Current Task](./active/CURRENT_TASK.md)
- [The Hard Port Canon](./canon/README.md)
- [Knowledge Architecture](./KNOWLEDGE_ARCHITECTURE.md)
- [Documentation Index](./docs/README.md)
- [THP Foundational Philosophy](./docs/00-foundations/THP-FOUNDATIONAL-PHILOSOPHY.md) — candidate; philosophical assumptions
- [THP Institutional Purpose and Boundaries](./docs/00-foundations/THP-INSTITUTIONAL-PURPOSE-AND-BOUNDARIES.md) — candidate; institutional scope
- [Research Methodology](./docs/knowledge-system/research-methodology.md) — authoritative; placeholder
- [Research](./research/README.md)
- [Systems](./systems/README.md)
- [RFCs](./rfcs/README.md)
- [Decisions](./decisions/README.md)
- [SOPs](./sops/)
- [Templates](./templates/)
- [Archive](./archive/)

## How Knowledge Becomes Canonical

```text
Question
→ Research Program
→ Hypothesis
→ Experiment
→ Observation
→ Contradiction
→ Finding
→ Principle
→ RFC
→ Decision
→ System Specification
→ SOP or Implementation
→ Canonical Synthesis
→ Revision or Evolution
```

The lifecycle structure, document types, folders, and stage placement are defined in [`KNOWLEDGE_ARCHITECTURE.md`](./KNOWLEDGE_ARCHITECTURE.md). How knowledge progresses through those stages — operational methodology — will be defined in [`docs/knowledge-system/research-methodology.md`](./docs/knowledge-system/research-methodology.md).

No source becomes canonical because it exists, is polished, or appears in `intelligence/`.

## Where New Work Belongs

- New uncertainty → `research/questions/`
- Coordinated inquiry → `research/`
- Testable explanation → `research/hypotheses/`
- Bounded test → `research/experiments/`
- Recorded evidence → `research/observations/`
- Counterevidence → `research/contradictions/`
- Proposed meaningful change → `rfcs/`
- Accepted institutional decision → `decisions/`
- Accepted technical architecture decision → `adrs/`
- Current operational model → `systems/`
- Repeatable execution → `sops/`
- Reviewed authoritative synthesis → `canon/`
- Superseded or session-specific material → `archive/`

## Working Agreement

- The repository is the source of record for this knowledge architecture.
- Every meaningful change should be versioned.
- Source status, evidence, confidence, and canonicality remain distinguishable.
- Existing sources are preserved unless a separate migration explicitly supersedes them.
