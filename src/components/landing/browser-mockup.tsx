export function BrowserMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.04)]">
      <div className="overflow-hidden rounded-sm border border-white/20 bg-navy-light/90">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
          <span className="size-2 rounded-full bg-white/90" />
          <span className="size-2 rounded-full bg-white/70" />
          <span className="size-2 rounded-full bg-white/50" />
        </div>
        <div className="space-y-3 px-5 py-6">
          <div className="h-2 w-full rounded-full bg-white/90" />
          <div className="h-2 w-[88%] rounded-full bg-white/75" />
          <div className="h-2 w-[62%] rounded-full bg-white/60" />
          <div className="h-2 w-[88%] rounded-full bg-white/75" />
          <div className="h-2 w-[72%] rounded-full bg-white/65" />
        </div>
      </div>
    </div>
  )
}
