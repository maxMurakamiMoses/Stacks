import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Stacks',
  description: 'A place for biohackers, nerds, and athletes.',
}

const Layout = async ({
  children,
  params
}: {
  children: ReactNode
  params: { slug: string }
}) => {
  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-neonGreen/30 via-neonGreen/10 to-transparent opacity-40"></div>
      <div className="absolute inset-0 bg-grid-neonGreen/[0.1] mix-blend-overlay"></div>
      <div className='container max-w-8xl mx-auto h-full pt-20'>
            {children}
      </div>
    </div>
  );
}

export default Layout