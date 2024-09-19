import MiniAddProfile from '@/components/admin/MiniAddProfile'
import ProfileFeed from '@/components/leaderboards/leaderboardpage/ProfileFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

// Helper function to format the leaderboard name
const formatLeaderboardName = (name: string): string => {
  if (name.includes('-')) {
    // Split by hyphen, capitalize each word, and join with spaces
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  } else {
    // Capitalize the first letter of the single word
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
}

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
      profilesOnLeaderboards: {
        include: {
          profile: {
            include: {
              author: true,
              comments: true,
            },
          },
          votes: true,
        },
        orderBy: {
          profile: {
            createdAt: 'desc',
          },
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  })

  if (!leaderboard) return notFound()

  // Preprocess the leaderboard name
  const formattedLeaderboardName = formatLeaderboardName(leaderboard.name)

  // Extract profiles from profilesOnLeaderboards
  const initialProfiles = leaderboard.profilesOnLeaderboards.map((pol) => ({
    ...pol.profile,
    votes: pol.votes,
    leaderboardId: leaderboard.id, // Include leaderboardId for votes
    leaderboard: leaderboard, // Include the leaderboard property
  }))

  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl h-14'>
        {formattedLeaderboardName} Leaderboard
      </h1>
      {session?.user?.email === 'max.murakamimoses24@gmail.com' && (
        <MiniAddProfile session={session} />
      )}
      <ProfileFeed
        initialProfiles={initialProfiles}
        leaderboardName={formattedLeaderboardName}
        leaderboardId={leaderboard.id}
      />
    </>
  )
}

export default page
