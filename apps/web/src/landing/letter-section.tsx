import LinkButton from "#/components/link_button";

export function LetterSection() {
  return (
    <section id="letter" className="bg-secondary px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
          The part nobody says out loud
        </p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-primary md:text-4xl">
          Dear business owner who thinks they&apos;re fine,
        </h2>

        <div className="mt-8 space-y-5 text-base leading-8 text-primary/80 md:text-lg">
          <p>
            You&apos;re doing okay. Bills get paid. A few customers trickle in.
            Some months are good, some are &quot;eh.&quot; You tell people
            &quot;business is good&quot; and you mostly believe it.
          </p>
          <p className="font-bold text-primary">
            That&apos;s the problem. &quot;Fine&quot; is the most dangerous place
            a business can be.
          </p>
          <p>
            Because fine doesn&apos;t scream. Fine doesn&apos;t crash. Fine just
            quietly stays exactly where it is while someone hungrier eats your
            lunch. You&apos;re not sinking. You&apos;re anchored. And you call it
            stability.
          </p>
          <p>
            Meanwhile you&apos;re &quot;boosting&quot; a post for $20, posting
            when you remember to, dropping cash on a logo, and refreshing your
            follower count like it pays rent. You&apos;re busy. You&apos;re just
            not <span className="italic">moving</span>.
          </p>
          <p>
            Here&apos;s the honest part most agencies will never tell you:{' '}
            <span className="font-bold text-primary">you don&apos;t need us.</span>{' '}
            Nobody <span className="italic">needs</span> a media agency. You
            could figure it all out yourself. You&apos;ve had years. How&apos;s
            that going?
          </p>
          <p>
            You don&apos;t need us. You just can&apos;t get where you say you
            want to go without us — and that&apos;s a completely different
            sentence. The day you admit that out loud is the day this starts
            working.
          </p>
          <p>
            We&apos;re not here to be your friend, hype your feelings, or clap
            for &quot;fine.&quot; We&apos;re here to tell you where you actually
            are, where you actually want to be, and the ugly distance in
            between.
          </p>
          <p className="border-l-4 border-accent pl-5 text-xl font-extrabold text-primary">
            We give a f*ck about the work. We just don&apos;t care about your
            comfort zone.
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
