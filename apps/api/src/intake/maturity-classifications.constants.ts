/**
 * TODO(scaffold): replace free-text maturityClassification with enum values.
 * Ops doc: the-hard-port-os/operations/launch-scaffold/P03-intake-ops-loop.md
 */
export const MATURITY_CLASSIFICATIONS = [
  // _fill — e.g. 'survival', 'stable', 'growth_ready'
] as const

export type MaturityClassification = (typeof MATURITY_CLASSIFICATIONS)[number]
