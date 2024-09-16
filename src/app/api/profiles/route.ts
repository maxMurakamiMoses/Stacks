import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const session = await getAuthSession()

  try {
    const { limit, page, leaderboardName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        leaderboardName: z.string().nullish().optional(),
      })
      .parse({
        leaderboardName: url.searchParams.get('leaderboardName'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })

    let whereClause = {}

    if (leaderboardName) {
      whereClause = {
        leaderboard: {
          name: leaderboardName,
        },
      }
    }

    const profiles = await db.profile.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        leaderboard: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    })

    return new Response(JSON.stringify(profiles))
  } catch (error) {
    return new Response('Could not fetch profiles', { status: 500 })
  }
}