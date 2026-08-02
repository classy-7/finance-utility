```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'
import { learnContent } from '@/lib/learn-content'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return learnContent.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = learnContent.find((a) => a.slug === slug)

  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params
  const article = learnContent.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <PageHeader
        title={article.title}
        description={article.excerpt}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Learn', href: '/learn' },
          { label: article.title },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <article className="prose prose-slate dark:prose-invert max-w-none">

          <div className="mb-8">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              {article.category}
            </span>

            <p className="mt-2 text-sm text-muted-foreground">
              Last updated:{' '}
              {new Date(article.updatedAt).toLocaleDateString('en-IN')}
            </p>
          </div>

          <div className="space-y-8">
            {article.body.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-foreground">
                  {section.heading}
                </h2>

                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="leading-7 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

        </article>

        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </>
  )
}
```
