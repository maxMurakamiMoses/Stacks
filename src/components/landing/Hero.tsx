"use client";
import ArrowIcon from '@/assets/arrow-right-black.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { CardStackSection } from '../leaderboards/CardStack';
import { TypewriterEffect } from "../ui/typewriter-effect"; // Import TypewriterEffect
import { Roboto_Mono } from 'next/font/google';

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
            className: "text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-black via-black to-[#1AB331] text-transparent bg-clip-text mt-6",
        },
    ];

    return (
        <div className={robotoMono.className}>
      <section ref={heroRef} className="pt-8 pb-6 md:pt-2 md:pb-2 bg-[radial-gradient(ellipse_210%_110%_at_bottom_left,#1AB331_10%,#F0FDF4_60%)] overflow-x-clip">
        <div className="px-4 md:px-32">
            <div className="md:flex items-center">
                <div className="md:w-[478px]">
                    <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight font-mono">
                        Biological liberty. max(P(ℓ)). 
                    </div>
                    {/* Use TypewriterEffect for "Stacks." */}
                    <TypewriterEffect words={words} />
                    <p className="text-xl text-[#010D3E] tracking-tight mt-6">
                        Biohacker, nerd or athlete? <br /> This is for you. <br />
                    </p>
                    <div className="flex gap-1 items-center mt-[30px]">
                        <Link href="/about" className="btn btn-primary tracking-tight">Learn More</Link>
                        <Link href="/#news" className="flex items-center text-black bg-transparent group tracking-tight pl-6">
                            <span>Jump To News</span>
                            <Image src={ArrowIcon} alt="Arrow right" className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-2"/>
                        </Link>
                    </div>
                </div>
                <div className='pl-14 mt-20 md:mt-0 md:h-[648px] md:flex-1 relative flex items-center justify-center'>
                    <CardStackSection />
                </div>
            </div>
        </div>
      </section>
      </div>
    );
};
