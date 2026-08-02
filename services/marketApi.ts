/**
 * marketApi — the single abstraction layer for all market / fund / news data.
 *
 * The rest of the app (UI components, route handlers) only ever talks to these
 * functions. To connect a REAL data provider later, implement the fetch calls
 * guarded by the relevant environment variable — the UI does not change.
 *
 *   MARKET_DATA_API_KEY   -> live quotes & indices (e.g. an NSE/BSE provider)
 *   MUTUAL_FUND_API_KEY   -> live mutual fund NAV & returns
 *   NEWS_API_KEY          -> licensed financial news feed
 *
 * These keys are read ONLY on the server (route handlers / server components),
 * so they are never exposed to the browser.
 *
 * When a key is absent we return clearly-labelled demo data (meta.isDemo=true)
 * and NEVER fabricate a "live" feed.
 */
import 'server-only'
import type {
  ApiResponse,
  MarketIndex,
  Quote,
  Candle,
  StockSearchResult,
  MutualFund,
  NewsArticle,
  MarketStatus,
} from './types'
import {
  demoIndices,
  demoStocks,
  demoFunds,
  demoNews,
  generateHistory,
} from './demo-data'

const MARKET_KEY = process.env.MARKET_DATA_API_KEY
const FUND_KEY = process.env.MUTUAL_FUND_API_KEY
const NEWS_KEY = process.env.NEWS_API_KEY

function demoMeta(kind: string) {
  return {
    isDemo: true,
    source: 'Demo dataset (no live provider configured)',
    lastUpdated: new Date().toISOString(),
    notice: `Illustrative ${kind} data for demonstration only — not live market information.`,
  }
}

function liveMeta(source: string, notice?: string) {
  return {
    isDemo: false,
    source,
    lastUpdated: new Date().toISOString(),
    notice,
  }
}

// ---------------------------------------------------------------------------
// Market status — NSE/BSE trade 09:15–15:30 IST, Mon–Fri.
// ---------------------------------------------------------------------------
export function getMarketStatus(now = new Date()): MarketStatus {
  // Convert to IST regardless of server timezone.
  const ist = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
  )
  const day = ist.getDay() // 0 Sun ... 6 Sat
  if (day === 0 || day === 6) return 'closed'
  const minutes = ist.getHours() * 60 + ist.getMinutes()
  if (minutes >= 9 * 60 && minutes < 9 * 60 + 15) return 'pre-open'
  if (minutes >= 9 * 60 + 15 && minutes <= 15 * 60 + 30) return 'open'
  return 'closed'
}

// ---------------------------------------------------------------------------
// Indices
// ---------------------------------------------------------------------------
export async function getMarketIndices(): Promise<ApiResponse<MarketIndex[]>> {
  if (MARKET_KEY) {
    // TODO: integrate real provider here, e.g.
    // const res = await fetch(`${PROVIDER}/indices`, { headers: { ... }, next: { revalidate: 60 } })
    // return { data: mapIndices(await res.json()), meta: liveMeta('Provider name', 'Delayed 15 min') }
  }
  return { data: demoIndices, meta: demoMeta('index') }
}

// ---------------------------------------------------------------------------
// Quotes & search
// ---------------------------------------------------------------------------
export async function getQuote(
  symbol: string,
): Promise<ApiResponse<Quote | null>> {
  if (MARKET_KEY) {
    // TODO: integrate real provider quote endpoint.
  }
  const q =
    demoStocks.find((s) => s.symbol.toLowerCase() === symbol.toLowerCase()) ??
    null
  return { data: q, meta: demoMeta('quote') }
}

export async function searchStocks(
  query: string,
): Promise<ApiResponse<StockSearchResult[]>> {
  const q = query.trim().toLowerCase()
  const results = demoStocks
    .filter(
      (s) =>
        s.symbol.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q),
    )
    .map((s) => ({
      symbol: s.symbol,
      name: s.name,
      exchange: s.exchange,
      sector: s.sector,
    }))
  return { data: results, meta: demoMeta('search') }
}

export async function getAllStocks(): Promise<ApiResponse<Quote[]>> {
  if (MARKET_KEY) {
    // TODO: integrate real provider.
  }
  return { data: demoStocks, meta: demoMeta('quote') }
}

export type HistoryRange = '1D' | '1W' | '1M' | '6M' | '1Y' | '5Y'

function rangeToPoints(range: HistoryRange): number {
  switch (range) {
    case '1D':
      return 24
    case '1W':
      return 7
    case '1M':
      return 30
    case '6M':
      return 180
    case '1Y':
      return 365
    case '5Y':
      return 365 * 5
    default:
      return 365
  }
}

export async function getStockHistory(
  symbol: string,
  range: HistoryRange = '1Y',
): Promise<ApiResponse<Candle[]>> {
  const points = rangeToPoints(range)
  const stock = demoStocks.find(
    (s) => s.symbol.toLowerCase() === symbol.toLowerCase(),
  )
  const seed =
    symbol.split('').reduce((a, c) => a + c.charCodeAt(0), 0) || 1
  const base = stock ? stock.price * 0.8 : 1000
  return { data: generateHistory(seed, points, base), meta: demoMeta('price history') }
}

// ---------------------------------------------------------------------------
// Mutual funds
// ---------------------------------------------------------------------------
export async function getFunds(): Promise<ApiResponse<MutualFund[]>> {
  if (FUND_KEY) {
    // TODO: integrate real mutual fund data provider.
  }
  return { data: demoFunds, meta: demoMeta('mutual fund') }
}

export async function getFund(
  id: string,
): Promise<ApiResponse<MutualFund | null>> {
  const f = demoFunds.find((x) => x.id === id) ?? null
  return { data: f, meta: demoMeta('mutual fund') }
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------
export async function getNews(
  category?: string,
): Promise<ApiResponse<NewsArticle[]>> {
  if (NEWS_KEY) {
    // TODO: integrate a licensed news provider. Always keep source attribution.
  }
  const data =
    category && category !== 'All'
      ? demoNews.filter((n) => n.category === category)
      : demoNews
  return { data, meta: demoMeta('news') }
}

export async function getNewsArticle(
  slug: string,
): Promise<ApiResponse<NewsArticle | null>> {
  const article = demoNews.find((n) => n.slug === slug) ?? null
  return { data: article, meta: demoMeta('news') }
}

export const isLiveConfigured = {
  market: Boolean(MARKET_KEY),
  funds: Boolean(FUND_KEY),
  news: Boolean(NEWS_KEY),
}
