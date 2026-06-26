type ProofStat = {
  value: number
  label: string
  sign?: string
  format?: (value: number) => string
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
    {
      value: documentedReturn,
      label: 'their documented return ???',
      sign: '$',
      format: (value) => value.toLocaleString(),
    },
    {
      value: ourReturn,
      label: 'our documented return...',
      sign: '$',
      format: (value) => value.toLocaleString(),
    },
  ]

  return (
    <section id="proof" className="bg-primary px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
          Marketers lie. We won&apos;t.
        </p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">
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
            reviews. We&apos;re new, and we&apos;d rather tell you that than fake
            a number.
          </p>
          <p>
            What we do have: we&apos;ve built{' '}
            <span className="font-bold text-accent">{numberOfStrategies} full strategies</span> for
            real businesses. And here&apos;s the honest, slightly annoying
            ending; they took the strategies and ran them{' '}
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

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-white/15 bg-white/5 p-6 text-center "
              >
                <div className="flex items-center justify-center">
                  {stat.sign ? (
                    <p className="text-4xl font-semibold text-accent">{stat.sign}</p>
                  ) : null}
                  <p className="text-4xl font-extrabold text-accent">
                    {stat.format ? stat.format(stat.value) : stat.value}
                  </p>
                </div>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
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
