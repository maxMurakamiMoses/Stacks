import { TypewriterEffect } from "../ui/typewriter-effect";
import { CardStackSection } from "./CardStack";

export function Header() {
  const words = [
    {
      text: "Leaderboards",
      className: "text-green-500 dark:text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 pt-6 lg:pt-20">
      <div className="lg:col-span-4">
        <TypewriterEffect words={words} />
        <p className="text-gray-400 text-l lg:text-xl">Browse through leaderboards to discover people pushing the boundaries.  Dive into their stack, gain insights from their experiences, and get inspired by those who are constantly redefining what's possible.</p>
      </div>
      <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20">
        <div>
          <CardStackSection />
        </div>
      </div>
    </div>
  );
}
