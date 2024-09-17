// page.tsx
import ProfileEditor from '@/components/admin/ProfileEditor'
import { db } from '@/lib/db'

// Fetch all profiles (server-side)
async function fetchProfiles() {
  return await db.profile.findMany({
    select: { id: true, title: true },
  })
}

// Page component
const Page = async ({ searchParams }: { searchParams: { profileId?: string } }) => {
  const profiles = await fetchProfiles()
  const selectedProfileId = searchParams?.profileId || profiles[0]?.id || null


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
          {/* @ts-expect-error server component */}
          <ProfileEditor profileId={selectedProfileId} />
        </div>
      </div>
    </div>
  )
}

export default Page
