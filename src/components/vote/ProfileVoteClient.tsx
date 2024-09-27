'use client'

import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { ProfileVoteRequest } from '@/lib/validators/vote'
import { usePrevious } from '@mantine/hooks'
import { VoteType } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from '../../hooks/use-toast'
import { Triangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProfileVoteClientProps {
  profileId: string
  leaderboardId: string
  initialUpvotesAmt: number
  initialDownvotesAmt: number
  initialVote?: VoteType | null
  disableVoting?: boolean
}

const ProfileVoteClient = ({
  profileId,
  leaderboardId,
  initialUpvotesAmt,
  initialDownvotesAmt,
  initialVote,
  disableVoting = false,
}: ProfileVoteClientProps) => {
  const { loginToast } = useCustomToasts()
  const [upvotesAmt, setUpvotesAmt] = useState<number>(initialUpvotesAmt)
  const [downvotesAmt, setDownvotesAmt] = useState<number>(initialDownvotesAmt)
  const [currentVote, setCurrentVote] = useState<VoteType | undefined>(initialVote ?? undefined)
  const prevVote = usePrevious(currentVote)

  // Ensure sync with server
  useEffect(() => {
    setCurrentVote(initialVote ?? undefined)
  }, [initialVote])

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      if (disableVoting) return

      const payload: ProfileVoteRequest = {
        voteType: type,
        profileId,
        leaderboardId,
      }

      await axios.patch('/api/profile/vote', payload)
    },
    onError: (err, voteType) => {
      if (voteType === 'UP') setUpvotesAmt((prev) => prev - 1)
      else setDownvotesAmt((prev) => prev - 1)

      // Reset current vote
      setCurrentVote(prevVote)

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'Something went wrong.',
        description: 'Your vote was not registered. Please try again.',
        variant: 'destructive',
      })
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is removing their vote
        setCurrentVote(undefined)
        if (type === 'UP') setUpvotesAmt((prev) => prev - 1)
        else if (type === 'DOWN') setDownvotesAmt((prev) => prev - 1)
      } else {
        // User is changing or adding their vote
        if (currentVote === 'UP') {
          setUpvotesAmt((prev) => prev - 1)
        } else if (currentVote === 'DOWN') {
          setDownvotesAmt((prev) => prev - 1)
        }

        setCurrentVote(type)

        if (type === 'UP') setUpvotesAmt((prev) => prev + 1)
        else if (type === 'DOWN') setDownvotesAmt((prev) => prev + 1)
      }
    },
  })

  const handleVote = (type: VoteType) => {
    if (disableVoting) return
    vote(type)
  }

  return (
    <div className='flex space-x-2'>
      {/* Upvotes Box */}
      <button
        onClick={() => handleVote('UP')}
        disabled={disableVoting}
        aria-label='upvote'
        className='flex flex-col items-center p-1.5 bg-transparent rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none'>
        <Triangle
          className={cn('h-5 w-5', {
            'text-emerald-500 fill-emerald-500': currentVote === 'UP',
            'text-zinc-700': currentVote !== 'UP',
          })}
        />
        <span className='text-sm font-semibold text-gray-900'>{upvotesAmt}</span>
      </button>

      {/* Downvotes Box */}
      <button
        onClick={() => handleVote('DOWN')}
        disabled={disableVoting}
        aria-label='downvote'
        className='flex flex-col items-center p-1.5 bg-transparent rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none'>
        <Triangle
          className={cn('h-5 w-5 transform rotate-180', {
            'text-red-500 fill-red-500': currentVote === 'DOWN',
            'text-zinc-700': currentVote !== 'DOWN',
          })}
        />
        <span className='text-sm font-semibold text-gray-900'>{downvotesAmt}</span>
      </button>
    </div>
  )
}

export default ProfileVoteClient
