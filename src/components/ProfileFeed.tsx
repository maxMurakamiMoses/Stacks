'use client'

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { ExtendedProfile } from '@/types/db'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef } from 'react'
import Profile from './Profile'
import { useSession } from 'next-auth/react'

interface ProfileFeedProps {
  initialProfiles: ExtendedProfile[]
  leaderboardName?: string
  leaderboardId?: string
}

const ProfileFeed: FC<ProfileFeedProps> = ({ initialProfiles, leaderboardName, leaderboardId }) => {
  const lastProfRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastProfRef.current,
    threshold: 1,
  })
  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query', leaderboardId],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/profiles?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}&leaderboardId=${leaderboardId}`

      const { data } = await axios.get(query)
      return data as ExtendedProfile[]
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialProfiles], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  const profiles = data?.pages.flatMap((page) => page) ?? initialProfiles

  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {profiles.map((profile, index) => {
        const votesAmt = profile.votes.reduce((acc: number, vote: any) => {
          if (vote.type === 'UP') return acc + 1
          if (vote.type === 'DOWN') return acc - 1
          return acc
        }, 0)

        const currentVote = profile.votes.find(
          (vote: any) => vote.userId === session?.user.id
        )

        if (index === profiles.length - 1) {
          return (
            <li key={profile.id} ref={ref}>
              <Profile
                profile={profile}
                commentAmt={profile.comments.length}
                votesAmt={votesAmt}
                currentVote={currentVote}
                leaderboardName={leaderboardName}
                leaderboardId={profile.leaderboard?.id || ''}
              />
            </li>
          )
        } else {
          return (
            <Profile
              key={profile.id}
              profile={profile}
              commentAmt={profile.comments.length}
              votesAmt={votesAmt}
              currentVote={currentVote}
              leaderboardName={leaderboardName}
              leaderboardId={profile.leaderboard?.id || ''}
            />
          )
        }
      })}

      {isFetchingNextPage && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )}
    </ul>
  )
}

export default ProfileFeed
