//app/api/fetchMoreProfiles/route.ts

import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
        netVotes: 'desc', // Order by netVotes
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    // Map to the expected structure
    const profiles = profilesOnLeaderboards.map((pol) => {
      const profile = pol.profile;
      const totalFollowers =
        (profile.youtubeFollowers ?? 0) +
        (profile.twitterFollowers ?? 0) +
        (profile.instagramFollowers ?? 0) +
        (profile.tiktokFollowers ?? 0);

      return {
        ...profile,
        votes: pol.votes,
        leaderboardId: pol.leaderboardId,
        leaderboard: pol.leaderboard,
        image: profile.image ?? '',
        claimed: profile.claimed ?? false,
        dudedinScore: profile.dudedinScore ?? 0,
        youtubeFollowers: profile.youtubeFollowers ?? 0,
        twitterFollowers: profile.twitterFollowers ?? 0,
        instagramFollowers: profile.instagramFollowers ?? 0,
        tiktokFollowers: profile.tiktokFollowers ?? 0,
        totalFollowers,
      };
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
