// app/profile/[profileId]/layout.tsx

import { buttonVariants } from '@/components/ui/Button'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReactNode, Suspense } from 'react'
import ProfileVoteServer from '@/components/vote/ProfileVoteServer'

export const metadata: Metadata = {
  title: 'Stacks',
  description: 'A place for biohackers, nerds, and athletes.',
}

const Layout = async ({
  children,
  params: { profileId },
}: {
  children: ReactNode
  params: { profileId: string }
}) => {
  const session = await getAuthSession()

  const profile = await db.profile.findFirst({
    where: {
      id: profileId,
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
  console.log('Profile data:', profile)

  const formatLeaderboardName = (name: string): string => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className='sm:container max-w-7xl mx-auto h-full pt-20'>
      <div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-y-4 md:gap-x-4 py-6'>
          {/* Main Content */}
          <div className='flex flex-col col-span-3 space-y-6'>{children}</div>

          {/* Info Sidebar */}
          <div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first lg:order-last flex flex-col space-y-6'>
            {/* Leaderboard Rankings */}
            <div className='my-8 mx-8 lg:my-4 lg:mx-4'>
              <h2 className='text-lg font-semibold'>Leaderboard Rankings</h2>
              <ul className='mt-2 space-y-4'>
                {profile.profilesOnLeaderboards.map((pol) => {
                  const upvotesAmt = pol.votes.filter((vote) => vote.type === 'UP').length
                  const downvotesAmt = pol.votes.filter((vote) => vote.type === 'DOWN').length

                  // Find the current user's vote
                  const currentVote = pol.votes.find(
                    (vote) => vote.userId === session?.user.id
                  )

                  return (
                    <li
                      key={pol.leaderboard.id}
                      className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <Link href={`/leaderboards/${pol.leaderboard.name}`} passHref>
                          {formatLeaderboardName(pol.leaderboard.name)}
                        </Link>
                      </div>
                      {/* Conditionally render the voting component or dudedinScore */}
                      {pol.leaderboard.name === 'dudedin-pace' ? (
                        // Display dudedinScore
                        <div className='flex-shrink-0 mr-10'>
                          <p className='text-lg font-semibold'>{profile.dudedinScore || 0}</p>
                        </div>
                      ) : (
                        // Display the voting component
                        <Suspense fallback={<div>Loading...</div>}>
                          {/* @ts-expect-error Server Component */}
                          <ProfileVoteServer
                            profileId={profile.id}
                            leaderboardId={pol.leaderboard.id}
                            initialUpvotesAmt={upvotesAmt}
                            initialDownvotesAmt={downvotesAmt}
                            initialVote={currentVote?.type}
                            getData={async () => {
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
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* New Box: Report Outdated Information or Claim Profile */}
            <div className='my-8 mx-8 lg:my-4 lg:mx-4 pt-4 border-t border-gray-200 hidden md:block'>
              {/* Is the information outdated? Section */}
              <div className='mb-6'>
                <h2 className='text-lg font-semibold'>Is the information outdated?</h2>
                <p className='mt-2 text-sm'>
                  If you believe the information on this profile is outdated, let us know!
                </p>
                <Link
                  href='https://forms.gle/your-google-form-link-inform'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`${buttonVariants({ variant: 'outline' })} w-full mt-4`}
                >
                  Inform Us
                </Link>
              </div>

              {/* Conditionally render the "Is This You?" Section */}
              {!profile.claimed && (
                <div className="pb-4">
                  <h2 className='text-lg font-semibold pt-4'>Is This You?</h2>
                  <p className='mt-2 text-sm'>
                    Claim your profile to update it whenever you want!
                  </p>
                  <Link
                    href='https://forms.gle/your-google-form-link-claim'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${buttonVariants({ variant: 'outline' })} w-full mt-4 `}
                  >
                    Claim This Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
