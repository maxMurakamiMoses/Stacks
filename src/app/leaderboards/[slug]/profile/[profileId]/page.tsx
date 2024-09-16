import CommentsSection from '@/components/CommentsSection'
import EditorOutput from '@/components/EditorOutput'
import ProfileVoteServer from '@/components/profile-vote/ProfileVoteServer'
import { buttonVariants } from '@/components/ui/Button'
import { db } from '@/lib/db'
import { formatTimeToNow } from '@/lib/utils'
import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface LeaderboardProfilePageProps {
  params: {
    profileId: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const LeaderboardProfilePage = async ({ params }: LeaderboardProfilePageProps) => {
  const profile = await db.profile.findFirst({
    where: {
      id: params.profileId,
    },
    include: {
      votes: true,
      author: true,
    },
  })

  if (!profile) return notFound()

  return (
    <div>
      <div className='h-full flex flex-col sm:flex-row items-center sm:items-start justify-between'>
        <Suspense fallback={<PostVoteShell />}>
          {/* @ts-expect-error server component */}
          <ProfileVoteServer
            profileId={profile.id}
            getData={async () => {
              return await db.profile.findUnique({
                where: {
                  id: params.profileId,
                },
                include: {
                  votes: true,
                },
              })
            }}
          />
        </Suspense>

        <div className='sm:w-0 w-full flex-1 bg-white p-4 rounded-sm'>
          <p className='max-h-40 mt-1 truncate text-xs text-gray-500'>
            Created by u/{profile.author.username}{' '}
            {formatTimeToNow(new Date(profile.createdAt))}
          </p>
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

function PostVoteShell() {
  return (
    <div className='flex items-center flex-col pr-6 w-20'>
      {/* upvote */}
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigUp className='h-5 w-5 text-zinc-700' />
      </div>

      {/* score */}
      <div className='text-center py-2 font-medium text-sm text-zinc-900'>
        <Loader2 className='h-3 w-3 animate-spin' />
      </div>

      {/* downvote */}
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigDown className='h-5 w-5 text-zinc-700' />
      </div>
    </div>
  )
}

export default LeaderboardProfilePage