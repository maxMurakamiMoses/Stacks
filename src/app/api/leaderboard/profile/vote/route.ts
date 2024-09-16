import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { ProfileVoteValidator } from '@/lib/validators/vote'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { profileId, voteType } = ProfileVoteValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // check if user has already voted on this post
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        profileId,
      },
    })

    const profile = await db.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        author: true,
        votes: true,
      },
    })

    if (!profile) {
      return new Response('Profile not found', { status: 404 })
    }

    if (existingVote) {
      // if vote type is the same as existing vote, delete the vote
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_profileId: {
              profileId,
              userId: session.user.id,
            },
          },
        })

        return new Response('OK')
      }

      // if vote type is different, update the vote
      await db.vote.update({
        where: {
          userId_profileId: {
            profileId,
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
      },
    })


    return new Response('OK')
  } catch (error) {
    (error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to leaderboard at this time. Please try later',
      { status: 500 }
    )
  }
}