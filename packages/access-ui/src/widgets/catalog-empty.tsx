import '../product.css'

type Props = {
  title?: string
  body?: string
}

export function CatalogEmpty({
  title = 'Nothing here yet',
  body = 'No published products in the catalog. When something ships, it shows up on this page — not before.',
}: Props) {
  return (
    <div className="hp-catalog__empty" role="status">
      <p className="hp-catalog__empty-title">{title}</p>
      <p className="hp-catalog__empty-body">{body}</p>
    </div>
  )
}
