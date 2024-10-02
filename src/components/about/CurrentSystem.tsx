import { Roboto_Mono } from 'next/font/google';
import { ListofIssues } from "./ListOfIssues";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

export function CurrentSystem() {
  const words = [
    {
      text: "Leaderboards",
      className: "text-green-500 tracking-tight",
    },
  ];

  return (
    <div className="container max-w-8xl mx-auto">
      <div className={robotoMono.className}>
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 py-6 lg:py-24">
          <div className="lg:col-span-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight pb-8 pt-8 text-black">
              We are living in a time of <span className="text-black">Science-Friction</span>,<br />
              not <span className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-transparent bg-clip-text relative">
                Science-Fiction.
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-300 via-green-400 to-green-500"></span>
              </span>
            </h1>
            <p className="text-gray-400 text-l lg:text-xl ml-[4px]">
              Instead of breakthroughs that could revolutionize healthcare, we face a landscape where life-saving drugs and 
              technologies are delayed or suppressed, as entrenched industries prioritize profits over progress. The friction 
              comes from a system designed to maintain the status quo, making it harder for transformative ideas to break 
              through and truly improve human well-being.
            </p>
            <p className="text-gray-400 text-l lg:text-xl ml-[4px]">
              Instead of breakthroughs that could revolutionize healthcare, we face a landscape where life-saving drugs and 
              technologies are delayed or suppressed, as entrenched industries prioritize profits over progress. The friction 
              comes from a system designed to maintain the status quo, making it harder for transformative ideas to break 
              through and truly improve human well-being.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20">
            <div className="hidden sm:block">
              <ListofIssues />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
