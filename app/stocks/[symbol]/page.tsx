import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'
import { DataMeta } from '@/components/shared/data-meta'

type Props = { params: Promise<{ symbol: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params
  return {
    title: `${symbol.toUpperCase()} Stock Details`,
    description: `View detailed information for ${symbol.toUpperCase()} stock including price, market cap, P/E ratio, and historical performance.`,
  }
}

export default async function StockPage({ params }: Props) {
  const { symbol } = await params
  
  // This would fetch real stock data from API
  // For now, showing a placeholder that matches the existing UI pattern
  const stockData = {
    symbol: symbol.toUpperCase(),
    name: `${symbol.toUpperCase()} Corporation`,
    price: 0,
    change: 0,
    changePercent: 0,
  }

  if (!stockData) notFound()

  return (
    <>
      <PageHeader
        title={stockData.name}
        description={`Stock details for ${stockData.symbol}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Markets', href: '/markets' },
          { label: 'Stocks', href: '/stocks' },
          { label: stockData.symbol },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">{stockData.name}</h2>
            <p className="text-muted-foreground">{stockData.symbol}</p>
          </div>
          <DataMeta source="Demo Data" lastUpdated="Not connected to API" />
          <p className="mt-4 text-muted-foreground">
            Stock data will be displayed when connected to a market data API.
            Configure your API keys in the environment variables.
          </p>
        </div>
        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
