import LinkButton from '@/components/link-button'

const WhatsappButton = () => {
  const whatsappMessage = [
    'What is it that you do?',
    'And how can we work together?',
  ].join('\n')
  const whatsappHref = `https://wa.me/96178883966?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <LinkButton
      text="WhatsApp us"
      href={whatsappHref}
      variant="outline"
      noMargin
      className="inline-flex min-w-45 px-8 py-3"
    />
  )
}

export default WhatsappButton
