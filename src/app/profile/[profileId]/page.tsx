import CommentsSection from '@/components/comments/CommentsSection'
import EditorOutput from '@/components/EditorOutput'
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
    <div className='h-full flex flex-col sm:flex-row items-center sm:items-start justify-between'>
      <div className='relative flex-1 p-4 flex'>
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={profile.image || '/default-avatar.png'} // Adjust the path as necessary
            className='w-16 h-16 rounded-md'
          />
        </div>
        <div className='flex-1 ml-4'>
          <h1 className='text-xl font-semibold py-2 leading-6 text-gray-900'>
            {profile.title}
          </h1>

          <EditorOutput content={profile.content} />

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
