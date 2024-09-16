import LeaderboardFeed from '@/components/LeaderboardFeed'
import MiniAddProfile from '@/components/MiniAddProfile'
// import PostFeed from '@/components/PostFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: PageProps) => {
  const { slug } = params

  const session = await getAuthSession()

  const leaderboard = await db.leaderboard.findFirst({
    where: { name: slug },
    include: {
      profiles: {
        include: {
          author: true,
          votes: true,
          comments: true,
          leaderboard: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  })

  if (!leaderboard) return notFound()

  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl h-14'>
        {leaderboard.name} Leaderboard
      </h1>
      {session?.user?.email === 'max.murakamimoses24@gmail.com' && (
        <MiniAddProfile session={session} />
      )}
      <LeaderboardFeed initialProfiles={leaderboard.profiles} leaderboardName={leaderboard.name} />
    </>
  )
}

export default page