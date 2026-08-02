import { Breadcrumbs, type BreadcrumbItem } from './breadcrumbs'

export function PageHeader({
  title,
  description,
  breadcrumbs,
}: {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
}) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}
