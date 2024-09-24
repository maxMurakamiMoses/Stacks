// api/fetchMoreProfiles/route.ts

import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    const leaderboardId = url.searchParams.get('leaderboardId');

    if (!leaderboardId) {
      return NextResponse.json({ error: 'Leaderboard ID is required' }, { status: 400 });
    }

    // Fetch profiles via profilesOnLeaderboards to match the initial data structure
    const profilesOnLeaderboards = await db.profilesOnLeaderboards.findMany({
      where: {
        leaderboardId: leaderboardId,
      },
      include: {
        profile: {
          include: {
            author: true,
            comments: true,
          },
        },
        votes: true,
        leaderboard: true,
      },
      orderBy: {
        profile: {
          createdAt: 'desc',
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    // Map to the expected structure
    const profiles = profilesOnLeaderboards.map((pol) => ({
      ...pol.profile,
      votes: pol.votes,
      leaderboardId: pol.leaderboardId,
      leaderboard: pol.leaderboard,
      image: pol.profile.image ?? '',
      verified: pol.profile.verified ?? false,
    }));

    return NextResponse.json(profiles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
