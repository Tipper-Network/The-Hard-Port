type LogoProps = {
  className?: string
}

export function Logo({ className = 'h-10 w-auto' }: LogoProps) {
  return (
    <img
      src="/THP_Logo.svg"
      alt="The Hard Port"
      className={className}
    />
  )
}
