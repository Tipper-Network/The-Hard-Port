'use client'

import { useEffect, useState } from 'react'

import { apiFetch } from '../api-client'

type Props = { basePath: string }

type StatRow = { type: string; matched: boolean | null; n: number }

type Campaign = {
  id: string
  title: string
  platform: string | null
  post_url: string | null
}

export function PartnerDashboardView({ basePath }: Props) {
  const [stats, setStats] = useState<StatRow[] | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void Promise.all([
      apiFetch(basePath, '/partner/stats').then(async (r) => {
        if (!r.ok) throw new Error('stats')
        const data = (await r.json()) as { last30Days?: StatRow[] }
        return data.last30Days ?? []
      }),
      apiFetch(basePath, '/partner/campaigns').then(async (r) => {
        if (!r.ok) throw new Error('campaigns')
        const data = (await r.json()) as { campaigns?: Campaign[] }
        return data.campaigns ?? []
      }),
    ])
      .then(([s, c]) => {
        setStats(s)
        setCampaigns(c)
      })
      .catch(() => setError('Could not load dashboard.'))
  }, [basePath])

  return (
    <>
      <h1>Partner dashboard</h1>
      <p className="hp-access__lede">Last 30 days — counts only, no visitor emails.</p>
      {error ? <p className="hp-access__error">{error}</p> : null}
      <div className="hp-access__panel">
        {!stats ? (
          <p>Loading stats…</p>
        ) : stats.length === 0 ? (
          <p className="hp-access__lede">No events in the last 30 days.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Matched</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((row) => (
                <tr key={`${row.type}-${String(row.matched)}`}>
                  <td>{row.type}</td>
                  <td>{row.matched === null ? '—' : row.matched ? 'yes' : 'no'}</td>
                  <td>{row.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="hp-access__panel">
        <h2 style={{ marginTop: 0, fontSize: '1rem' }}>Campaigns</h2>
        {campaigns.length === 0 ? (
          <p className="hp-access__lede">None assigned yet.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            {campaigns.map((c) => (
              <li key={c.id}>
                {c.title}
                {c.platform ? ` (${c.platform})` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
