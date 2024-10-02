// File: CommentsSection.tsx

import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { Comment, CommentVote, User } from '@prisma/client'
import CreateComment from './CreateComment'
import CommentComponent from './Comment' // Import the recursive Comment component

// **Export the ExtendedComment type**
export type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
  children: ExtendedComment[]
}

interface CommentsSectionProps {
  profileId: string
}

const CommentsSection = async ({ profileId }: CommentsSectionProps) => {
  const session = await getAuthSession()

  // Fetch all comments related to the profile
  const comments = await db.comment.findMany({
    where: {
      profileId: profileId,
    },
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      createdAt: 'asc', // Optional: Order comments by creation time
    },
  })

  // Function to build a comment tree from flat comments list
  function buildCommentTree(comments: (Comment & { votes: CommentVote[]; author: User })[]) {
    const commentMap: { [key: string]: ExtendedComment } = {}

    // Initialize the map with all comments
    comments.forEach((comment) => {
      commentMap[comment.id] = { ...comment, children: [] }
    })

    const commentTree: ExtendedComment[] = []

    // Build the tree structure
    comments.forEach((comment) => {
      if (comment.replyToId) {
        const parentComment = commentMap[comment.replyToId]
        if (parentComment) {
          parentComment.children.push(commentMap[comment.id])
        }
      } else {
        commentTree.push(commentMap[comment.id])
      }
    })

    return commentTree
  }

  const commentTree = buildCommentTree(comments as ExtendedComment[])

  return (
    <div className='flex flex-col gap-y-4 mt-4'>
      <hr className='w-full h-px my-6 bg-zinc-300' />

      {/* Top-level comment form */}
      <CreateComment profileId={profileId} />

      {/* Scrollable Comments Container */}
      <div className='flex flex-col gap-y-6 mt-4 max-h-[800px] overflow-y-auto'>
        {commentTree.map((topLevelComment) => (
          <CommentComponent
            key={topLevelComment.id}
            comment={topLevelComment}
            currentUserId={session?.user.id || null}
            profileId={profileId}
            level={0} // Initialize top-level comments with level 0
          />
        ))}
      </div>
    </div>
  )
}

export default CommentsSection
