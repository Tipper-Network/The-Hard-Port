const stats = [
  { value: '120+', label: 'Campaigns shipped' },
  { value: '15', label: 'Years at sea' },
  { value: '98%', label: 'Client retention' },
] as const

export function AboutSection() {
  return (
    <section id="about" className="bg-white px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-hero items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
            About us
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
            A port for bold brands. A crew for ambitious launches.
          </h2>
          <p className="mt-5 text-base leading-7 text-primary/70">
            The Hard Port is a media agency built on contrast — deep trust meets
            bright creative energy. We combine structured strategy with the kind
            of creative that makes people stop scrolling.
          </p>
          <p className="mt-4 text-base leading-7 text-primary/70">
            Our name isn&apos;t decorative. A port is where journeys begin, cargo
            moves, and ships find direction. That&apos;s the role we play for every
            client we take on board.
          </p>
        </div>

        {/* <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-primary px-6 py-8 text-center text-white lg:text-left xl:text-center"
            >
              <p className="text-4xl font-extrabold text-accent">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-white/80">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}
