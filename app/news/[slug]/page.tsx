import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Disclaimer } from '@/components/shared/disclaimer'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `News Article`,
    description: `Read the latest financial news article.`,
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  
  // This would fetch real article data from API
  const articleData = {
    slug,
    title: `Article ${slug}`,
    category: 'Stock Market',
    source: 'Demo Source',
    date: new Date().toISOString(),
  }

  if (!articleData) notFound()

  return (
    <>
      <PageHeader
        title={articleData.title}
        description={`News article`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
          { label: articleData.title },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">{articleData.title}</h2>
            <p className="text-muted-foreground">{articleData.category} • {articleData.source}</p>
          </div>
          <p className="mt-4 text-muted-foreground">
            Article content will be displayed when connected to a news API.
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
