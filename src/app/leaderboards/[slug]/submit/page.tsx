import { Button } from '@/components/ui/Button'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Editor } from '@/components/Editor'

interface pageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: pageProps) => {
  const session = await getServerSession(authOptions)

  // Check if the user's email matches the specified email
  if (session?.user?.email !== 'max.murakamimoses24@gmail.com') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-500">This page is private.</p>
      </div>
    )
  }

  const leaderboard = await db.leaderboard.findFirst({
    where: {
      name: params.slug,
    },
  })

  if (!leaderboard) return notFound()

  return (
    <div className='flex flex-col items-start gap-6'>
      {/* heading */}
      <div className='border-b border-gray-200 pb-5'>
        <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
          <h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>
            Create Profile
          </h3>
          <p className='ml-2 mt-1 truncate text-sm text-gray-500'>
            in {params.slug} Leaderboard
          </p>
        </div>
      </div>

      {/* form */}
      <Editor leaderboardId={leaderboard.id} />

      <div className='w-full flex justify-end'>
        <Button type='submit' className='w-full' form='leaderboard-post-form'>
          Post
        </Button>
      </div>
    </div>
  )
}

export default page