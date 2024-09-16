import { db } from '@/lib/db'
import ProfileFeed from '../ProfileFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'

const GeneralFeed = async () => {
  const profiles = await db.profile.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      leaderboard: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  })

  return <ProfileFeed initialProfiles={profiles} />
}

export default GeneralFeed