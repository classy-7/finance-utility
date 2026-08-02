import { calculators } from './site-config'
import { learnArticles } from './learn-content'
import { demoFunds } from '@/services/demo-data'

export type SearchGroup =
  | 'Calculators'
  | 'Learn'
  | 'Mutual Funds'
  | 'Pages'
  | 'Stocks'

export interface SearchEntry {
  group: SearchGroup
  title: string
  subtitle?: string
  href: string
  keywords: string
}

/** Static, instantly-searchable index compiled at module load. */
export const staticSearchIndex: SearchEntry[] = [
  ...calculators.map((c) => ({
    group: 'Calculators' as const,
    title: c.title,
    subtitle: c.category,
    href: `/calculators/${c.slug}`,
    keywords: `${c.title} ${c.keywords.join(' ')} ${c.category}`.toLowerCase(),
  })),
  ...learnArticles.map((a) => ({
    group: 'Learn' as const,
    title: a.title,
    subtitle: a.category,
    href: `/learn/${a.slug}`,
    keywords: `${a.title} ${a.keywords.join(' ')} ${a.category}`.toLowerCase(),
  })),
  ...demoFunds.map((f) => ({
    group: 'Mutual Funds' as const,
    title: f.name,
    subtitle: `${f.category} · ${f.amc}`,
    href: `/mutual-funds?fund=${f.id}`,
    keywords: `${f.name} ${f.category} ${f.amc}`.toLowerCase(),
  })),
  {
    group: 'Pages',
    title: 'Markets',
    subtitle: 'Indices & stocks',
    href: '/markets',
    keywords: 'markets stocks indices nifty sensex shares',
  },
  {
    group: 'Pages',
    title: 'News',
    subtitle: 'Financial news',
    href: '/news',
    keywords: 'news headlines economy markets',
  },
  {
    group: 'Pages',
    title: 'All Calculators',
    subtitle: 'Browse tools',
    href: '/calculators',
    keywords: 'calculators tools sip emi fd tax',
  },
]

export function searchStatic(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)
  return staticSearchIndex
    .map((entry) => {
      let score = 0
      for (const term of terms) {
        if (entry.title.toLowerCase().includes(term)) score += 3
        if (entry.keywords.includes(term)) score += 1
      }
      return { entry, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry)
}
