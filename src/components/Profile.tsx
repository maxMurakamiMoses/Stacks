'use client'

import { formatTimeToNow } from '@/lib/utils'
import { Profile, User, Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { FC, useRef } from 'react'
import EditorOutput from './EditorOutput'
import ProfileVoteClient from './profile-vote/ProfileVoteClient'

type PartialVote = Pick<Vote, 'type'>

interface ProfileProps {
  profile: Profile & {
    author: User
    votes: Vote[]
  }
  votesAmt: number
  leaderboardName: string
  currentVote?: PartialVote
  commentAmt: number
}

const Profile: FC<ProfileProps> = ({
  profile,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  leaderboardName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null)

  return (
    <div className='rounded-md bg-white shadow'>
      <div className='px-6 py-4 flex justify-between'>
        <ProfileVoteClient
          profileId={profile.id}
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
          <a href={`/leaderboards/${leaderboardName}/profile/${profile.id}`}>
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
          href={`/leaderboards/${leaderboardName}/profile/${profile.id}`}
          className='w-fit flex items-center gap-2'>
          <MessageSquare className='h-4 w-4' /> {commentAmt} comments
        </Link>
      </div>
    </div>
  )
}
export default Profile