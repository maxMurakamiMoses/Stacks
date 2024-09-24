// components/BackButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group flex items-center font-bold text-black hover:text-green-600 transition-all pb-4"
    >
      <FaArrowLeft
        className="mr-2 transform transition-transform group-hover:translate-x-[-4px]"
      />
      <span className="text-sm">Back</span>
    </button>
  );
};

export default BackButton;
