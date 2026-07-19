# Consulting Intelligence System

> Version 0.1 of The Hard Port's operating system for understanding, diagnosing, improving, and learning from small businesses.

## Repository Role

`intelligence/` is a working framework and consulting-intelligence layer. It defines current models, terminology, diagnostics, metrics, and methods used by The Hard Port.

It is a primary source for [`../canon/`](../canon/), but it is not the Canon publication layer. Draft or active Intelligence documents become Canon sources only through review, citation, and synthesis.

## Mission

> Understand how small businesses work.

The Hard Port is a research institute disguised as a media company. Media attracts businesses and generates questions. Consulting tests ideas in operating reality. Frameworks codify what survives. Structured data preserves the evidence. Tipper operationalizes supported knowledge and returns new evidence.

These are not separate businesses. They are stages of [The Hard Port Knowledge Engine](./layer-00-knowledge-engine.md).

## System Objective

Create a consistent language and evidence trail that allows The Hard Port to:

1. Describe a business as a living system.
2. Observe it without prematurely prescribing solutions.
3. Diagnose constraints and dependencies from evidence.
4. Select and implement measurable interventions.
5. Retain what was learned for future engagements.
6. Promote supported patterns into Tipper capabilities.

## Core Operating Cycle

```text
Observe
  ↓
Model
  ↓
Diagnose
  ↓
Prioritize
  ↓
Intervene
  ↓
Measure
  ↓
Learn
  ↓
Repeat
```

Every engagement is an experiment. Every recommendation is a hypothesis. Every implementation is an intervention. Every result must either increase confidence, reduce confidence, or expose an unknown.

## Document Map

0. [The Hard Port Knowledge Engine](./layer-00-knowledge-engine.md) — defines the mission, institutional model, research pipeline, and learning loop.
1. [Client Transformation Blueprint](./layer-01-client-transformation-blueprint.md) — defines the business and owner transformation the system exists to produce.
2. [Business Ontology](./layer-02-business-ontology.md) — defines the current working objects and relationships inside a business.
3. [Business Maturity Model](./layer-03-business-maturity-model.md) — defines observable capability states by domain.
4. [Business Diagnostic Framework](./layer-04-business-diagnostic-framework.md) — separates observation, diagnosis, prioritization, and intervention.
5. [Feedback Loop Library](./layer-05-feedback-loop-library.md) — records recurring causal structures and leverage points.
6. [Metrics Dictionary](./layer-06-metrics-dictionary.md) — standardizes measurements and composite constructs.
7. [Consulting Methodology](./layer-07-consulting-methodology.md) — defines the gated engagement lifecycle.
8. [Tipper Intelligence Framework](./layer-08-tipper-intelligence-framework.md) — promotes supported consulting patterns into software opportunities.
9. [The Hard Port Research Initiative](./layer-09-research-initiative.md) — defines the public research, content, conversation, interview, and publishing system.

## Dependency Order

```text
Knowledge Engine
  ↓
Transformation Blueprint
  ↓
Business Ontology
  ↓
Maturity Model
  ↓
Diagnostic Framework
  ↓
Feedback Loop Library
  ↓
Metrics Dictionary
  ↓
Consulting Methodology
  ↓
Tipper Intelligence
  ↓
Research Initiative
```

Later documents may reference earlier documents. Earlier documents must not depend on concepts defined only in later layers.

## Record ID Conventions

- `OBJ-*` — ontology object
- `REL-*` — ontology relationship
- `QUESTION-*` — qualified research question
- `RESEARCH-*` — investigated research record
- `CONVERSATION-*` — business conversation
- `HYP-*` — hypothesis
- `PRINCIPLE-*` — supported principle
- `AUDIT-*` — business audit
- `IMPROVEMENT-*` — framework improvement
- `STATE-*` — maturity state
- `DOMAIN-*` — diagnostic domain
- `OBS-*` — observation
- `DIAG-*` — diagnosis
- `LOOP-*` — feedback loop
- `METRIC-*` — metric
- `CONSTRUCT-*` — composite measurement construct
- `METHOD-*` — consulting stage
- `INT-*` — intervention
- `PATTERN-*` — learned pattern
- `OPP-*` — software opportunity

IDs are permanent. Rename the display label when language improves; do not recycle or silently change an ID.

## Evidence Levels

Controlling vocabulary ([`DEC-002`](../decisions/DEC-002-descriptive-evidence-vocabulary.md); [`../templates/DOCUMENT_METADATA_STANDARD.md`](../templates/DOCUMENT_METADATA_STANDARD.md)):

### none

No supporting evidence has been attached. Plausible assumptions may guide observation; they are not client claims.

### anecdotal

One or more reported examples. Useful as a hypothesis seed.

### observational

Structured observations support the claim (including repeated or corroborated observation, and measured relationships without a tested intervention).

### experimental

A bounded intervention or experiment produced relevant evidence in a defined context.

### replicated

Comparable evidence has repeated across businesses or contexts.

### operational

The model has demonstrated continued use under operating conditions.

#### Legacy E0–E5 mapping (read-only)

Do not use `E0`–`E5` in new documents.

| Legacy | Use |
|---|---|
| E0 | `none` |
| E1 | `anecdotal` |
| E2 | `observational` |
| E3 | `observational` or `experimental` (see DEC-002) |
| E4 | `experimental` |
| E5 | `replicated` |

## Confidence Scale

- `0.00–0.19` — speculative
- `0.20–0.39` — weak
- `0.40–0.59` — provisional
- `0.60–0.79` — supported
- `0.80–1.00` — strong

Confidence is not certainty. Every confidence score must name its evidence level, sample, context, and known counterexamples.

## Shared Operating Rules

1. Record observations before interpretations.
2. Keep facts, reports, assumptions, and hypotheses distinguishable.
3. Do not prescribe an intervention without a diagnostic record.
4. Do not claim improvement without a baseline and follow-up measurement.
5. Do not reduce a business to one maturity score.
6. Record delays and unintended effects, not only intended outcomes.
7. Preserve contradictory evidence.
8. Promote patterns into software only after human interventions generate evidence.

## Daily Idea Classification

No idea enters the system unclassified.

```markdown
### IDEA-YYYY-MM-DD-NN — Short Name

- Object:
- Problem:
- Observed behavior:
- Metric:
- Feedback loop:
- Possible intervention:
- Evidence:
- Confidence:
- Destination document:
- Next action:
```

If an idea cannot answer these fields, it remains an untested note rather than becoming a service, recommendation, or feature.

## Versioning Rules

- Patch version: wording, examples, or clarifications that do not change the model.
- Minor version: new objects, metrics, loops, stages, or record fields.
- Major version: incompatible changes to definitions, relationships, or methodology gates.
- Every document maintains its own revision log.
- System-level changes must update this index and all affected cross-references.

## Version 0.1 Boundary

This version establishes the knowledge engine and its thinking infrastructure. It does not define consulting packages, sales material, websites, workshops, CRM configuration, or Tipper onboarding. Those are downstream outputs and should only be designed after this system can support them.
