import { BrowserMockup } from '#/components/browser-mockup'
import { YoutubeEmbed } from '#/components/youtube-embed'
import { video } from '#/lib/brand'

export function ServicesSection() {
  return (
    <section id="services" className="bg-secondary px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-hero space-y-20 lg:space-y-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <BrowserMockup variant="lines" />

          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-primary md:text-4xl">
              Our mission: for Small businesses to grow into businesses.
            </h2>
            <p className="mt-5 text-base leading-7 text-primary/70">
             It is easier  for small businesses to grow than stay the same. 
             <br/>
             Small businesses are dynamic by nature they are 
              <ol className="list-decimal pl-8 font-semibold">
                <li>easily adaptable</li>
                <li>quickly to move</li>
                <li>sensitive to opportunities</li>
              </ol>
              <br/>
              we turn a state of <span className="font-semibold">survival mode</span>  into a focused path to growth. from lost in the seas to the northern star of the port of success. 
              <br/> 
              <span className="font-semibold capitalize"> 
                you focus on sailing, we take care of the ship, the crew, the identity, the campaigns, the connections.
                </span>
            </p>
            <p className="mt-4 text-base leading-7 text-primary/70">
              Small businesses should not be scared of sailing into the ocean. we explore the details of your ship, your crew, your identity. we build the brand to that defines who you are, the campaigns that cuts through the noise, and the connections to the right people. 
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center rounded-button bg-accent px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              Start Your Voyage
            </a>
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-extrabold leading-tight text-primary md:text-4xl">
              Branding and strategy that set the course before you sail
            </h2>
            <p className="mt-5 text-base leading-7 text-primary/70">
              Strong brands don&apos;t happen by accident. We align positioning,
              messaging, and visual identity so every touchpoint tells the same
              story — on web, social, and in the room.
            </p>
            <p className="mt-4 text-base leading-7 text-primary/70">
              From audience insight to campaign architecture, our strategy work
              gives your creative a clear direction and your budget a reason to
              believe.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-1 text-base font-semibold text-accent transition-opacity hover:opacity-80"
            >
              Read more
              <span aria-hidden="true">&gt;</span>
            </a>
          </div>

          <div className="order-1 lg:order-2">
            {video.branding ? (
              <YoutubeEmbed
                url={video.branding}
                title="Branding and strategy overview"
              />
            ) : (
              <BrowserMockup variant="grid" showPhone />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
