import { getAuthSession } from '@/lib/auth'
import type { Profile, Vote } from '@prisma/client'
import { notFound } from 'next/navigation'
import ProfileVoteClient from './ProfileVoteClient'

interface ProfileVoteServerProps {
  profileId: string
  leaderboardId: string
  initialUpvotesAmt?: number
  initialDownvotesAmt?: number
  initialVote?: Vote['type'] | null
  getData?: () => Promise<
    (Profile & {
      profilesOnLeaderboards: {
        leaderboardId: string
        votes: Vote[]
      }[]
    }) | null
  >
  disableVoting?: boolean
}

const ProfileVoteServer = async ({
  profileId,
  leaderboardId,
  initialUpvotesAmt,
  initialDownvotesAmt,
  initialVote,
  getData,
  disableVoting = false,
}: ProfileVoteServerProps) => {
  const session = await getAuthSession()

  let _upvotesAmt: number = 0
  let _downvotesAmt: number = 0
  let _currentVote: Vote['type'] | null | undefined = undefined

  if (getData) {
    const profile = await getData()
    if (!profile) return notFound()

    const pol = profile.profilesOnLeaderboards.find(
      (pol) => pol.leaderboardId === leaderboardId
    )

    if (!pol) return notFound()

    _upvotesAmt = pol.votes.filter(vote => vote.type === 'UP').length
    _downvotesAmt = pol.votes.filter(vote => vote.type === 'DOWN').length

    _currentVote = pol.votes.find(
      (vote) => vote.userId === session?.user?.id
    )?.type
  } else {
    _upvotesAmt = initialUpvotesAmt!
    _downvotesAmt = initialDownvotesAmt!
    _currentVote = initialVote
  }

  return (
    <ProfileVoteClient
      profileId={profileId}
      leaderboardId={leaderboardId}
      initialUpvotesAmt={_upvotesAmt}
      initialDownvotesAmt={_downvotesAmt}
      initialVote={_currentVote}
      disableVoting={disableVoting}
    />
  )
}

export default ProfileVoteServer
