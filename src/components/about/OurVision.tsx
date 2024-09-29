import { Roboto_Mono } from 'next/font/google';
import { GlobeDemo } from './Globe';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

export function OurVision() {

  return (
    <div className="bg-black">
    <div className="container max-w-8xl mx-auto">
      <div className={robotoMono.className}>
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 py-6 lg:py-24">
          <div className="lg:col-span-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight pb-8 pt-8 text-white">
              The Future We Are Building
            </h1>
            <p className="text-lg mb-6 text-gray-700 tracking-tight">
              We want a revolution in healthcare, driven not by pharmaceutical giants or traditional medical institutions, but by athletes, biohackers, and innovative individuals operating outside conventional systems. This open-source health movement harnesses the collective wisdom and experimentation of those pushing the boundaries of human performance and longevity.
            </p>
            <p className="text-lg mb-6 text-gray-700 tracking-tight">
              Yes, Lance Armstrong should not have won the Tour De France, but his chemists should have been candidates for the Nobel Prize. Whatever they pumped into that man took him from a seemingly fatal cancer to winning a grueling physical competition – six times! Can we bottle that, study that, <em>remove the side effects</em>, and scale it?
            </p>
            <p className="text-lg mb-6 text-gray-700 tracking-tight">
              By embracing a spirit of radical openness and collaboration, we hope to unlock new pathways to optimizing human health and performance. Build now, age later.
            </p>
            <p className="text-sm text-gray-500 tracking-tight">
              Parts of our mission are direct quotes from 
              <a href="https://balajis.com/" target="_blank" className="text-blue-500"> Balaji Srinivasan</a> and 
              <a href="https://www.ldeming.com/" target="_blank" className="text-blue-500"> Laura Deming</a>. 
              Check them out.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center pt-10">
            <div className="hidden md:block">
              <GlobeDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}