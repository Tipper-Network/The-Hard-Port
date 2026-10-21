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

export type AccessAppProps = {
  basePath?: string
}

const staffRoles = new Set(['owner', 'admin', 'staff'])

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

export function AccessApp({ basePath = '/thp' }: AccessAppProps) {
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

    if (route === '/login' || route.startsWith('/login/')) {
      if (isStaff) setPendingRoute(`${base}/connection`)
      return
    }
    if (route === '/partner' || route.startsWith('/partner/login')) {
      if (isPartner) setPendingRoute(`${base}/partner/dashboard`)
      return
    }
    if (!session) {
      const onPartnerAuth = route === '/partner' || route.startsWith('/partner/login')
      const onStaffAuth = route === '/login' || route.startsWith('/login/')
      if (route.startsWith('/partner') && !onPartnerAuth) {
        setPendingRoute(`${base}/partner`)
      } else if (!onStaffAuth && !onPartnerAuth) {
        setPendingRoute(`${base}/login`)
      } else {
        setPendingRoute(null)
      }
      return
    }
    if (isPartner && !route.startsWith('/partner')) {
      setPendingRoute(`${base}/partner/dashboard`)
      return
    }
    if (isStaff && route.startsWith('/partner')) {
      setPendingRoute(`${base}/connection`)
      return
    }
    setPendingRoute(null)
  }, [session, route, base])

  useEffect(() => {
    if (pendingRoute) router.replace(pendingRoute)
  }, [pendingRoute, router])

  const refreshSession = () => {
    void getSession(base).then(setSession)
  }

  const logout = async () => {
    await apiFetch(base, '/auth/logout', { method: 'POST', body: '{}' })
    setSession(null)
    router.push(`${base}/login`)
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

  if (route === '/login' || route.startsWith('/login/')) {
    if (isStaff) return null
    return (
      <div className="hp-access">
        <LoginView basePath={base} onLoggedIn={refreshSession} />
      </div>
    )
  }

  if (route === '/partner' || route.startsWith('/partner/login')) {
    if (isPartner) return null
    return (
      <div className="hp-access">
        <PartnerLoginView basePath={base} onLoggedIn={refreshSession} />
      </div>
    )
  }

  if (!session) return null

  const staffNav = (
    <nav className="hp-access__nav" aria-label="Console">
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
      <Link href={`${base}/partner/dashboard`} aria-current={route === '/partner/dashboard' ? 'page' : undefined}>
        Dashboard
      </Link>
      <button type="button" className="hp-access__ghost" onClick={() => void logout()}>
        Sign out
      </button>
    </nav>
  )

  let body: React.ReactNode = null
  if (isPartner && route === '/partner/dashboard') body = <PartnerDashboardView basePath={base} />
  else if (isStaff && route === '/connection') body = <ConnectionView basePath={base} />
  else if (isStaff && route === '/partners') body = <PartnersView basePath={base} />
  else if (isStaff && route === '/content') body = <ContentView basePath={base} />
  else if (isStaff && route === '/content/new') body = <ContentFormView basePath={base} mode="create" />
  else if (isStaff && route.startsWith('/content/') && route.endsWith('/edit')) {
    const slug = route.slice('/content/'.length, -'/edit'.length)
    body = <ContentFormView basePath={base} mode="edit" slug={decodeURIComponent(slug)} />
  }
  else if (isStaff && route === '/billing') body = <BillingView />
  else if (isStaff) body = <ConnectionView basePath={base} />
  else body = <PartnerDashboardView basePath={base} />

  return (
    <div className="hp-access">
      <div className="hp-access__shell">
        {isStaff ? staffNav : partnerNav}
        {body}
      </div>
    </div>
  )
}
