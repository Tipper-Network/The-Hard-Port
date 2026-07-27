'use server'

import { getConfiguredIntakeApiUrl } from '@/lib/api/client'
import { validateIntakePayload, type IntakePayload } from '@/lib/intake/payload'

export type SubmitIntakeResult =
  | { ok: true; id?: string }
  | {
      ok: false
      error: string
      manual?: boolean
      reason?: 'not_configured' | 'unreachable' | 'api_error'
    }

async function submitToApi(payload: IntakePayload): Promise<SubmitIntakeResult> {
  const apiUrl = getConfiguredIntakeApiUrl()
  if (!apiUrl) {
    return {
      ok: false,
      error: 'Intake API not configured',
      manual: true,
      reason: 'not_configured',
    }
  }

  try {
    const res = await fetch(`${apiUrl}/intake/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const body: unknown = await res.json().catch(() => null)

    if (!res.ok) {
      const message =
        body &&
        typeof body === 'object' &&
        'message' in body &&
        typeof body.message === 'string'
          ? body.message
          : 'Application submission failed'
      return { ok: false, error: message, manual: true, reason: 'api_error' }
    }

    if (body && typeof body === 'object' && 'ok' in body && body.ok === true) {
      return {
        ok: true,
        id: 'id' in body && typeof body.id === 'string' ? body.id : undefined,
      }
    }

    return { ok: true }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'API request failed',
      manual: true,
      reason: 'unreachable',
    }
  }
}

export async function submitIntake(data: unknown): Promise<SubmitIntakeResult> {
  const validated = validateIntakePayload(data)
  if (!validated.ok) {
    return { ok: false, error: validated.error }
  }

  return submitToApi(validated.payload)
}
