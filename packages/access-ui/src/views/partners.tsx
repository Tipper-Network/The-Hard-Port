'use client'

import { useEffect, useState } from 'react'

import { apiFetch } from '../api-client'

type PartnerRow = {
  id: string
  display_name: string
  email: string
  commission_pct: string
  created_at: string
}

type Props = { basePath: string }

export function PartnersView({ basePath }: Props) {
  const [items, setItems] = useState<PartnerRow[]>([])
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [commissionPct, setCommissionPct] = useState('0')
  const [createdCode, setCreatedCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const load = () => {
    void apiFetch(basePath, '/admin/partners')
      .then(async (r) => {
        if (!r.ok) throw new Error('load')
        const data = (await r.json()) as { items?: PartnerRow[] }
        setItems(data.items ?? [])
      })
      .catch(() => setError('Could not load partners.'))
  }

  useEffect(load, [basePath])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setCreatedCode(null)
    setBusy(true)
    try {
      const res = await apiFetch(basePath, '/admin/partners', {
        method: 'POST',
        body: JSON.stringify({
          displayName,
          email,
          commissionPct: Number(commissionPct),
        }),
      })
      const data = (await res.json()) as { portalCode?: string; error?: string; id?: string }
      if (!res.ok) {
        setError(data.error ?? 'Create failed.')
        return
      }
      setCreatedCode(data.portalCode ?? null)
      setDisplayName('')
      setEmail('')
      load()
    } catch {
      setError('Request failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <h1>Partners</h1>
      <p className="hp-access__lede">Portal code is shown once when you create a partner.</p>
      <form className="hp-access__panel" onSubmit={(e) => void create(e)}>
        {error ? <p className="hp-access__error">{error}</p> : null}
        {createdCode ? (
          <p className="hp-access__ok">
            Portal code (copy now): <span className="hp-access__mono">{createdCode}</span>
          </p>
        ) : null}
        <label htmlFor="p-name">Display name</label>
        <input id="p-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
        <label htmlFor="p-email">Email</label>
        <input id="p-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="p-comm">Commission %</label>
        <input id="p-comm" type="number" min={0} max={100} value={commissionPct} onChange={(e) => setCommissionPct(e.target.value)} />
        <button type="submit" disabled={busy}>
          Add partner
        </button>
      </form>
      <div className="hp-access__panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Commission</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.display_name}</td>
                <td>{p.email}</td>
                <td>{p.commission_pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 ? <p className="hp-access__lede">No partners yet.</p> : null}
      </div>
    </>
  )
}
