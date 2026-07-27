'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useApplicationJourney } from '@/hooks/api/use-tracking'

function formatWhen(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'medium',
  })
}

function eventLabel(name: string) {
  return name.replace(/_/g, ' ')
}

function payloadSummary(payload: Record<string, unknown>) {
  const parts: string[] = []
  const keys = [
    'sectionId',
    'rung',
    'step',
    'label',
    'href',
    'pathname',
    'funnelStep',
    'maxRung',
    'lastStep',
    'businessName',
    'pct',
  ]
  for (const key of keys) {
    if (payload[key] != null && payload[key] !== '') {
      parts.push(`${key}: ${String(payload[key])}`)
    }
  }
  return parts.join(' · ') || '—'
}

type ApplicantJourneyPanelProps = {
  applicationId: string
}

export function ApplicantJourneyPanel({ applicationId }: ApplicantJourneyPanelProps) {
  const { data, isPending, isError, error } = useApplicationJourney(applicationId)

  if (isPending) {
    return <p className="text-white/70">Loading site journey…</p>
  }

  if (isError || !data) {
    return <p className="text-alert">{error?.message ?? 'Failed to load journey'}</p>
  }

  const profile = data.profile

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {data.summary.maxRung > 0 ? (
          <Badge variant="outline" className="border-white/20 text-white/80">
            Max homepage rung: <span className="ml-1 text-accent">{data.summary.maxRung}</span>
          </Badge>
        ) : null}
        {data.summary.submitted ? (
          <Badge className="bg-accent/20 text-accent">Submitted</Badge>
        ) : data.summary.abandoned ? (
          <Badge variant="destructive">Abandoned form</Badge>
        ) : null}
        {data.summary.lastFormStep ? (
          <Badge variant="outline" className="border-white/20 text-white/80">
            Last form step: {data.summary.lastFormStep}
          </Badge>
        ) : null}
        <Badge variant="outline" className="border-white/20 text-white/80">
          {data.summary.eventCount} events
        </Badge>
      </div>

      {profile ? (
        <Card className="border-white/10 bg-white/5 text-white ring-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-secondary">Visitor profile</CardTitle>
            <CardDescription className="text-white/50">
              Captured on identify / submit — not verified identity
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <span className="text-white/45">Locale </span>
              <span className="text-white/85">{profile.locale ?? '—'}</span>
            </div>
            <div>
              <span className="text-white/45">Timezone </span>
              <span className="text-white/85">{profile.timezone ?? '—'}</span>
            </div>
            <div>
              <span className="text-white/45">Inferred country </span>
              <span className="text-white/85">{profile.inferredCountry ?? '—'}</span>
            </div>
            <div>
              <span className="text-white/45">Phone code </span>
              <span className="text-white/85">{profile.phoneCountryCode ?? '—'}</span>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Separator className="bg-white/10" />

      {data.events.length === 0 ? (
        <p className="text-sm text-white/50">
          No tracked events linked to this application yet. They may have declined analytics, or
          applied before tracking shipped.
        </p>
      ) : (
        <Card className="border-white/10 bg-white/5 text-white ring-white/10">
          <CardHeader>
            <CardTitle className="text-secondary">Event timeline</CardTitle>
            <CardDescription className="text-white/50">Chronological path</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/50">When</TableHead>
                  <TableHead className="text-white/50">Event</TableHead>
                  <TableHead className="text-white/50">Path</TableHead>
                  <TableHead className="text-white/50">Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.events.map((event) => (
                  <TableRow key={event.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="whitespace-nowrap text-xs text-white/60">
                      {formatWhen(event.occurredAt)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-accent">
                      {eventLabel(event.eventName)}
                    </TableCell>
                    <TableCell className="text-xs text-white/70">{event.path ?? '—'}</TableCell>
                    <TableCell className="max-w-xs truncate text-xs text-white/50">
                      {payloadSummary(event.payload)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
