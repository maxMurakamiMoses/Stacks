'use client'

import { formatTimeToNow } from '@/lib/utils'
import { Profile as ProfileType, User, Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { FC, useRef } from 'react'
import ProfileVoteClient from './vote/ProfileVoteClient'

type PartialVote = Pick<Vote, 'type'>

interface ProfileProps {
  profile: ProfileType & {
    author: User
    votes: Vote[]
    content: any
    createdAt: string | Date
    image: String
    verified: boolean
  }
  votesAmt: number
  currentVote?: PartialVote
  commentAmt: number
  leaderboardName?: string
  leaderboardId: string
}

const extractSection = (blocks, sectionTitle) => {
  const sectionIndex = blocks.findIndex(
    (block) => block.type === 'header' && block.data.text === sectionTitle
  )
  if (sectionIndex !== -1 && blocks[sectionIndex + 1]) {
    return blocks[sectionIndex + 1].data.text
  }
  return null
}

const extractTags = (tagsString) => {
  const regex = /\[([^\]]+)\]/g
  const tags = []
  let match
  while ((match = regex.exec(tagsString)) !== null) {
    tags.push(match[1])
  }
  return tags
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

  // Ensure profile.content.blocks exists
  const blocks = profile.content?.blocks || []

  // Extract TAGS
  const tagsString = extractSection(blocks, '{TAGS}')
  const tags = tagsString ? extractTags(tagsString) : []

  // Extract SHORTBIO
  const shortBio = extractSection(blocks, '{SHORTBIO}')

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

          <div className='relative text-sm w-full' ref={pRef}>
            {/* Removed EditorOutput */}
            {/* Display Short Bio */}
            {shortBio && (
              <div className='mb-4'>
                <p>{shortBio}</p>
              </div>
            )}

            {/* Display Tags */}
            {tags.length > 0 && (
              <div className='mb-4'>
                <div className='flex flex-wrap gap-2'>
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-2 py-1 bg-gray-200 rounded-full text-sm'>
                      "{tag}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
