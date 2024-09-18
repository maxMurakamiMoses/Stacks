import { getAuthSession } from '@/lib/auth'
import CreateLeaderboard from '@/components/admin/CreateLeaderboard'
import SearchBar from '@/components/SearchBar'
import { Footer } from '@/components/footer'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl'>Landing page </h1>
        {session?.user?.email === "max.murakamimoses24@gmail.com" && <CreateLeaderboard />}
        <Footer />
    </>
  )
}