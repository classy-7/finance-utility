import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'

export const metadata: Metadata = {
  title: 'Compare',
  description: 'Compare mutual funds, stocks, and financial products side by side to make informed investment decisions.',
  keywords: ['mutual fund comparison', 'stock comparison', 'financial product comparison'],
}

export default function ComparePage() {
  return (
    <>
      <PageHeader
        title="Compare"
        description="Compare mutual funds, stocks, and financial products side by side. Analyze returns, risk, expense ratios, and more."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Compare' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Product Comparison</h2>
          <p className="mt-2 text-muted-foreground">
            Compare up to 3 mutual funds or stocks side by side. Select products from the markets or mutual funds pages to add them to comparison.
          </p>
          <p className="mt-4 text-muted-foreground">
            Comparison functionality will be available when connected to market data APIs.
          </p>
        </div>
        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
