"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaTrophy } from 'react-icons/fa';

export function LeaderboardPreview() {
  // Leaderboard data
  const leaderboardData = [
    { id: 1, text: "Aman Murakami-Mose" },
    { id: 2, text: "Miice Tiffany" },
    { id: 3, text: "Max Micheal" },
    { id: 4, text: "Esk Kellg" },
  ];

  // Heights for podium columns based on rank (in pixels)
  const podiumHeights = [240, 170, 120, 70]; // 4 podiums

  // Colors for podium positions
  const podiumColors = [
    "bg-yellow-400", // 1st place
    "bg-gray-400",   // 2nd place
    "bg-orange-400", // 3rd place
    "bg-blue-400",   // 4th place
  ];

  return (
    <div className="flex items-end justify-center space-x-6 h-80"> {/* Container for podiums */}
      
      {/* Podium 1 */}
      <div className="flex flex-col items-center">
        {/* Name above the podium */}
        <div
          className="bg-white text-black text-sm font-bold px-3 py-1 rounded-t-lg shadow-md w-32 text-center whitespace-normal break-words"
          style={{ marginBottom: `0px` }} // Dynamic spacing
        >
          {leaderboardData[0].text}
        </div>

        {/* Podium */}
        <motion.div
          className={`flex flex-col items-center justify-between ${podiumColors[1]} w-32 p-2 shadow-lg`}
          style={{ height: `${podiumHeights[1]}px` }}
          aria-label={`Rank 2: ${leaderboardData[0].text}`}
        >
          <div className="text-white text-lg font-bold">
            #2
          </div>
        </motion.div>
      </div>

      {/* Podium 2 */}
      <div className="flex flex-col items-center">
        {/* Name above the podium */}
        <div
          className="bg-white text-black text-sm font-bold px-3 py-1 rounded-t-lg shadow-md w-32 text-center whitespace-normal break-words"
          style={{ marginBottom: `0px` }} // Dynamic spacing
        >
          {leaderboardData[1].text}
        </div>

        {/* Podium */}
        <motion.div
          className={`flex flex-col items-center justify-between ${podiumColors[0]} w-32 p-2 shadow-lg`}
          style={{ height: `${podiumHeights[0]}px` }}
          aria-label={`Rank 1: ${leaderboardData[1].text}`}
        >
          <div className="text-white text-lg font-bold">
            #1
          </div>
        </motion.div>
      </div>

      {/* Podium 3 */}
      <div className="flex flex-col items-center">
        {/* Name above the podium */}
        <div
          className="bg-white text-black text-sm font-bold px-3 py-1 rounded-t-lg shadow-md w-32 text-center whitespace-normal break-words"
          style={{ marginBottom: `0px` }} // Dynamic spacing
        >
          {leaderboardData[2].text}
        </div>

        {/* Podium */}
        <motion.div
          className={`flex flex-col items-center justify-between ${podiumColors[2]} w-32 p-2 shadow-lg`}
          style={{ height: `${podiumHeights[2]}px` }}
          aria-label={`Rank 3: ${leaderboardData[2].text}`}
        >
          <div className="text-white text-lg font-bold">
            #3
          </div>
        </motion.div>
      </div>

      {/* Podium 4 */}
      <div className="flex flex-col items-center">
        {/* Name above the podium */}
        <div
          className="bg-white text-black text-sm font-bold px-3 py-1 rounded-t-lg shadow-md w-32 text-center whitespace-normal break-words"
          style={{ marginBottom: `0px` }} // Dynamic spacing
        >
          {leaderboardData[3].text}
        </div>
        
        {/* Podium */}
        <motion.div
          className={`flex flex-col items-center justify-between ${podiumColors[3]} w-32 p-2 shadow-lg`}
          style={{ height: `${podiumHeights[3]}px` }}
          aria-label={`Rank 4: ${leaderboardData[3].text}`}
        >
          <div className="text-white text-lg font-bold">
            #4
          </div>
        </motion.div>
      </div>
    </div>
  );
}
