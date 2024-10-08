// leaderboards/[slug]/layout.tsx

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Roboto_Mono } from 'next/font/google';
import JoinLeaderboardButton from '@/components/leaderboards/JoinLeaderboardButton'; // Import the Client Component
import { FadeInSection } from '@/components/FadeInSection';

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
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  const leaderboard = await db.leaderboard.findFirst({
    where: { name: slug },
    include: {
      profilesOnLeaderboards: {
        include: {
          profile: {
            include: {
              author: true,
            },
          },
          votes: true,
        },
      },
      _count: {
        select: { profilesOnLeaderboards: true },
      },
    },
  });

  if (!leaderboard) return notFound();
  const profileCount = leaderboard?._count.profilesOnLeaderboards || 0;

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-16">
      <div>
      <FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4 py-6">
          <ul className="flex flex-col col-span-2 space-y-6">{children}</ul>

          {/* Info sidebar */}
          
          <div className={robotoMono.className}>
            <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first">
              <div className="px-6 py-4">
                <p className="font-semibold py-3">About this leaderboard</p>
              </div>
              <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
                <div className="flex justify-between gap-x-4 py-3">
                  <dd className="flex items-start gap-x-2">
                    <div className="text-gray-600">{leaderboard.description}</div>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Created</dt>
                  <dd className="text-gray-600">
                    <time dateTime={leaderboard.createdAt.toDateString()}>
                      {format(leaderboard.createdAt, 'MMMM d, yyyy')}
                    </time>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Number of participants</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="text-gray-900">{profileCount}</div>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Join the community</dt>
                </div>

                {/* Use the Client Component here */}
                <JoinLeaderboardButton isUserLoggedIn={!!session?.user} />

              </dl>
            </div>
          </div>
          
        </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Layout;
