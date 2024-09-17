import { getAuthSession } from '@/lib/auth'
import type { Profile, Vote } from '@prisma/client'
import { notFound } from 'next/navigation'
import ProfileVoteClient from './ProfileVoteClient'

interface ProfileVoteServerProps {
  profileId: string
  leaderboardId: string // Added leaderboardId here
  initialVotesAmt?: number
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

/**
 * We split the ProfileVote into a client and a server component to allow for dynamic data
 * fetching inside of this component, allowing for faster page loads via suspense streaming.
 * We also have the option to fetch this info on a page-level and pass it in.
 */

const ProfileVoteServer = async ({
  profileId,
  leaderboardId,
  initialVotesAmt,
  initialVote,
  getData,
  disableVoting = false,
}: ProfileVoteServerProps) => {
  const session = await getAuthSession()

  let _votesAmt: number = 0
  let _currentVote: Vote['type'] | null | undefined = undefined

  if (getData) {
    // Fetch data in component
    const profile = await getData()
    if (!profile) return notFound()

    // Find the ProfilesOnLeaderboards entry for the given leaderboardId
    const pol = profile.profilesOnLeaderboards.find(
      (pol) => pol.leaderboardId === leaderboardId
    )

    if (!pol) return notFound()

    // Calculate votes amount for this leaderboard
    _votesAmt = pol.votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1
      if (vote.type === 'DOWN') return acc - 1
      return acc
    }, 0)

    // Find the current user's vote
    _currentVote = pol.votes.find(
      (vote) => vote.userId === session?.user?.id
    )?.type
  } else {
    // Passed as props
    _votesAmt = initialVotesAmt!
    _currentVote = initialVote
  }

  return (
    <ProfileVoteClient
      profileId={profileId}
      leaderboardId={leaderboardId} // Pass leaderboardId here
      initialVotesAmt={_votesAmt}
      initialVote={_currentVote}
      disableVoting={disableVoting}
    />
  )
}

export default ProfileVoteServer
