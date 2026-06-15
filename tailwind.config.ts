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
      colors: {
        navy: {
          DEFAULT: '#082878',
          light: '#183878',
          muted: '#284888',
        },
        orange: '#f86818',
        ice: {
          DEFAULT: '#f3fbff',
          muted: '#e8f8f8',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
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
