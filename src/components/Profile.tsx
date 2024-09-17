'use client'

import { formatTimeToNow } from '@/lib/utils'
import { Profile as ProfileType, User, Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { FC, useRef } from 'react'
import EditorOutput from './EditorOutput'
import ProfileVoteClient from './vote/ProfileVoteClient'

type PartialVote = Pick<Vote, 'type'>

interface ProfileProps {
  profile: ProfileType & {
    author: User
    votes: Vote[]
    content: any
    createdAt: string | Date
  }
  votesAmt: number
  currentVote?: PartialVote
  commentAmt: number
  leaderboardName?: string
  leaderboardId: string
}

const Profile: FC<ProfileProps> = ({
  profile,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  leaderboardName,
  leaderboardId,
  commentAmt,
}) => {
  const pRef = useRef<HTMLDivElement>(null)

  return (
    <div className='rounded-md bg-white shadow'>
      <div className='px-6 py-4 flex justify-between'>
        <ProfileVoteClient
          profileId={profile.id}
          leaderboardId={leaderboardId}
          initialVotesAmt={_votesAmt}
          initialVote={_currentVote?.type}
        />

        <div className='w-0 flex-1'>
          <div className='max-h-40 mt-1 text-xs text-gray-500'>
            {leaderboardName ? (
              <>
                <a
                  className='underline text-zinc-900 text-sm underline-offset-2'
                  href={`/leaderboards/${leaderboardName}`}>
                  leaderboards/{leaderboardName}
                </a>
                <span className='px-1'>•</span>
              </>
            ) : null}
            <span>Posted by u/{profile.author.username}</span>{' '}
            {formatTimeToNow(new Date(profile.createdAt))}
          </div>
          <a href={`/profile/${profile.id}`}>
            <h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
              {profile.title}
            </h1>
          </a>

          <div
            className='relative text-sm max-h-40 w-full overflow-clip'
            ref={pRef}>
            <EditorOutput content={profile.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className='bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6'>
        <Link
          href={`/profile/${profile.id}`}
          className='w-fit flex items-center gap-2'>
          <MessageSquare className='h-4 w-4' /> {commentAmt} comments
        </Link>
      </div>
    </div>
  )
}

export default Profile
