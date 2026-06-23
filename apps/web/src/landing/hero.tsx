// import { YoutubeEmbed } from '#/components/youtube-embed'
// import { video } from '#/lib/brand'

function HeroSail() {
  return (
    <img
      src="/THP_Sail_Icon.svg"
      alt="Hero sail"
      className="pointer-events-none absolute top-0 right-0 h-full text-secondary"
    />
  )
}

export function Hero() {
  return (
    <section className="relative min-h-85 overflow-hidden bg-primary md:min-h-165 ">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/oceanvid.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
       {/* <section className="relative min-h-85 overflow-hidden bg-primary md:min-h-165">
      {video.hero ? (
        <YoutubeEmbed url={video.hero} title="The Hard Port hero reel" variant="background" />
      ) : null} */}
      <div className="absolute inset-0 bg-primary/40" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-hero items-center px-6 py-20 md:py-28 lg:px-12 lg:py-32">
        <div className="max-w-xl">
          <h1 className="text-[2.75rem] leading-[0.95] font-extrabold tracking-tight md:text-6xl lg:text-[4.5rem]">
            <span className="block text-white">Set Sail.</span>
            <span className="block text-accent">Stand Out.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white md:text-lg">
            Your safe harbor for dangerously good ideas.
            <br />
            We launch brands that refuse to sink.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-button border border-white/80 bg-accent px-6 py-3 text-base font-bold text-white transition-colors hover:bg-accent/90"
            >
              Start Your Voyage
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-button bg-white px-6 py-3 text-base font-bold text-primary transition-colors hover:bg-white/90"
            >
              Our Work
            </a>
          </div>
        </div>
      </div>

      <HeroSail />
    </section>
  )
}
