import { buttonVariants } from '@/components/ui/Button';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Suspense } from 'react';
import ProfileVoteServer from '@/components/vote/ProfileVoteServer';
import { notFound } from 'next/navigation';
import { formatLeaderboardName } from '@/lib/utils';

interface SidebarProps {
  profile: any;
  session: any;
  profileTotalFollowers: number;
}

const Sidebar = ({ profile, session, profileTotalFollowers }: SidebarProps) => {
  return (
    <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first lg:order-last flex flex-col space-y-6">
      {/* Leaderboard Rankings */}
      <div className="my-8 mx-8 lg:my-4 lg:mx-4">
        <h2 className="text-lg font-semibold">Leaderboard Rankings</h2>
        <ul className="mt-2 space-y-4">
          {profile.profilesOnLeaderboards.map((pol: any) => {
            const upvotesAmt = pol.votes.filter((vote: any) => vote.type === 'UP').length;
            const downvotesAmt = pol.votes.filter((vote: any) => vote.type === 'DOWN').length;

            // Find the current user's vote
            const currentVote = pol.votes.find((vote: any) => vote.userId === session?.user.id);

            return (
              <li key={pol.leaderboard.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link href={`/leaderboards/${pol.leaderboard.name}`} passHref>
                    {formatLeaderboardName(pol.leaderboard.name)}
                  </Link>
                </div>
                {/* Conditionally render the voting component or other info */}
                {pol.leaderboard.name === 'dudedin-pace' ? (
                  // Display dudedinScore
                  <div className="flex-shrink-0 mr-10">
                    <p className="text-lg font-semibold">
                      Score: {profile.dudedinScore || 0}
                    </p>
                  </div>
                ) : pol.leaderboard.name === 'social-media' ? (
                  // Display total followers
                  <div className="flex-shrink-0 mr-10">
                    <p className="text-lg font-semibold">
                      Followers: {profileTotalFollowers || 0}
                    </p>
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
                        });
                      }}
                    />
                  </Suspense>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Report Outdated Information or Claim Profile */}
      <div className="my-8 mx-8 lg:my-4 lg:mx-4 pt-4 border-t border-gray-200 hidden md:block">
        {/* Is the information outdated? Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Is the information outdated?</h2>
          <p className="mt-2 text-sm">
            If you believe the information on this profile is outdated, let us know!
          </p>
          <Link
            href="https://forms.gle/your-google-form-link-inform"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonVariants({ variant: 'outline' })} w-full mt-4`}
          >
            Inform Us
          </Link>
        </div>

        {/* Conditionally render the "Is This You?" Section */}
        {!profile.claimed && (
          <div className="pb-4">
            <h2 className="text-lg font-semibold pt-4">Is This You?</h2>
            <p className="mt-2 text-sm">
              Claim your profile to update it whenever you want!
            </p>
            <Link
              href="https://forms.gle/your-google-form-link-claim"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonVariants({ variant: 'outline' })} w-full mt-4 `}
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
