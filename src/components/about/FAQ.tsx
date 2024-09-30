// File 2: components/about/FAQ.tsx
import { Roboto_Mono } from 'next/font/google';
import { AccordionSection } from "./AccordianSection";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

export function FAQ() {

  return (
    <div id="faq" className={robotoMono.className}>
      <div className="container max-w-8xl mx-auto"> 
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 py-6 lg:py-24">
          <div className="lg:col-span-4">
            <h1 className="text-green-500 tracking-tight text-[60px] lg:text-[70px] xl:text-[86px] font-bold">
              FAQ
            </h1>
            
            <p className="text-gray-400 text-l lg:text-xl ml-[4px]">
              Browse frequently asked questions to learn more about our mission, how we source our information, and how you can get involved. 
              Whether you're curious about contributing to the project, the accuracy of our stacks, or how to connect with us, 
              you'll find answers here. If you have a question that isn't covered, feel free to reach out—we're always happy to help!
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center mt-12 lg:mt-20">
            <div>
              <AccordionSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
