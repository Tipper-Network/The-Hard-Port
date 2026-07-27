/**
 * TODO(scaffold): mirror apps/api/src/intake/maturity-classifications.constants.ts
 */
export const MATURITY_CLASSIFICATIONS = [
  // _fill — e.g. 'survival', 'stable', 'growth_ready'
] as const

export type MaturityClassification = (typeof MATURITY_CLASSIFICATIONS)[number]
