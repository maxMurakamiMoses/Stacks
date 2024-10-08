"use client";
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa'; // Import FaArrowRight
import { useRef } from 'react';
import { TypewriterEffect } from "../ui/typewriter-effect"; // Import TypewriterEffect
import { Roboto_Mono } from 'next/font/google';
import { Grid } from './Grid';
import { LogoTicker } from './Logoticker';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

export const Hero = () => {
    const heroRef = useRef(null);

    // Define the words with styling for TypewriterEffect
    const words = [
        {
            text: "Stacks.",
            className: "text-6xl md:text-8xl font-bold tracking-tight text-[#e0fcc4] mt-6",
        },
    ];

    return (
    <div className={robotoMono.className}>
      <section ref={heroRef} className="bg-gradient-to-b from-[#3a5f0b] via-[#274b07] to-[#1c2d10] overflow-x-clip">
        
        <div className="container max-w-8xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 pt-6 lg:pt-52 pb-24">
                <div className="lg:col-span-3">
                    <div className="text-sm inline-flex border border-[#e0fcc4] px-3 py-1 rounded-lg tracking-tight font-mono text-[#e0fcc4]">
                        Biological liberty. max(P(ℓ)).
                    </div>
                    <TypewriterEffect words={words} />
                    <p className="text-2xl text-[#e0fcc4] tracking-tight mt-6">
                        Biohacker, nerd or athlete? <br /> This is for you. <br />
                    </p>
                    <div className="flex gap-1 items-center mt-[30px]">
                        {/* Updated Link with border, rounded corners, and hover effect */}
                        <Link 
                            href="/about" 
                            className="btn btn-primary tracking-tight text-[#e0fcc4] border border-[#e0fcc4] rounded-xl px-2 py-1 hover:font-bold transition font-normal"
                        >
                            Learn More
                        </Link>
                        <Link href="/leaderboards" className="flex items-center bg-transparent group tracking-tight pl-6 text-[#e0fcc4]">
                            <span>Jump To Leaderboard</span>
                            <FaArrowRight className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>
                </div>
                <div className="lg:col-span-5 flex justify-center">
                    <div className="relative flex">
                        <Grid />
                    </div>
                </div>
            </div>
            <LogoTicker />
        </div>
      </section>
      </div>
    );
};
