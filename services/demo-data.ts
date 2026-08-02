/**
 * Illustrative DEMO dataset used when no live market-data provider is
 * configured. Every value here is clearly labelled as demo data across the UI
 * and must never be presented as a live quote.
 */
import type {
  MarketIndex,
  Quote,
  MutualFund,
  NewsArticle,
} from './types'

export const demoIndices: MarketIndex[] = [
  { symbol: 'NIFTY50', name: 'NIFTY 50', value: 24218.6, change: 132.4, changePercent: 0.55 },
  { symbol: 'SENSEX', name: 'BSE SENSEX', value: 79802.1, change: 418.9, changePercent: 0.53 },
  { symbol: 'BANKNIFTY', name: 'NIFTY Bank', value: 52140.3, change: -96.7, changePercent: -0.19 },
  { symbol: 'NIFTYIT', name: 'NIFTY IT', value: 41560.8, change: 305.2, changePercent: 0.74 },
  { symbol: 'SPX', name: 'S&P 500', value: 5892.4, change: 28.6, changePercent: 0.49 },
  { symbol: 'NDX', name: 'NASDAQ', value: 18942.1, change: 112.3, changePercent: 0.6 },
  { symbol: 'DJI', name: 'Dow Jones', value: 42892.5, change: 156.8, changePercent: 0.37 },
  { symbol: 'FTSE', name: 'FTSE 100', value: 8245.3, change: -12.4, changePercent: -0.15 },
  { symbol: 'N225', name: 'Nikkei 225', value: 39892.7, change: 245.1, changePercent: 0.62 },
]

export const demoStocks: Quote[] = [
  {
    symbol: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE',
    price: 2945.3, change: 22.1, changePercent: 0.76, open: 2925, high: 2958, low: 2918,
    previousClose: 2923.2, volume: 6120000, marketCap: 1992000, peRatio: 28.4,
    weekHigh52: 3217, weekLow52: 2220, sector: 'Energy',
  },
  {
    symbol: 'TCS', name: 'Tata Consultancy Services Ltd', exchange: 'NSE',
    price: 4180.7, change: 41.3, changePercent: 1.0, open: 4150, high: 4192, low: 4142,
    previousClose: 4139.4, volume: 1850000, marketCap: 1512000, peRatio: 30.1,
    weekHigh52: 4585, weekLow52: 3311, sector: 'IT',
  },
  {
    symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', exchange: 'NSE',
    price: 1678.5, change: -8.4, changePercent: -0.5, open: 1690, high: 1694, low: 1672,
    previousClose: 1686.9, volume: 9800000, marketCap: 1276000, peRatio: 19.2,
    weekHigh52: 1794, weekLow52: 1363, sector: 'Banking',
  },
  {
    symbol: 'INFY', name: 'Infosys Ltd', exchange: 'NSE',
    price: 1865.2, change: 27.9, changePercent: 1.52, open: 1840, high: 1872, low: 1836,
    previousClose: 1837.3, volume: 4300000, marketCap: 774000, peRatio: 26.7,
    weekHigh52: 1990, weekLow52: 1350, sector: 'IT',
  },
  {
    symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', exchange: 'NSE',
    price: 1248.6, change: 12.2, changePercent: 0.99, open: 1238, high: 1252, low: 1234,
    previousClose: 1236.4, volume: 8100000, marketCap: 878000, peRatio: 18.5,
    weekHigh52: 1362, weekLow52: 970, sector: 'Banking',
  },
  {
    symbol: 'ITC', name: 'ITC Ltd', exchange: 'NSE',
    price: 478.9, change: -2.1, changePercent: -0.44, open: 482, high: 483, low: 476,
    previousClose: 481, volume: 12500000, marketCap: 598000, peRatio: 26.9,
    weekHigh52: 528, weekLow52: 399, sector: 'FMCG',
  },
  {
    symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', exchange: 'NSE',
    price: 1592.4, change: 18.6, changePercent: 1.18, open: 1576, high: 1598, low: 1572,
    previousClose: 1573.8, volume: 3900000, marketCap: 934000, peRatio: 72.1,
    weekHigh52: 1779, weekLow52: 1010, sector: 'Telecom',
  },
  {
    symbol: 'LT', name: 'Larsen & Toubro Ltd', exchange: 'NSE',
    price: 3612.8, change: 44.2, changePercent: 1.24, open: 3572, high: 3628, low: 3565,
    previousClose: 3568.6, volume: 1600000, marketCap: 496000, peRatio: 34.8,
    weekHigh52: 3963, weekLow52: 2925, sector: 'Infrastructure',
  },
]

export const demoFunds: MutualFund[] = [
  {
    id: 'axis-bluechip', name: 'Axis Bluechip Fund', category: 'Large Cap', amc: 'Axis Mutual Fund',
    nav: 58.42, aum: 33420, expenseRatio: 0.68, riskLevel: 'Moderately High',
    returns: { oneYear: 18.4, threeYear: 12.1, fiveYear: 14.8 }, rating: 4,
  },
  {
    id: 'mirae-large-mid', name: 'Mirae Asset Large & Midcap Fund', category: 'Large & Mid Cap', amc: 'Mirae Asset',
    nav: 128.9, aum: 38210, expenseRatio: 0.58, riskLevel: 'High',
    returns: { oneYear: 26.7, threeYear: 19.4, fiveYear: 21.3 }, rating: 5,
  },
  {
    id: 'parag-flexi', name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', amc: 'PPFAS',
    nav: 78.15, aum: 75640, expenseRatio: 0.63, riskLevel: 'High',
    returns: { oneYear: 29.2, threeYear: 21.8, fiveYear: 23.6 }, rating: 5,
  },
  {
    id: 'sbi-smallcap', name: 'SBI Small Cap Fund', category: 'Small Cap', amc: 'SBI Mutual Fund',
    nav: 168.4, aum: 29870, expenseRatio: 0.71, riskLevel: 'Very High',
    returns: { oneYear: 32.1, threeYear: 24.5, fiveYear: 27.9 }, rating: 4,
  },
  {
    id: 'hdfc-balanced', name: 'HDFC Balanced Advantage Fund', category: 'Hybrid', amc: 'HDFC Mutual Fund',
    nav: 462.7, aum: 91230, expenseRatio: 0.74, riskLevel: 'Moderately High',
    returns: { oneYear: 21.3, threeYear: 17.2, fiveYear: 16.4 }, rating: 4,
  },
  {
    id: 'icici-nifty-index', name: 'ICICI Prudential Nifty 50 Index Fund', category: 'Index', amc: 'ICICI Prudential',
    nav: 224.1, aum: 11840, expenseRatio: 0.17, riskLevel: 'Moderately High',
    returns: { oneYear: 22.8, threeYear: 15.1, fiveYear: 16.9 }, rating: 4,
  },
  {
    id: 'nippon-liquid', name: 'Nippon India Liquid Fund', category: 'Debt', amc: 'Nippon India',
    nav: 5842.3, aum: 32110, expenseRatio: 0.32, riskLevel: 'Low',
    returns: { oneYear: 7.2, threeYear: 6.1, fiveYear: 5.7 }, rating: 3,
  },
  {
    id: 'quant-elss', name: 'Quant ELSS Tax Saver Fund', category: 'ELSS', amc: 'Quant Mutual Fund',
    nav: 398.6, aum: 10420, expenseRatio: 0.77, riskLevel: 'Very High',
    returns: { oneYear: 27.4, threeYear: 26.9, fiveYear: 28.4 }, rating: 5,
  },
]

export const demoNews: NewsArticle[] = [
  {
    id: 'n1', slug: 'rbi-holds-repo-rate-steady',
    title: 'RBI holds repo rate steady as inflation cools within target band',
    summary: 'The Monetary Policy Committee kept the benchmark rate unchanged, signalling a data-dependent stance for the coming quarter.',
    category: 'RBI', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 2 * 3600_000).toISOString(), imageQuery: 'reserve bank of india building',
  },
  {
    id: 'n2', slug: 'it-stocks-rally-deal-pipeline',
    title: 'IT stocks rally on strong deal pipeline and improving demand outlook',
    summary: 'Large-cap IT names led gains as management commentary pointed to a recovery in discretionary technology spending.',
    category: 'Stock Market', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 5 * 3600_000).toISOString(), imageQuery: 'stock market trading screen green',
  },
  {
    id: 'n3', slug: 'sip-inflows-hit-record',
    title: 'SIP inflows hit fresh record as retail investors stay disciplined',
    summary: 'Monthly systematic investment plan contributions crossed a new milestone, underscoring resilient retail participation.',
    category: 'Mutual Funds', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 9 * 3600_000).toISOString(), imageQuery: 'indian rupee coins growth chart',
  },
  {
    id: 'n4', slug: 'new-tax-regime-adoption-rises',
    title: 'New tax regime adoption rises among salaried taxpayers',
    summary: 'A growing share of filers opted for the simplified regime this year, drawn by higher standard deduction and rebate limits.',
    category: 'Tax', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 26 * 3600_000).toISOString(), imageQuery: 'tax documents calculator desk',
  },
  {
    id: 'n5', slug: 'gold-holds-near-highs',
    title: 'Gold holds near highs as investors seek portfolio stability',
    summary: 'Bullion prices remained firm amid global uncertainty, with analysts highlighting its role as a diversifier.',
    category: 'Business', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 30 * 3600_000).toISOString(), imageQuery: 'gold bars investment',
  },
  {
    id: 'n6', slug: 'index-funds-steady-traction',
    title: 'Index funds see steady traction as cost-conscious investing grows',
    summary: 'Passive strategies continued to attract flows as investors weighed low expense ratios against active management.',
    category: 'Mutual Funds', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 48 * 3600_000).toISOString(), imageQuery: 'financial charts laptop analysis',
  },
  {
    id: 'n7', slug: 'ipo-pipeline-strengthens',
    title: 'IPO pipeline strengthens as companies tap equity markets',
    summary: 'Several mid-cap companies filed draft papers, signalling renewed appetite for primary market listings.',
    category: 'IPO', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 54 * 3600_000).toISOString(), imageQuery: 'stock exchange listing ceremony',
  },
  {
    id: 'n8', slug: 'banking-credit-growth-steady',
    title: 'Banking sector credit growth remains steady amid rate stability',
    summary: 'Retail and MSME lending continued to drive balance sheet expansion for major private banks.',
    category: 'Banking', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 60 * 3600_000).toISOString(), imageQuery: 'bank building finance',
  },
  {
    id: 'n9', slug: 'crypto-volatility-persists',
    title: 'Cryptocurrency markets see volatility as global risk sentiment shifts',
    summary: 'Major digital assets traded in a wide range as investors reassessed macro cues and regulatory developments.',
    category: 'Cryptocurrency', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 72 * 3600_000).toISOString(), imageQuery: 'bitcoin cryptocurrency chart',
  },
  {
    id: 'n10', slug: 'personal-finance-emergency-fund',
    title: 'Financial planners urge building emergency funds before aggressive investing',
    summary: 'Advisors highlighted the importance of three to six months of expenses in liquid savings before taking market risk.',
    category: 'Personal Finance', source: 'Demo Wire', sourceUrl: 'https://example.com',
    publishedAt: new Date(Date.now() - 80 * 3600_000).toISOString(), imageQuery: 'savings jar emergency fund',
  },
]

/** Deterministic pseudo price history so charts render consistently in demo mode. */
export function generateHistory(seed: number, points: number, base: number) {
  const out: { date: string; close: number }[] = []
  let value = base
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const today = new Date()
  for (let i = points - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    value = value * (1 + (rand() - 0.48) * 0.02)
    out.push({ date: d.toISOString().slice(0, 10), close: Math.round(value * 100) / 100 })
  }
  return out
}
