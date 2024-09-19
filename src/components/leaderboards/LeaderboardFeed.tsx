import { ShiftedButton } from "./ShiftedButton";
import Link from 'next/link';

export function LeaderboardFeed() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
        {/* First Item (Text on Left, Image on Right) */}
        <div className="lg:col-span-4">
          <Link href="/leaderboards">
            <p className="text-green-500 text-[35px] xl:text-[45px] font-bold text-center md:text-left hover:underline cursor-pointer">
              Dudedin Pace Leaderboard
            </p>
          </Link>
          <Link href="/leaderboards">
            <p className="hidden md:block text-gray-400 text-l lg:text-xl ml-[4px] hover:no-underline cursor-pointer">
            The Dunedin Pace is a measure of biological aging, developed from a long-term study conducted in Dunedin, New Zealand. This pace of aging metric captures how quickly or slowly individuals are aging at the biological level by tracking various biomarkers such as cardiovascular, metabolic, and immune health indicators over time. Dunedin Pace reflects the wear and tear on the body's systems, providing a clearer picture of one's biological age.
            </p>
          </Link>

          <div className="flex flex-row items-center justify-center space-x-20 md:justify-start md:ml-1 py-10">
            <div className="flex items-center">
              <ShiftedButton />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20">
          <p>IMAGE PLACEHOLDER</p>
        </div>

        {/* Second Item (Image on Left, Text on Right) */}
        <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20">
          <p>IMAGE PLACEHOLDER</p>
        </div>
        <div className="lg:col-span-4">
          <Link href="/leaderboards">
          <p className="text-green-500 text-[35px] xl:text-[45px] font-bold text-center md:text-left hover:underline cursor-pointer md:whitespace-nowrap">
            Community Voted Leaderboard
          </p>


          </Link>
          <Link href="/leaderboards">
            <p className="hidden md:block text-gray-400 text-l lg:text-xl ml-[4px] hover:no-underline cursor-pointer">
            The Dunedin Pace is a measure of biological aging, developed from a long-term study conducted in Dunedin, New Zealand. This pace of aging metric captures how quickly or slowly individuals are aging at the biological level by tracking various biomarkers such as cardiovascular, metabolic, and immune health indicators over time. Dunedin Pace reflects the wear and tear on the body's systems, providing a clearer picture of one's biological age.
            </p>
          </Link>

          <div className="flex flex-row items-center justify-center space-x-20 md:justify-start md:ml-1 py-10">
            <div className="flex items-center">
              <ShiftedButton />
            </div>
          </div>
        </div>

        {/* Third Item (Text on Left, Image on Right) */}
        <div className="lg:col-span-4">
          <Link href="/leaderboards">
            <p className="text-green-500 text-[35px] xl:text-[45px] font-bold text-center md:text-left hover:underline cursor-pointer">
              Athletic Records Leaderboard
            </p>
          </Link>
          <Link href="/leaderboards">
            <p className="hidden md:block text-gray-400 text-l lg:text-xl ml-[4px] hover:no-underline cursor-pointer">
            The Dunedin Pace is a measure of biological aging, developed from a long-term study conducted in Dunedin, New Zealand. This pace of aging metric captures how quickly or slowly individuals are aging at the biological level by tracking various biomarkers such as cardiovascular, metabolic, and immune health indicators over time. Dunedin Pace reflects the wear and tear on the body's systems, providing a clearer picture of one's biological age.
            </p>
          </Link>

          <div className="flex flex-row items-center justify-center space-x-20 md:justify-start md:ml-1 py-10">
            <div className="flex items-center">
              <ShiftedButton />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20">
          <p>IMAGE PLACEHOLDER</p>
        </div>

        {/* Third Item (Text on Left, Image on Right) */}
        <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20">
          <p>IMAGE PLACEHOLDER</p>
        </div>
        <div className="lg:col-span-4">
          <Link href="/leaderboards">
            <p className="text-green-500 text-[35px] xl:text-[45px] font-bold text-center md:text-left hover:underline cursor-pointer">
              Social Media Leaderboard
            </p>
          </Link>
          <Link href="/leaderboards">
            <p className="hidden md:block text-gray-400 text-l lg:text-xl ml-[4px] hover:no-underline cursor-pointer">
            The Dunedin Pace is a measure of biological aging, developed from a long-term study conducted in Dunedin, New Zealand. This pace of aging metric captures how quickly or slowly individuals are aging at the biological level by tracking various biomarkers such as cardiovascular, metabolic, and immune health indicators over time. Dunedin Pace reflects the wear and tear on the body's systems, providing a clearer picture of one's biological age.
            </p>
          </Link>

          <div className="flex flex-row items-center justify-center space-x-20 md:justify-start md:ml-1 py-10">
            <div className="flex items-center">
              <ShiftedButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
