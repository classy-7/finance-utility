import { NextResponse } from 'next/server'
import { getNews } from '@/services/marketApi'

export const revalidate = 300

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const res = await getNews(category)
    return NextResponse.json(res)
  } catch {
    return NextResponse.json(
      { error: 'Unable to load news right now.' },
      { status: 502 },
    )
  }
}
