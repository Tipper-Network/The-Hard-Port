'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { apiFetch } from '../api-client'

export type ContentItem = {
  id: string
  slug: string
  title: string
  summary: string | null
  kind: string
  access_mode: string
  status: string
  body_ref: string | null
  booking_url: string | null
  youtube_url: string | null
  substack_url: string | null
  source_label: string | null
  source_url: string | null
  price_minor: number | null
  currency: string | null
}

const KINDS = ['guide', 'part', 'video', 'session', 'ebook', 'download'] as const
const FILE_KINDS = new Set(['guide', 'part', 'ebook', 'download'])

type Props = {
  basePath: string
  mode: 'create' | 'edit'
  slug?: string
}

export function ContentFormView({ basePath, mode, slug: editSlug }: Props) {
  const [slug, setSlug] = useState(editSlug ?? '')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [kind, setKind] = useState<(typeof KINDS)[number]>('download')
  const [accessMode, setAccessMode] = useState('open')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [bodyRef, setBodyRef] = useState('')
  const [bookingUrl, setBookingUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [substackUrl, setSubstackUrl] = useState('')
  const [sourceLabel, setSourceLabel] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(mode === 'edit')

  useEffect(() => {
    if (mode !== 'edit' || !editSlug) return
    void apiFetch(basePath, `/admin/content/${encodeURIComponent(editSlug)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error('load')
        const data = (await r.json()) as { item?: ContentItem }
        const item = data.item
        if (!item) throw new Error('missing')
        setTitle(item.title)
        setSummary(item.summary ?? '')
        setKind(item.kind as (typeof KINDS)[number])
        setAccessMode(item.access_mode)
        setStatus(item.status === 'published' ? 'published' : 'draft')
        setBodyRef(item.body_ref ?? '')
        setBookingUrl(item.booking_url ?? '')
        setYoutubeUrl(item.youtube_url ?? '')
        setSubstackUrl(item.substack_url ?? '')
        setSourceLabel(item.source_label ?? '')
        setSourceUrl(item.source_url ?? '')
      })
      .catch(() => setError('Could not load this item.'))
      .finally(() => setLoading(false))
  }, [basePath, mode, editSlug])

  const uploadFile = async (targetSlug: string): Promise<string | null> => {
    if (!file) return bodyRef.trim() || null
    const presign = await apiFetch(basePath, '/uploads/presign', {
      method: 'POST',
      body: JSON.stringify({
        slug: targetSlug,
        filename: file.name,
        contentType: file.type || 'application/octet-stream',
      }),
    })
    const data = (await presign.json()) as { uploadUrl?: string; publicUrl?: string; error?: string }
    if (!presign.ok || !data.uploadUrl || !data.publicUrl) {
      throw new Error(data.error ?? 'Presign failed')
    }
    const put = await fetch(data.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    })
    if (!put.ok) throw new Error('S3 upload failed')
    return data.publicUrl
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const targetSlug = (mode === 'edit' ? (editSlug ?? '') : slug).trim()
      if (!targetSlug || !title.trim()) {
        setError('Slug and title are required.')
        return
      }

      const assetUrl = await uploadFile(targetSlug)
      const patchClear = (value: string) => (mode === 'edit' ? value.trim() : value.trim() || undefined)
      const payload: Record<string, unknown> = {
        title: title.trim(),
        summary: summary.trim() || undefined,
        kind,
        accessMode,
        status,
        bodyRef: assetUrl ?? patchClear(bodyRef),
        bookingUrl: kind === 'session' ? patchClear(bookingUrl) : undefined,
        youtubeUrl: patchClear(youtubeUrl),
        substackUrl: patchClear(substackUrl),
        sourceLabel: patchClear(sourceLabel),
        sourceUrl: patchClear(sourceUrl),
      }

      if (mode === 'create') {
        const res = await apiFetch(basePath, '/admin/content', {
          method: 'POST',
          body: JSON.stringify({ slug: targetSlug, ...payload }),
        })
        if (!res.ok) {
          const data = (await res.json()) as { error?: string }
          setError(data.error ?? 'Create failed')
          return
        }
      } else {
        const res = await apiFetch(basePath, `/admin/content/${encodeURIComponent(targetSlug)}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const data = (await res.json()) as { error?: string }
          setError(data.error ?? 'Save failed')
          return
        }
      }

      window.location.href = `${basePath}/content`
    } catch {
      setError('Request failed. Check S3 env on the web server.')
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <p className="hp-access__lede">Loading…</p>

  return (
    <>
      <p className="hp-access__lede">
        <Link href={`${basePath}/content`}>← Content</Link>
      </p>
      <h1>{mode === 'create' ? 'New product page' : `Edit ${editSlug}`}</h1>
      <p className="hp-access__lede">
        One row = one visitor-facing page. Use <strong>Asset URL</strong> for files on your CDN; use the dedicated fields below for YouTube, Substack, and “where this came from.”
      </p>
      <form className="hp-access__panel" onSubmit={(e) => void submit(e)}>
        {error ? <p className="hp-access__error">{error}</p> : null}
        {mode === 'create' ? (
          <>
            <label htmlFor="c-slug">Slug (URL segment)</label>
            <input id="c-slug" value={slug} onChange={(e) => setSlug(e.target.value)} pattern="[a-z0-9][a-z0-9-]*" required />
          </>
        ) : null}
        <label htmlFor="c-title">Title</label>
        <input id="c-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label htmlFor="c-summary">Summary (optional)</label>
        <textarea id="c-summary" rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
        <label htmlFor="c-kind">Kind</label>
        <select id="c-kind" value={kind} onChange={(e) => setKind(e.target.value as (typeof KINDS)[number])}>
          {KINDS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <label htmlFor="c-access">Access (paid gating later)</label>
        <select id="c-access" value={accessMode} onChange={(e) => setAccessMode(e.target.value)}>
          <option value="open">open — anyone with the page</option>
          <option value="keyword_first">keyword_first</option>
          <option value="paid">paid (stub)</option>
        </select>
        <label htmlFor="c-status">Status</label>
        <select id="c-status" value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}>
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
        {kind === 'session' ? (
          <>
            <label htmlFor="c-book">Booking URL</label>
            <input id="c-book" type="url" value={bookingUrl} onChange={(e) => setBookingUrl(e.target.value)} placeholder="https://cal.com/…" />
          </>
        ) : null}
        {kind === 'video' ? (
          <>
            <label htmlFor="c-yt">YouTube URL</label>
            <input
              id="c-yt"
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
            />
          </>
        ) : null}
        <label htmlFor="c-sub">Substack URL (optional)</label>
        <input
          id="c-sub"
          type="url"
          value={substackUrl}
          onChange={(e) => setSubstackUrl(e.target.value)}
          placeholder="https://yourname.substack.com/p/…"
        />
        <label htmlFor="c-src-label">Where this came from (label)</label>
        <input
          id="c-src-label"
          value={sourceLabel}
          onChange={(e) => setSourceLabel(e.target.value)}
          placeholder="e.g. Featured on The Hard Port YouTube"
        />
        <label htmlFor="c-src-url">Source link (optional)</label>
        <input
          id="c-src-url"
          type="url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://youtube.com/@… or partner post"
        />
        <label htmlFor="c-url">Asset URL (CDN file — PDF, zip, etc.)</label>
        <input
          id="c-url"
          value={bodyRef}
          onChange={(e) => setBodyRef(e.target.value)}
          placeholder="https://cdn…/file.pdf"
        />
        {FILE_KINDS.has(kind) ? (
          <>
            <label htmlFor="c-file">Or upload to S3 (fills asset URL)</label>
            <input id="c-file" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </>
        ) : null}
        <button type="submit" disabled={busy}>
          {busy ? 'Saving…' : mode === 'create' ? 'Create' : 'Save'}
        </button>
      </form>
    </>
  )
}
