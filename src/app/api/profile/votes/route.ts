// app/profile/votes/route.ts

import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const profileId = searchParams.get('profileId')

  if (!profileId) {
    return NextResponse.json({ error: 'Invalid profile ID' }, { status: 400 })
  }

  try {
    const session = await getAuthSession()

    const profile = await db.profile.findUnique({
      where: { id: profileId },
      include: {
        votes: true,
      },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const votesAmt = profile.votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1
      if (vote.type === 'DOWN') return acc - 1
      return acc
    }, 0)

    const currentVote = profile.votes.find(
      (vote) => vote.userId === session?.user.id
    )?.type

    return NextResponse.json({ votesAmt, currentVote }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
