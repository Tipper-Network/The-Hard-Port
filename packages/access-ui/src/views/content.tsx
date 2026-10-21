'use client'

import { useEffect, useState } from 'react'

import { apiFetch } from '../api-client'

type ContentRow = {
  id: string
  slug: string
  title: string
  kind: string
  access_mode: string
  status: string
}

type Props = { basePath: string }

export function ContentView({ basePath }: Props) {
  const [items, setItems] = useState<ContentRow[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void apiFetch(basePath, '/admin/content')
      .then(async (r) => {
        if (!r.ok) throw new Error('load')
        const data = (await r.json()) as { items?: ContentRow[] }
        setItems(data.items ?? [])
      })
      .catch(() => setError('Could not load content.'))
  }, [basePath])

  return (
    <>
      <h1>Content</h1>
      <p className="hp-access__lede">Published and draft items on Access. Keyword UI ships in v2.</p>
      {error ? <p className="hp-access__error">{error}</p> : null}
      <div className="hp-access__panel">
        <table>
          <thead>
            <tr>
              <th>Slug</th>
              <th>Title</th>
              <th>Kind</th>
              <th>Access</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td className="hp-access__mono">{c.slug}</td>
                <td>{c.title}</td>
                <td>{c.kind}</td>
                <td>{c.access_mode}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && !error ? <p className="hp-access__lede">No content yet.</p> : null}
      </div>
    </>
  )
}
