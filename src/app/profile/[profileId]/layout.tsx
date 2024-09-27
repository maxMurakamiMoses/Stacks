import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import Sidebar from '@/components/profile/Sidebar';

export const metadata: Metadata = {
  title: 'Stacks',
  description: 'A place for biohackers, nerds, and athletes.',
};

const Layout = async ({
  children,
  params: { profileId },
}: {
  children: ReactNode;
  params: { profileId: string };
}) => {
  const session = await getAuthSession();

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
  });

  if (!profile) return notFound();
  console.log('Profile data:', profile);

  // Calculate total followers for the profile
  const profileTotalFollowers =
    (profile.youtubeFollowers ?? 0) +
    (profile.twitterFollowers ?? 0) +
    (profile.instagramFollowers ?? 0) +
    (profile.tiktokFollowers ?? 0);

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-20">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-4 md:gap-x-4 py-6">
          {/* Main Content */}
          <div className="flex flex-col col-span-3 space-y-6">{children}</div>

          {/* Sidebar */}
          <Sidebar
            profile={profile}
            session={session}
            profileTotalFollowers={profileTotalFollowers}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
