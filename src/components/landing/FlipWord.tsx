import React from "react";
import { FlipWords } from "../ui/flip-words";
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});


export function FlipWord() {
  const words = [ "'Health is the Greatest Wealth'","'Build Now, Age Later'", "'Don't Die'", "'Accelerate'"];

  return (
    <div className="flex justify-center items-center px-4">
      <div className="text-2xl mx-auto font-tight text-gray-600">
      <div className={robotoMono.className}> 
        <FlipWords duration={5000} words={words} />
        </div>
      </div>
    </div>
  );
}
