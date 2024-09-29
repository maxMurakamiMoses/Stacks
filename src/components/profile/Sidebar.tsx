// Sidebar.tsx

import { buttonVariants } from '@/components/ui/Button';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Suspense } from 'react';
import ProfileVoteServerWhite from '@/components/vote/ProfileVoteServerWhite';
import { notFound } from 'next/navigation';
import { formatLeaderboardName, formatNumber } from '@/lib/utils'; // Import formatNumber
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

interface SidebarProps {
  profile: any;
  session: any;
  profileTotalFollowers: number;
}

const Sidebar = ({ profile, session, profileTotalFollowers }: SidebarProps) => {
  return (
    <div className={`${robotoMono.className} overflow-hidden h-fit rounded-lg border border-gray-200 flex flex-col `}>
      
      {/* Top Section without Background */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Leaderboard Rankings</h2>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Content Section with light gray Background */}
      <div className="bg-gray-100 px-6 py-4">
        <ul className="mt-2 space-y-4">
          {profile.profilesOnLeaderboards.map((pol: any) => {
            const upvotesAmt = pol.votes.filter((vote: any) => vote.type === 'UP').length;
            const downvotesAmt = pol.votes.filter((vote: any) => vote.type === 'DOWN').length;

            // Find the current user's vote
            const currentVote = pol.votes.find((vote: any) => vote.userId === session?.user.id);

            return (
              <li key={pol.leaderboard.id} className="flex items-center justify-between">
                <div className="flex items-center flex-grow">
                  <Link
                    href={`/leaderboards/${pol.leaderboard.name}`}
                    className="text-gray-500 hover:underline"
                  >
                    {formatLeaderboardName(pol.leaderboard.name)}
                  </Link>
                </div>
                <div className="flex items-center justify-end space-x-10">
                  {pol.leaderboard.name === 'dudedin-pace' ? (
                    <p className="text-lg text-gray-700">{profile.dudedinScore || 0}</p>
                  ) : pol.leaderboard.name === 'social-media' ? (
                    <p className="text-lg text-gray-700">
                      {formatNumber(profileTotalFollowers || 0)} followers
                    </p>
                  ) : (
                    <Suspense fallback={<div>Loading...</div>}>
                      {/* @ts-expect-error Server Component */}
                      <ProfileVoteServerWhite
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
                          });
                        }}
                      />
                    </Suspense>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Report Outdated Information or Claim Profile */}
      <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
        {/* Is the information outdated? Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Is the information outdated?</h2>
          <p className="mt-2 text-sm text-gray-500">
            If you believe the information on this profile is outdated, let us know!
          </p>
          <Link
            href="https://forms.gle/your-google-form-link-inform"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonVariants({ variant: 'outline' })} w-full mt-4 text-gray-700`}
          >
            Inform Us
          </Link>
        </div>

        {/* Conditionally render the "Is This You?" Section */}
        {!profile.claimed && (
          <div className="pb-4">
            <h2 className="text-lg font-semibold text-gray-700 pt-4">Is This You?</h2>
            <p className="mt-2 text-sm text-gray-500">
              Claim your profile to update it whenever you want!
            </p>
            <Link
              href="https://forms.gle/your-google-form-link-claim"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonVariants({ variant: 'outline' })} w-full mt-4 text-gray-700`}
            >
              Claim This Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
