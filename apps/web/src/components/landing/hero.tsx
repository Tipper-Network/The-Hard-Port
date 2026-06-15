import { BrowserMockup } from './browser-mockup'

function HeroWave() {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 w-full md:h-32"
      aria-hidden="true"
    >
      <path
        d="M0 72C240 108 480 36 720 72C960 108 1200 36 1440 72V120H0V72Z"
        fill="white"
      />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ice">
      <div className="relative bg-navy pb-24 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light opacity-95" />
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-navy-muted/30 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-hero items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-8 lg:px-12 lg:py-20">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-medium tracking-wide text-white/80">
              Set Sail. Stand Out.
            </p>
            <h1 className="text-hero font-extrabold leading-none text-white">
              Your story deserves a port that launches it further.
            </h1>
            <p className="mt-6 max-w-lg text-body-lg leading-body-lg text-white/90">
              The Hard Port is a media agency built for brands ready to move — bold
              creative, sharp strategy, and campaigns that stand out in crowded
              waters.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex min-w-[140px] items-center justify-center rounded-button border border-white px-6 py-3 text-base font-bold text-white transition-colors hover:bg-white hover:text-navy"
              >
                Start a project
              </a>
              <a
                href="#work"
                className="inline-flex min-w-[140px] items-center justify-center rounded-button border border-white/80 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white hover:text-white"
              >
                View our work
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <BrowserMockup />
          </div>
        </div>

        <HeroWave />
      </div>
    </section>
  )
}
