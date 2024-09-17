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
        profilesOnLeaderboards: {
          include: {
            votes: true,
          },
        },
      },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    let votesAmt = 0
    let currentVote = null

    // Iterate over profilesOnLeaderboards
    for (const pol of profile.profilesOnLeaderboards) {
      // Sum up the votes
      for (const vote of pol.votes) {
        if (vote.type === 'UP') votesAmt += 1
        if (vote.type === 'DOWN') votesAmt -= 1

        // Check for current user's vote
        if (vote.userId === session?.user.id) {
          currentVote = vote.type
        }
      }
    }

    return NextResponse.json({ votesAmt, currentVote }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
