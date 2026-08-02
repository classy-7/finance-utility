import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'

export const metadata: Metadata = {
  title: 'Stocks',
  description: 'Search and explore Indian stocks by company name, NSE symbol, or BSE symbol.',
  keywords: ['Indian stocks', 'NSE stocks', 'BSE stocks', 'stock search'],
}

export default function StocksPage() {
  return (
    <>
      <PageHeader
        title="Stocks"
        description="Search and explore Indian stocks with detailed information including price, market cap, and performance metrics."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Markets', href: '/markets' }, { label: 'Stocks' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Stock Search</h2>
          <p className="mt-2 text-muted-foreground">
            Search Indian stocks by company name, NSE symbol, or BSE symbol.
          </p>
          <p className="mt-4 text-muted-foreground">
            Stock search functionality will be available when connected to a market data API.
          </p>
        </div>
        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
