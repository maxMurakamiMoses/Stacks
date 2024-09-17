// ProfileEditor.tsx
import { db } from '@/lib/db'
import { Editor } from '@/components/admin/Editor'
import { Button } from '@/components/ui/Button'
import { revalidatePath } from 'next/cache'

// Fetch a single profile
async function fetchProfile(profileId: string) {
  return await db.profile.findUnique({
    where: { id: profileId },
    include: { profilesOnLeaderboards: { select: { leaderboardId: true } } }
  })
}

// Fetch all leaderboards
async function fetchLeaderboards() {
  return await db.leaderboard.findMany({
    select: { id: true, name: true },
  })
}

// Update the profile
async function updateProfile(formData: FormData) {
  'use server'
  
  const profileId = formData.get('id') as string
  const title = formData.get('title') as string
  const content = JSON.parse(formData.get('content') as string)
  const leaderboardIds = formData.getAll('leaderboards') as string[]

  await db.profile.update({
    where: { id: profileId },
    data: {
      title,
      content,
      profilesOnLeaderboards: {
        deleteMany: {},
        create: leaderboardIds.map(id => ({ leaderboardId: id }))
      }
    },
  })

  revalidatePath(`/admin/profiles?profileId=${profileId}`)
}

// Define props for the ProfileEditor component
interface ProfileEditorProps {
  profileId: string
}

// ProfileEditor component
const ProfileEditor = async ({ profileId }: ProfileEditorProps) => {
  const [profile, allLeaderboards] = await Promise.all([
    fetchProfile(profileId),
    fetchLeaderboards()
  ])

  if (!profile) {
    return <div>Profile not found</div>
  }

  return (
    <form action={updateProfile}>
      <input type="hidden" name="id" value={profile.id} />
      <Editor
        leaderboards={allLeaderboards}
        initialData={{
          ...profile,
          leaderboards: profile.profilesOnLeaderboards.map(pol => pol.leaderboardId)
        }}
      />
      <div className='w-full flex justify-end mt-6'>
        <Button type='submit' className='w-full max-w-md'>
          Update Profile
        </Button>
      </div>
    </form>
  )
}

export default ProfileEditor
