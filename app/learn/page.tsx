import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'
import { learnContent } from '@/lib/learn-content'

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Educational content about investing, banking, loans, tax, savings, retirement, stock market, and mutual funds.',
  keywords: ['financial education', 'investing basics', 'personal finance guide', 'money management'],
}

export default function LearnPage() {
  const categories = Array.from(new Set(learnContent.map(article => article.category)))

  return (
    <>
      <PageHeader
        title="Learn"
        description="Master personal finance with our educational guides on investing, banking, loans, tax, savings, retirement, and more."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Learn' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="space-y-8">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-xl font-semibold text-foreground">{category}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {learnContent
                  .filter(article => article.category === category)
                  .map((article) => (
                    <a
                      key={article.slug}
                      href={`/learn/${article.slug}`}
                      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                    >
                      <h3 className="font-semibold text-foreground">{article.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
                    </a>
                  ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
