import type { Profile, Leaderboard, User, Vote, Comment } from '@prisma/client'

export type ExtendedProfile = Profile & {
  leaderboard?: Leaderboard
  votes: Vote[]
  author: User
  comments: Comment[]
  leaderboardId?: string
  image: string
  claimed: boolean
  rank: number
  dudedinScore?: number
}
