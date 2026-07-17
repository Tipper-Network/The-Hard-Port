import { Link } from '@tanstack/react-router'

const LinkButton = ({
  text,
  href,
  hash,
}: {
  text: string
  href: string
  hash?: string
}) => {
  return (
    <div>
      <Link
        to={href}
        hash={hash}
        className="mt-9 inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-extrabold tracking-wide text-background uppercase transition-transform hover:-translate-y-0.5 hover:bg-[--color-gold-hover]"
      >
        {text}
      </Link>
    </div>
  )
}

export default LinkButton