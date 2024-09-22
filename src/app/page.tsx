import { getAuthSession } from '@/lib/auth'
import CreateLeaderboard from '@/components/admin/CreateLeaderboard'
import { Footer } from '@/components/footer'
import { Bento } from '@/components/landing/Bento'
import Hero from '@/components/landing/Hero'
import { LogoTicker } from '@/components/landing/Logoticker'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
        <Hero />
        <Bento />
        <LogoTicker />
        {session?.user?.email === "max.murakamimoses24@gmail.com" && <CreateLeaderboard />}
        <Footer />
    </>
  )
}