import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { brand, site } from '#/lib/brand'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: site.title,
      },
      {
        name: 'description',
        content: site.description,
      },
      {
        name: 'theme-color',
        content: brand.navy,
      },
      {
        name: 'msapplication-TileColor',
        content: brand.navy,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: site.title,
      },
      {
        property: 'og:description',
        content: site.description,
      },
      {
        property: 'og:image',
        content: site.logo,
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:title',
        content: site.title,
      },
      {
        name: 'twitter:description',
        content: site.description,
      },
      {
        name: 'twitter:image',
        content: site.logo,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: site.logo,
        type: 'image/svg+xml',
      },
      {
        rel: 'apple-touch-icon',
        href: site.logo,
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className=" ">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
