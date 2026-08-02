import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { CalculatorIcon } from '@/components/calculators/calculator-icon'
import { Disclaimer } from '@/components/shared/disclaimer'
import { calculators, calculatorCategories } from '@/lib/site-config'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Financial Calculators',
  description:
    'Free SIP, EMI, FD, PPF, income tax, CAGR, retirement and goal planning calculators built for India.',
}

export default function CalculatorsPage() {
  return (
    <>
      <PageHeader
        title="Financial Calculators"
        description="Accurate, instant calculators for investments, loans, savings, tax and planning — built for India."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Calculators' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {calculatorCategories.map((category) => {
          const items = calculators.filter((c) => c.category === category)
          if (!items.length) return null
          return (
            <section key={category} className="mb-12">
              <h2 className="text-xl font-semibold text-foreground">{category}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/calculators/${tool.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CalculatorIcon name={tool.icon} className="h-5 w-5" />
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{tool.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
        <Disclaimer />
      </div>
    </>
  )
}
