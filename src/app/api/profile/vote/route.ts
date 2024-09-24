import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { ProfileVoteValidator } from '@/lib/validators/vote'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { profileId, leaderboardId, voteType } = ProfileVoteValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // check if user has already voted on this profile in this leaderboard
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        profileId,
        leaderboardId,
      },
    })

    const pol = await db.profilesOnLeaderboards.findUnique({
      where: {
        profileId_leaderboardId: {
          profileId,
          leaderboardId,
        },
      },
      include: {
        profile: {
          include: {
            author: true,
          },
        },
        votes: true,
      },
    })

    if (!pol) {
      return new Response('Profile not found in this leaderboard', { status: 404 })
    }

    if (existingVote) {
      // if vote type is the same as existing vote, delete the vote
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_profileId_leaderboardId: {
              profileId,
              leaderboardId,
              userId: session.user.id,
            },
          },
        })

        return new Response('OK')
      }

      // if vote type is different, update the vote
      await db.vote.update({
        where: {
          userId_profileId_leaderboardId: {
            profileId,
            leaderboardId,
            userId: session.user.id,
          },
        },
        data: {
          type: voteType,
        },
      })

      return new Response('OK')
    }

    // if no existing vote, create a new vote
    await db.vote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        profileId,
        leaderboardId,
      },
    })

    return new Response('OK')
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not process your vote at this time. Please try later',
      { status: 500 }
    )
  }
}