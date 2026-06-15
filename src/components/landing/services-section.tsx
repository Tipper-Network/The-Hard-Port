import { Megaphone, Palette, TrendingUp } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'Brand & Creative',
    description:
      'Identity systems, campaign visuals, and storytelling that cut through the noise with clarity and confidence.',
  },
  {
    icon: Megaphone,
    title: 'Media & Campaigns',
    description:
      'End-to-end campaign planning and execution across digital, social, and out-of-home channels.',
  },
  {
    icon: TrendingUp,
    title: 'Strategy & Growth',
    description:
      'Audience insight, positioning, and performance frameworks built to scale what works.',
  },
] as const

export function ServicesSection() {
  return (
    <section id="services" className="bg-white px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-orange uppercase">
            What we do
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            Full-service media for brands ready to move
          </h2>
          <p className="mt-4 text-base leading-7 text-navy/70">
            From first impression to lasting impact — we help you launch sharper,
            stand taller, and sail further.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-lg border border-navy/10 bg-ice p-8 transition-shadow hover:shadow-[0_20px_40px_rgba(8,40,120,0.08)]"
            >
              <div className="mb-5 inline-flex rounded-button bg-navy p-3 text-white">
                <service.icon className="size-5" strokeWidth={2.25} />
              </div>
              <h3 className="text-xl font-bold text-navy">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-navy/70">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
