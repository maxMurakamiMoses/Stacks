import { getAuthSession } from '@/lib/auth'
import type { Profile, Vote } from '@prisma/client'
import { notFound } from 'next/navigation'
import ProfileVoteClient from './ProfileVoteClient'

interface ProfileVoteServerProps {
  profileId: string
  initialVotesAmt?: number
  initialVote?: Vote['type'] | null
  getData?: () => Promise<(Profile & { votes: Vote[] }) | null>
}

/**
 * We split the PostVotes into a client and a server component to allow for dynamic data
 * fetching inside of this component, allowing for faster page loads via suspense streaming.
 * We also have to option to fetch this info on a page-level and pass it in.
 *
 */

const ProfileVoteServer = async ({
  profileId,
  initialVotesAmt,
  initialVote,
  getData,
}: ProfileVoteServerProps) => {
  const session = await getAuthSession()

  let _votesAmt: number = 0
  let _currentVote: Vote['type'] | null | undefined = undefined

  if (getData) {
    // fetch data in component
    const profile = await getData()
    if (!profile) return notFound()

    _votesAmt = profile.votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1
      if (vote.type === 'DOWN') return acc - 1
      return acc
    }, 0)

    _currentVote = profile.votes.find(
      (vote) => vote.userId === session?.user?.id
    )?.type
  } else {
    // passed as props
    _votesAmt = initialVotesAmt!
    _currentVote = initialVote
  }

  return (
    <ProfileVoteClient
      profileId={profileId}
      initialVotesAmt={_votesAmt}
      initialVote={_currentVote}
    />
  )
}

export default ProfileVoteServer