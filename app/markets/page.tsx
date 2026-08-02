import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { MarketSnapshot } from '@/components/home/market-snapshot'
import { Disclaimer } from '@/components/shared/disclaimer'

export const metadata: Metadata = {
  title: 'Markets',
  description: 'Track Indian stock market indices, global markets, and search stocks with real-time data.',
  keywords: ['stock market India', 'NIFTY 50', 'SENSEX', 'market data', 'stock prices'],
}

export default function MarketsPage() {
  return (
    <>
      <PageHeader
        title="Markets"
        description="Track Indian and global market indices, search stocks, and stay updated with live market data."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Markets' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <MarketSnapshot />
        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
