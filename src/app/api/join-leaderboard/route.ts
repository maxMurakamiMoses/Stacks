// app/api/join-leaderboard/route.ts

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import * as z from 'zod'

const JoinFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  confirmEmail: z.string().email('Invalid email address'),
})
export async function POST(req: Request) {
    try {
      const session = await getAuthSession()
  
      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
  
      const body = await req.json()
      const { firstName, lastName, email, confirmEmail } = JoinFormSchema.parse(body)
  
      if (email !== confirmEmail) {
        return NextResponse.json({ error: 'Emails do not match' }, { status: 400 })
      }
  
      // Log the database operation
      console.log('Creating form submission for user:', session.user.id)
  
      const submission = await db.JoinLeaderboardSubmission.create({
        data: {
          userId: session.user.id,
          firstName,
          lastName,
          email,
        },
      })
  
      console.log('Form submission created:', submission)
  
      return NextResponse.json({ message: 'Form submitted successfully' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 })
      }
      console.error('Error in POST /api/join-leaderboard:', error)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }
  