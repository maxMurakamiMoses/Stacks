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
        `/api/fetchMoreProfiles?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}&leaderboardId=${leaderboardId}`

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
    <ul className='flex flex-col col-span-2 space-y-1'>
      {profiles.map((profile, index) => {
        const rank = index + 1
        // Separate upvotes and downvotes
        const upvotes = profile.votes.filter((vote: any) => vote.type === 'UP').length
        const downvotes = profile.votes.filter((vote: any) => vote.type === 'DOWN').length
  
        const currentVote = profile.votes.find(
          (vote: any) => vote.userId === session?.user.id
        )
  
        if (index === profiles.length - 1) {
          return (
            <li key={profile.id} ref={ref}>
              <Profile
                profile={profile}
                rank={rank}
                commentAmt={profile.comments.length}
                upvotes={upvotes}
                downvotes={downvotes}
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
              rank={rank}
              profile={profile}
              commentAmt={profile.comments.length}
              upvotes={upvotes}
              downvotes={downvotes}
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
