'use client'

import EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { z } from 'zod'

import { toast } from '@/hooks/use-toast'
import { ProfileCreationRequest, ProfileValidator } from '@/lib/validators/profile'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import '@/styles/editor.css'

type FormData = z.infer<typeof ProfileValidator>

interface EditorProps {
  leaderboards: Array<{ id: string; name: string }>
  initialData?: {
    id: string
    title: string
    content: any
    leaderboards: string[]
    createdAt: Date
    updatedAt: Date
    authorId: string
  }
}

export const Editor: React.FC<EditorProps> = ({ leaderboards, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      leaderboardIds: initialData?.leaderboards || [],
      title: initialData?.title || '',
      content: initialData?.content || null,
    },
  })
  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const pathname = usePathname()

  const { mutate: createProfile } = useMutation({
    mutationFn: async ({ title, content, leaderboardIds }: ProfileCreationRequest) => {
      const payload: ProfileCreationRequest = { title, content, leaderboardIds }
      const { data } = await axios.post('/api/profile/create', payload)
      return data
    },
    onError: () => {
      return toast({
        title: 'Something went wrong.',
        description: 'Your profile was not saved. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.push('/')
      router.refresh()
      return toast({
        description: 'The profile has been published.',
      })
    },
  })
  

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const List = (await import('@editorjs/list')).default
    const LinkTool = (await import('@editorjs/link')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Create the new profile here...',
        inlineToolbar: true,
        data: initialData?.content || { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },
          list: List,
          embed: Embed,
        },
      })
    }
  }, [initialData])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        toast({
          title: 'Something went wrong.',
          description: (value as { message: string }).message,
          variant: 'destructive',
        })
      }
    }
  }, [errors])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()

      setTimeout(() => {
        _titleRef?.current?.focus()
      }, 0)
    }

    if (isMounted) {
      init()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title)
      setValue('leaderboardIds', initialData.leaderboards)
    }
  }, [initialData, setValue])

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save()
  
    const payload: ProfileCreationRequest = {
      title: data.title,
      content: blocks,
      leaderboardIds: data.leaderboardIds,
    }
  
    createProfile(payload)
  }
  

  if (!isMounted) {
    return null
  }

  const { ref: titleRef, ...rest } = register('title')

  return (
    <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
      <form
        id='leaderboard-post-form'
        className='w-fit'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='prose prose-stone dark:prose-invert'>
          <TextareaAutosize
            ref={(e) => {
              titleRef(e)
              // @ts-ignore
              _titleRef.current = e
            }}
            {...rest}
            placeholder='Title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
          />
          {/* Multiselect for leaderboards */}
          <div className='my-4'>
            <label className='block text-sm font-medium text-gray-700'>Select Leaderboards</label>
            <select
              {...register('leaderboardIds', { required: true })}
              multiple
              className='form-multiselect mt-1 block w-full'
            >
              {leaderboards.map((leaderboard) => (
                <option key={leaderboard.id} value={leaderboard.id}>
                  {leaderboard.name}
                </option>
              ))}
            </select>
            {errors.leaderboardIds && (
              <p className='text-red-500 text-sm mt-1'>Please select at least one leaderboard.</p>
            )}
          </div>
          <div id='editor' className='min-h-[500px]' />
          <p className='text-sm text-gray-500'>
            Use{' '}
            <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  )
}