import { createServerFn } from '@tanstack/react-start'

import { validateIntakePayload, type IntakePayload } from '#/lib/intake-payload'

export type SubmitIntakeResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; manual?: boolean }

async function submitToApi(payload: IntakePayload): Promise<SubmitIntakeResult> {
  const apiUrl = process.env.THP_API_URL?.trim().replace(/\/$/, '')
  if (!apiUrl) {
    return {
      ok: false,
      error: 'Intake API not configured',
      manual: true,
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
      return { ok: false, error: message, manual: true }
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
    }
  }
}

export const submitIntake = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    const validated = validateIntakePayload(data)
    if (!validated.ok) {
      throw new Error(validated.error)
    }
    return validated.payload
  })
  .handler(async ({ data }) => submitToApi(data))
