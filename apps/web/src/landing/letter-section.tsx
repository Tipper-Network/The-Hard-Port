import LinkButton from "#/components/link_button";

export function LetterSection() {
  return (
    <section id="letter" className="relative bg-depth-4 px-6 py-20 lg:px-12 lg:py-28">
      <div className="relative mx-auto max-w-150">
        <div className="relative border border-white/10 bg-navy-mid px-6 py-10 shadow-2xl shadow-black/50 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-3 h-3 text-navy-mid"
            style={{
              backgroundImage:
                'linear-gradient(135deg, transparent 50%, currentColor 50%), linear-gradient(45deg, currentColor 50%, transparent 50%)',
              backgroundSize: '16px 16px',
              backgroundRepeat: 'repeat-x',
            }}
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 -left-2 z-0 font-heading text-[280px] leading-none text-secondary/5 select-none"
          >
            &ldquo;
          </span>

          <div className="relative z-10">
            <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
              The part nobody says out loud
            </p>
            <h2 className="mt-4 border-l-4 border-accent pl-5 font-serif text-3xl font-normal text-secondary italic md:text-4xl">
              Dear business owner who thinks they&apos;re fine,
            </h2>

            <div className="mt-8 space-y-5 text-base leading-[1.85] text-secondary/80 md:text-lg">
              <p>
                The sea never cared for a sailor&apos;s feelings. Only whether he was
                prepared.
              </p>
              <p>
                When you set sail, the sea reminds you you&apos;re supposed to be
                going somewhere. When&apos;s the last time you noticed you&apos;d
                stopped moving with a direction?
              </p>
            </div>

            <div className="my-10 border-y border-accent/30 py-6 text-center">
              <p className="font-serif text-3xl leading-tight text-accent italic md:text-4xl">
                &ldquo;Am I where I want to be?&rdquo;
              </p>
            </div>

            <div className="space-y-5 text-base leading-[1.85] text-secondary/80 md:text-lg">
              <p>
                If you&apos;re reading this, the answer&apos;s probably no. Sorry,
                mate. You&apos;re oblivious. It&apos;s that dumb. That stupid. That
                simple.
              </p>
              <p>
                If you&apos;re not where you want to be, you&apos;re either doing
                something wrong, or not doing something right. And it took you
                reading some website nonsense to realize that &mdash; so you&apos;ve
                got a way to go before you sail with a sense of direction.
              </p>
              <p>
                Get over yourself. Get some clarity on how you&apos;re approaching
                your work.
              </p>
              <p>
                We call you so you don&apos;t feel like you&apos;re asking for help
                &mdash; because you&apos;re not asking for help, you&apos;re asking
                for clarity. We won&apos;t help you. We&apos;ll just do our job, so
                yours gets easier.
              </p>
              <p className="border-l-4 border-accent pl-5 text-xl font-extrabold text-secondary">
                If you&apos;re a man, grow a pair.
              </p>
              <p>
                If you&apos;re a woman, you can
                use ours.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-px flex-1 bg-secondary/15" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-semibold tracking-[0.15em] text-secondary/50 [font-variant-caps:small-caps]">
              &mdash; The Hard Port
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <LinkButton text="Show me what I'm doing wrong" href="/" hash="boosting" />
              <LinkButton text="Apply for The free slot" href="/" hash="apply" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
