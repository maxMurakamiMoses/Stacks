import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { extractShortBio } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const leaderboardName = searchParams.get('leaderboardName');

    if (!leaderboardName) {
      return NextResponse.json(
        { error: 'Leaderboard name is required' },
        { status: 400 }
      );
    }

    let profiles = [];

    if (leaderboardName === 'social-media') {
      // Fetch profiles and calculate total followers
      const allProfiles = await db.profile.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          youtubeFollowers: true,
          twitterFollowers: true,
          instagramFollowers: true,
          tiktokFollowers: true,
        },
      });

      profiles = allProfiles
        .map((profile) => ({
          id: profile.id,
          name: profile.title,
          // Apply extractShortBio to the content
          content: extractShortBio(profile.content) || '',
          totalFollowers:
            (profile.youtubeFollowers || 0) +
            (profile.twitterFollowers || 0) +
            (profile.instagramFollowers || 0) +
            (profile.tiktokFollowers || 0),
        }))
        .sort((a, b) => b.totalFollowers - a.totalFollowers)
        .slice(0, 3);
    } else if (leaderboardName === 'community-voted') {
      // Fetch profiles based on netVotes
      const profilesOnLeaderboards = await db.profilesOnLeaderboards.findMany({
        where: {
          leaderboard: {
            name: leaderboardName,
          },
        },
        orderBy: {
          netVotes: 'desc',
        },
        take: 3,
        include: {
          profile: {
            select: {
              id: true,
              title: true,
              content: true,
            },
          },
        },
      });

      profiles = profilesOnLeaderboards.map((item) => ({
        id: item.profile.id,
        name: item.profile.title,
        // Apply extractShortBio to the content
        content: extractShortBio(item.profile.content) || '',
      }));
    } else if (leaderboardName === 'dudedin-pace') {
      // Fetch profiles with the lowest dudedinScore
      const profilesList = await db.profile.findMany({
        where: {
          dudedinScore: {
            not: null,
          },
        },
        orderBy: {
          dudedinScore: 'asc',
        },
        take: 3,
        select: {
          id: true,
          title: true,
          content: true,
        },
      });
      console.log(profilesList)

      profiles = profilesList.map((profile) => ({
        id: profile.id,
        name: profile.title,
        // Apply extractShortBio to the content
        content: extractShortBio(profile.content) || '',
      }));
      console.log('Fetched Profiles:', profiles);
    } else {
      return NextResponse.json(
        { error: 'Leaderboard coming soon...' },
        { status: 400 }
      );
    }

    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
