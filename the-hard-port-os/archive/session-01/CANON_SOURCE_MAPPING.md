---
id: REPORT-CANON-SOURCE-001
title: Canon Source Mapping
document_type: migration-report
status: active
version: 0.1.0
created: 2026-07-18
updated: 2026-07-18
authors:
  - The Hard Port
owners:
  - The Hard Port
confidence: medium
evidence_level: observational
canonicality: non-canonical
related_documents:
  - ../../canon/README.md
  - ../../KNOWLEDGE_ARCHITECTURE.md
supersedes: []
superseded_by: []
---

# Canon Source Mapping

## Purpose

Map current documents to likely Canon volumes and system areas without moving them or granting canonical status.

The mappings are recommendations for review. Ambiguity is retained where the repository does not yet support a conclusion.

## Action Meanings

- `retain as source`: Keep in place and cite when relevant.
- `review`: Resolve scope, status, evidence, or conflict before synthesis.
- `split`: Separate materially different document purposes.
- `merge`: Synthesize overlapping sources without deleting them.
- `supersede`: Replace operational use while retaining history.
- `archive`: Preserve only for provenance.
- `candidate for Canon`: Suitable for synthesis review, not automatic promotion.

## Intelligence Sources

### `intelligence/README.md`

- **Likely volumes:** I, IV, VIII
- **Likely system areas:** intelligence, evolution
- **Maturity:** Active index for a Version 0.1 working system
- **Action:** Retain as source; split lifecycle and evidence concepts across Volumes I and IV
- **Reason:** Defines IDs, evidence scales, operating rules, dependency order, and versioning
- **Ambiguity:** Previously called Intelligence canonical; the new Canon now owns synthesis authority

### `intelligence/layer-00-knowledge-engine.md`

- **Likely volumes:** I, III, IV
- **Likely system areas:** intelligence, evolution
- **Maturity:** Draft 0.1.0 with open questions
- **Action:** Candidate for Canon after review and merge with Layer 09
- **Reason:** Strongest current source for institutional knowledge flow
- **Ambiguity:** Its research pipeline differs from the public cycle in Layer 09

### `intelligence/layer-01-client-transformation-blueprint.md`

- **Likely volumes:** III, V
- **Likely system areas:** identity, entities, intelligence
- **Maturity:** Draft 0.1.0
- **Action:** Retain as source; review before synthesis
- **Reason:** Defines an applied transformation contract and observable conditions
- **Ambiguity:** Human identity transformation in PHIL-001 is explicitly distinct but related

### `intelligence/layer-02-business-ontology.md`

- **Likely volumes:** V, with cross-references to III and IV
- **Likely system areas:** entities, relationships, communities, activities, economy
- **Maturity:** Draft 0.1.0; structurally developed
- **Action:** Candidate for Canon; split concepts across Volume V chapters
- **Reason:** Primary source for business objects and relationship types
- **Ambiguity:** Ownership, governance, decisions, and process boundaries remain unresolved

### `intelligence/layer-03-business-maturity-model.md`

- **Likely volumes:** III, V, VIII
- **Likely system areas:** intelligence, evolution, entities
- **Maturity:** Draft 0.1.0
- **Action:** Retain as source; review and merge with Layers 01 and 04
- **Reason:** Defines capability states and transition rules
- **Ambiguity:** A business-wide stage may conflict with domain-specific maturity; finance is deferred

### `intelligence/layer-04-business-diagnostic-framework.md`

- **Likely volumes:** III, IV, V
- **Likely system areas:** intelligence, activities
- **Maturity:** Draft 0.1.0 with incomplete domain coverage
- **Action:** Retain as source; split method from domain content
- **Reason:** Defines observation, diagnosis, priority, and intervention gates
- **Ambiguity:** Knowledge, technology, measurement, finance, and environment are not complete modules

### `intelligence/layer-05-feedback-loop-library.md`

- **Likely volumes:** III, V
- **Likely system areas:** intelligence, relationships, economy, reputation
- **Maturity:** Draft hypothesis library
- **Action:** Retain as source; review each loop separately
- **Reason:** Supplies causal notation and candidate recurring structures
- **Ambiguity:** The file explicitly treats loops as hypotheses; none should become Canon doctrine wholesale

### `intelligence/layer-06-metrics-dictionary.md`

- **Likely volumes:** IV, V, VI
- **Likely system areas:** intelligence, reputation, economy, communities
- **Maturity:** Draft 0.3.0; most revised Intelligence layer
- **Action:** Candidate for Canon for measurement principles; retain formulas as working definitions
- **Reason:** Provides the single source for metrics and data-quality rules
- **Ambiguity:** Composite constructs are explicitly unvalidated

### `intelligence/layer-07-consulting-methodology.md`

- **Likely volumes:** I, III, IV
- **Likely system areas:** intelligence, activities, governance
- **Maturity:** Draft 0.1.0
- **Action:** Retain as source; split method principles from operational procedure
- **Reason:** Defines the gated engagement lifecycle
- **Ambiguity:** Much of the document may belong in SOPs rather than Canon

### `intelligence/layer-08-tipper-intelligence-framework.md`

- **Likely volumes:** VI, with cross-references to IV, VII, and VIII
- **Likely system areas:** intelligence, governance, communities, activities, evolution
- **Maturity:** Draft 0.2.0
- **Action:** Candidate for Canon only for boundaries and promotion logic; review against RFC-001
- **Reason:** Primary working source for Tipper's knowledge-engine role
- **Ambiguity:** Candidate capabilities are not committed features; community governance remains undecided

### `intelligence/layer-09-research-initiative.md`

- **Likely volumes:** I, II, IV
- **Likely system areas:** intelligence, activities
- **Maturity:** Active 0.1.0 with open questions and proposed structures
- **Action:** Retain as source; merge research method carefully with Layer 00
- **Reason:** Defines public research, content, conversation, interviews, and knowledge states
- **Ambiguity:** Active describes operational use, not Canon readiness

## Philosophy and Positioning Sources

### `philosophy/the-hard-port-charter.md`

- **Likely volumes:** II, VIII
- **Likely system areas:** identity, evolution
- **Maturity:** Exploratory 0.1.0; explicitly non-canonical
- **Action:** Retain as source; review
- **Reason:** Contains the broad institutional question and identity-transformation cycle
- **Ambiguity:** Its mission scope is broader than the current small-business mission

### `philosophy/README.md`

- **Likely volumes:** I
- **Likely system areas:** intelligence
- **Maturity:** Working boundary document
- **Action:** Retain as source; update authority language
- **Reason:** Defines philosophy as exploratory input
- **Ambiguity:** Current wording defers to Intelligence rather than the new Canon

### `positioning/client-transformation-narrative.md`

- **Likely volumes:** None directly; possible context for III
- **Likely system areas:** identity
- **Maturity:** Unversioned positioning draft
- **Action:** Retain as source; review for drift
- **Reason:** Translates Layer 01 into audience and client language
- **Ambiguity:** Client-facing mission differs in emphasis from the institutional mission

### `positioning/README.md`

- **Likely volumes:** I
- **Likely system areas:** intelligence
- **Maturity:** Working boundary document
- **Action:** Retain as source; update authority language
- **Reason:** Defines positioning as downstream translation
- **Ambiguity:** Operational conflict resolution still points only to Intelligence

## Research Sources

### `research/CURRENT_RESEARCH_AGENDA.md`

- **Likely volumes:** II, III, IV, V
- **Likely system areas:** intelligence
- **Maturity:** Active working agenda; questions are not individual records
- **Action:** Retain as source; split into `QUESTION-*` records later
- **Reason:** Identifies unresolved epistemology, organizational intelligence, and business questions
- **Ambiguity:** Agenda priority and ownership are not recorded

### `research/RESEARCH-PROGRAM-001.md`

- **Likely volumes:** II, III, IV
- **Likely system areas:** identity, intelligence
- **Maturity:** Exploratory 0.1.0
- **Action:** Retain as source; review
- **Reason:** Bounds identity and self-authorship research to small-business contexts
- **Ambiguity:** Required definitions do not yet exist

### `research/hypotheses/HYP-001-external-system-shaping-behavior.md`

- **Likely volumes:** II, III
- **Likely system areas:** identity, intelligence
- **Maturity:** Active 0.1.0; evidence E0; confidence 0.10
- **Action:** Retain as source; not a Canon candidate
- **Reason:** Properly falsifiable but has no attached evidence
- **Ambiguity:** Identity mechanisms may add no value beyond structural explanations

### `research/README.md` and research subfolder READMEs

- **Likely volumes:** I, IV
- **Likely system areas:** intelligence
- **Maturity:** Working indexes; most are placeholders
- **Action:** Retain as source; review routing rules later
- **Reason:** Establish current research buckets
- **Ambiguity:** Findings lack a dedicated folder and agenda questions are not normalized

## RFC and Decision Sources

### `rfcs/RFC-001-tipper-community-infrastructure.md`

- **Likely volumes:** VI, VII
- **Likely system areas:** communities, governance, relationships, membership
- **Maturity:** Draft; evidence E0; decision pending
- **Action:** Retain as source; review
- **Reason:** Proposes community governance and permission infrastructure
- **Ambiguity:** May describe a separate product boundary rather than Tipper

### `rfcs/README.md` and `rfcs/RFC_TEMPLATE.md`

- **Likely volumes:** I
- **Likely system areas:** evolution
- **Maturity:** Working process and minimal template
- **Action:** Retain as source; review metadata alignment
- **Reason:** Defines current proposal process
- **Ambiguity:** RFC-001 does not use the new metadata standard

### `adrs/README.md` and `adrs/ADR_TEMPLATE.md`

- **Likely volumes:** I, VII, VIII
- **Likely system areas:** governance, evolution
- **Maturity:** Legacy technical decision scaffold; no instances
- **Action:** Retain as source; clarify as technical subset
- **Reason:** Preserves technical architecture decision history
- **Ambiguity:** Template defaults to accepted without an explicit review gate

## Session 01 Archive Sources

### `archive/session-01/raw/THE_HARD_PORT_OS_DRAFT.md`

- **Likely volumes:** II, VIII
- **Likely system areas:** identity, evolution
- **Maturity:** Raw and superseded
- **Action:** Archive
- **Reason:** Provenance for PHIL-001
- **Ambiguity:** None operational; raw language must not be cited as current authority

### `archive/session-01/raw/RESEARCH_PROGRAM_001.md`

- **Likely volumes:** II, IV, VI
- **Likely system areas:** identity, intelligence
- **Maturity:** Raw and superseded
- **Action:** Archive
- **Reason:** Provenance for Research Program 001 and HYP-001
- **Ambiguity:** “Tipper captures living behavioral data” was softened during migration

### `archive/session-01/raw/TIPPER_FOUNDATIONAL_RELATIONSHIP.md`

- **Likely volumes:** VI, VII
- **Likely system areas:** communities, governance, relationships
- **Maturity:** Raw and superseded
- **Action:** Archive
- **Reason:** Provenance for RFC-001
- **Ambiguity:** Culture and community-rule claims remain unsupported

### `archive/session-01/raw/NEXT_STEPS.md`

- **Likely volumes:** I, II, III, IV, V, VI
- **Likely system areas:** intelligence
- **Maturity:** Raw session agenda; partially superseded
- **Action:** Archive
- **Reason:** Provenance for the current research agenda
- **Ambiguity:** Some items appear covered by Intelligence layers but were never explicitly decided complete

## Design-System Sources

### `design-system/README.md`

- **Likely volumes:** I
- **Likely system areas:** identity, activities
- **Maturity:** Active index with known live-site conflicts
- **Action:** Retain as source; review
- **Reason:** Maps a substantial working documentation area omitted from the old root map
- **Ambiguity:** Authority relative to live application tokens is unresolved

### `design-system/RULES.md`

- **Likely volumes:** I, VII
- **Likely system areas:** identity, governance
- **Maturity:** Mixed enforced, open, and partial rules
- **Action:** Retain as source; split accepted rules from open decisions
- **Reason:** Contains visual governance and implementation constraints
- **Ambiguity:** Some rules are enforced in code while others are reference-only

### `design-system/01-ia-sitemap.md`

- **Likely volumes:** I
- **Likely system areas:** activities, identity
- **Maturity:** Working information-architecture reference
- **Action:** Retain as source; review
- **Reason:** Documents funnel structure and known gaps
- **Ambiguity:** Live navigation differs from the documented sequence

### `design-system/02-color-tokens.md`

- **Likely volumes:** None directly
- **Likely system areas:** identity
- **Maturity:** Working reference with implementation conflicts
- **Action:** Retain as source; review
- **Reason:** Candidate source for an identity system specification
- **Ambiguity:** Conflicts with shipped application tokens

### `design-system/03-typography.md`

- **Likely volumes:** None directly
- **Likely system areas:** identity
- **Maturity:** Working reference with implementation conflicts
- **Action:** Retain as source; review
- **Reason:** Candidate source for an identity system specification
- **Ambiguity:** Conflicts with shipped application typography

### `design-system/04-spacing.md`

- **Likely volumes:** None directly
- **Likely system areas:** identity
- **Maturity:** Working reference
- **Action:** Retain as source
- **Reason:** Operational visual-system input
- **Ambiguity:** Acceptance and live-code conformance are unrecorded

### `design-system/05-buttons-cta.md`

- **Likely volumes:** None directly
- **Likely system areas:** identity, activities
- **Maturity:** Working reference
- **Action:** Retain as source; review
- **Reason:** Defines interaction and call-to-action patterns
- **Ambiguity:** Brand and conversion rules may belong in separate systems

### `design-system/06-icons-motifs.md`

- **Likely volumes:** None directly
- **Likely system areas:** identity
- **Maturity:** Working reference
- **Action:** Retain as source
- **Reason:** Visual identity input
- **Ambiguity:** No accepted identity specification links it

### `design-system/07-depth-scroll-intensity.md`

- **Likely volumes:** None directly
- **Likely system areas:** identity, activities
- **Maturity:** Partially implemented reference
- **Action:** Retain as source; review
- **Reason:** Describes behavior across page depth
- **Ambiguity:** Concrete tokens and implementation status are incomplete

### `design-system/08-wireframe-patterns.md`

- **Likely volumes:** None directly
- **Likely system areas:** identity, activities
- **Maturity:** Working reference
- **Action:** Retain as source
- **Reason:** Interface pattern source
- **Ambiguity:** Reference patterns may not match current code

### `design-system/09-hifi-components.md`

- **Likely volumes:** None directly
- **Likely system areas:** identity, activities
- **Maturity:** Working reference
- **Action:** Retain as source; review
- **Reason:** Candidate input for component system specifications
- **Ambiguity:** Code implementation authority is unresolved

### `design-system/Hard Port - Design System & Wireframes.dc.html`

- **Likely volumes:** None
- **Likely system areas:** identity
- **Maturity:** Original design source
- **Action:** Retain as source
- **Reason:** Provenance for extracted design documentation
- **Ambiguity:** It is reference material, not operational truth

### `design-system/support.js`

- **Likely volumes:** None
- **Likely system areas:** activities
- **Maturity:** Supporting implementation artifact
- **Action:** Retain as source
- **Reason:** Supports the original design document
- **Ambiguity:** Not a knowledge document

## Evidence and Output Folders

### `businesses/README.md`, `interviews/README.md`, `case-studies/README.md`, and `content/README.md`

- **Likely volumes:** I, IV
- **Likely system areas:** activities, intelligence
- **Maturity:** Placeholder indexes
- **Action:** Retain as source; review
- **Reason:** Reserve field evidence and output locations
- **Ambiguity:** Routing between business records, audits, interviews, case studies, and research observations is not defined

## Cross-Cutting Ambiguities

1. The broad conscious-systems question and the bounded small-business mission are not yet reconciled.
2. Layer 00 and Layer 09 define related but different research cycles.
3. PHIL-001 identity transformation and Layer 01 business transformation remain separate without an integration rule.
4. Governance and Evolution volumes have weak source coverage.
5. RFC-001 is pending and cannot support canonical Tipper governance claims.
6. Layer 08 candidate capabilities are research areas, not accepted protocol.
7. Evidence and confidence use a legacy E0–E5/numeric model while the new metadata standard introduces controlled descriptive values.
8. Existing Intelligence layers are mostly drafts and all contain open questions.
9. Design-system documentation conflicts with live implementation in places.
10. No existing decision record establishes the new repository architecture; this owner-directed task creates structure but no fictional `DEC-*` file.

## Recommendation

Retain every source in place. Review this mapping before developing Canon content. Begin with Volume I, Chapter 02 because the repository must agree on how knowledge becomes authoritative before synthesizing domain claims.

## Revision History

### 0.1.0 — 2026-07-18

- Completed the first non-destructive source-to-Canon and source-to-system mapping.
