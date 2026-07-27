import { SiteHeaderNav } from '@/components/layout/site-header-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary/10 bg-primary/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-hero items-center justify-between px-6 py-4 lg:px-12">
        <SiteHeaderNav />
      </div>
    </header>
  )
}
