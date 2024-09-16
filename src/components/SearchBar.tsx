'use client'

import { Profile } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { User } from 'lucide-react'

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()
  const commandRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useOnClickOutside(commandRef, () => {
    setIsOpen(false)
  })

  const request = debounce(async () => {
    refetch()
  }, 300)

  const debounceRequest = useCallback(() => {
    request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return []
      const { data } = await axios.get(`/api/search?q=${input}`)
      return data as Profile[]
    },
    queryKey: ['search-query', input],
    enabled: false,
  })

  useEffect(() => {
    setInput('')
    setIsOpen(false)
  }, [pathname])

  return (
    <div className='relative' ref={commandRef}>
      <Command className='relative rounded-lg border max-w-lg z-10 overflow-visible'>
        <CommandInput
          onValueChange={(text) => {
            setInput(text)
            debounceRequest()
            if (text.length > 0) {
              setIsOpen(true)
            } else {
              setIsOpen(false)
            }
          }}
          onFocus={() => {
            if (input.length > 0) {
              setIsOpen(true)
            }
          }}
          value={input}
          className='outline-none border-none focus:border-none focus:outline-none ring-0'
          placeholder='Search profiles by ID...'
        />

        <CommandList
          className={`absolute bg-white top-full inset-x-0 shadow rounded-b-md ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          {isFetched && queryResults?.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {(queryResults?.length ?? 0) > 0 && (
            <CommandGroup heading='Profiles'>
              {queryResults?.map((profile) => (
                <CommandItem
                  onSelect={() => {
                    setIsOpen(false)
                    router.push(`/profile/${profile.id}`)
                  }}
                  key={profile.id}
                  value={profile.id}
                >
                  <User className='mr-2 h-4 w-4' />
                  {profile.id}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  )
}

export default SearchBar
