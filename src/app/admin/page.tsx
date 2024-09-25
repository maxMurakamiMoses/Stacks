import { getAuthSession } from '@/lib/auth'
import CreateLeaderboard from '@/components/admin/CreateLeaderboard'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Admin() {
  const session = await getAuthSession()

  return (
    <div className="pt-20">
        {session?.user?.email === "max.murakamimoses24@gmail.com" && <CreateLeaderboard />}
    </div>
  )
}