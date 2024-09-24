import CommentsSection from '@/components/comments/CommentsSection';
import EditorOutput from '@/components/EditorOutput';
import { db } from '@/lib/db';
import { Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getAuthSession } from '@/lib/auth';
import { preprocessContent, PreprocessedContent } from '@/lib/contentPreprocessor';
import { Separator } from '@/components/ui/Separator';

interface LeaderboardProfilePageProps {
  params: {
    profileId: string;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const LeaderboardProfilePage = async ({ params }: LeaderboardProfilePageProps) => {
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

  const { cleanedContent, sections }: PreprocessedContent = preprocessContent(profile.content);

  const bioParagraphs = sections['BIO'] || [];
  const shortBioParagraphs = sections['SHORTBIO'] || [];
  const tagsParagraphs = sections['TAGS'] || [];

  const tags = tagsParagraphs.length > 0
    ? tagsParagraphs[0].data.text.replace(/\]\[/g, ',').replace(/[\[\]]/g, '').split(',')
    : [];

  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col sm:flex-row items-start justify-between mb-8'>
        <div className='flex-shrink-0 mb-4 sm:mb-0 sm:mr-8'>
          <img
            src={profile.image || '/default-avatar.png'}
            className='w-48 h-48 rounded-md object-cover'
            alt={`${profile.title} profile image`}
          />
        </div>
        <div className='flex-grow'>
          <h1 className='text-2xl font-semibold py-2 leading-6 text-gray-900'>
            {profile.title}
          </h1>

          <div className='py-2 block sm:hidden'>
            {shortBioParagraphs.map((para, index) => (
              <p key={index} className='text-gray-700'>
                {para.data.text}
              </p>
            ))}
          </div>

          <div className='py-2 hidden sm:block'>
            {bioParagraphs.map((para, index) => (
              <p key={index} className='text-gray-700'>
                {para.data.text}
              </p>
            ))}
          </div>

          {tags.length > 0 && (
            <div className='py-2 flex flex-wrap'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='bg-gray-200 text-gray-800 text-sm font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <Separator className='w-full mb-8' />

      <div className='w-full'>
        <EditorOutput content={cleanedContent} />
      </div>

      <Suspense fallback={<Loader2 className='h-5 w-5 animate-spin text-zinc-500' />}>
        {/* @ts-expect-error Server Component */}
        <CommentsSection profileId={profile.id} />
      </Suspense>
    </div>
  );
};

export default LeaderboardProfilePage;