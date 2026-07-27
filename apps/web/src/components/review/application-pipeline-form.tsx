'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  LIFECYCLE_STATUSES,
  QUALIFICATION_RESULTS,
  type ApplicationRecord,
} from '@/lib/intake/pipeline'
import {
  updateApplicationPipeline,
  type UpdatePipelinePayload,
} from '@/lib/api/review'

type ApplicationPipelineFormProps = {
  application: ApplicationRecord
  onUpdated: (application: ApplicationRecord) => void
}

export function ApplicationPipelineForm({
  application,
  onUpdated,
}: ApplicationPipelineFormProps) {
  const [form, setForm] = useState({
    lifecycleStatus: application.lifecycleStatus,
    qualificationResult: application.qualificationResult ?? '',
    maturityClassification: application.maturityClassification ?? '',
    assignedReviewer: application.assignedReviewer ?? '',
    missingEvidence: application.missingEvidence ?? '',
    nextAction: application.nextAction ?? '',
    paymentStatus: application.paymentStatus ?? '',
    activeCapacitySlot: application.activeCapacitySlot,
    notes: application.notes ?? '',
    clientId: application.clientId ?? '',
  })
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    setError(null)

    const payload: UpdatePipelinePayload = {
      lifecycleStatus: form.lifecycleStatus,
      qualificationResult: form.qualificationResult || null,
      maturityClassification: form.maturityClassification || null,
      assignedReviewer: form.assignedReviewer || null,
      missingEvidence: form.missingEvidence || null,
      nextAction: form.nextAction || null,
      paymentStatus: form.paymentStatus || null,
      activeCapacitySlot: form.activeCapacitySlot,
      notes: form.notes || null,
      clientId: form.clientId || null,
    }

    const result = await updateApplicationPipeline(application.id, payload)
    if (!result.ok) {
      setStatus('error')
      setError(result.error)
      return
    }

    onUpdated(result.application)
    setStatus('saved')
    setTimeout(() => setStatus('idle'), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="lifecycleStatus">Lifecycle status</Label>
          <select
            id="lifecycleStatus"
            value={form.lifecycleStatus}
            onChange={(e) => setForm((prev) => ({ ...prev, lifecycleStatus: e.target.value }))}
            className="mt-2 w-full border border-white/20 bg-depth-9 px-3 py-2 text-sm text-white"
          >
            {LIFECYCLE_STATUSES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="qualificationResult">Qualification result</Label>
          <select
            id="qualificationResult"
            value={form.qualificationResult}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, qualificationResult: e.target.value }))
            }
            className="mt-2 w-full border border-white/20 bg-depth-9 px-3 py-2 text-sm text-white"
          >
            <option value="">—</option>
            {QUALIFICATION_RESULTS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="assignedReviewer">Assigned reviewer</Label>
          <Input
            id="assignedReviewer"
            value={form.assignedReviewer}
            onChange={(e) => setForm((prev) => ({ ...prev, assignedReviewer: e.target.value }))}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="clientId">Client ID</Label>
          <Input
            id="clientId"
            value={form.clientId}
            onChange={(e) => setForm((prev) => ({ ...prev, clientId: e.target.value }))}
            placeholder="THP-SMB-00X"
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="maturityClassification">Maturity classification</Label>
          <Input
            id="maturityClassification"
            value={form.maturityClassification}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, maturityClassification: e.target.value }))
            }
            placeholder="Level 1"
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="paymentStatus">Payment status</Label>
          <Input
            id="paymentStatus"
            value={form.paymentStatus}
            onChange={(e) => setForm((prev) => ({ ...prev, paymentStatus: e.target.value }))}
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="nextAction">Next action</Label>
        <Input
          id="nextAction"
          value={form.nextAction}
          onChange={(e) => setForm((prev) => ({ ...prev, nextAction: e.target.value }))}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="missingEvidence">Missing evidence</Label>
        <Textarea
          id="missingEvidence"
          value={form.missingEvidence}
          onChange={(e) => setForm((prev) => ({ ...prev, missingEvidence: e.target.value }))}
          className="mt-2 min-h-20"
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={form.notes}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          className="mt-2 min-h-28"
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-white/80">
        <input
          type="checkbox"
          checked={form.activeCapacitySlot}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, activeCapacitySlot: e.target.checked }))
          }
          className="size-4 accent-accent"
        />
        Active capacity slot (one client at a time)
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'saving'}
          className="bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-background disabled:opacity-60"
        >
          {status === 'saving' ? 'Saving…' : 'Save pipeline'}
        </button>
        {status === 'saved' ? (
          <span className="text-sm text-accent">Saved.</span>
        ) : null}
        {error ? <span className="text-sm text-alert">{error}</span> : null}
      </div>
    </form>
  )
}
