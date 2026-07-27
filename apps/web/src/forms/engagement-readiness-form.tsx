'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { IntakePayload } from '@/lib/intake/payload'
import { submitIntake } from '@/lib/intake/submit'
import { getVisitorId, identifyVisitor, trackEvent } from '@/lib/tracking'

type FormState = {
  founderName: string
  businessName: string
  email: string
  contactPhone: string
  coreOffer: string
  payingCustomers: string
  deliveryHistory: string
  operatingStatus: string
  founderContinuation: string
  onlineActivity: string
  primaryProblems: string
  availableRecords: string
  discoverySource: string
  willingnessExamine: boolean
  willingnessEvidence: boolean
  willingnessFeedback: boolean
  crisisIndicators: string
  privacyAck: boolean
}

const initialState: FormState = {
  founderName: '',
  businessName: '',
  email: '',
  contactPhone: '',
  coreOffer: '',
  payingCustomers: '',
  deliveryHistory: '',
  operatingStatus: '',
  founderContinuation: '',
  onlineActivity: '',
  primaryProblems: '',
  availableRecords: '',
  discoverySource: '',
  willingnessExamine: false,
  willingnessEvidence: false,
  willingnessFeedback: false,
  crisisIndicators: '',
  privacyAck: false,
}

type FieldErrors = Partial<Record<keyof FormState, boolean>>

function buildPayload(form: FormState): IntakePayload {
  const visitorId = getVisitorId()
  return {
    submittedAt: new Date().toISOString(),
    form: 'THP-ENGAGEMENT-READINESS-APPLICATION',
    version: '1.0.0',
    ...form,
    ...(visitorId ? { visitorId } : {}),
  }
}

export function EngagementReadinessForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'manual'>('idle')
  const [manualJson, setManualJson] = useState('')

  useEffect(() => {
    trackEvent('application_view')
  }, [])

  function syncIdentity(next: Pick<FormState, 'email' | 'founderName'>) {
    const email = next.email.trim()
    const name = next.founderName.trim()
    if (!email && !name) return
    identifyVisitor({
      ...(email ? { email } : {}),
      ...(name ? { name } : {}),
    })
  }

  function updateText(key: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nextErrors: FieldErrors = {
      founderName: !form.founderName.trim(),
      businessName: !form.businessName.trim(),
      email: !form.email.trim(),
      coreOffer: !form.coreOffer.trim(),
      payingCustomers: !form.payingCustomers.trim(),
      deliveryHistory: !form.deliveryHistory.trim(),
      operatingStatus: !form.operatingStatus.trim(),
      founderContinuation: !form.founderContinuation.trim(),
      discoverySource: !form.discoverySource.trim(),
      privacyAck: !form.privacyAck,
    }
    if (!form.willingnessExamine || !form.willingnessEvidence || !form.willingnessFeedback) {
      setStatus('idle')
      alert('Confirm all three readiness statements.')
      return
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    const payload = buildPayload(form)
    identifyVisitor({ email: form.email.trim(), name: form.founderName.trim() })
    trackEvent('application_submit', { businessName: form.businessName.trim() })
    setStatus('submitting')

    try {
      const result = await submitIntake(payload)

      if (result.ok) {
        router.replace('/apply/submitted')
        return
      }

      if (result.manual) {
        setManualJson(JSON.stringify(payload, null, 2))
        setStatus('manual')
        return
      }

      alert(result.error)
      setStatus('idle')
    } catch {
      setManualJson(JSON.stringify(payload, null, 2))
      setStatus('manual')
    }
  }

  if (status === 'manual') {
    return (
      <div className="border border-secondary/15 bg-secondary/5 p-8">
        <p className="font-heading text-lg text-secondary uppercase">
          Intake not configured; manual handoff
        </p>
        <p className="mt-2 text-sm text-white/70">
          Email this JSON to your intake address, or start the API with{' '}
          <code className="text-accent">THP_API_URL</code> in{' '}
          <code className="text-accent">apps/web/.env</code> (see{' '}
          <code className="text-accent">pnpm dev:api</code>).
        </p>
        <pre className="mt-4 max-h-64 overflow-auto border border-white/10 bg-black/40 p-4 text-left text-xs text-white/80">
          {manualJson}
        </pre>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-secondary/15 bg-secondary/5 p-8"
    >
      <h3 className="font-heading text-lg font-normal tracking-wide text-secondary uppercase">
        Engagement Readiness Application
      </h3>
      <p className="mt-2 text-sm text-white/60">
        Self-reported intake only. Completion does not guarantee qualification,
        diagnosis, or commercial acceptance.
      </p>

      <div className="mt-7 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Your name" id="founder-name" error={errors.founderName}>
            <Input
              id="founder-name"
              value={form.founderName}
              onChange={updateText('founderName')}
              onBlur={() => syncIdentity(form)}
              className={inputClass}
            />
          </Field>
          <Field label="Business name" id="business-name" error={errors.businessName}>
            <Input id="business-name" value={form.businessName} onChange={updateText('businessName')} className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Email" id="email" error={errors.email}>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={updateText('email')}
              onBlur={() => syncIdentity(form)}
              className={inputClass}
            />
          </Field>
          <Field label="Phone / WhatsApp (optional)" id="phone">
            <Input id="phone" value={form.contactPhone} onChange={updateText('contactPhone')} className={inputClass} />
          </Field>
        </div>

        <Field label="What do you sell; in one clear sentence?" id="core-offer" error={errors.coreOffer}>
          <Textarea id="core-offer" rows={2} value={form.coreOffer} onChange={updateText('coreOffer')} className={inputClass} />
        </Field>

        <Field label="Paying customers; how many unrelated buyers, with examples?" id="paying" error={errors.payingCustomers}>
          <Textarea id="paying" rows={2} value={form.payingCustomers} onChange={updateText('payingCustomers')} className={inputClass} />
        </Field>

        <Field label="How many times have you delivered this offer?" id="delivery" error={errors.deliveryHistory}>
          <Textarea id="delivery" rows={2} value={form.deliveryHistory} onChange={updateText('deliveryHistory')} className={inputClass} />
        </Field>

        <Field label="Is the business actively operating right now?" id="operating" error={errors.operatingStatus}>
          <Textarea id="operating" rows={2} value={form.operatingStatus} onChange={updateText('operatingStatus')} className={inputClass} />
        </Field>

        <Field label="Do you intend to keep building this as a business?" id="continuation" error={errors.founderContinuation}>
          <Textarea id="continuation" rows={2} value={form.founderContinuation} onChange={updateText('founderContinuation')} className={inputClass} />
        </Field>

        <Field label="Primary online channels and activity" id="online">
          <Textarea id="online" rows={2} value={form.onlineActivity} onChange={updateText('onlineActivity')} className={inputClass} />
        </Field>

        <Field label="What is not working; and what have you already tried?" id="problems">
          <Textarea id="problems" rows={3} value={form.primaryProblems} onChange={updateText('primaryProblems')} className={inputClass} />
        </Field>

        <Field label="What records can you share if we proceed? (invoices, messages, analytics…)" id="records">
          <Textarea id="records" rows={2} value={form.availableRecords} onChange={updateText('availableRecords')} className={inputClass} />
        </Field>

        <Field label="How did you find The Hard Port?" id="discovery" error={errors.discoverySource}>
          <Input id="discovery" value={form.discoverySource} onChange={updateText('discoverySource')} placeholder="YouTube, referral, search…" className={inputClass} />
        </Field>

        <Field label="Legal, financial, or operational crisis we should know about (optional)" id="crisis">
          <Textarea id="crisis" rows={2} value={form.crisisIndicators} onChange={updateText('crisisIndicators')} className={inputClass} />
        </Field>

        <div className="space-y-3 border-t border-white/10 pt-5">
          <p className="text-sm font-semibold text-white/80">Readiness (required)</p>
          <Check id="w1" checked={form.willingnessExamine} onChange={(v) => setForm((p) => ({ ...p, willingnessExamine: v }))} label="I am willing to examine my business assumptions with evidence." />
          <Check id="w2" checked={form.willingnessEvidence} onChange={(v) => setForm((p) => ({ ...p, willingnessEvidence: v }))} label="I can provide basic business evidence if asked." />
          <Check id="w3" checked={form.willingnessFeedback} onChange={(v) => setForm((p) => ({ ...p, willingnessFeedback: v }))} label="I am open to customer and market feedback, including uncomfortable findings." />
        </div>

        <div className="space-y-2 border-t border-white/10 pt-5">
          <Check id="privacy" checked={form.privacyAck} onChange={(v) => setForm((p) => ({ ...p, privacyAck: v }))} label="I understand this application is self-reported, does not guarantee acceptance, and that THP will use my information only to evaluate fit and contact me. (Privacy notice; full text pending legal review.)" error={errors.privacyAck} />
        </div>

        {Object.values(errors).some(Boolean) && (
          <p className="text-sm font-semibold text-accent">Complete required fields and confirm the privacy notice.</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-2 inline-flex w-full items-center justify-center bg-accent px-7 py-4 text-base font-extrabold tracking-wide text-background uppercase transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit application'}
        </button>
      </div>
    </form>
  )
}

const inputClass = 'border-white/25 bg-white/5 text-white placeholder:text-white/40'

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-white/80">
        {label}
      </Label>
      {children}
      {error ? <p className="text-xs text-accent">Required</p> : null}
    </div>
  )
}

function Check({
  id,
  checked,
  onChange,
  label,
  error,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  error?: boolean
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer gap-3 text-sm leading-6 text-white/80">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
      />
      <span className={error ? 'text-accent' : undefined}>{label}</span>
    </label>
  )
}
