'use client'
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
    image: string // Changed from String to string for TypeScript consistency
    verified: boolean
  }
  votesAmt: number
  currentVote?: PartialVote
  commentAmt: number
  leaderboardName?: string
  leaderboardId: string
}

const extractSection = (blocks: any[], sectionTitle: string): string | null => {
  const sectionIndex = blocks.findIndex(
    (block) => block.type === 'header' && block.data.text === sectionTitle
  )
  if (sectionIndex !== -1 && blocks[sectionIndex + 1]) {
    return blocks[sectionIndex + 1].data.text
  }
  return null
}

const extractTags = (tagsString: string): string[] => {
  const regex = /\[([^\]]+)\]/g
  const tags: string[] = []
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
    <div className='rounded-md bg-white shadow text-black'>
      <div className='px-6 py-2 flex items-start'>
        {/* Left Side: Profile Image */}
        <div className='mr-4 flex-shrink-0'>
          <img
            src={profile.image}
            alt={`${profile.title} profile`}
            className='w-12 h-12 rounded-full object-cover'
          />
        </div>

        {/* Middle: Profile Information */}
        <div className='flex-1'>
          {/* Profile Title */}
          <Link href={`/profile/${profile.id}`}>
            <h1 className='text-lg font-semibold py-2 leading-6'>
              {profile.title}
            </h1>
          </Link>

          {/* Short Bio */}
          {shortBio && (
            <div className='mb-2 text-gray-500 text-[16px]'>
              <p>{shortBio}</p>
            </div>
          )}

          {/* Comments and Tags on the Same Line */}
          <div className='flex items-center'>
            {/* Comments */}
            <Link href={`/profile/${profile.id}`} className='flex items-center text-gray-500'>
              <MessageSquare className='h-4 w-4 mr-1 text-gray-500' />
              <span className='text-gray-500'>{commentAmt}</span>
            </Link>

            {/* Tags */}
            {tags.length > 0 && (
              <div className='ml-4 flex items-center text-sm text-gray-500'>
                {tags.map((tag) => (
                  <span key={tag} className='flex items-center'>
                    {/* Leading Dot */}
                    <span className='mx-2 text-gray-400'>•</span>
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Vote Component */}
        <div className='ml-4'>
          <ProfileVoteClient
            profileId={profile.id}
            leaderboardId={leaderboardId}
            initialVotesAmt={_votesAmt}
            initialVote={_currentVote?.type}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
