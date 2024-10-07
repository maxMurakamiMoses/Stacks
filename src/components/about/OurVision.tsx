import { Roboto_Mono } from 'next/font/google';
import { Globe } from './Globe';
import { TextHighlight } from './TextHighlight';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

export function OurVision() {
  return (
    <div className="bg-[#1c2d10]">
      <div className="bg-[#F0FDF4] rounded-[140px] p-4 mx-8">
      <div className="container max-w-8xl mx-auto px-8"> {/* Added px-4 for horizontal padding */}
        <div className={robotoMono.className}>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-8 gap-4 py-16 xl:py-24"> {/* Adjusted padding */}
            <div className="xl:col-span-4">
              <TextHighlight />
              <p className="text-lg mb-4 text-gray-600 tracking-tight">
                We want a revolution in healthcare, driven not by pharmaceutical giants or traditional medical institutions, but by athletes, biohackers, and innovative individuals operating outside conventional systems. This open-source health movement harnesses the collective wisdom and experimentation of those pushing the boundaries of human performance and longevity.
              </p>
              <p className="text-lg mb-4 text-gray-600 tracking-tight">
              Imagine a world where the latest discoveries in nutrition, exercise science, and performance enhancement are freely shared and rapidly iterated upon. Yes, Lance Armstrong should not have won the Tour De France, but his chemists should have been candidates for the Nobel Prize. Whatever they pumped into that man took him from a seemingly fatal cancer to winning a grueling physical competition – six times! Can we bottle that, study that, <em>remove the side effects</em>, and scale it?
              </p>
              <p className="text-lg mb-4 text-gray-600 tracking-tight">
                By embracing a spirit of radical openness and collaboration, we hope to unlock new pathways to optimizing human health and performance. Build now, age later.
              </p>
              <p className="text-sm text-gray-500 tracking-tight">
                Parts of our mission are direct quotes from 
                <a href="https://balajis.com/" target="_blank" className="text-blue-500"> Balaji Srinivasan</a> and 
                <a href="https://www.ldeming.com/" target="_blank" className="text-blue-500"> Laura Deming</a>. 
                Check them out.
              </p>
            </div>
            <div className="xl:col-span-4 justify-center pt-32">
              <div className="hidden xl:block">
                <Globe />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
