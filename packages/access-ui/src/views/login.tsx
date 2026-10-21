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
  const [totp, setTotp] = useState('')
  const [tenantSlug, setTenantSlug] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [tenantPick, setTenantPick] = useState<string[] | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const body: Record<string, string> = { email, password }
      if (totp) body.totp = totp
      if (tenantSlug) body.tenantSlug = tenantSlug
      const res = await apiFetch(basePath, '/auth/login', { method: 'POST', body: JSON.stringify(body) })
      const data = (await res.json()) as {
        error?: string
        tenants?: string[]
        ok?: boolean
      }
      if (res.status === 409 && data.error === 'tenant_required' && data.tenants?.length) {
        setTenantPick(data.tenants)
        setError('Pick which tenant this login is for.')
        return
      }
      if (!res.ok) {
        setError(data.error === 'twofa_setup_required' ? '2FA setup required on this account.' : 'Invalid credentials.')
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
      <h1>Staff sign-in</h1>
      <p className="hp-access__lede">Platform console for your tenant. Not the application review flow.</p>
      <form className="hp-access__panel" onSubmit={(e) => void submit(e)}>
        {error ? <p className="hp-access__error">{error}</p> : null}
        {tenantPick ? (
          <p className="hp-access__lede">Tenants: {tenantPick.join(', ')}</p>
        ) : null}
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
        <label htmlFor="hp-totp">Authenticator code (owners/admins)</label>
        <input id="hp-totp" inputMode="numeric" pattern="\d{6}" maxLength={6} value={totp} onChange={(e) => setTotp(e.target.value)} />
        <label htmlFor="hp-tenant">Tenant slug (if you have more than one)</label>
        <input id="hp-tenant" value={tenantSlug} onChange={(e) => setTenantSlug(e.target.value)} placeholder="hardport" />
        <button type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
