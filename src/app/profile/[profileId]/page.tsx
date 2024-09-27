// src/app/profile/[profileId]/page.tsx
import CommentsSection from '@/components/comments/CommentsSection';
import { db } from '@/lib/db';
import { Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getAuthSession } from '@/lib/auth';
import { preprocessContent, PreprocessedContent } from '@/lib/contentPreprocessor';
import ContentCards from '@/components/profile/ContentCards';
import BackButton from '@/components/profile/BackButton';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

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

  const dietParagraphs = sections['DIET'] || [];
  const appsGadgetsParagraphs = sections['APPSSTACK'] || [];
  const vitaminsParagraphs = sections['VITAMINSTACKS'] || [];
  const habitStackParagraphs = sections['HABIT STACK'] || [];

  const tags =
    tagsParagraphs.length > 0
      ? tagsParagraphs[0].data.text.replace(/\]\[/g, ',').replace(/[\[\]]/g, '').split(',')
      : [];

  return (
    <div className={robotoMono.className}>
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <div className="flex flex-col sm:flex-row items-start justify-between mb-8">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-8">
            <img
              src={profile.image || '/default-avatar.png'}
              className="w-64 h-64 rounded-md object-cover"
              alt={`${profile.title} profile image`}
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl md:text-6xl font-bold text-green-500 md:mb-5 pb-3 leading-none overflow-visible">
              {profile.title}
            </h1>

            <div className="text-lg md:text-2xl mb-5 text-slate-300 block md:hidden">
              {shortBioParagraphs.map((para, index) => (
                <p key={index} className="text-gray-300">
                  {para.data.text}
                </p>
              ))}
            </div>

            <div className="text-lg md:text-xl mb-5 text-slate-300 hidden md:block">
              {bioParagraphs.map((para, index) => (
                <p key={index} className="text-gray-300">
                  {para.data.text}
                </p>
              ))}
            </div>

            {tags.length > 0 && (
              <div className="py-2 flex flex-wrap">
                {tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-md font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-px bg-gray-300 mb-6"></div>

        <div className="w-full">
          <ContentCards
            dietParagraphs={dietParagraphs}
            appsGadgetsParagraphs={appsGadgetsParagraphs}
            vitaminsParagraphs={vitaminsParagraphs}
            habitStackParagraphs={habitStackParagraphs}
          />
        </div>

        <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin text-zinc-500" />}>
          {/* @ts-expect-error Server Component */}
          <CommentsSection profileId={profile.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default LeaderboardProfilePage;
