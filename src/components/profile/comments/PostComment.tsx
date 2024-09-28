// File 4: PostComment.tsx

'use client'

import { FC } from 'react'
import { Comment, CommentVote, User } from '@prisma/client'
import { formatTimeToNow } from '@/lib/utils'
import CommentVotes from './CommentVotes'
import { MessageSquare } from 'lucide-react'
import { UserAvatar } from '@/components/top-bar/UserAvatar'
import { Button } from '@/components/ui/Button'
import { useSession } from 'next-auth/react'

type ExtendedComment = Comment & {
  author: User
  votes: CommentVote[]
}

interface PostCommentProps {
  comment: ExtendedComment
  votesAmt: number
  currentVote: CommentVote | undefined
  profileId: string
  onReply: () => void
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  profileId,
  onReply,
}) => {
  const { data: session } = useSession()

  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className='h-6 w-6'
        />
        <div className='ml-2 flex items-center gap-x-2'>
          <p className='text-sm font-medium text-gray-300'>u/{comment.author.username}</p>

          <p className='max-h-40 truncate text-xs text-zinc-300'>
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className='text-sm text-zinc-300 mt-2'>{comment.text}</p>

      <div className='flex gap-2 items-center'>
        <CommentVotes
          commentId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        />

        <Button
          onClick={() => {
            if (!session) {
              // Optionally, handle redirection to sign-in
              // e.g., window.location.href = '/sign-in'
              return
            }
            onReply()
          }}
          size='xs'
          className='bg-transparent text-gray-300 hover:bg-transparent hover:text-green-500'
        >
          <MessageSquare className='h-4 w-4 mr-1.5' />
          Reply
        </Button>
      </div>
    </div>
  )
}

export default PostComment
