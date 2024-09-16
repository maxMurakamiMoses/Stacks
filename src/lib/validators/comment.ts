import { z } from 'zod'

export const CommentValidator = z.object({
  profileId: z.string(),
  text: z.string(),
  replyToId: z.string().optional()
})

export type CommentRequest = z.infer<typeof CommentValidator>