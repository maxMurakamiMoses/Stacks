"use client"
import ArrowIcon from '@/assets/arrow-right-black.svg';
import Image from 'next/image';
import Link from 'next/link';
import {useScroll, useTransform} from 'framer-motion'
import { useRef } from 'react';
import { Bento } from './Bento';
import { CardStackSection } from '../leaderboards/CardStack';

export const Hero = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start end', 'end start']
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [200, -200])

    return (
      <section ref={heroRef} className="pt-8 pb-6 md:pt-2 md:pb-2 bg-[radial-gradient(ellipse_210%_110%_at_bottom_left,#1AB331_10%,#F0FDF4_60%)] overflow-x-clip">
        <div className="px-4 md:px-32">
            <div className="md:flex items-center">
                <div className="md:w-[478px]">
                <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight font-mono">
                    Biological liberty. max(P(ℓ)). 
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-black via-black to-[#1AB331] text-transparent bg-clip-text mt-6" style={{ backgroundImage: 'linear-gradient(to bottom, black 65%, #1AB331)' }}>Stacks.</h1>
                    <p className="text-xl text-[#010D3E] tracking-tight mt-6">
                    Biohacker, nerd or athlete? This is for you. <br />
                    </p>
                    <div className="flex gap-1 items-center mt-[30px]">
                        <Link href="/top-stacks" className="btn btn-primary">Learn More</Link>
                        <Link href="/about" className="flex items-center text-black bg-transparent group tracking-tight pl-6">
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
    );
  };