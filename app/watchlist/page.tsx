import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'

export const metadata: Metadata = {
  title: 'Watchlist',
  description: 'Create and manage your personal watchlist of stocks and mutual funds. Track prices and movements.',
  keywords: ['stock watchlist', 'mutual fund watchlist', 'portfolio tracking'],
}

export default function WatchlistPage() {
  return (
    <>
      <PageHeader
        title="Watchlist"
        description="Track your favorite stocks and mutual funds in one place. Add, remove, and monitor price movements."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Watchlist' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Your Watchlist</h2>
          <p className="mt-2 text-muted-foreground">
            Add stocks and mutual funds to your watchlist to track their performance. Your watchlist is saved locally in your browser.
          </p>
          <p className="mt-4 text-muted-foreground">
            Watchlist functionality will be available when connected to market data APIs.
          </p>
        </div>
        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
