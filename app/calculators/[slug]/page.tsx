import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'
import { CalculatorRenderer } from '@/components/calculators/registry'
import { calculators, getCalculator } from '@/lib/site-config'
import { siteConfig } from '@/lib/site-config'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const calc = getCalculator(slug)
  if (!calc) return {}
  return {
    title: calc.title,
    description: calc.description,
    keywords: calc.keywords,
    openGraph: {
      title: `${calc.title} | ${siteConfig.name}`,
      description: calc.description,
      url: `${siteConfig.url}/calculators/${slug}`,
    },
    alternates: { canonical: `/calculators/${slug}` },
  }
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params
  const calc = getCalculator(slug)
  if (!calc) notFound()

  return (
    <>
      <PageHeader
        title={calc.title}
        description={calc.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: calc.shortTitle },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <CalculatorRenderer slug={slug} />
        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
