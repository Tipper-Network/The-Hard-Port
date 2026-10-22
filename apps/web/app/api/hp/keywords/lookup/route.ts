import { NextResponse } from 'next/server'

import { proxyKeywordLookup } from '@psyferblock/access/server'

export async function POST(req: Request) {
  let body: { word?: string; anonId?: string; contentSlug?: string }
  try {
    body = (await req.json()) as { word?: string; anonId?: string; contentSlug?: string }
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }
  if (!body.word?.trim() || !body.anonId?.trim()) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  const payload: { word: string; anonId: string; contentSlug?: string } = {
    word: body.word.trim(),
    anonId: body.anonId.trim(),
  }
  const slug = body.contentSlug?.trim()
  if (slug) payload.contentSlug = slug

  const out = await proxyKeywordLookup(payload, req.headers.get('origin'))
  return NextResponse.json(out.body, { status: out.status })
}
