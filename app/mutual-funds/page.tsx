import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'

export const metadata: Metadata = {
  title: 'Mutual Funds',
  description: 'Search and compare mutual funds by NAV, returns, expense ratio, AUM, and risk level.',
  keywords: ['mutual funds India', 'MF comparison', 'NAV', 'mutual fund returns'],
}

export default function MutualFundsPage() {
  return (
    <>
      <PageHeader
        title="Mutual Funds"
        description="Search, compare, and analyze mutual funds with detailed performance metrics, NAV, returns, and risk assessment."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Mutual Funds' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Mutual Fund Search</h2>
          <p className="mt-2 text-muted-foreground">
            Search mutual funds by name, category, or fund house. Compare up to 3 funds side by side.
          </p>
          <p className="mt-4 text-muted-foreground">
            Mutual fund data will be displayed when connected to a fund data API.
          </p>
        </div>
        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
