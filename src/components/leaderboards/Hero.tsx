import { TypewriterEffect } from "../ui/typewriter-effect";
import { CardStackSection } from "./CardStack";
import { Separator } from "@/components/ui/Separator";
import { JumpTo } from "./JumpTo";
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

export function Hero() {
  const words = [
    {
      text: "Leaderboards",
      className: "text-6xl md:text-8xl font-bold tracking-tight text-[#e0fcc4]",
    },
  ];

  return (
    <div className={robotoMono.className}>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 pt-6 lg:pt-24">
        <div className="lg:col-span-4">
          <div className="hidden md:block">
                    <div className="text-sm inline-flex border border-[#e0fcc4] px-3 py-1 rounded-lg tracking-tight font-mono text-[#e0fcc4]">
                        Biological liberty. max(P(ℓ)).
                    </div>
          </div>
          <TypewriterEffect words={words} />
          <p className="text-2xl text-gray-200 tracking-tight mt-6">
            Browse through leaderboards to discover people pushing the boundaries. Dive into their
            stack, gain insights from their experiences, and get inspired by those who are constantly
            redefining what&#39;s possible.
          </p>

          <div className="hidden md:block ml-[4px]">
            <JumpTo />
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20">
          <div>
            <CardStackSection />
          </div>
        </div>
      </div>

      <Separator />
    </div>
  );
}
