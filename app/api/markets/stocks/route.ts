import { NextResponse } from 'next/server'
import { getAllStocks, getMarketStatus } from '@/services/marketApi'

export const revalidate = 30

export async function GET() {
  try {
    const res = await getAllStocks()
    return NextResponse.json({ ...res, status: getMarketStatus() })
  } catch {
    return NextResponse.json(
      { error: 'Unable to load stocks right now.' },
      { status: 502 },
    )
  }
}
