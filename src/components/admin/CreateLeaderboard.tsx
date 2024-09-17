import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'

const CreateLeaderboard = () => {
  return (
    <div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
      <div className='bg-emerald-100 px-6 py-4'>
        <p className='font-semibold py-3 flex items-center gap-1.5'>
          <Plus className='h-4 w-4' />
          Create Leaderboard
        </p>
      </div>
      <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
        <div className='flex justify-between gap-x-4 py-3'>
          <p className='text-zinc-500'>
            Create a new leaderboard from scratch
          </p>
        </div>

        <Link
          className={buttonVariants({
            className: 'w-full mt-4 mb-6',
          })}
          href='/admin/createLeaderboard'>
          Create Leaderboard
        </Link>
      </dl>
    </div>
  )
}

export default CreateLeaderboard