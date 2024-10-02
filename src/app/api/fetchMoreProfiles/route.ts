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

    // Fetch the leaderboard to get its name
    const leaderboard = await db.leaderboard.findUnique({
      where: { id: leaderboardId },
    });

    if (!leaderboard) {
      return NextResponse.json({ error: 'Leaderboard not found' }, { status: 404 });
    }

    // Determine the ordering based on the leaderboard name
    let orderByClause: any;

    if (leaderboard.name === 'dudedin-pace') {
      orderByClause = {
        profile: {
          dudedinScore: 'asc', // Order by dudedinScore
        },
      };
    } else if (leaderboard.name === 'community-voted') {
      orderByClause = {
        netVotes: 'desc', // Order by netVotes
      };
    } else {
      // Default ordering
      orderByClause = {
        profile: {
          totalFollowers: 'desc', // Order by dudedinScore
        },
      };
    }

    // Fetch profiles via profilesOnLeaderboards with the correct ordering
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
      orderBy: orderByClause,
      take: limit,
      skip: (page - 1) * limit,
    });

    // Map to the expected structure and calculate ranks
    const profiles = profilesOnLeaderboards.map((pol, index) => {
      const profile = pol.profile;

      return {
        ...profile,
        votes: pol.votes,
        leaderboardId: pol.leaderboardId,
        leaderboard: pol.leaderboard,
        image: profile.image ?? '',
        claimed: profile.claimed ?? false,
        rank: (page - 1) * limit + index + 1, // Calculate the correct rank
        dudedinScore: profile.dudedinScore ?? 0,
        youtubeFollowers: profile.youtubeFollowers ?? 0,
        twitterFollowers: profile.twitterFollowers ?? 0,
        instagramFollowers: profile.instagramFollowers ?? 0,
        tiktokFollowers: profile.tiktokFollowers ?? 0,
        totalFollowers: profile.totalFollowers ?? 0,
      };
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
