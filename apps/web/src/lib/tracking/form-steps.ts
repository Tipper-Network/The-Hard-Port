export type FormStepId =
  | 'step_identity'
  | 'step_business'
  | 'step_problems'
  | 'step_confirm'

export const FORM_STEPS: FormStepId[] = [
  'step_identity',
  'step_business',
  'step_problems',
  'step_confirm',
]

export const FORM_STEP_FIELDS: Record<
  FormStepId,
  { required: string[]; optional: string[] }
> = {
  step_identity: {
    required: ['founderName', 'businessName', 'email'],
    optional: ['contactPhone'],
  },
  step_business: {
    required: [
      'coreOffer',
      'payingCustomers',
      'deliveryHistory',
      'operatingStatus',
      'founderContinuation',
    ],
    optional: ['onlineActivity'],
  },
  step_problems: {
    required: ['discoverySource'],
    optional: ['primaryProblems', 'availableRecords', 'crisisIndicators'],
  },
  step_confirm: {
    required: ['willingnessExamine', 'willingnessEvidence', 'willingnessFeedback', 'privacyAck'],
    optional: [],
  },
}

export function isStepComplete(
  step: FormStepId,
  values: Record<string, string | boolean>,
): boolean {
  const config = FORM_STEP_FIELDS[step]
  return config.required.every((field) => {
    const value = values[field]
    if (typeof value === 'boolean') return value === true
    return typeof value === 'string' && value.trim().length > 0
  })
}

export function fieldsStarted(values: Record<string, string | boolean>): string[] {
  return Object.entries(values)
    .filter(([, value]) => {
      if (typeof value === 'boolean') return value
      return typeof value === 'string' && value.trim().length > 0
    })
    .map(([key]) => key)
}
