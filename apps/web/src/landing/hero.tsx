import LinkButton from '#/components/link_button'
import { slogan } from '#/lib/brand'

function HeroSail() {
  return (
    <img
      src="/THP_Sail_Icon.svg"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 h-full opacity-40 mix-blend-luminosity"
    />
  )
}

export function Hero() {
  return (
    <section className="relative min-h-144 overflow-hidden bg-primary md:min-h-176">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/oceanvid.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary/75" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-linear-to from-primary via-primary/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-hero flex-col justify-center px-6 py-24 md:py-32 lg:px-12">
        <p className="mb-6 inline-flex w-fit items-center gap-2 border border-accent/60 bg-accent/10 px-3 py-1.5 text-xs font-bold tracking-[0.18em] text-accent uppercase">
          <span className="inline-block h-1.5 w-1.5 bg-accent" />
          {slogan}
        </p>

        <h1 className="max-w-4xl text-[2.5rem] leading-[0.92] font-extrabold tracking-tight text-white uppercase md:text-6xl lg:text-[5rem]">
          Your business isn&apos;t sinking.
          <br />
          <span className="text-accent">It&apos;s just not going anywhere.</span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
          That&apos;s worse. You&apos;re comfortable. Comfortable is just sinking
          politely. <span className="font-bold text-white">Hard a-port.</span>
        </p>

        <div className="mt-10 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
        <LinkButton text="Get the brutal version" href="#letter" hash="letter" />
        <LinkButton text="Apply for The free slot" href="#apply" hash="apply" />
        </div>

        <p className="mt-6 text-sm text-white/60">
          2 businesses a month get our work for free. We pick them. It&apos;s
          probably not you... but prove us wrong.
        </p>
      </div>

      <HeroSail />
    </section>
  )
}
