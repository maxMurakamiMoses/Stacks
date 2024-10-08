import MiniAddProfile from '@/components/admin/MiniAddProfile'
import ProfileFeed from '@/components/leaderboards/leaderboardpage/ProfileFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

// Helper function to format the leaderboard name
const formatLeaderboardName = (name: string): string => {
  if (name.includes('-')) {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  } else {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
}

interface PageProps {
  params: {
    slug: string
  }
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params

  const session = await getAuthSession()

  // Fetch the leaderboard with conditional ordering based on the slug
  let leaderboard

  if (slug === 'community-voted') {
    leaderboard = await db.leaderboard.findFirst({
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
            netVotes: 'desc', // Current ordering
          },
          take: INFINITE_SCROLL_PAGINATION_RESULTS,
        },
      },
    })
  } else if (slug === 'dudedin-pace') {
    leaderboard = await db.leaderboard.findFirst({
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
              dudedinScore: 'asc', // New ordering based on dudedinScore
            },
          },
          take: INFINITE_SCROLL_PAGINATION_RESULTS,
        },
      },
    })
  } else {
    // Handle other leaderboard types or default behavior
    leaderboard = await db.leaderboard.findFirst({
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
              totalFollowers: 'desc', // New ordering based on dudedinScore
            },
          },
          take: INFINITE_SCROLL_PAGINATION_RESULTS,
        },
      },
    })
  }

  if (!leaderboard) return notFound()

  const formattedLeaderboardName = formatLeaderboardName(leaderboard.name)

  // Extract profiles from profilesOnLeaderboards
  const initialProfiles = leaderboard.profilesOnLeaderboards.map((pol, index) => {
    const profile = pol.profile;

    return {
      ...profile,
      votes: pol.votes,
      leaderboardId: leaderboard.id,
      leaderboard: leaderboard,
      image: profile.image ?? '',
      claimed: profile.claimed ?? false,
      rank: index + 1,
      dudedinScore: profile.dudedinScore ?? 0,
      youtubeFollowers: profile.youtubeFollowers ?? 0,
      twitterFollowers: profile.twitterFollowers ?? 0,
      instagramFollowers: profile.instagramFollowers ?? 0,
      tiktokFollowers: profile.tiktokFollowers ?? 0,
      totalFollowers: profile.totalFollowers ?? 0,
    };
  });

  return (
    <>
      <div className={robotoMono.className}>
        <Link href="/leaderboards" className="group flex items-center text-white hover:text-[#e0fcc4] transition-all pb-6">
          <FaArrowLeft className="mr-2 transform transition-transform group-hover:translate-x-[-4px]" />
          <span className="text-sm">Back to Leaderboards</span>
        </Link>

      <div className="relative inline-block">
        <h1 className='font-bold text-3xl xl:text-5xl text-[#e0fcc4]'>
          {formattedLeaderboardName} Leaderboard
        </h1>
      </div>
      <hr className="border-t border-gray-400 mt-2 w-full mb-8" />


        {session?.user?.email === 'max.murakamimoses24@gmail.com' && (
          <MiniAddProfile session={session} />
        )}
        <ProfileFeed
          initialProfiles={initialProfiles}
          leaderboardName={leaderboard.name} // Pass the raw name
          leaderboardId={leaderboard.id}
        />
      </div>
    </>
  )
}

export default Page
