import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config = {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '90rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Avenir', 'Avenir Next', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        hero: '90rem',
      },
      borderRadius: {
        button: '0.25rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        hero: ['3.4375rem', { lineHeight: '1' }],
        'body-lg': ['1rem', { lineHeight: '1.75' }],
      },
    },
  },
  plugins: [typography],
} satisfies Config

export default config
