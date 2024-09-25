//api/profile/vote/route.ts

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

    // Check if user has already voted
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        profileId,
        leaderboardId,
      },
    })

    if (existingVote) {
      if (existingVote.type === voteType) {
        // Delete the vote and adjust netVotes
        await db.vote.delete({
          where: {
            userId_profileId_leaderboardId: {
              profileId,
              leaderboardId,
              userId: session.user.id,
            },
          },
        })

        const adjustment = voteType === 'UP' ? -1 : 1
        await db.profilesOnLeaderboards.update({
          where: {
            profileId_leaderboardId: {
              profileId,
              leaderboardId,
            },
          },
          data: {
            netVotes: {
              increment: adjustment,
            },
          },
        })

        return new Response('OK')
      } else {
        // Update the vote and adjust netVotes
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

        const adjustment = voteType === 'UP' ? 2 : -2
        await db.profilesOnLeaderboards.update({
          where: {
            profileId_leaderboardId: {
              profileId,
              leaderboardId,
            },
          },
          data: {
            netVotes: {
              increment: adjustment,
            },
          },
        })

        return new Response('OK')
      }
    } else {
      // Create a new vote and adjust netVotes
      await db.vote.create({
        data: {
          type: voteType,
          userId: session.user.id,
          profileId,
          leaderboardId,
        },
      })

      const adjustment = voteType === 'UP' ? 1 : -1
      await db.profilesOnLeaderboards.update({
        where: {
          profileId_leaderboardId: {
            profileId,
            leaderboardId,
          },
        },
        data: {
          netVotes: {
            increment: adjustment,
          },
        },
      })

      return new Response('OK')
    }
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
