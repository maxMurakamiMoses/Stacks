// Profile.tsx

'use client';
import { Profile as ProfileType, User, Vote } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { FC, MouseEvent, useState } from 'react';
import ProfileVoteClient from '../../vote/ProfileVoteClient';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Roboto_Mono } from 'next/font/google';
import { formatNumber } from '@/lib/utils'; // Import formatNumber
import { IoMdPeople } from "react-icons/io";


const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

type PartialVote = Pick<Vote, 'type'>;

interface ProfileProps {
  profile: ProfileType & {
    author: User;
    votes: Vote[];
    content: any;
    createdAt: string | Date;
    image: string;
    claimed: boolean;
    dudedinScore?: number;
    youtubeFollowers?: number;
    twitterFollowers?: number;
    instagramFollowers?: number;
    tiktokFollowers?: number;
    totalFollowers?: number;
  };
  rank: number;
  upvotes: number;
  downvotes: number;
  currentVote?: PartialVote;
  commentAmt: number;
  leaderboardName?: string;
  leaderboardId: string;
}

const getRankIcon = (rank: number) => {
  if (rank === 1) {
    return '👑';
  } else if (rank === 2) {
    return '🥈';
  } else if (rank === 3) {
    return '🥉';
  }
  return null;
};

const extractSection = (blocks: any[], sectionTitle: string): string | null => {
  const sectionIndex = blocks.findIndex(
    (block) => block.type === 'header' && block.data.text === sectionTitle
  );
  if (sectionIndex !== -1 && blocks[sectionIndex + 1]) {
    return blocks[sectionIndex + 1].data.text;
  }
  return null;
};

const extractTags = (tagsString: string): string[] => {
  const regex = /\[([^\]]+)\]/g;
  const tags: string[] = [];
  let match;
  while ((match = regex.exec(tagsString)) !== null) {
    tags.push(match[1]);
  }
  return tags;
};

const Profile: FC<ProfileProps> = ({
  profile,
  rank,
  upvotes,
  downvotes,
  currentVote,
  leaderboardId,
  leaderboardName,
  commentAmt,
}) => {
  const router = useRouter();

  const blocks = profile.content?.blocks || [];

  const tagsString = extractSection(blocks, '{TAGS}');
  const tags = tagsString ? extractTags(tagsString) : [];

  const shortBio = extractSection(blocks, '{SHORTBIO}');
  const [hovered, setHovered] = useState(false);

  const handleCardClick = () => {
    router.push(`/profile/${profile.id}`);
  };

  const handleVoteClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`relative group rounded-md overflow-hidden cursor-pointer bg-gradient-to-r from-[#1D2235]/40 to-[#121318]/40 ${robotoMono.className}`}
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}

    >
      {/* Dark Neon Green Flow Effect */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }} // Increased opacity for stronger glow
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 z-10 bg-gradient-to-bl from-[#39FF14] via-[#00FF7F] to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Content Wrapper */}
      <div className="relative z-20 p-1 flex flex-col md:flex-row items-center text-white">
        {/* Rank Icon */}
        {rank <= 3 && (
          <div className="absolute top-[-4px] right-0 text-gray-200 text-[26px] rounded-full px-2 py-1">
            {getRankIcon(rank)}
          </div>
        )}

        {/* Profile Image */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <img
            src={profile.image}
            alt={`${profile.title} profile`}
            className="w-24 h-24 rounded-md object-cover"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-1 mb-1 md:mb-0">
          <Link href={`/profile/${profile.id}`} onClick={(e) => e.stopPropagation()}>
            <h1 className="text-2xl text-white font-bold mb-1">{profile.title}</h1>
          </Link>

          {shortBio && (
            <div className="mb-2 text-white text-base">
              <p>{shortBio}</p>
            </div>
          )}

          <div className="flex items-center mt-2 md:mt-0">
            <Link
              href={`/profile/${profile.id}`}
              className="flex items-center text-gray-400 mr-4"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>{commentAmt}</span>
            </Link>

            {tags.length > 0 && (
              <div className="flex items-center text-sm text-gray-400">
                {tags.map((tag, index) => (
                  <span key={tag} className="flex items-center">
                    {index !== 0 && <span className="mx-2 text-gray-400">•</span>}
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Voting or Score Display */}
        <div className="flex-shrink-0 mr-10" onClick={handleVoteClick}>
          {leaderboardName === 'social-media' ? (
              <p className="text-lg font-semibold flex items-center">
                {formatNumber(profile.totalFollowers || 0)}
                <IoMdPeople className="ml-2 text-white" size={20} />
              </p>
          ) : leaderboardName === 'dudedin-pace' ? (
            <p className="text-lg font-semibold">Score: {profile.dudedinScore || 0}</p>
          ) : (
            <ProfileVoteClient
              profileId={profile.id}
              leaderboardId={leaderboardId}
              initialUpvotesAmt={upvotes}
              initialDownvotesAmt={downvotes}
              initialVote={currentVote?.type}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
