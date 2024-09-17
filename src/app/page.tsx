import { getAuthSession } from '@/lib/auth'
import CreateLeaderboard from '@/components/CreateLeaderboard'
import SearchBar from '@/components/SearchBar'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
      <SearchBar />
      <h1 className='font-bold text-3xl md:text-4xl'>Your feed</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>


        {session?.user?.email === "max.murakamimoses24@gmail.com" && <CreateLeaderboard />}
      </div>
    </>
  )
}