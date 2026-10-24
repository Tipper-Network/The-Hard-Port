/**
 * TODO(scaffold): replace free-text maturityClassification with enum values.
 * Ops doc: the-hard-port-os/operations/launch-scaffold/P03-intake-ops-loop.md
 */
export enum MATURITY_CLASSIFICATIONS__Enum {
  // _fill — e.g. 'survival', 'stable', 'growth_ready'
  SURVIVAL = 'SURVIVAL',
  STABLE = 'STABLE',
  GROWTH_READY = 'GROWTH_READY',
}

export type MaturityClassification = keyof typeof MATURITY_CLASSIFICATIONS__Enum
