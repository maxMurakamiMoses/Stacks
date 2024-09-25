//api/profile/update/[id]/route.ts


import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const ProfileSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.any().optional(),
  leaderboards: z.array(z.string()), // Updated schema
})

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const profile = await db.profile.findUnique({
      where: { id },
      include: {
        profilesOnLeaderboards: {
          select: { leaderboardId: true },
        },
      },
    })

    if (!profile) {
      return NextResponse.json(
        { message: 'Profile not found.' },
        { status: 404 }
      )
    }

    // Transform profilesOnLeaderboards to leaderboards array
    const leaderboards = profile.profilesOnLeaderboards.map(p => p.leaderboardId)

    // Validate the fetched profile against the updated schema
    const validatedProfile = ProfileSchema.parse({
      id: profile.id,
      title: profile.title,
      content: profile.content,
      leaderboards: leaderboards,
    })

    return NextResponse.json(validatedProfile, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
