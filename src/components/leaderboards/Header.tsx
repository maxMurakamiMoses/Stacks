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

export function Header() {
  const words = [
    {
      text: "Leaderboards",
      className: "text-green-500 dark:text-green-500",
    },
  ];

  return (
    <div className={robotoMono.className}>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 pt-6 lg:pt-24">
        <div className="lg:col-span-4">
          <div className="hidden md:block">
            <div className="text-sm mb-[-20px] ml-[4px] py-1 rounded-lg tracking-tight">
              Biological liberty. max(P(health)).
            </div>
          </div>
          <TypewriterEffect words={words} />
          <p className="text-gray-400 text-l lg:text-xl ml-[4px]">
            Browse through leaderboards to discover people pushing the boundaries. Dive into their
            stack, gain insights from their experiences, and get inspired by those who are constantly
            redefining what's possible.
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
