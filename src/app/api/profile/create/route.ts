import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { ProfileValidator } from '@/lib/validators/profile'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, content, leaderboardIds } = ProfileValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Create the profile
    const profile = await db.profile.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    })

    // Create entries in ProfilesOnLeaderboards
    await db.profilesOnLeaderboards.createMany({
      data: leaderboardIds.map((leaderboardId: string) => ({
        profileId: profile.id,
        leaderboardId,
      })),
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    console.error('Error:', error)

    return new Response(
      'Could not post to leaderboards at this time. Please try later',
      { status: 500 }
    )
  }
}