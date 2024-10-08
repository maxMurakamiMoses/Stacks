import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Stacks',
  description: 'A place for biohackers, nerds, and athletes.',
}



const Layout = async ({
  children,
}: {
  children: ReactNode
  params: { slug: string }
}) => {
  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white">
      <div className="absolute inset-0 bg-grid-neonGreen/[0.4] mix-blend-overlay"></div>

      <div className="container max-w-8xl mx-auto h-full pt-28 relative">
        {children}
      </div>
    </div>
  )
}

export default Layout
