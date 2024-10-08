"use client";
import React from "react";
import { ButtonsCard } from "../ui/tailwindcss-buttons";
import { useRouter } from 'next/navigation';

export function ShiftedButton() {
  const router = useRouter(); 

  const handleClick = () => {
    router.push('/leaderboards');
  };

  return (
    <ButtonsCard className="flex items-center">
      <button
        onClick={handleClick}
        className="px-8 py-2 border border-white bg-transparent text-black relative group transition duration-200 rounded-lg hover:bg-[#F0FDF4]"
      >
        <div className="absolute -bottom-2 -right-2 bg-white h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200 rounded-lg" />
        <span className="relative">Join Leaderboard</span>
      </button>
    </ButtonsCard>
  );
}