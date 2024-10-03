"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import Image from "next/image"; // Remove if not using Next.js

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  emoji: string; // Ensure emoji property exists
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 4000);
  };

  return (
    <div className="relative h-[290px] w-[460px]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-[250px] w-[400px] rounded-3xl p-5 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-center overflow-hidden hover:scale-105 transition-transform duration-300"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, // decrease z-index for the cards that are behind
            }}
          >
            {/* Background Emoji */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 text-[10rem] md:text-[12rem] lg:text-[14rem] select-none pointer-events-none">
              {card.emoji}
            </div>

            {/* Card Content */}
            <div className="relative z-10 text-center">
              <p className="text-neutral-600 font-bold dark:text-white text-xl">
                {card.name}
              </p>
              <p className="text-neutral-500 font-semibold pt-4">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
