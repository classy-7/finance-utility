import { NextResponse } from 'next/server'
import { getQuote, getStockHistory, getMarketStatus } from '@/services/marketApi'

export const revalidate = 30

export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> },
) {
  try {
    const { symbol } = await params
    const { searchParams } = new URL(request.url)
    const range =
      (searchParams.get('range') as
        | '1D'
        | '1W'
        | '1M'
        | '6M'
        | '1Y'
        | '5Y') || '1Y'

    const [quote, history] = await Promise.all([
      getQuote(symbol),
      getStockHistory(symbol, range),
    ])

    if (!quote.data) {
      return NextResponse.json(
        { error: `No data found for "${symbol}".` },
        { status: 404 },
      )
    }

    return NextResponse.json({
      data: {
        quote: quote.data,
        history: history.data,
      },
      meta: quote.meta,
      status: getMarketStatus(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Unable to load quote right now.' },
      { status: 502 },
    )
  }
}
