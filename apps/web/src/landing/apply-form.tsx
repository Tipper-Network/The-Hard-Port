'use client'

import { useState, type FormEvent } from 'react'

import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'

const WHATSAPP_NUMBER = '96178883966'

type FormState = {
  fullName: string
  businessName: string
  contact: string
  message: string
}

const initialState: FormState = {
  fullName: '',
  businessName: '',
  contact: '',
  message: '',
}

type FieldErrors = Partial<Record<keyof FormState, boolean>>

function buildWhatsappMessage(form: FormState) {
  const lines = [
    'Free slot application:',
    `Name: ${form.fullName}`,
    `Business: ${form.businessName}`,
    `Contact: ${form.contact}`,
  ]

  if (form.message.trim()) {
    lines.push(`Where they are / want to be: ${form.message.trim()}`)
  }

  return lines.join('\n')
}

export function ApplyForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [sent, setSent] = useState(false)

  function update<K extends keyof FormState>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nextErrors: FieldErrors = {
      fullName: !form.fullName.trim(),
      businessName: !form.businessName.trim(),
      contact: !form.contact.trim(),
    }
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) return

    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildWhatsappMessage(form),
    )}`
    window.open(href, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  if (sent) {
    return (
      <div className="border border-accent bg-accent/10 p-8 text-center">
        <p className="text-lg font-extrabold text-white">
          Got it. We opened WhatsApp for you &mdash; hit send.
        </p>
        <p className="mt-2 text-sm text-white/70">
          Nothing else to fill out. We call you, not the other way around.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-white/15 bg-white/5 p-8"
    >
      <h3 className="text-lg font-extrabold tracking-wide text-white uppercase">
        Apply for the free slot
      </h3>
      <p className="mt-2 text-sm text-white/60">
        Four fields. No account, no calendar link, no gate.
      </p>

      <div className="mt-7 space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="apply-name" className="text-white/80">
            Your name
          </Label>
          <Input
            id="apply-name"
            value={form.fullName}
            onChange={update('fullName')}
            aria-invalid={errors.fullName}
            className="border-white/25 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="apply-business" className="text-white/80">
            Business name
          </Label>
          <Input
            id="apply-business"
            value={form.businessName}
            onChange={update('businessName')}
            aria-invalid={errors.businessName}
            className="border-white/25 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="apply-contact" className="text-white/80">
            Email or WhatsApp number
          </Label>
          <Input
            id="apply-contact"
            value={form.contact}
            onChange={update('contact')}
            aria-invalid={errors.contact}
            className="border-white/25 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="apply-message" className="text-white/80">
            Where are you now, and where do you want to be? (optional)
          </Label>
          <Textarea
            id="apply-message"
            value={form.message}
            onChange={update('message')}
            rows={3}
            className="border-white/25 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>

        {Object.values(errors).some(Boolean) && (
          <p className="text-sm font-semibold text-accent">
            Fill in your name, business, and contact &mdash; that&apos;s the whole form.
          </p>
        )}

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center bg-accent px-7 py-4 text-base font-extrabold tracking-wide text-white uppercase transition-transform hover:-translate-y-0.5"
        >
          Send it
        </button>
      </div>
    </form>
  )
}
