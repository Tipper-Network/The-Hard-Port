type ProofStat = {
  value: number
  label: string
}

export function ProofSection() {
  const numberOfStrategies = 11
  const numberOfClients = 9
  const numberOfClientsSolo = 5
  const documentedReturn = 0
  const numberOfBrands = 11
  const ourReturn = 270000

  const stats: ProofStat[] = [
    { value: numberOfBrands, label: 'Brands built, start to finish' },
    { value: numberOfStrategies, label: 'Strategies built, start to finish' },
    {
      value: numberOfClientsSolo,
      label: 'Clients who ran our strategies independently',
    },
    { value: numberOfClients, label: 'Clients who worked with us directly' },
  ]

  return (
    <section id="proof" className="bg-depth-4 px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
          Marketers lie. We won&apos;t.
        </p>
        <h2 className="mt-4 font-heading text-3xl font-normal uppercase leading-tight text-secondary md:text-4xl">
          Here&apos;s the part where we&apos;re supposed to show off. We can&apos;t.
        </h2>

        <div className="mt-8 space-y-5 text-base leading-8 text-white/80 md:text-lg">
          <p>
          <span className="font-bold text-white"> &quot;$7.8 billion generated&quot;</span>...
            joking! joking!
            not even a single five-star review. We&apos;re not going
            to pretend.
          </p>
          <p className="font-bold text-white">
            We don&apos;t have a hundred case studies. We don&apos;t have 7,000
            reviews. We&apos;re new. No padding the numbers to look otherwise.
          </p>
          <p>
            What we do have: we&apos;ve built{' '}
            <span className="font-bold text-accent">{numberOfStrategies} full strategies</span> for
            real businesses. And here&apos;s the slightly annoying ending;
            they took the strategies and ran them{' '}
            <span className="italic">themselves</span>.
          </p>
          <p>
            They didn&apos;t pay us to execute. They didn&apos;t need to. The
            plan was that clear. We didn&apos;t see another cent, and that&apos;s
            kind of the whole point: our thinking was good enough that people
            could run with it on their own.
          </p>
          <p className="border-l-4 border-accent pl-5 text-xl font-extrabold text-white">
            That&apos;s the proof we&apos;ve got. Take it or leave it. We&apos;re
            not going to lie to make you comfortable.
          </p>
        </div>

        <div className="mt-14 flex items-center justify-center gap-6 sm:gap-12">
          <div className="text-center">
            <p className="font-heading text-4xl leading-none text-secondary/30 line-through decoration-2 sm:text-5xl">
              ${documentedReturn.toLocaleString()}
            </p>
            <p className="mt-3 max-w-40 text-xs text-secondary/40 sm:text-sm">
              Their documented return to us
            </p>
          </div>

          <span className="h-16 w-px bg-secondary/15 sm:h-24" aria-hidden="true" />

          <div className="text-center">
            <p className="font-heading text-6xl leading-none text-accent sm:text-7xl lg:text-8xl">
              ${ourReturn.toLocaleString()}
            </p>
            <p className="mt-3 text-sm text-secondary/70 sm:text-base">
              The return they got instead
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-secondary/15 bg-secondary/5 p-5 text-center"
            >
              <p className="font-heading text-[32px] leading-none text-accent/80">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-secondary/60">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center"> 
          <p className="mt-2 text-xl text-white/70">
            honest enough?
          </p>
        </div>
      </div>
    </section>
  )
}
