import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (session?.user.email !== "max.murakamimoses24@gmail.com") {
        return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = body

    // check if leaderboard already exists
    const leaderboardExists = await db.leaderboard.findFirst({
      where: {
        name,
      },
    })

    if (leaderboardExists) {
      return new Response('Leaderboard already exists', { status: 409 })
    }

    // create leaderboard and associate it with the user
    const leaderboard = await db.leaderboard.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    })

    return new Response(leaderboard.name)
  } catch (error) {
    return new Response('Could not create leaderboard', { status: 500 })
  }
}