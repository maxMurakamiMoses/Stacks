"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaTrophy, FaMedal } from "react-icons/fa"; // Icons are used

export function LeaderboardPreview() {
  // Scalable data for leaderboard entries
  const leaderboardData = [
    { id: 1, icon: <FaStar />, text: "Aman" },
    { id: 2, icon: <FaTrophy />, text: "Miice" },
    { id: 3, icon: <FaMedal />, text: "Max ami" },
    { id: 4, icon: <FaMedal />, text: "Esk" },
    { id: 5, icon: <FaMedal />, text: "Raock" },
  ];

  return (
    <div className="max-w-full px-4 min-w-[350px] md:min-w-[450px]">
     
        {/* Header Section with Animations */}
        <motion.div
          initial="initial"
          whileHover="animate"
          className="flex w-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
          {leaderboardData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                variants={{
                  initial: { x: 0 },
                  animate: {
                    x: isEven ? 10 : -10,
                    rotate: isEven ? 2 : -2,
                    transition: { duration: 0.1 },
                  },
                }}
                className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black`}
              >
                {/* Icon Container */}
                <div
                  className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0 flex items-center justify-center"
                  aria-label={`${item.text} Icon`}
                >
                  {item.icon}
                </div>

                {/* Text Container */}
                <div
                  className="w-full bg-gray-100 rounded-full dark:bg-neutral-900 flex items-center justify-center px-2 py-1"
                >
                  <span className="text-xs text-neutral-600 dark:text-neutral-300">
                    {item.text}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
    </div>
  );
}
