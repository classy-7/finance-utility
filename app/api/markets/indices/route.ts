import { NextResponse } from 'next/server'
import { getMarketIndices, getMarketStatus } from '@/services/marketApi'

export const revalidate = 30

export async function GET() {
  try {
    const res = await getMarketIndices()
    return NextResponse.json({ ...res, status: getMarketStatus() })
  } catch {
    return NextResponse.json(
      { error: 'Unable to load market indices right now.' },
      { status: 502 },
    )
  }
}
