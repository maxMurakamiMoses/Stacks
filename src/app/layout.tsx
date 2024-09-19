import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'

import '@/styles/globals.css'
import { NavbarComponent } from '@/components/top-bar/Navbar'
import Profile from '@/components/top-bar/Profile'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Stacks',
  description: 'A place for biohackers, atheltes, and nerds.',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className
      )}>
      <body className='min-h-screen bg-slate-50 antialiased'>
        <Providers>
          <NavbarComponent />
          {/* @ts-expect-error Server Component */}
          <Profile />
          {authModal}
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}