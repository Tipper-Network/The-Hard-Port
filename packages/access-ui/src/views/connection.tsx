'use client'

import { useEffect, useState } from 'react'

import { apiFetch } from '../api-client'

type Props = { basePath: string }

type ConnectionState = {
  ok?: boolean
  accessUrl?: string
  health?: boolean
  publicKeyConfigured?: boolean
  secretKeyConfigured?: boolean
  tenantSlug?: string
  error?: string
}

export function ConnectionView({ basePath }: Props) {
  const [state, setState] = useState<ConnectionState | null>(null)

  useEffect(() => {
    void apiFetch(basePath, '/connection')
      .then((r) => r.json())
      .then((d) => setState(d as ConnectionState))
      .catch(() => setState({ error: 'failed' }))
  }, [basePath])

  return (
    <>
      <h1>Connection</h1>
      <p className="hp-access__lede">Checks this site’s BFF env and reachability of hosted Access.</p>
      <div className="hp-access__panel">
        {!state ? (
          <p>Checking…</p>
        ) : state.error ? (
          <p className="hp-access__error">Could not run connection check.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>Access URL: {state.accessUrl ?? '—'}</li>
            <li>Health: {state.health ? 'OK' : 'Down or unreachable'}</li>
            <li>Public key in env: {state.publicKeyConfigured ? 'yes' : 'no'}</li>
            <li>Secret key in env: {state.secretKeyConfigured ? 'yes' : 'no'}</li>
            <li>Default tenant slug: {state.tenantSlug ?? '—'}</li>
          </ul>
        )}
      </div>
    </>
  )
}
