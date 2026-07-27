'use client'

import LinkButton from '@/components/link-button'
import { ApplicationsListPanel } from '@/components/review/applications-list-panel'
import { ReviewOperatorTabs } from '@/components/review/funnel-analytics-dashboard'
import { ReviewerSessionBar } from '@/components/review/reviewer-session-bar'
import { useReviewerSession } from '@/components/review/use-reviewer-session'
import { isUnauthorizedError } from '@/lib/api/errors'
import { useApplications } from '@/hooks/api/use-applications'

export function ReviewDashboard() {
  const { user, loading: sessionLoading, error: sessionError, signOut } = useReviewerSession()
  const {
    data: applications = [],
    isPending,
    isError,
    error,
  } = useApplications({ enabled: !!user })

  if (sessionLoading || (user && isPending)) {
    return <p className="text-white/70">Loading applications…</p>
  }

  if (sessionError) {
    return (
      <div className="space-y-4">
        <p className="text-alert">{sessionError}</p>
        <LinkButton text="Sign in" href="/sign-in" intensity={1} />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (isError) {
    if (isUnauthorizedError(error)) {
      return null
    }

    return (
      <div className="space-y-4">
        <ReviewerSessionBar user={user} onSignOut={signOut} />
        <p className="text-alert">{error.message}</p>
        <LinkButton text="Try again" href="/review" intensity={1} />
      </div>
    )
  }

  const activeSlot = applications.find((app) => app.activeCapacitySlot)

  return (
    <div className="space-y-8">
      <ReviewerSessionBar user={user} onSignOut={signOut} />

      <div className="space-y-1">
        <p className="text-sm text-white/60">
          {applications.length} application{applications.length === 1 ? '' : 's'}
        </p>
        {activeSlot ? (
          <p className="text-sm text-accent">Capacity slot: {activeSlot.businessName}</p>
        ) : (
          <p className="text-sm text-white/40">No active capacity slot</p>
        )}
      </div>

      <ReviewOperatorTabs
        applicationsPanel={
          applications.length === 0 ? (
            <p className="text-white/70">No applications yet.</p>
          ) : (
            <ApplicationsListPanel applications={applications} />
          )
        }
      />
    </div>
  )
}
