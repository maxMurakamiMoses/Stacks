// layout.tsx

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import Sidebar from '@/components/profile/Sidebar';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

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
    <div className={`relative min-h-screen w-full bg-gray-900 text-white ${robotoMono.className}`}>
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-neonGreen/30 via-neonGreen/10 to-transparent opacity-40"></div>
      <div className="absolute inset-0 bg-grid-neonGreen/[0.1] mix-blend-overlay"></div>

      {/* Main Content Container */}
      <div className="container max-w-8xl mx-auto h-full pt-20 relative">
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
