export enum SubmitIntakeReason__Enum {
  NOT_CONFIGURED = 'not_configured',
  UNREACHABLE = 'unreachable',
  API_ERROR = 'api_error',
}

export type SubmitIntakeResult =
  | { ok: true; id?: string }
  | {
      ok: false
      error: string
      manual?: boolean
      reason?: SubmitIntakeReason__Enum
    }
