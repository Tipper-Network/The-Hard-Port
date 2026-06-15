export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy px-6 py-20 lg:px-12 lg:py-28">
      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-navy-light/40 blur-3xl" />

      <div className="relative mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-wide text-white/70">
            Set Sail. Stand Out.
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-5xl">
            Ready to launch your next campaign?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80">
            Tell us where you&apos;re headed. We&apos;ll map the route, build the
            creative, and help you stand out from the first impression onward.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@thehardport.com"
              className="inline-flex min-w-[180px] items-center justify-center rounded-button bg-orange px-8 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              hello@thehardport.com
            </a>
            <a
              href="#"
              className="inline-flex min-w-[180px] items-center justify-center rounded-button border border-white/80 px-8 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white hover:text-white"
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
