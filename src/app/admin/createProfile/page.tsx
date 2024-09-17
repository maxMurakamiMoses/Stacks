import { Button } from '@/components/ui/Button'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Editor } from '@/components/admin/Editor'

const page = async () => {
  const session = await getServerSession(authOptions)

  // Check if the user's email matches the specified email
  if (session?.user?.email !== 'max.murakamimoses24@gmail.com') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-500">This page is private.</p>
      </div>
    )
  }

  // Fetch all leaderboards for the multiselect
  const allLeaderboards = await db.leaderboard.findMany({
    select: { id: true, name: true },
  })

  if (!allLeaderboards) return notFound()

  return (
    <div className='flex flex-col items-start gap-8 p-8'>
      {/* heading */}
      <div className='border-b border-gray-200 pb-6 mb-8 w-full'>
        <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
          <h3 className='ml-2 mt-2 text-2xl font-semibold leading-6 text-gray-900'>
            Create Profile
          </h3>
          <p className='ml-2 mt-2 text-lg text-gray-500'>
            Select one or more leaderboards to post to
          </p>
        </div>
      </div>

      {/* form */}
      <Editor leaderboards={allLeaderboards} />

      <div className='w-full flex justify-end mt-6'>
        <Button type='submit' className='w-full max-w-md' form='leaderboard-post-form'>
          Post
        </Button>
      </div>
    </div>
  )
}

export default page
