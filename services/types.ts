/** Shared data contracts for the market / news data layer. */

export interface DataMeta {
  /** true when the payload is illustrative demo data, not a live feed. */
  isDemo: boolean
  /** human-readable provider name, e.g. "Demo dataset" or "NSE via <provider>". */
  source: string
  /** ISO timestamp of when the data was produced. */
  lastUpdated: string
  /** notice about delay, e.g. "Prices delayed by 15 minutes". */
  notice?: string
}

export interface ApiResponse<T> {
  data: T
  meta: DataMeta
}

export interface MarketIndex {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
}

export interface Quote {
  symbol: string
  name: string
  exchange: 'NSE' | 'BSE'
  price: number
  change: number
  changePercent: number
  open: number
  high: number
  low: number
  previousClose: number
  volume: number
  marketCap: number
  peRatio: number
  weekHigh52: number
  weekLow52: number
  sector: string
}

export interface Candle {
  date: string
  close: number
}

export interface StockSearchResult {
  symbol: string
  name: string
  exchange: 'NSE' | 'BSE'
  sector: string
}

export interface MutualFund {
  id: string
  name: string
  category: string
  amc: string
  nav: number
  aum: number // in crores
  expenseRatio: number
  riskLevel: 'Low' | 'Moderate' | 'Moderately High' | 'High' | 'Very High'
  returns: {
    oneYear: number
    threeYear: number
    fiveYear: number
  }
  rating: number // 1-5
}

export interface NewsArticle {
  id: string
  slug: string
  title: string
  summary: string
  category: string
  source: string
  sourceUrl: string
  publishedAt: string
  imageQuery: string
}

export type MarketStatus = 'open' | 'closed' | 'pre-open' | 'pre-market' | 'after-market'
