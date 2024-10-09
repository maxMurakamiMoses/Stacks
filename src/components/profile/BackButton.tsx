// components/BackButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});


const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group flex items-center font-bold text-white hover:text-[#e0fcc4] transition-all pb-4"
    >
      <FaArrowLeft
        className="mr-2 transform transition-transform group-hover:translate-x-[-4px]"
      />
      <span className={`text-sm ${robotoMono.className}`}>Back</span>
    </button>
  );
};

export default BackButton;
