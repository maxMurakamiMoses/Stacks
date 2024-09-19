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
        <p>Browse through leaderboards to discover people pushing the boundaries</p>
      </div>
      <div className="lg:col-span-4 flex justify-center">
        <div>
          <CardStackSection />
        </div>
      </div>
    </div>
  );
}
