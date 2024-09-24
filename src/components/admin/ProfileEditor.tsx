'use client'

import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from '@/components/ui/Button'
import { toast } from '@/hooks/use-toast'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import LinkTool from '@editorjs/link'
import Embed from '@editorjs/embed'

const ProfileSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(), // Will store JSON string
  leaderboards: z.array(z.string()).min(1, 'At least one leaderboard must be selected'),
})

type ProfileFormData = z.infer<typeof ProfileSchema>

interface Leaderboard {
  id: string
  name: string
}

interface Profile {
  id: string
  title: string
  content: any
  leaderboards: string[]
}

interface ProfileEditorProps {
  profileId: string
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profileId }) => {
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstanceRef = useRef<EditorJS | null>(null) // Use ref for EditorJS instance

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      id: '',
      title: '',
      content: '',
      leaderboards: [],
    },
  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, leaderboardsRes] = await Promise.all([
          axios.get(`/api/profiles/${profileId}`),
          axios.get('/api/leaderboard/getAll'),
        ])

        const profileData: Profile = profileRes.data
        const leaderboardsData: Leaderboard[] = leaderboardsRes.data

        setLeaderboards(leaderboardsData)

        // Set form values
        setValue('id', profileData.id)
        setValue('title', profileData.title)
        setValue('content', JSON.stringify(profileData.content))
        setValue('leaderboards', profileData.leaderboards) // Now correctly set

        // Initialize EditorJS with fetched content
        if (editorRef.current && !editorInstanceRef.current) {
          try {
            const editor = new EditorJS({
              holder: 'editorjs',
              tools: {
                header: Header,
                list: List,
                linkTool: LinkTool,
                embed: Embed,
              },
              data: profileData.content || { blocks: [] },
              onChange: async () => {
                if (editorInstanceRef.current) {
                  try {
                    const savedData: OutputData = await editorInstanceRef.current.save()
                    setValue('content', JSON.stringify(savedData))
                  } catch (error) {
                    console.error('Error saving editor content:', error)
                    toast({
                      title: 'Error',
                      description: 'Failed to save editor content.',
                      variant: 'destructive',
                    })
                  }
                }
              },
              autofocus: true,
            })

            editorInstanceRef.current = editor
          } catch (error: any) {
            console.error('Error initializing EditorJS:', error)
            toast({
              title: 'Error',
              description: 'Failed to initialize the editor.',
              variant: 'destructive',
            })
          }
        }
      } catch (error: any) {
        console.error('Error fetching data:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch profile or leaderboards data.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (profileId) {
      fetchData()
    }
  }, [profileId, setValue])


  // Handle form submission
  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Ensure content is a string before parsing
      const content = data.content ? JSON.parse(data.content) : {}
  
      const payload = {
        id: data.id,
        title: data.title,
        content, // Parsed content or empty object
        leaderboards: data.leaderboards,
      }
  
      const res = await axios.put('/api/profiles/', payload)
  
      if (res.status === 200) {
        toast({
          title: 'Success',
          description: 'Profile updated successfully.',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update profile.',
          variant: 'destructive',
        })
      }
    } catch (error: any) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update profile.',
        variant: 'destructive',
      })
    }
  }
  

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Hidden ID Field */}
        <input type="hidden" {...register('id')} />

        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <TextareaAutosize
            id="title"
            {...register('title')}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none border-b border-gray-300"
            required
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Leaderboards Multiselect */}
        <div className="mb-4">
          <label htmlFor="leaderboards" className="block text-sm font-medium text-gray-700">
            Select Leaderboards
          </label>
          <select
            id="leaderboards"
            multiple
            {...register('leaderboards')}
            className="form-multiselect mt-1 block w-full border border-gray-300 rounded-md"
            required
          >
            {leaderboards.map((lb) => (
              <option key={lb.id} value={lb.id}>
                {lb.name}
              </option>
            ))}
          </select>
          {errors.leaderboards && (
            <p className="text-red-500 text-sm mt-1">{errors.leaderboards.message}</p>
          )}
        </div>

        {/* Content Editor */}
        <div className="mb-4">
          <label htmlFor="editorjs" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div id="editorjs" ref={editorRef} className="min-h-[300px] border border-gray-300 rounded-md p-2"></div>
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="w-full max-w-md">
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileEditor
