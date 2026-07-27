'use client'

import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFunnelSummary } from '@/hooks/api/use-tracking'

function pct(value: number | null) {
  if (value == null) return '—'
  return `${Math.round(value * 100)}%`
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string
  value: number | string
  hint?: string
}) {
  return (
    <Card className="border-white/10 bg-white/5 text-white ring-white/10">
      <CardHeader className="pb-2">
        <CardDescription className="text-white/50">{label}</CardDescription>
        <CardTitle className="text-3xl font-extrabold text-secondary">{value}</CardTitle>
      </CardHeader>
      {hint ? (
        <CardContent className="pt-0 text-xs text-white/45">{hint}</CardContent>
      ) : null}
    </Card>
  )
}

export function FunnelAnalyticsDashboard() {
  const { data, isPending, isError, error } = useFunnelSummary(30)

  if (isPending) {
    return <p className="text-white/70">Loading funnel analytics…</p>
  }

  if (isError || !data) {
    return <p className="text-alert">{error?.message ?? 'Failed to load analytics'}</p>
  }

  const maxSectionViews = Math.max(...data.sectionReach.map((s) => s.views), 1)

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-white/60">Last {data.periodDays} days · first-party events only</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Sessions" value={data.totals.sessions} hint="session_start events" />
        <StatCard label="Apply opens" value={data.totals.applyViews} hint={pct(data.conversion.sessionToApply) + ' of sessions'} />
        <StatCard label="Submissions" value={data.totals.applySubmits} hint={pct(data.conversion.applyOpenRate) + ' of apply opens'} />
        <StatCard label="Form abandons" value={data.totals.formAbandons} hint={`${data.totals.ctaClicks} CTA clicks`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/5 text-white ring-white/10">
          <CardHeader>
            <CardTitle className="text-secondary">Homepage ladder reach</CardTitle>
            <CardDescription className="text-white/50">
              section_view counts by rung — where scroll depth drops
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.sectionReach.length === 0 ? (
              <p className="text-sm text-white/50">No section views yet. Accept tracking + browse homepage.</p>
            ) : (
              data.sectionReach.map((section) => (
                <div key={`${section.rung}-${section.sectionId}`} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-white/80">
                      Rung {section.rung}{' '}
                      <span className="text-white/45">· {section.sectionId}</span>
                    </span>
                    <span className="text-white/50">{section.views}</span>
                  </div>
                  <Progress
                    value={(section.views / maxSectionViews) * 100}
                    className="h-2 bg-white/10 [&_[data-slot=progress-indicator]]:bg-accent"
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 text-white ring-white/10">
          <CardHeader>
            <CardTitle className="text-secondary">Apply form steps</CardTitle>
            <CardDescription className="text-white/50">
              Views vs completes vs abandons per step
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.formSteps.length === 0 ? (
              <p className="text-sm text-white/50">No form step events yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/50">Step</TableHead>
                    <TableHead className="text-right text-white/50">Views</TableHead>
                    <TableHead className="text-right text-white/50">Done</TableHead>
                    <TableHead className="text-right text-white/50">Left</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.formSteps.map((step) => (
                    <TableRow key={step.step} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-mono text-xs text-white/85">{step.step}</TableCell>
                      <TableCell className="text-right text-white/70">{step.views}</TableCell>
                      <TableCell className="text-right text-accent">{step.completes}</TableCell>
                      <TableCell className="text-right text-alert">{step.abandons}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/5 text-white ring-white/10">
        <CardHeader>
          <CardTitle className="text-secondary">Top events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.topEvents.map((event) => (
              <Badge
                key={event.eventName}
                variant="outline"
                className="border-white/20 bg-transparent text-white/80"
              >
                {event.eventName}{' '}
                <span className="ml-1 text-accent">{event.count}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

type ReviewOperatorTabsProps = {
  applicationsPanel: ReactNode
}

export function ReviewOperatorTabs({ applicationsPanel }: ReviewOperatorTabsProps) {
  return (
    <Tabs defaultValue="applications" className="gap-6">
      <TabsList variant="line" className="border-b border-white/10 bg-transparent">
        <TabsTrigger
          value="applications"
          className="text-white/60 data-active:text-secondary"
        >
          Applications
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="text-white/60 data-active:text-secondary"
        >
          Funnel analytics
        </TabsTrigger>
      </TabsList>
      <TabsContent value="applications">{applicationsPanel}</TabsContent>
      <TabsContent value="analytics">
        <FunnelAnalyticsDashboard />
      </TabsContent>
    </Tabs>
  )
}
