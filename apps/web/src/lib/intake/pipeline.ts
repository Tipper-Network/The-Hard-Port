/**
 * Mirror apps/api/src/intake/pipeline.constants.ts (keep enums + option lists in sync).
 */
export enum LIFECYCLE_STATUSES__Enum {
  APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
  APPLICATION_UNDER_REVIEW = 'APPLICATION_UNDER_REVIEW',
  QUALIFICATION_INVITED = 'QUALIFICATION_INVITED',
  QUALIFICATION_ACTIVE = 'QUALIFICATION_ACTIVE',
  CONDITIONALLY_QUALIFIED = 'CONDITIONALLY_QUALIFIED',
  QUALIFIED = 'QUALIFIED',
  TOO_EARLY = 'TOO_EARLY',
  OUTSIDE_CURRENT_SCOPE = 'OUTSIDE_CURRENT_SCOPE',
  NOT_READY_FOR_THP = 'NOT_READY_FOR_THP',
  DIAGNOSTIC_PREPARATION = 'DIAGNOSTIC_PREPARATION',
  DIAGNOSTIC_ACTIVE = 'DIAGNOSTIC_ACTIVE',
  FINDINGS_READY = 'FINDINGS_READY',
  FINDINGS_PRESENTED = 'FINDINGS_PRESENTED',
  ENGAGEMENT_PROPOSED = 'ENGAGEMENT_PROPOSED',
  AGREEMENT_PENDING = 'AGREEMENT_PENDING',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  INTERVENTION_READY = 'INTERVENTION_READY',
  INTERVENTION_ACTIVE = 'INTERVENTION_ACTIVE',
  INTERVENTION_PAUSED = 'INTERVENTION_PAUSED',
  REFERRED = 'REFERRED',
  REASSESSMENT_ACTIVE = 'REASSESSMENT_ACTIVE',
  COMPLETED_LEVEL_2 = 'COMPLETED_LEVEL_2',
  COMPLETED_PARTIAL = 'COMPLETED_PARTIAL',
  TERMINATED = 'TERMINATED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum QUALIFICATION_RESULTS__Enum {
  QUALIFIED = 'QUALIFIED',
  CONDITIONALLY_QUALIFIED = 'CONDITIONALLY_QUALIFIED',
  TOO_EARLY = 'TOO_EARLY',
  OUTSIDE_CURRENT_SCOPE = 'OUTSIDE_CURRENT_SCOPE',
  NOT_READY_FOR_THP = 'NOT_READY_FOR_THP',
}

export type LifecycleStatus = keyof typeof LIFECYCLE_STATUSES__Enum
export type QualificationResult = keyof typeof QUALIFICATION_RESULTS__Enum

export const LIFECYCLE_STATUSES = Object.values(LIFECYCLE_STATUSES__Enum) as LifecycleStatus[]
export const QUALIFICATION_RESULTS = Object.values(QUALIFICATION_RESULTS__Enum) as QualificationResult[]

export type ApplicationRecord = {
  id: string
  submittedAt: string
  form: string
  version: string
  founderName: string
  businessName: string
  email: string
  contactPhone: string | null
  coreOffer: string
  payingCustomers: string
  deliveryHistory: string
  operatingStatus: string
  founderContinuation: string
  onlineActivity: string | null
  primaryProblems: string | null
  availableRecords: string | null
  discoverySource: string
  discoverySourceVideo: string | null
  willingnessExamine: boolean
  willingnessEvidence: boolean
  willingnessFeedback: boolean
  crisisIndicators: string | null
  privacyAck: boolean
  clientId: string | null
  lifecycleStatus: string
  qualificationResult: string | null
  maturityClassification: string | null
  assignedReviewer: string | null
  missingEvidence: string | null
  nextAction: string | null
  paymentStatus: string | null
  activeCapacitySlot: boolean
  notes: string | null
  userId: string | null
  visitorId: string | null
  createdAt: string
  updatedAt: string
}

export type ApplicationSummary = {
  id: string
  submittedAt: string
  founderName: string
  businessName: string
  email: string
  discoverySource: string
  clientId: string | null
  lifecycleStatus: string
  qualificationResult: string | null
  nextAction: string | null
  activeCapacitySlot: boolean
  assignedReviewer: string | null
  createdAt: string
}
