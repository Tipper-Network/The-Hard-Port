import React from 'react'

const   WhatsappButton = () => {
    const whatsappMessage = [
        'what is it that you do???',
        'and how can we work with you.?',
      ].join('\n')
      const whatsappHref = `https://wa.me/96178883966?text=${encodeURIComponent(whatsappMessage)}`
      
  return (
    <div>
      <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-45 items-center justify-center rounded-button border border-white/80 px-8 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white hover:text-white"
            >
              WhatsApp us
            </a>
    </div>
  )
}

export default WhatsappButton
