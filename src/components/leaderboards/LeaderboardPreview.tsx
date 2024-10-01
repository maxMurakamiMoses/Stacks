"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import axios from "axios";

// Skeleton component for a single leaderboard card
function LeaderboardCardSkeleton() {
  return (
    <div className="p-4 flex flex-row justify-between items-center rounded-xl animate-pulse">
      <div className="flex gap-4 flex-row">
        <div className="relative overflow-hidden h-14 w-14 flex items-center justify-center rounded-lg bg-neutral-700">
          {/* Placeholder for Icon/Number */}
          <div className="h-8 w-8 bg-neutral-600 rounded-full"></div>
          {/* Glare Effect Placeholder */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-50"></div>
        </div>
        <div className="flex flex-col">
          <div className="h-4 bg-neutral-600 rounded w-24 mb-2"></div>
          <div className="h-3 bg-neutral-500 rounded w-80"></div>
        </div>
      </div>
      <div className="h-5 w-5 bg-neutral-600 rounded"></div>
    </div>
  );
}

export function LeaderboardPreview({ leaderboardName }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API endpoint using axios
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/fetchLeaderboardPreview", {
          params: {
            leaderboardName: leaderboardName,
          },
        });

        // Map the data to include ctaLink if necessary
        const mappedData = response.data.map((profile) => ({
          ...profile,
          ctaLink: `/profile/${profile.id}`, // Adjust the URL structure as per your routing
        }));

        setCards(mappedData);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "An error occurred while fetching data.");
      }
      setLoading(false);
    }

    fetchData();
  }, [leaderboardName]);

  // Generate random delays for each card once
  const cardsWithDelays = useMemo(() => {
    return cards.map((card) => ({
      ...card,
      initialDelay: Math.random() * 3, // Random delay between 0 to 3 seconds
      repeatDelay: Math.random() * 6, // Random delay between repeats
    }));
  }, [cards]);

  if (loading) {
    // Render multiple skeletons to indicate loading state
    return (
      <ul className="max-w-xl mx-auto w-full gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <LeaderboardCardSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (error || cards.length === 0) {
    return <p className="text-red-500 text-center">{error || "No data available."}</p>;
  }

  return (
    <ul className="max-w-xl mx-auto w-full gap-4">
      {cardsWithDelays.map((card, index) => (
        <a
          key={card.id}
          href={card.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 flex flex-row justify-between items-center rounded-xl cursor-pointer "
        >
          <div className="flex gap-4 flex-row">
            <div
              className={`relative overflow-hidden h-14 w-14 flex items-center justify-center rounded-lg ${
                index === 0
                  ? "bg-yellow-500" // Gold
                  : index === 1
                  ? "bg-gray-400" // Silver
                  : index === 2
                  ? "bg-yellow-800" // Bronze
                  : "bg-green-500" // For #4 icon
              }`}
            >
              {index < 3 ? (
                <FaTrophy
                  className="h-8 w-8 text-white relative z-10"
                  aria-label="Trophy Icon"
                />
              ) : (
                <span className="text-white text-xl font-bold relative z-10">
                  #{index + 1}
                </span>
              )}
              {/* Glare Effect */}
              <motion.div
                className="absolute"
                initial={{ x: "-200%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2.5,
                  ease: "linear",
                  repeat: Infinity,
                  delay: card.initialDelay,
                  repeatDelay: card.repeatDelay,
                }}
                style={{
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  transform: "rotate(45deg)",
                }}
              />
            </div>
            <div>
              <h3 className="font-medium text-neutral-100 text-left">
                {card.name}
              </h3>
              <p className="text-neutral-400 text-left">{card.content}</p>
            </div>
          </div>
          <FiExternalLink
            className="h-5 w-5 text-neutral-500"
            aria-label="External Link Icon"
          />
        </a>
      ))}
    </ul>
  );
}
