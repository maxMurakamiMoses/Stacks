'use client'
import { Input } from '@/components/ui/Input'
import { FC } from 'react'
import { UserAvatar } from '@/components/top-bar/UserAvatar'
import type { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'

interface MiniCreatePostProps {
  session: Session | null
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter()

  return (
    <li className='overflow-hidden rounded-md bg-white shadow'>
      <div className='h-full px-6 py-4 flex justify-between gap-6'>
        <div className='relative'>
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className='absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white' />
        </div>
        <Input
          onClick={() => router.push('/admin/createProfile')}
          readOnly
          placeholder='+ profile to the leaderboard'
        />
      </div>
    </li>
  )
}

export default MiniCreatePost