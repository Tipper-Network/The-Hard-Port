'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { apiFetch } from '../api-client'
import { productPathFromPrefix } from '../lib/product-path'

type ContentRow = {
  id: string
  slug: string
  title: string
  kind: string
  access_mode: string
  status: string
  body_ref: string | null
}

type Props = {
  basePath: string
  publicProductPathPrefix?: string
}

export function ContentView({ basePath, publicProductPathPrefix = '/p' }: Props) {
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
      <p className="hp-access__lede">Each item is a product page: PDF, video link, article URL, session booking, etc.</p>
      <p>
        <Link href={`${basePath}/content/new`} className="hp-access__ok">
          + New product page
        </Link>
      </p>
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
              <th>Asset</th>
              <th />
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
                <td className="hp-access__mono">{c.body_ref ? 'yes' : '—'}</td>
                <td>
                  <Link href={`${basePath}/content/${c.slug}/edit`}>Edit</Link>
                  {c.status === 'published' ? (
                    <>
                      {' · '}
                      <a
                        href={productPathFromPrefix(c.slug, publicProductPathPrefix)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && !error ? <p className="hp-access__lede">No content yet.</p> : null}
      </div>
    </>
  )
}
