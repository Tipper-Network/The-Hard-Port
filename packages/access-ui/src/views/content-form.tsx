'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { apiFetch } from '../api-client'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'

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
const ACCESS_MODES = [
  { value: 'open', label: 'open — anyone with the page' },
  { value: 'keyword_first', label: 'keyword_first' },
  { value: 'paid', label: 'paid (stub)' },
] as const
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
    const presign = await apiFetch(basePath, '/admin/uploads/presign', {
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
    if (!put.ok) throw new Error(`S3 upload failed (${put.status})`)
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
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown_error'
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setError(
          'Browser could not PUT to S3 — add bucket CORS for http://localhost:3000 (PUT, GET, HEAD) and your production origin. See docs/content-and-s3.md.',
        )
        return
      }
      if (msg === 's3_not_configured' || msg === 'presign_failed' || msg === 'Presign failed') {
        setError('Upload presign failed. Set HP_S3_BUCKET and AWS creds on services/access/.env, restart Access.')
        return
      }
      if (msg.startsWith('S3 upload failed')) {
        setError(`${msg}. Check bucket CORS and IAM s3:PutObject on the key prefix.`)
        return
      }
      setError(`Request failed: ${msg}`)
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
      <form className="hp-access__panel space-y-4" method="post" onSubmit={(e) => void submit(e)}>
        {error ? <p className="hp-access__error">{error}</p> : null}
        {mode === 'create' ? (
          <div className="grid gap-2">
            <Label htmlFor="c-slug">Slug (URL segment)</Label>
            <Input id="c-slug" value={slug} onChange={(e) => setSlug(e.target.value)} pattern="[a-z0-9][a-z0-9-]*" required />
          </div>
        ) : null}
        <div className="grid gap-2">
          <Label htmlFor="c-title">Title</Label>
          <Input id="c-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-summary">Summary (optional)</Label>
          <Textarea id="c-summary" rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-kind">Kind</Label>
          <Select value={kind} onValueChange={(v) => setKind(v as (typeof KINDS)[number])}>
            <SelectTrigger id="c-kind" aria-label="Content kind">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {KINDS.map((k) => (
                <SelectItem key={k} value={k}>
                  {k}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-access">Access (paid gating later)</Label>
          <Select value={accessMode} onValueChange={setAccessMode}>
            <SelectTrigger id="c-access" aria-label="Access mode">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ACCESS_MODES.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-status">Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as 'draft' | 'published')}>
            <SelectTrigger id="c-status" aria-label="Publish status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">draft</SelectItem>
              <SelectItem value="published">published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {kind === 'session' ? (
          <div className="grid gap-2">
            <Label htmlFor="c-book">Booking URL</Label>
            <Input id="c-book" type="url" value={bookingUrl} onChange={(e) => setBookingUrl(e.target.value)} placeholder="https://cal.com/…" />
          </div>
        ) : null}
        {kind === 'video' ? (
          <div className="grid gap-2">
            <Label htmlFor="c-yt">YouTube URL</Label>
            <Input
              id="c-yt"
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
            />
          </div>
        ) : null}
        <div className="grid gap-2">
          <Label htmlFor="c-sub">Substack URL (optional)</Label>
          <Input
            id="c-sub"
            type="url"
            value={substackUrl}
            onChange={(e) => setSubstackUrl(e.target.value)}
            placeholder="https://yourname.substack.com/p/…"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-src-label">Where this came from (label)</Label>
          <Input
            id="c-src-label"
            value={sourceLabel}
            onChange={(e) => setSourceLabel(e.target.value)}
            placeholder="e.g. Featured on The Hard Port YouTube"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-src-url">Source link (optional)</Label>
          <Input
            id="c-src-url"
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://youtube.com/@… or partner post"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-url">Asset URL (CDN file — PDF, zip, etc.)</Label>
          <Input id="c-url" value={bodyRef} onChange={(e) => setBodyRef(e.target.value)} placeholder="https://cdn…/file.pdf" />
        </div>
        {FILE_KINDS.has(kind) ? (
          <div className="grid gap-2">
            <Label htmlFor="c-file">Or upload to S3 (fills asset URL)</Label>
            <Input id="c-file" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </div>
        ) : null}
        <Button type="submit" disabled={busy} className="mt-2">
          {busy ? 'Saving…' : mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </form>
    </>
  )
}
