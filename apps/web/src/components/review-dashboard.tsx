'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import LinkButton from '@/components/link_button'
import { clearAccessToken, getAccessToken } from '@/lib/auth-session'
import { listApplications, type ApplicationSummary } from '@/lib/reviewer-api'

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function ReviewDashboard() {
  const router = useRouter()
  const [applications, setApplications] = useState<ApplicationSummary[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/sign-in')
      return
    }

    let cancelled = false

    async function load() {
      const result = await listApplications()
      if (cancelled) return

      if (!result.ok) {
        if (result.unauthorized) {
          clearAccessToken()
          router.replace('/sign-in')
          return
        }
        setError(result.error)
        setLoading(false)
        return
      }

      setApplications(result.applications)
      setLoading(false)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [router])

  function signOut() {
    clearAccessToken()
    router.replace('/sign-in')
  }

  if (loading) {
    return (
      <p className="text-white/70">Loading applications…</p>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-alert">{error}</p>
        <LinkButton text="Try again" href="/review" intensity={1} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-white/60">
          {applications.length} application{applications.length === 1 ? '' : 's'}
        </p>
        <button
          type="button"
          onClick={signOut}
          className="text-sm font-semibold text-accent underline"
        >
          Sign out
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="text-white/70">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-xs font-bold tracking-[0.12em] text-white/50 uppercase">
              <tr>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Founder</th>
                <th className="px-4 py-3">Business</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t border-white/10 text-white/80">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(app.submittedAt)}</td>
                  <td className="px-4 py-3">{app.founderName}</td>
                  <td className="px-4 py-3">{app.businessName}</td>
                  <td className="px-4 py-3">
                    <Link href={`mailto:${app.email}`} className="text-accent underline">
                      {app.email}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{app.discoverySource}</td>
                  <td className="px-4 py-3 font-mono text-xs">{app.lifecycleStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
