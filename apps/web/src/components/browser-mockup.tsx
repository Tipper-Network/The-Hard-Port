type BrowserMockupProps = {
  variant?: 'lines' | 'grid'
  showPhone?: boolean
  className?: string
}

export function BrowserMockup({
  variant = 'lines',
  showPhone = false,
  className = '',
}: BrowserMockupProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.04)] ${className}`}
    >
      <div className="overflow-hidden rounded-sm border border-primary/10 bg-primary">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
          <span className="size-2 rounded-full bg-white/90" />
          <span className="size-2 rounded-full bg-white/70" />
          <span className="size-2 rounded-full bg-white/50" />
        </div>

        {variant === 'lines' ? (
          <div className="space-y-3 px-5 py-6">
            <div className="h-2 w-full rounded-full bg-white/90" />
            <div className="h-2 w-[88%] rounded-full bg-white/75" />
            <div className="h-2 w-[62%] rounded-full bg-white/60" />
            <div className="h-2 w-[88%] rounded-full bg-white/75" />
            <div className="h-2 w-[72%] rounded-full bg-white/65" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 p-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-sm border border-white/25 bg-primary/80"
              />
            ))}
          </div>
        )}
      </div>

      {showPhone ? (
        <div
          className="absolute -right-4 top-1/2 w-[4.5rem] -translate-y-1/2 rounded-md border border-primary/10 bg-primary p-2 shadow-lg sm:-right-8 sm:w-20"
          aria-hidden="true"
        >
          <div className="mx-auto mb-1.5 h-1 w-6 rounded-full bg-white/40" />
          <div className="aspect-[9/16] rounded-sm border border-white/20 bg-primary/80" />
        </div>
      ) : null}
    </div>
  )
}
