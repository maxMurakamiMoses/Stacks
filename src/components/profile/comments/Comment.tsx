// File: Comment.tsx

'use client'

import { useState } from 'react'
import { ExtendedComment } from './CommentsSection' // Ensure this import is correct
import PostComment from './PostComment'
import CreateComment from './CreateComment'
import { Button } from '@/components/ui/Button'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface CommentProps {
  comment: ExtendedComment
  currentUserId: string | null
  profileId: string
  level?: number // Added level prop
}

const LShapeConnector = () => (
  <svg
    width="100" // Increased width to accommodate longer horizontal line
    height="100" // Increased height to accommodate longer vertical line
    viewBox="0 0 100 100" // Updated viewBox accordingly
    className="absolute top-[-13px] left-[-24px]" // Adjusted positioning
  >
    <path
      d="M5 0 V20 Q5 25,10 25 H30" // Added a quadratic curve
      stroke="#a1a1aa"
      strokeWidth="2"
      fill="none"
    />
  </svg>
)

const Comment: React.FC<CommentProps> = ({ comment, currentUserId, profileId, level = 0 }) => {
  const [isReplying, setIsReplying] = useState(false)
  // Initialize isCollapsed: 
  // - If the current comment is at level 0, its children (level 1) should be open (isCollapsed = false)
  // - Otherwise, collapse the children by default
  const [isCollapsed, setIsCollapsed] = useState(level === 0 ? false : true)

  const votesAmt = comment.votes.reduce((acc: number, vote: { type: string }) => {
    if (vote.type === 'UP') return acc + 1
    if (vote.type === 'DOWN') return acc - 1
    return acc
  }, 0)

  const currentVote = comment.votes.find((vote: { userId: string | null }) => vote.userId === currentUserId)

  // Callback to close the reply box after posting a reply
  const handleReplySuccess = () => {
    setIsReplying(false)
  }

  return (
    <div className='flex flex-col'>
      <div className='mb-2 flex items-center'> {/* Changed items-start to items-center */}
        {/* Render the comment */}
        <PostComment
          comment={comment}
          currentVote={currentVote}
          votesAmt={votesAmt}
          profileId={profileId}
          onReply={() => setIsReplying(!isReplying)}
        />

        {/* Toggle button for collapsing/expanding replies */}
        {comment.children.length > 0 && (
          <Button
            size='xs'
            onClick={() => setIsCollapsed(!isCollapsed)} // Toggle state
            className='mt-[52px] bg-transparent border-0 hover:bg-transparent focus:bg-transparent' // Added left margin for spacing
            aria-label={isCollapsed ? 'Expand replies' : 'Collapse replies'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          </Button>
        )}
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className='ml-6 mt-2'>
          <CreateComment
            profileId={profileId}
            replyToId={comment.id}
            onCommentPosted={handleReplySuccess}
          />
        </div>
      )}

      {/* Render Immediate Child Replies Only */}
      {!isCollapsed && comment.children.length > 0 && (
        <div className='relative ml-6 mt-2 pl-4 comment-connector'>
          <LShapeConnector />
          {comment.children.map((childComment: ExtendedComment) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              currentUserId={currentUserId}
              profileId={profileId}
              level={level + 1} // Increment level for child comments
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
