
//app/about/page.tsx

import { CurrentSystem } from '@/components/about/CurrentSystem'
import { FAQ } from '@/components/about/FAQ'
import { Hero } from '@/components/about/Hero'
import { OurVision } from '@/components/about/OurVision'
import React from 'react'

const page = () => {
  return (
    <>
        {/* <Hero /> */}
        {/* <CurrentSystem /> */}
        {/* <OurVision /> */}
        <FAQ />

    </>
  )
}

export default page