import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export function JumpTo() {
  return (
    <div className="flex flex-col">
      <span className="text-sm mb-2 mt-5 lg:mt-16 font-semibold text-gray-500">Jump To</span> {/* Smaller text size */}
      <div className="flex space-x-3 md:space-x-7">
        <Link href="/leaderboards/dudedin-pace" className="group flex items-center text-white hover:text-neonGreen transition-all">
          <span className="text-sm">Dunedin Pace</span> {/* Smaller text size */}
          <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-2" />
        </Link>

        <Link href="/leaderboards/community-voted" className="group flex items-center text-white hover:text-neonGreen transition-all">
          <span className="text-sm">Community Votes</span> {/* Smaller text size */}
          <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-2" />
        </Link>

        <Link href="/worldRecords" className="group flex items-center text-white hover:text-neonGreen transition-all">
          <span className="text-sm">World Records</span> {/* Smaller text size */}
          <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-2" />
        </Link>

        <Link href="/leaderboards/social-media" className="group flex items-center text-white hover:text-neonGreen transition-all">
          <span className="text-sm">Social Following</span> {/* Smaller text size */}
          <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-2" />
        </Link>

      </div>
    </div>
  );
}
