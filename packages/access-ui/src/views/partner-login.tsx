'use client'

import { useState } from 'react'

import { apiFetch } from '../api-client'

type Props = {
  basePath: string
  onLoggedIn: () => void
}

type Step = 'portal' | 'otp'

export function PartnerLoginView({ basePath, onLoggedIn }: Props) {
  const [step, setStep] = useState<Step>('portal')
  const [email, setEmail] = useState('')
  const [portalCode, setPortalCode] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setBusy(true)
    try {
      const res = await apiFetch(basePath, '/auth/partner/request-otp', {
        method: 'POST',
        body: JSON.stringify({ email, portalCode }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        setError(data.error ?? 'Could not send code.')
        return
      }
      setInfo('If your email and portal code match, a one-time code was sent. (Dev: set ACCESS_TEST_OTP on the Access service.)')
      setStep('otp')
    } catch {
      setError('Request failed.')
    } finally {
      setBusy(false)
    }
  }

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const res = await apiFetch(basePath, '/auth/partner/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      })
      const data = (await res.json()) as { error?: string; ok?: boolean }
      if (!res.ok) {
        setError(data.error === 'invalid_otp' ? 'Wrong or expired code.' : (data.error ?? 'Verification failed.'))
        return
      }
      onLoggedIn()
    } catch {
      setError('Request failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="hp-access__shell">
      <h1>Partner portal</h1>
      <p className="hp-access__lede">Email, portal code, then one-time sign-in code.</p>
      {step === 'portal' ? (
        <form className="hp-access__panel" onSubmit={(e) => void requestOtp(e)}>
          {error ? <p className="hp-access__error">{error}</p> : null}
          <label htmlFor="pp-email">Email</label>
          <input id="pp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="pp-code">Portal code</label>
          <input id="pp-code" value={portalCode} onChange={(e) => setPortalCode(e.target.value)} required />
          <button type="submit" disabled={busy}>
            {busy ? 'Sending…' : 'Send code'}
          </button>
        </form>
      ) : (
        <form className="hp-access__panel" onSubmit={(e) => void verifyOtp(e)}>
          {error ? <p className="hp-access__error">{error}</p> : null}
          {info ? <p className="hp-access__ok">{info}</p> : null}
          <label htmlFor="pp-otp">Six-digit code</label>
          <input id="pp-otp" inputMode="numeric" pattern="\d{6}" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit" disabled={busy}>
            {busy ? 'Checking…' : 'Sign in'}
          </button>
          <button type="button" className="hp-access__ghost" style={{ marginLeft: '0.75rem' }} onClick={() => setStep('portal')}>
            Back
          </button>
        </form>
      )}
    </div>
  )
}
