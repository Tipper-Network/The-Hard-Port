import LinkButton from '@/components/link_button'
import { slogan } from '@/lib/brand'

function HeroSail() {
  return (
    <img
      src="/THP_Sail_Icon.svg"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 h-full opacity-70 mix-blend-luminosity"
    />
  )
}

export function Hero() {
  return (
    <section className="relative max-h-90vh overflow-hidden bg-depth-0">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/oceanvid.mp4"
        poster="/hero-ocean.jpg"
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary/55" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-linear-to from-primary via-primary/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_50%,transparent_40%,var(--color-primary)_100%)] opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-hero flex-col justify-center px-6 py-24 md:py-32 lg:px-12">
        <p className="mb-6 inline-flex w-fit items-center gap-2 border border-accent/60 bg-accent/10 px-3 py-1.5 text-xs font-bold tracking-[0.18em] text-accent uppercase">
          <span className="inline-block h-1.5 w-1.5 bg-accent" />
          {slogan}
        </p>

        <h1 className="max-w-4xl font-heading text-5xl font-normal tracking-tight text-secondary uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] md:text-6xl lg:text-7xl xl:text-[5rem]">
          Your business isn&apos;t sinking.
          <br />
          <span className="text-accent">It&apos;s just not going anywhere.</span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
          That&apos;s worse. You&apos;re comfortable. Comfortable is just sinking
          politely. <span className="font-bold text-white">Hard a-port.</span>
        </p>

        <div className="mt-10 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
          <LinkButton text="Read the letter" href="/" hash="letter" intensity={1} variant="ghost" />
          <LinkButton text="How THP works" href="/work-with-us" intensity={2} />
        </div>

        <p className="mt-6 text-sm text-white/60">
          Level 1 businesses with paying customers. Application is free. Diagnostic is
          paid. Not everyone gets in.
        </p>
      </div>

      <HeroSail />
    </section>
  )
}
