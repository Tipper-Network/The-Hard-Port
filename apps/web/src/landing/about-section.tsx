export function AboutSection() {
  return (
    <section id="about" className="bg-white px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-hero items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            Who we are
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
            A port is where ships go to rot. We&apos;re the order to leave it.
          </h2>
          <p className="mt-5 text-base leading-7 text-primary/70">
            &quot;Hard a-port&quot; is the command you shout to swing the ship
            hard before it hits the rocks. That&apos;s the whole company. You&apos;ve
            been drifting toward the rocks calling it &quot;stability.&quot; We
            turn the wheel.
          </p>
          <p className="mt-4 text-base leading-7 text-primary/70">
            We&apos;re the people in your corner who&apos;ll tell you the truth,
            do the work, and not stop until it moves. You focus on your craft.
            We handle the brand, the strategy, the campaigns &mdash; everything
            that turns attention into growth.
          </p>
          <p className="mt-6 text-xl font-extrabold text-primary">
            Remember&hellip; We give a f*ck &mdash; about you. We just don&apos;t care, about your feelings.
          </p>
        </div>

        <div className="border border-primary/15 bg-secondary p-8">
          <p className="text-sm font-bold tracking-[0.18em] text-primary/40 uppercase">
            The honest disclaimer
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-primary/70">
            <li className="flex gap-3">
              <span className="font-bold text-accent">&#10003;</span>
              We&apos;re new. We&apos;re telling you instead of hiding it.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">&#10003;</span>
              We won&apos;t fake numbers, reviews, or case studies.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">&#10003;</span>
              We&apos;ll say no to you if it&apos;s the right call.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">&#10003;</span>
              If we take you on, we&apos;re all the way in. No half-jobs.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
