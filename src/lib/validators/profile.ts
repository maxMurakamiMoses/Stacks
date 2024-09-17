import { z } from 'zod'

export const ProfileValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(128, {
      message: 'Title must be less than 128 characters long',
    }),
  leaderboardIds: z
    .array(z.string())
    .min(1, {
      message: 'You must select at least one leaderboard',
    }),
  content: z.any(),
})

export type ProfileCreationRequest = z.infer<typeof ProfileValidator>
