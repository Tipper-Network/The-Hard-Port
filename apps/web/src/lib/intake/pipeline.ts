export const LIFECYCLE_STATUSES = [
  'application_submitted',
  'application_under_review',
  'qualification_invited',
  'qualification_active',
  'conditionally_qualified',
  'qualified',
  'too_early',
  'outside_current_scope',
  'not_ready_for_thp',
  'diagnostic_preparation',
  'diagnostic_active',
  'findings_ready',
  'findings_presented',
  'engagement_proposed',
  'agreement_pending',
  'payment_pending',
  'intervention_ready',
  'intervention_active',
  'intervention_paused',
  'referred',
  'reassessment_active',
  'completed_level_2',
  'completed_partial',
  'terminated',
  'withdrawn',
] as const

export const QUALIFICATION_RESULTS = [
  'qualified',
  'conditionally_qualified',
  'too_early',
  'outside_current_scope',
  'not_ready_for_thp',
] as const

export type LifecycleStatus = (typeof LIFECYCLE_STATUSES)[number]
export type QualificationResult = (typeof QUALIFICATION_RESULTS)[number]

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
