import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'
import { DataMeta } from '@/components/shared/data-meta'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Mutual Fund Details`,
    description: `View detailed information for mutual fund including NAV, returns, expense ratio, and historical performance.`,
  }
}

export default async function MutualFundPage({ params }: Props) {
  const { id } = await params
  
  // This would fetch real mutual fund data from API
  const fundData = {
    id,
    name: `Mutual Fund ${id}`,
    nav: 0,
    returns: { oneYear: 0, threeYear: 0, fiveYear: 0 },
  }

  if (!fundData) notFound()

  return (
    <>
      <PageHeader
        title={fundData.name}
        description={`Mutual fund details`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Mutual Funds', href: '/mutual-funds' },
          { label: fundData.name },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">{fundData.name}</h2>
          </div>
          <DataMeta source="Demo Data" lastUpdated="Not connected to API" />
          <p className="mt-4 text-muted-foreground">
            Mutual fund data will be displayed when connected to a fund data API.
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
