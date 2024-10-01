import { ShiftedButton } from "./ShiftedButton";
import Link from 'next/link';
import { Roboto_Mono } from 'next/font/google';
import { LeaderboardPreview } from "./LeaderboardPreview";
import { FiExternalLink } from "react-icons/fi";


const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

export function LeaderboardFeed() {
  return (
    <div className={robotoMono.className}>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 pb-20">
        {/* First Item (Text on Left, Image on Right) */}
        <div className="lg:col-span-4">
          <Link href="/leaderboards/dudedin-pace">
            <p className="text-green-500 text-[35px] xl:text-[45px] font-bold text-center md:text-left hover:underline cursor-pointer">
              Dudedin-Pace Leaderboard
            </p>
          </Link>
          <Link href="/leaderboards/dudedin-pace">
            <p className="text-gray-400 text-l lg:text-xl ml-[4px] hover:no-underline cursor-pointer">
              The Dunedin Pace is a measure of biological aging, developed from a long-term study
              conducted in Dunedin, New Zealand. This pace of aging metric captures how quickly or
              slowly individuals are aging at the biological level by tracking various biomarkers
              such as cardiovascular, metabolic, and immune health indicators over time. Dunedin
              Pace reflects the wear and tear on the body's systems, providing a clearer picture of
              one's biological age.
            </p>
          </Link>

          <div className="flex flex-row items-center space-x-20 justify-start md:ml-1 py-10">
            <div className="flex items-center">
              <ShiftedButton />
              
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex mt-12 lg:mt-20 hidden lg:block">
          <LeaderboardPreview leaderboardName='dudedin-pace'/>
        </div>

        {/* Second Item (Image on Left, Text on Right) */}
        <div className="lg:col-span-4 flex mt-12 lg:mt-20 hidden lg:block">
          <LeaderboardPreview leaderboardName='community-voted'/>
        </div>
        <div className="lg:col-span-4">
          <Link href="/leaderboards/community-voted">
            <p className="text-green-500 text-[35px] xl:text-[45px] font-bold text-center md:text-left hover:underline cursor-pointer">
              Community Voted Leaderboard
            </p>
          </Link>
          <Link href="/leaderboards/community-voted">
            <p className="text-gray-400 text-l lg:text-xl ml-[4px] hover:no-underline cursor-pointer">
            The Community Voted Leaderboard is a crowd-sourced ranking system that allows users to upvote or
             downvote health experts and influencers. It allows the public to collectively determine the most
              respected and influential voices in the health and wellness space. By leveraging community consensus,
               this leaderboard highlights trusted figures who offer valuable insights, while also shedding light on 
               controversial or lesser-regarded experts.
            </p>
          </Link>

          <div className="flex flex-row items-center space-x-20 md:justify-start md:ml-1 py-10">
            <div className="flex items-center">
              <ShiftedButton />
            </div>
          </div>
        </div>

        {/* Third Item (Text on Left, Image on Right) */}
        <div className="lg:col-span-4">
          <Link href="/leaderboards/social-media">
            <p className="text-green-500 text-[35px] xl:text-[45px] font-bold text-center md:text-left hover:underline cursor-pointer">
            Social Media Leaderboard
            </p>
          </Link>
          <Link href="/leaderboards/social-media">
            <p className="text-gray-400 text-l lg:text-xl ml-[4px] hover:no-underline cursor-pointer">
            The Social Media Leaderboard ranks the most popular health experts based on their 
            social media following. This leaderboard highlights leaders in the health 
            and wellness space who have garnered significant followings across platforms like 
            Instagram, X, YouTube, and more. For ranking purposes, 
            YouTube followers are weighted at 1.5x, X followers at 1.1x, Instagram followers at 1x, and TikTok followers at 0.8x.
            </p>
          </Link>

          <div className="flex flex-row items-center space-x-20 md:justify-start md:ml-1 py-10">
            <div className="flex items-center">
              <ShiftedButton />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20 hidden lg:block">
          <LeaderboardPreview leaderboardName='social-media'/>
        </div>

        {/* Fourth Item (Image on Left, Text on Right) */}
        {/* <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20 hidden lg:block">
          <LeaderboardPreview leaderboardName='athletic-records'/>
        </div>
        <div className="lg:col-span-4">
          <Link href="/leaderboards/athletic-records">
            <p className="text-green-500 text-[35px] xl:text-[45px] font-bold text-center md:text-left hover:underline cursor-pointer">
            Athletic Records Leaderboard
            </p>
          </Link>
          <Link href="/leaderboards/social-media">
            <p className="text-gray-400 text-l lg:text-xl ml-[4px] hover:no-underline cursor-pointer">
              The Dunedin Pace is a measure of biological aging, developed from a long-term study
              conducted in Dunedin, New Zealand. This pace of aging metric captures how quickly or
              slowly individuals are aging at the biological level by tracking various biomarkers
              such as cardiovascular, metabolic, and immune health indicators over time. Dunedin
              Pace reflects the wear and tear on the body's systems, providing a clearer picture of
              one's biological age.
            </p>
          </Link>

          <div className="flex flex-row items-center justify-center space-x-20 md:justify-start md:ml-1 py-10">
            <div className="flex items-center ">
              <ShiftedButton />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
