/**
 * Mirror apps/api/src/intake/maturity-classifications.constants.ts (keep in sync).
 */
export enum MATURITY_CLASSIFICATIONS__Enum {
  SURVIVAL = 'SURVIVAL',
  STABLE = 'STABLE',
  GROWTH_READY = 'GROWTH_READY',
}

export type MaturityClassification = keyof typeof MATURITY_CLASSIFICATIONS__Enum
