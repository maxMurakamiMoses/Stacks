import { getAuthSession } from '@/lib/auth'
import CreateLeaderboard from '@/components/admin/CreateLeaderboard'
import { Footer } from '@/components/footer'
import { LogoTicker } from '@/components/landing/Logoticker'
import { Hero } from '@/components/landing/Hero'
import News from '@/components/landing/News'
import { Bento } from '@/components/landing/Bento'
import CallToAction from '@/components/landing/CallToAction'
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