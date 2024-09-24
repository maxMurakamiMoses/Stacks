import CommentsSection from '@/components/comments/CommentsSection';
import EditorOutput from '@/components/EditorOutput';
import { db } from '@/lib/db';
import { Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getAuthSession } from '@/lib/auth';
import { preprocessContent } from '@/lib/contentPreprocessor'; // Import from utility file

interface LeaderboardProfilePageProps {
  params: {
    profileId: string;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const LeaderboardProfilePage = async ({
  params,
}: LeaderboardProfilePageProps) => {
  const session = await getAuthSession();

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
  });

  if (!profile) return notFound();

  // Preprocess the content directly without using useMemo
  const cleanedContent = preprocessContent(profile.content);

  return (
    <div className='h-full flex flex-col sm:flex-row items-center sm:items-start justify-between'>
      <div className='relative flex-1 p-4 flex'>
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={profile.image || '/default-avatar.png'}
            className='w-16 h-16 rounded-md'
            alt={`${profile.title} profile image`}
          />
        </div>
        <div className='flex-1 ml-4'>
          <h1 className='text-xl font-semibold py-2 leading-6 text-gray-900'>
            {profile.title}
          </h1>

          {/* Pass the cleaned content to EditorOutput */}
          <EditorOutput content={cleanedContent} />

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
  );
};

export default LeaderboardProfilePage;
