import LinkButton from "#/components/link_button";

export function LetterSection() {
  return (
    <section id="letter" className="bg-depth-1 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
          The part nobody says out loud
        </p>
        <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
          Dear business owner who thinks they&apos;re fine,
        </h2>

        <div className="mt-8 space-y-5 text-base leading-8 text-secondary/80 md:text-lg">
          <p>
            The sea never cared for a sailor&apos;s feelings. Only whether he was
            prepared.
          </p>
          <p>
            When you set sail, the sea reminds you you&apos;re supposed to be
            going somewhere. When&apos;s the last time you noticed you&apos;d
            stopped moving with a direction?
          </p>
          <p className="font-bold text-secondary">
            Ask yourself the question: Am I where I want to be?
          </p>
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

        <div className="mt-10 flex flex-wrap gap-4">
          <LinkButton text="Show me what I'm doing wrong" href="/" hash="boosting" />
          <LinkButton text="Apply for The free slot" href="/" hash="apply" />
        </div>
      </div>
    </section>
  )
}
