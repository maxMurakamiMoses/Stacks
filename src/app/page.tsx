import { LogoTicker } from '@/components/landing/Logoticker'
import { Hero } from '@/components/landing/Hero'
import News from '@/components/landing/News'
import { Bento } from '@/components/landing/Bento'
import CallToAction from '@/components/landing/CallToAction'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {

  return (
    <>
        <Hero />
        <LogoTicker />
        <News />
        <Bento />
        <CallToAction />
    </>
  )
}