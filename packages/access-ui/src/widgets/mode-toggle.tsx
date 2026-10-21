'use client'

type Option = { id: string; label: string; disabled?: boolean }

type Props = {
  name: string
  value: string
  options: Option[]
  onChange: (id: string) => void
}

export function ModeToggle({ name, value, options, onChange }: Props) {
  const visible = options.filter((o) => !o.disabled)
  if (visible.length <= 1) return null

  return (
    <div className="hp-product__mode-toggle" role="tablist" aria-label={name}>
      {visible.map((opt) => (
        <button
          key={opt.id}
          type="button"
          role="tab"
          aria-selected={value === opt.id}
          className={value === opt.id ? 'hp-product__mode hp-product__mode--active' : 'hp-product__mode'}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
