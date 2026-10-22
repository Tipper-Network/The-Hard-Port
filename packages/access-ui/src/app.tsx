'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { apiFetch, getSession, type SessionInfo } from './api-client'
import './access.css'
import { BillingView } from './views/billing'
import { ConnectionView } from './views/connection'
import { ContentFormView } from './views/content-form'
import { ContentView } from './views/content'
import { LoginView } from './views/login'
import { PartnerDashboardView } from './views/partner-dashboard'
import { PartnerLoginView } from './views/partner-login'
import { PartnersView } from './views/partners'

export type AccessAppScope = 'staff' | 'partner'

export type AccessAppProps = {
  basePath?: string
  /** Staff console vs partner portal — never mix on one mount. */
  scope?: AccessAppScope
  /** When mounted from the marketing-site admin hub, link back to website admin (e.g. `/admin`). */
  websiteAdminHref?: string
  /** Staff “View” link base path. Default `/p` → `/p/{slug}`. */
  publicProductPathPrefix?: string
}

const staffRoles = new Set(['owner', 'admin', 'staff'])
const PARTNER_PORTAL_PATH = '/partner'

function normalizeBase(basePath: string): string {
  const t = basePath.trim() || '/thp'
  return t.startsWith('/') ? t.replace(/\/$/, '') : `/${t.replace(/\/$/, '')}`
}

function relPath(base: string, pathname: string): string {
  const p = pathname.replace(/\/$/, '') || '/'
  if (p === base) return '/'
  if (p.startsWith(`${base}/`)) return p.slice(base.length) || '/'
  return p
}

export function AccessApp({
  basePath = '/thp',
  scope = 'staff',
  websiteAdminHref,
  publicProductPathPrefix,
}: AccessAppProps) {
  const base = normalizeBase(basePath)
  const pathname = usePathname() ?? base
  const router = useRouter()
  const route = relPath(base, pathname)
  const [session, setSession] = useState<SessionInfo | null | undefined>(undefined)
  const [pendingRoute, setPendingRoute] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    void getSession(base).then((s) => {
      if (!cancelled) setSession(s)
    })
    return () => {
      cancelled = true
    }
  }, [base, pathname])

  useEffect(() => {
    if (session === undefined) return

    const isStaff = session && staffRoles.has(session.role)
    const isPartner = session?.role === 'partner'

    if (scope === 'staff' && (route === '/partner' || route.startsWith('/partner/'))) {
      const suffix = route === '/partner' ? '' : route.slice('/partner'.length)
      window.location.replace(`${PARTNER_PORTAL_PATH}${suffix}`)
      return
    }

    if (scope === 'partner') {
      if (route === '/dashboard') {
        if (isPartner) return
        if (!session) setPendingRoute(base)
        return
      }
      if (route === '/' || route === '/login') {
        if (isPartner) setPendingRoute(`${base}/dashboard`)
        return
      }
      if (!session) {
        setPendingRoute(base)
        return
      }
      if (isPartner) setPendingRoute(`${base}/dashboard`)
      return
    }

    if (route === '/login' || route.startsWith('/login/')) {
      if (isStaff) setPendingRoute(`${base}/connection`)
      return
    }
    if (!session) {
      const onStaffAuth = route === '/login' || route.startsWith('/login/')
      if (!onStaffAuth) setPendingRoute(`${base}/login`)
      else setPendingRoute(null)
      return
    }
    if (isStaff && (route === '/partner' || route.startsWith('/partner/'))) {
      window.location.replace(`${PARTNER_PORTAL_PATH}${route === '/partner' ? '' : route.slice('/partner'.length)}`)
      return
    }
    setPendingRoute(null)
  }, [session, route, base, scope])

  useEffect(() => {
    if (pendingRoute) router.replace(pendingRoute)
  }, [pendingRoute, router])

  const refreshSession = () => {
    void getSession(base).then(setSession)
  }

  const logout = async () => {
    await apiFetch(base, '/auth/logout', { method: 'POST', body: '{}' })
    setSession(null)
    router.push(scope === 'partner' ? base : `${base}/login`)
  }

  if (session === undefined) {
    return (
      <div className="hp-access">
        <div className="hp-access__shell">Loading…</div>
      </div>
    )
  }

  const isStaff = session && staffRoles.has(session.role)
  const isPartner = session?.role === 'partner'

  if (pendingRoute) {
    return (
      <div className="hp-access">
        <div className="hp-access__shell">Loading…</div>
      </div>
    )
  }

  if (scope === 'partner' && (route === '/' || route === '/login')) {
    if (isPartner) return null
    return (
      <div className="hp-access">
        <PartnerLoginView basePath={base} onLoggedIn={refreshSession} />
      </div>
    )
  }

  if (scope === 'staff' && (route === '/login' || route.startsWith('/login/'))) {
    if (isStaff) return null
    return (
      <div className="hp-access">
        <LoginView basePath={base} onLoggedIn={refreshSession} />
      </div>
    )
  }

  if (!session) return null

  const staffNav = (
    <nav className="hp-access__nav" aria-label="Console">
      {websiteAdminHref ? (
        <Link href={websiteAdminHref} className="hp-access__admin-back">
          ← Website admin
        </Link>
      ) : null}
      <Link href={`${base}/connection`} aria-current={route === '/connection' ? 'page' : undefined}>
        Connection
      </Link>
      <Link href={`${base}/partners`} aria-current={route === '/partners' ? 'page' : undefined}>
        Partners
      </Link>
      <Link href={`${base}/content`} aria-current={route === '/content' ? 'page' : undefined}>
        Content
      </Link>
      <Link href={`${base}/billing`} aria-current={route === '/billing' ? 'page' : undefined}>
        Billing
      </Link>
      <button type="button" className="hp-access__ghost" onClick={() => void logout()}>
        Sign out
      </button>
    </nav>
  )

  const partnerNav = (
    <nav className="hp-access__nav" aria-label="Partner">
      <Link href={`${base}/dashboard`} aria-current={route === '/dashboard' ? 'page' : undefined}>
        Dashboard
      </Link>
      <button type="button" className="hp-access__ghost" onClick={() => void logout()}>
        Sign out
      </button>
    </nav>
  )

  let body: React.ReactNode = null
  if (scope === 'partner' && isPartner && route === '/dashboard') {
    body = <PartnerDashboardView basePath={base} />
  } else if (scope === 'staff' && isStaff && route === '/connection') {
    body = <ConnectionView basePath={base} />
  } else if (scope === 'staff' && isStaff && route === '/partners') {
    body = <PartnersView basePath={base} />
  } else if (scope === 'staff' && isStaff && route === '/content') {
    body = <ContentView basePath={base} publicProductPathPrefix={publicProductPathPrefix} />
  } else if (scope === 'staff' && isStaff && route === '/content/new') {
    body = <ContentFormView basePath={base} mode="create" />
  } else if (scope === 'staff' && isStaff && route.startsWith('/content/') && route.endsWith('/edit')) {
    const slug = route.slice('/content/'.length, -'/edit'.length)
    body = <ContentFormView basePath={base} mode="edit" slug={decodeURIComponent(slug)} />
  } else if (scope === 'staff' && isStaff && route === '/billing') {
    body = <BillingView />
  } else if (scope === 'staff' && isStaff) {
    body = <ConnectionView basePath={base} />
  } else if (scope === 'partner' && isPartner) {
    body = <PartnerDashboardView basePath={base} />
  }

  return (
    <div className="hp-access">
      <div className="hp-access__shell">
        {scope === 'staff' ? (isStaff ? staffNav : null) : isPartner ? partnerNav : null}
        {body}
      </div>
    </div>
  )
}
