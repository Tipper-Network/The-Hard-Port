import 'server-only'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { loadBffConfig, SESSION_COOKIE } from './config'
import { createPresignedUpload, loadS3UploadConfig } from './s3-upload'

type RouteContext = { params: Promise<{ path?: string[] }> }

function joinAccessPath(segments: string[]): string {
  return `/${segments.join('/')}`.replace(/\/{2,}/g, '/')
}

function forwardOrigin(req: NextRequest, config: ReturnType<typeof loadBffConfig>): string | undefined {
  const fromReq = req.headers.get('origin')
  if (fromReq) return fromReq
  return config.siteOrigin
}

async function readSession(req: NextRequest): Promise<string | undefined> {
  return req.cookies.get(SESSION_COOKIE)?.value
}

function setSession(res: NextResponse, token: string): void {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
}

function clearSession(res: NextResponse): void {
  res.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
}

async function proxyAccess(
  req: NextRequest,
  accessPath: string,
  opts: { session?: string; body?: string; method?: string },
): Promise<Response> {
  const config = loadBffConfig()
  if (!config.accessUrl) {
    return NextResponse.json({ error: 'misconfigured', detail: 'HP_ACCESS_URL' }, { status: 503 })
  }
  const headers = new Headers()
  headers.set('accept', 'application/json')
  if (opts.body) headers.set('content-type', 'application/json')
  headers.set('x-hp-session-mode', 'body')
  const origin = forwardOrigin(req, config)
  if (origin) headers.set('origin', origin)
  if (opts.session) headers.set('authorization', `Bearer ${opts.session}`)

  const url = `${config.accessUrl}${accessPath.startsWith('/') ? accessPath : `/${accessPath}`}`
  return fetch(url, {
    method: opts.method ?? req.method,
    headers,
    body: opts.body,
    cache: 'no-store',
  })
}

async function jsonFromAccess(res: Response): Promise<{ status: number; body: unknown }> {
  const text = await res.text()
  let body: unknown = {}
  if (text) {
    try {
      body = JSON.parse(text) as unknown
    } catch {
      body = { error: 'invalid_upstream', raw: text.slice(0, 200) }
    }
  }
  return { status: res.status, body }
}

export async function GET(req: NextRequest, context: RouteContext): Promise<Response> {
  return handleAccessApi(req, context)
}

export async function POST(req: NextRequest, context: RouteContext): Promise<Response> {
  return handleAccessApi(req, context)
}

export async function PATCH(req: NextRequest, context: RouteContext): Promise<Response> {
  return handleAccessApi(req, context)
}

export async function handleAccessApi(req: NextRequest, context: RouteContext): Promise<Response> {
  const { path: segments = [] } = await context.params
  const path = joinAccessPath(segments)
  const config = loadBffConfig()
  const session = await readSession(req)

  if (path === '/connection') {
    let health = false
    if (config.accessUrl) {
      try {
        const h = await fetch(`${config.accessUrl}/healthz`, { cache: 'no-store' })
        health = h.ok
      } catch {
        health = false
      }
    }
    return NextResponse.json({
      ok: health && Boolean(config.secretKey && config.publicKey),
      accessUrl: config.accessUrl || null,
      health,
      publicKeyConfigured: Boolean(config.publicKey),
      secretKeyConfigured: Boolean(config.secretKey),
      tenantSlug: config.tenantSlug,
    })
  }

  if (path === '/auth/session') {
    const upstream = await proxyAccess(req, '/auth/session', { session, method: 'GET' })
    const { status, body } = await jsonFromAccess(upstream)
    return NextResponse.json(body, { status })
  }

  if (path === '/auth/logout' && req.method === 'POST') {
    const upstream = await proxyAccess(req, '/auth/logout', { session, method: 'POST', body: '{}' })
    await jsonFromAccess(upstream)
    const res = NextResponse.json({ ok: true })
    clearSession(res)
    return res
  }

  if (path === '/auth/login' && req.method === 'POST') {
    const raw = await req.text()
    let parsed: Record<string, unknown> = {}
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
    }
    if (!parsed.tenantSlug && config.tenantSlug) parsed.tenantSlug = config.tenantSlug
    const upstream = await proxyAccess(req, '/auth/login', { method: 'POST', body: JSON.stringify(parsed) })
    const { status, body } = await jsonFromAccess(upstream)
    const res = NextResponse.json(body, { status })
    const token = (body as { sessionToken?: string }).sessionToken
    if (status >= 200 && status < 300 && token) setSession(res, token)
    return res
  }

  if (path === '/auth/partner/request-otp' && req.method === 'POST') {
    const raw = await req.text()
    let parsed: Record<string, unknown> = {}
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
    }
    if (!parsed.tenantSlug) parsed.tenantSlug = config.tenantSlug
    const upstream = await proxyAccess(req, '/auth/partner/request-otp', { method: 'POST', body: JSON.stringify(parsed) })
    const { status, body } = await jsonFromAccess(upstream)
    return NextResponse.json(body, { status })
  }

  if (path === '/auth/partner/verify-otp' && req.method === 'POST') {
    const raw = await req.text()
    let parsed: Record<string, unknown> = {}
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
    }
    if (!parsed.tenantSlug) parsed.tenantSlug = config.tenantSlug
    const upstream = await proxyAccess(req, '/auth/partner/verify-otp', { method: 'POST', body: JSON.stringify(parsed) })
    const { status, body } = await jsonFromAccess(upstream)
    const res = NextResponse.json(body, { status })
    const token = (body as { sessionToken?: string }).sessionToken
    if (status >= 200 && status < 300 && token) setSession(res, token)
    return res
  }

  if (path === '/uploads/presign' && req.method === 'POST') {
    if (!session) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
    const s3 = loadS3UploadConfig(config.tenantSlug)
    if (!s3) {
      return NextResponse.json({ error: 's3_not_configured' }, { status: 503 })
    }
    let parsed: { slug?: string; filename?: string; contentType?: string } = {}
    try {
      parsed = JSON.parse(await req.text()) as typeof parsed
    } catch {
      return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
    }
    if (!parsed.slug?.trim() || !parsed.filename?.trim()) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }
    try {
      const out = await createPresignedUpload(s3, {
        slug: parsed.slug.trim(),
        filename: parsed.filename.trim(),
        contentType: parsed.contentType?.trim() || 'application/octet-stream',
      })
      return NextResponse.json({ ok: true, ...out })
    } catch {
      return NextResponse.json({ error: 'presign_failed' }, { status: 500 })
    }
  }

  const adminOrPartner = path.startsWith('/admin/') || path.startsWith('/partner/')
  if (!adminOrPartner) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  if (req.method === 'GET') {
    const upstream = await proxyAccess(req, path, { session, method: 'GET' })
    const { status, body } = await jsonFromAccess(upstream)
    return NextResponse.json(body, { status })
  }

  if (req.method === 'POST') {
    const body = await req.text()
    const upstream = await proxyAccess(req, path, { session, method: 'POST', body })
    const { status, body: out } = await jsonFromAccess(upstream)
    return NextResponse.json(out, { status })
  }

  if (req.method === 'PATCH') {
    const body = await req.text()
    const upstream = await proxyAccess(req, path, { session, method: 'PATCH', body })
    const { status, body: out } = await jsonFromAccess(upstream)
    return NextResponse.json(out, { status })
  }

  return NextResponse.json({ error: 'method_not_allowed' }, { status: 405 })
}
