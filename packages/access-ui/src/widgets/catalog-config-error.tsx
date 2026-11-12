import '../product.css'

type Props = {
  title?: string
}

export function CatalogConfigError({
  title = 'Catalog cannot load',
  body = 'This site’s API keys do not match the Access database. Replace the placeholder values in apps/web/.env.local with real keys from bootstrap, or run pnpm platform:issue:web-keys with owner DATABASE_URL, then restart the web dev server.',
}: Props & { body?: string }) {
  return (
    <div className="hp-catalog__empty" role="alert">
      <p className="hp-catalog__empty-title">{title}</p>
      <p className="hp-catalog__empty-body">{body}</p>
    </div>
  )
}
