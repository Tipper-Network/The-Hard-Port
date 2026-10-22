'use client'

import { useState } from 'react'

import { apiFetch } from '../api-client'

type Props = {
  basePath: string
  onLoggedIn: () => void
}

export function LoginView({ basePath, onLoggedIn }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const res = await apiFetch(basePath, '/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const data = (await res.json()) as { error?: string; ok?: boolean }
      if (!res.ok) {
        if (data.error === 'no_access') setError('No platform access for this email.')
        else if (data.error === 'bad_origin') setError('Origin blocked — set ADMIN_ORIGINS and NEXT_PUBLIC_SITE_URL to http://localhost:3000.')
        else if (data.error === 'twofa_setup_required') setError('2FA setup required on this account (not enabled for local dev yet).')
        else setError('Invalid email or password.')
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
      <h1>THP staff sign-in</h1>
      <p className="hp-access__lede">Manage products, keywords, and partners. Not the public site or partner portal.</p>
      <form className="hp-access__panel" onSubmit={(e) => void submit(e)}>
        {error ? <p className="hp-access__error">{error}</p> : null}
        <label htmlFor="hp-email">Email</label>
        <input id="hp-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="hp-password">Password</label>
        <input
          id="hp-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
