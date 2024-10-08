import { Suspense } from 'react'
import ProfileEditor from '@/components/admin/ProfileEditor'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

interface Profile {
  id: string
  title: string
}

const fetchProfiles = async (): Promise<Profile[]> => {
  return await db.profile.findMany({
    select: { id: true, title: true },
  })
}

const Page = async ({ searchParams }: { searchParams: { profileId?: string } }) => {
  const session = await getServerSession(authOptions)

  // Check if the user's email matches the specified email
  if (session?.user?.email !== 'max.murakamimoses24@gmail.com') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-500">This page is private.</p>
      </div>
    )
  }

  const profiles = await fetchProfiles()
  const selectedProfileId = searchParams?.profileId || profiles[0]?.id || ''

  return (
    <div className="container mx-auto p-4 pt-32">
      <h1 className="text-2xl font-bold mb-4">Profile Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile Selection */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-2">Select Profile</h2>
          <div className="space-y-2">
            {profiles.map((profile) => (
              <form key={profile.id} method="get">
                <input type="hidden" name="profileId" value={profile.id} />
                <button
                  type="submit"
                  className={`block w-full text-left px-4 py-2 border rounded hover:bg-gray-100 ${
                    profile.id === selectedProfileId ? 'bg-blue-100' : ''
                  }`}
                >
                  {profile.title}
                </button>
              </form>
            ))}
          </div>
        </div>

        {/* Profile Editor */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
          <Suspense fallback={<p>Loading Profile Editor...</p>}>
            <ProfileEditor profileId={selectedProfileId} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Page
