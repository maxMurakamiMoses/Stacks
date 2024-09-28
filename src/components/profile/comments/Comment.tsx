// File: Comment.tsx

'use client'

import { useState } from 'react'
import { ExtendedComment } from './CommentsSection'
import PostComment from './PostComment'
import CreateComment from './CreateComment'
import { Button } from '@/components/ui/Button'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface CommentProps {
  comment: ExtendedComment
  currentUserId: string | null
  profileId: string
}

const Comment: React.FC<CommentProps> = ({ comment, currentUserId, profileId }) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true) // Initialize to collapsed

  const votesAmt = comment.votes.reduce((acc, vote) => {
    if (vote.type === 'UP') return acc + 1
    if (vote.type === 'DOWN') return acc - 1
    return acc
  }, 0)

  const currentVote = comment.votes.find((vote) => vote.userId === currentUserId)

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
            className='ml-2' // Added left margin for spacing
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
        <div className='ml-6 mt-2 border-l-2 border-zinc-300 pl-4'>
          {comment.children.map((childComment) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              currentUserId={currentUserId}
              profileId={profileId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
