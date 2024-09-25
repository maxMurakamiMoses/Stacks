//api/profile/update/route.ts

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const ProfileUpdateSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  content: z.any().optional(),
  leaderboards: z.array(z.string()).min(1, 'At least one leaderboard must be selected'),
})

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // Validate incoming data
    const parsedData = ProfileUpdateSchema.parse(body)
    const { id, title, content, leaderboards } = parsedData

    // Update the profile
    await db.profile.update({
      where: { id },
      data: {
        title,
        content,
        profilesOnLeaderboards: {
          deleteMany: {}, // Remove existing associations
          create: leaderboards.map((lbId) => ({ leaderboardId: lbId })), // Add new associations
        },
      },
    })

    return NextResponse.json(
      { message: 'Profile updated successfully.' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error updating profile:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}