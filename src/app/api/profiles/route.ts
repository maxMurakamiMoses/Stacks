import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const session = await getAuthSession()

  try {
    // Parse query parameters
    const { limit, page, leaderboardId } = z
      .object({
        limit: z.string(),
        page: z.string(),
        leaderboardId: z.string().nullish().optional(),
      })
      .parse({
        leaderboardId: url.searchParams.get('leaderboardId'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })

    const take = parseInt(limit)
    const skip = (parseInt(page) - 1) * take

    if (!leaderboardId) {
      return new Response('leaderboardId is required', { status: 400 })
    }

    // Fetch profiles associated with the leaderboard using ProfilesOnLeaderboards
    const profilesOnLeaderboards = await db.profilesOnLeaderboards.findMany({
      where: {
        leaderboardId: leaderboardId,
      },
      include: {
        profile: {
          include: {
            author: true,
            comments: true,
            // Include content if needed
          },
        },
        votes: true,
      },
      orderBy: {
        profile: {
          createdAt: 'desc',
        },
      },
      take,
      skip,
    })

    // Map the data to match the expected format
    const profiles = profilesOnLeaderboards.map((pol) => ({
      ...pol.profile,
      votes: pol.votes,
      leaderboardId: pol.leaderboardId,
    }))

    return new Response(JSON.stringify(profiles))
  } catch (error) {
    console.error(error)
    return new Response('Could not fetch profiles', { status: 500 })
  }
}
