import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { ProfileValidator } from '@/lib/validators/profile'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, content, leaderboardId } = ProfileValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    await db.profile.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        leaderboardId,
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}