import CommentsSection from '@/components/comments/CommentsSection'
import EditorOutput from '@/components/EditorOutput'
import ProfileVoteServer from '@/components/vote/ProfileVoteServer'
import { db } from '@/lib/db'
import { formatTimeToNow } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getAuthSession } from '@/lib/auth'

interface LeaderboardProfilePageProps {
  params: {
    profileId: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const LeaderboardProfilePage = async ({
  params,
}: LeaderboardProfilePageProps) => {
  const session = await getAuthSession()

  const profile = await db.profile.findFirst({
    where: {
      id: params.profileId,
    },
    include: {
      author: true,
      profilesOnLeaderboards: {
        include: {
          leaderboard: true,
          votes: true,
        },
      },
    },
  })

  if (!profile) return notFound()

  return (
    <div>
      <div className='h-full flex flex-col sm:flex-row items-center sm:items-start justify-between'>
        <div className='sm:w-0 w-full flex-1 bg-white p-4 rounded-sm'>
          <p className='max-h-40 mt-1 truncate text-xs text-gray-500'>
            Created by u/{profile.author.username}{' '}
            {formatTimeToNow(new Date(profile.createdAt))}
          </p>
          <h1 className='text-xl font-semibold py-2 leading-6 text-gray-900'>
            {profile.title}
          </h1>

          <EditorOutput content={profile.content} />

          {/* Display vote counts and enable voting per leaderboard */}
          <div className='mt-6'>
            <h2 className='text-lg font-semibold'>Vote Counts per Leaderboard:</h2>
            <ul className='mt-2 space-y-4'>
              {profile.profilesOnLeaderboards.map((pol) => {
                const votesAmt = pol.votes.reduce((acc, vote) => {
                  if (vote.type === 'UP') return acc + 1
                  if (vote.type === 'DOWN') return acc - 1
                  return acc
                }, 0)

                // Find the current user's vote
                const currentVote = pol.votes.find(
                  (vote) => vote.userId === session?.user.id
                )

                return (
                  <li
                    key={pol.leaderboard.id}
                    className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <span className='mr-2'>Leaderboard:</span>
                      <a
                        href={`/leaderboards/${pol.leaderboard.name}`}
                        className='text-blue-500 underline'>
                        {pol.leaderboard.name}
                      </a>
                    </div>
                    {/* Voting Component */}
                    <Suspense fallback={<div>Loading...</div>}>
                      {/* @ts-expect-error Server Component */}
                      <ProfileVoteServer
                        profileId={profile.id}
                        leaderboardId={pol.leaderboard.id} // Provide leaderboardId here
                        initialVotesAmt={votesAmt}
                        initialVote={currentVote?.type}
                        getData={async () => {
                          // Fetch data needed for voting
                          return await db.profile.findUnique({
                            where: {
                              id: profile.id,
                            },
                            include: {
                              profilesOnLeaderboards: {
                                where: {
                                  leaderboardId: pol.leaderboard.id,
                                },
                                include: {
                                  leaderboard: true,
                                  votes: true,
                                },
                              },
                            },
                          })
                        }}
                      />
                    </Suspense>
                  </li>
                )
              })}
            </ul>
          </div>

          <Suspense
            fallback={
              <Loader2 className='h-5 w-5 animate-spin text-zinc-500' />
            }>
            {/* @ts-expect-error Server Component */}
            <CommentsSection profileId={profile.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardProfilePage
