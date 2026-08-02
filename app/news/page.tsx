import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'

export const metadata: Metadata = {
  title: 'Financial News',
  description: 'Latest financial news covering stock market, business, RBI, IPO, mutual funds, personal finance, tax, and banking.',
  keywords: ['financial news India', 'stock market news', 'business news', 'RBI news'],
}

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="Financial News"
        description="Stay updated with the latest financial news covering stock markets, business, RBI announcements, IPOs, mutual funds, and personal finance."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Latest News</h2>
          <p className="mt-2 text-muted-foreground">
            Browse financial news by category: Stock Market, Business, RBI, IPO, Mutual Funds, Personal Finance, Tax, Banking, and Cryptocurrency.
          </p>
          <p className="mt-4 text-muted-foreground">
            News content will be displayed when connected to a news API.
          </p>
        </div>
        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
