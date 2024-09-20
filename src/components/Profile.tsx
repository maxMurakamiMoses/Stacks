'use client'
import { Profile as ProfileType, User, Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { FC, useRef, MouseEvent } from 'react'
import ProfileVoteClient from './vote/ProfileVoteClient'
import { useRouter } from 'next/navigation'

type PartialVote = Pick<Vote, 'type'>

interface ProfileProps {
  profile: ProfileType & {
    author: User
    votes: Vote[]
    content: any
    createdAt: string | Date
    image: string
    verified: boolean
  }
  upvotes: number
  downvotes: number
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
  upvotes,
  downvotes,
  currentVote,
  leaderboardName,
  leaderboardId,
  commentAmt,
}) => {
  const router = useRouter()

  // Ensure profile.content.blocks exists
  const blocks = profile.content?.blocks || []

  // Extract TAGS
  const tagsString = extractSection(blocks, '{TAGS}')
  const tags = tagsString ? extractTags(tagsString) : []

  // Extract SHORTBIO
  const shortBio = extractSection(blocks, '{SHORTBIO}')

  // Handle card click
  const handleCardClick = () => {
    router.push(`/profile/${profile.id}`)
  }

  // Prevent card click when clicking on voting section
  const handleVoteClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className='rounded-md bg-white shadow text-black p-2 flex flex-col md:flex-row items-center cursor-pointer'
      onClick={handleCardClick}
    >
      {/* Left Column: Profile Image */}
      <div className='flex-shrink-0 mb-4 md:mb-0 md:mr-6'>
        <img
          src={profile.image}
          alt={`${profile.title} profile`}
          className='w-24 h-24 rounded-md object-cover'
        />
      </div>

      {/* Middle Column: Profile Information */}
      <div className='flex-1 mb-1 md:mb-0'>
        {/* Profile Title */}
        <Link href={`/profile/${profile.id}`} onClick={(e) => e.stopPropagation()}>
          <h1 className='text-xl font-semibold mb-1 hover:underline'>{profile.title}</h1>
        </Link>

        {/* Short Bio */}
        {shortBio && (
          <div className='mb-0 text-gray-500 text-base'>
            <p>{shortBio}</p>
          </div>
        )}

        {/* Comments and Tags */}
        <div className='flex items-center'>
          {/* Comments */}
          <Link href={`/profile/${profile.id}`} className='flex items-center text-gray-500 mr-4' onClick={(e) => e.stopPropagation()}>
            <MessageSquare className='h-5 w-5 mr-1' />
            <span>{commentAmt}</span>
          </Link>

          {/* Tags */}
          {tags.length > 0 && (
            <div className='flex items-center text-sm text-gray-500'>
              {tags.map((tag, index) => (
                <span key={tag} className='flex items-center'>
                  {index !== 0 && <span className='mx-2 text-gray-400'>•</span>}
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Vote Component */}
      <div
        className='flex-shrink-0 mr-10'
        onClick={handleVoteClick} // Prevents the card's onClick from triggering
      >
        <ProfileVoteClient
          profileId={profile.id}
          leaderboardId={leaderboardId}
          initialUpvotesAmt={upvotes}
          initialDownvotesAmt={downvotes}
          initialVote={currentVote?.type}
        />
      </div>
    </div>
  )
}

export default Profile
