export type IntakePayload = {
  submittedAt: string
  form: string
  version: string
  founderName: string
  businessName: string
  email: string
  contactPhone: string
  coreOffer: string
  payingCustomers: string
  deliveryHistory: string
  operatingStatus: string
  founderContinuation: string
  onlineActivity: string
  primaryProblems: string
  availableRecords: string
  discoverySource: string
  willingnessExamine: boolean
  willingnessEvidence: boolean
  willingnessFeedback: boolean
  crisisIndicators: string
  privacyAck: boolean
  visitorId?: string
  locale?: string
  timezone?: string
  phoneCountryCode?: string
}

const REQUIRED_STRING_FIELDS = [
  'founderName',
  'businessName',
  'email',
  'coreOffer',
  'payingCustomers',
  'deliveryHistory',
  'operatingStatus',
  'founderContinuation',
  'discoverySource',
] as const satisfies Readonly<(keyof IntakePayload)[]>

const REQUIRED_BOOLEAN_FIELDS = [
  'willingnessExamine',
  'willingnessEvidence',
  'willingnessFeedback',
  'privacyAck',
] as const satisfies Readonly<(keyof IntakePayload)[]>

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function validateIntakePayload(
  data: unknown,
): { ok: true; payload: IntakePayload } | { ok: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Invalid payload' }
  }

  const record = data as Record<string, unknown>

  for (const field of REQUIRED_STRING_FIELDS) {
    if (!isNonEmptyString(record[field])) {
      return { ok: false, error: `Missing or invalid field: ${field}` }
    }
  }

  for (const field of REQUIRED_BOOLEAN_FIELDS) {
    if (!isBoolean(record[field]) || record[field] !== true) {
      return { ok: false, error: `Required confirmation: ${field}` }
    }
  }

  if (!isNonEmptyString(record.submittedAt)) {
    return { ok: false, error: 'Missing submittedAt' }
  }

  const payload: IntakePayload = {
    submittedAt: (record.submittedAt as string).trim(),
    form: isNonEmptyString(record.form) ? record.form.trim() : 'THP-ENGAGEMENT-READINESS-APPLICATION',
    version: isNonEmptyString(record.version) ? record.version.trim() : '1.0.0',
    founderName: (record.founderName as string).trim(),
    businessName: (record.businessName as string).trim(),
    email: (record.email as string).trim(),
    contactPhone: isNonEmptyString(record.contactPhone) ? record.contactPhone.trim() : '',
    coreOffer: (record.coreOffer as string).trim(),
    payingCustomers: (record.payingCustomers as string).trim(),
    deliveryHistory: (record.deliveryHistory as string).trim(),
    operatingStatus: (record.operatingStatus as string).trim(),
    founderContinuation: (record.founderContinuation as string).trim(),
    onlineActivity: isNonEmptyString(record.onlineActivity) ? record.onlineActivity.trim() : '',
    primaryProblems: isNonEmptyString(record.primaryProblems) ? record.primaryProblems.trim() : '',
    availableRecords: isNonEmptyString(record.availableRecords) ? record.availableRecords.trim() : '',
    discoverySource: (record.discoverySource as string).trim(),
    willingnessExamine: record.willingnessExamine as boolean,
    willingnessEvidence: record.willingnessEvidence as boolean,
    willingnessFeedback: record.willingnessFeedback as boolean,
    crisisIndicators: isNonEmptyString(record.crisisIndicators) ? record.crisisIndicators.trim() : '',
    privacyAck: record.privacyAck as boolean,
    visitorId: isNonEmptyString(record.visitorId) ? record.visitorId.trim() : undefined,
    locale: isNonEmptyString(record.locale) ? record.locale.trim() : undefined,
    timezone: isNonEmptyString(record.timezone) ? record.timezone.trim() : undefined,
    phoneCountryCode: isNonEmptyString(record.phoneCountryCode)
      ? record.phoneCountryCode.trim()
      : undefined,
  }

  return { ok: true, payload }
}
