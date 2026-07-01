import LinkButton from '#/components/link_button'
import WhatsappButton from '#/components/whatsapp'
import { slogan } from '#/lib/brand'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-primary px-6 py-20 lg:px-12 lg:py-28"
    >
      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />

      <div className="relative mx-auto max-w-hero">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
            {slogan}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-white md:text-5xl">
            Ready to give a f*ck, and not care???
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80">
            Two ways in: apply for a free slot and hope we pick you, or skip the
            line and just commit. Either way, tell us where you are and where you
            actually want to be. No pitch deck required.
          </p>
    
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LinkButton text="Apply for The free slot" href="#apply" hash="apply" />
            <LinkButton text="setSail@thehardport.com" href="mailto:setSail@thehardport.com" hash="contact" />
          </div>

          <div className="mt-6 flex justify-center">
            <WhatsappButton />
          </div>
        </div>
      </div>
    </section>
  )
}
