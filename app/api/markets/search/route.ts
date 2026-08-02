import { NextResponse } from 'next/server'
import { searchStocks } from '@/services/marketApi'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = (searchParams.get('q') || '').slice(0, 64)
    if (!q.trim()) return NextResponse.json({ data: [] })
    const res = await searchStocks(q)
    return NextResponse.json(res)
  } catch {
    return NextResponse.json({ error: 'Search failed.' }, { status: 502 })
  }
}
