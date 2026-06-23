type WaveDividerProps = {
  fill?: string
  flip?: boolean
  className?: string
}

export function WaveDivider({
  fill = 'white',
  flip = false,
  className = '',
}: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block h-12 w-full md:h-16 ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 48C360 8 720 72 1080 48C1260 32 1350 40 1440 48V80H0V48Z"
        fill={fill}
      />
    </svg>
  )
}
