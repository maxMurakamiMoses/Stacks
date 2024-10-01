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

  // New fields for social media followers
  youtubeFollowers?: number
  twitterFollowers?: number
  instagramFollowers?: number
  tiktokFollowers?: number
  totalFollowers?: number
}

export interface HomeProps {
  searchParams: FilterProps;
}