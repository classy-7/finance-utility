import { NextResponse } from 'next/server'
import { getFunds } from '@/services/marketApi'

export const revalidate = 300

export async function GET() {
  try {
    const res = await getFunds()
    return NextResponse.json(res)
  } catch {
    return NextResponse.json(
      { error: 'Unable to load mutual funds right now.' },
      { status: 502 },
    )
  }
}
