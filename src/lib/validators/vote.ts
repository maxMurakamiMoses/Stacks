import { z } from 'zod'

export const ProfileVoteValidator = z.object({
  profileId: z.string(),
  voteType: z.enum(['UP', 'DOWN']),
})

export type ProfileVoteRequest = z.infer<typeof ProfileVoteValidator>

export const CommentVoteValidator = z.object({
  commentId: z.string(),
  voteType: z.enum(['UP', 'DOWN']),
})

export type CommentVoteRequest = z.infer<typeof CommentVoteValidator>