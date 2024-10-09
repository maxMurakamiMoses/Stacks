"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

const cards = [
  {
    title: "Browse and Join Leaderboards",
    description: "View and join multiple leaderboards.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    title: "Learn about Popular Stacks",
    description: "Read about the stacks from the very best.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2560&auto=format&fit=crop",
  },
  {
    title: "Explore Top Protocals",
    description: "Learn news ways to optimize your wellbeing.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2560&auto=format&fit=crop",
  },
  {
    title: "Discover Cool Products",
    description: "Stay up to date on exciting gagets & tools.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2560&auto=format&fit=crop",
  },
];

export function FloatingCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null); // Ref to store the interval ID

  // Function to start the interval
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setFade(true);
      }, 500); // Duration of fade effect
    }, 5000); // 5-second interval
  };

  useEffect(() => {
    startInterval(); // Initialize the interval when the component mounts

    return () => {
      clearInterval(intervalRef.current); // Clean up the interval on unmount
    };
  }, []);

  // Handle oval click
  const handleOvalClick = (index) => {
    clearInterval(intervalRef.current); // Clear the existing interval
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
      startInterval(); // Restart the interval to reset the 5-second timer
    }, 500); // Duration of fade effect
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="inter-var">
      {/* Group wrapper for hover effect */}
      <div className="group">
        <CardContainer>
          <CardBody
            className={`bg-[#F0FDF4] relative border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-4 border transition-opacity duration-500 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-700"
            >
              {currentCard.title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-gray-600 text-sm max-w-sm mt-2"
            >
              {currentCard.description}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={currentCard.image}
                height={1000}
                width={1000}
                className="h-52 w-full object-cover rounded-xl group-hover:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      {/* Grey ovals for navigation */}
      <div className="flex justify-center space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => handleOvalClick(index)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              currentIndex === index ? "bg-[#e0fcc4]" : "bg-gray-800"
            }`}
            aria-label={`Go to card ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
