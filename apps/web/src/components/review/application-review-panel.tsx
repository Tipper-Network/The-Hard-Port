'use client'

import Link from 'next/link'

import { ApplicantJourneyPanel } from '@/components/review/applicant-journey-panel'
import { ApplicationPipelineForm } from '@/components/review/application-pipeline-form'
import { QualificationWorkflowScaffold } from '@/components/review/qualification-workflow-scaffold'
import LinkButton from '@/components/link-button'
import { ReviewerSessionBar } from '@/components/review/reviewer-session-bar'
import { useReviewerSession } from '@/components/review/use-reviewer-session'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { isUnauthorizedError } from '@/lib/api/errors'
import { useApplication } from '@/hooks/api/use-applications'

type ApplicationReviewPanelProps = {
  id: string
}

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function ApplicationReviewPanel({ id }: ApplicationReviewPanelProps) {
  const { user, loading: sessionLoading, error: sessionError, signOut } = useReviewerSession()
  const {
    data: application,
    isPending,
    isError,
    error,
  } = useApplication(id, { enabled: !!user })

  if (sessionLoading || (user && isPending)) {
    return <p className="text-white/70">Loading application…</p>
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
        <LinkButton text="Back to list" href="/review" intensity={1} />
      </div>
    )
  }

  if (!application) {
    return (
      <div className="space-y-4">
        <ReviewerSessionBar user={user} onSignOut={signOut} />
        <p className="text-alert">Application not found</p>
        <LinkButton text="Back to list" href="/review" intensity={1} />
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <ReviewerSessionBar user={user} onSignOut={signOut} />

      <div>
        <Link href="/review" className="text-sm text-accent underline">
          ← All applications
        </Link>
        <h2 className="mt-4 font-heading text-2xl uppercase text-secondary">
          {application.businessName}
        </h2>
        <p className="mt-2 text-sm text-white/60">
          {application.founderName} ·{' '}
          <Link href={`mailto:${application.email}`} className="text-accent underline">
            {application.email}
          </Link>{' '}
          · submitted {formatDate(application.submittedAt)}
        </p>
      </div>

      <Tabs defaultValue="intake" className="gap-6">
        <TabsList variant="line" className="border-b border-white/10 bg-transparent">
          <TabsTrigger value="intake" className="text-white/60 data-active:text-secondary">
            Intake
          </TabsTrigger>
          <TabsTrigger value="journey" className="text-white/60 data-active:text-secondary">
            Site journey
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="text-white/60 data-active:text-secondary">
            Pipeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="intake">
          <section className="border border-white/10 p-6">
            <h3 className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
              Intake responses
            </h3>
            <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <dt className="text-white/50">Core offer</dt>
                <dd className="mt-1 text-white/85">{application.coreOffer}</dd>
              </div>
              <div>
                <dt className="text-white/50">Paying customers</dt>
                <dd className="mt-1 text-white/85">{application.payingCustomers}</dd>
              </div>
              <div>
                <dt className="text-white/50">Operating status</dt>
                <dd className="mt-1 text-white/85">{application.operatingStatus}</dd>
              </div>
              <div>
                <dt className="text-white/50">Primary problems</dt>
                <dd className="mt-1 text-white/85">{application.primaryProblems ?? '-'}</dd>
              </div>
              <div>
                <dt className="text-white/50">Discovery source</dt>
                <dd className="mt-1 text-white/85">{application.discoverySource}</dd>
              </div>
              {application.discoverySourceVideo ? (
                <div>
                  <dt className="text-white/50">Discovery video ID</dt>
                  <dd className="mt-1 font-mono text-white/85">{application.discoverySourceVideo}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-white/50">Delivery history</dt>
                <dd className="mt-1 text-white/85">{application.deliveryHistory}</dd>
              </div>
            </dl>
          </section>
        </TabsContent>

        <TabsContent value="journey">
          <ApplicantJourneyPanel applicationId={application.id} />
        </TabsContent>

        <TabsContent value="pipeline">
          <section className="border border-white/10 p-6">
            <h3 className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
              Pipeline tracker
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Updates sync to Postgres; export CSV with{' '}
              <code className="text-white/80">pnpm --filter api pipeline:export</code>
            </p>
            <div className="mt-6">
              <ApplicationPipelineForm key={application.id} application={application} />
              <QualificationWorkflowScaffold />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
