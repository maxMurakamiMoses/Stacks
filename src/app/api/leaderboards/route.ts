// app/api/leaderboards/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const leaderboards = await db.leaderboard.findMany({
      select: { id: true, name: true },
    })
    return NextResponse.json(leaderboards, { status: 200 })
  } catch (error) {
    console.error('Error fetching leaderboards:', error)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
