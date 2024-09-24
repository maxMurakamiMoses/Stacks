import React from 'react';
import { FC } from 'react';
import { FaAppleAlt, FaMobileAlt, FaCapsules, FaRegClock } from 'react-icons/fa';

interface ContentCardsProps {
  dietParagraphs: any[];
  appsGadgetsParagraphs: any[];
  vitaminsParagraphs: any[];
  habitStackParagraphs: any[];
}

const ContentCards: FC<ContentCardsProps> = ({
  dietParagraphs,
  appsGadgetsParagraphs,
  vitaminsParagraphs,
  habitStackParagraphs,
}) => {
  return (
    <div className='space-y-6'>

      {/* Diet Card - Full Width */}
      {dietParagraphs.length > 0 && (
        <div className='relative group'>

          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-800 ease-in-out pointer-events-none z-0" />

          {/* Card Content */}
          <div className='relative bg-white rounded-lg p-6 w-full border-l-4 border-green-600 z-10'>
            <h2 className='text-2xl font-bold mb-4 flex items-center text-green-600 uppercase tracking-wide'>
              <FaAppleAlt className='mr-2 text-green-600' /> Diet
            </h2>
            {dietParagraphs.map((para, index) => (
              <p key={index} className='mb-2'>
                {para.data.text}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Other Cards - Responsive Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

        {/* Apps/Gadgets Stack Card */}
        {appsGadgetsParagraphs.length > 0 && (
          <div className='relative group'>

            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-teal-500 rounded-lg blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out pointer-events-none z-0" />

            {/* Card Content */}
            <div className='relative bg-white rounded-lg p-6 border-l-4 border-blue-600 z-10'>
              <h2 className='text-2xl font-bold mb-4 flex items-center text-blue-600 uppercase tracking-wide'>
                <FaMobileAlt className='mr-2 text-blue-600' /> Gadget Stack
              </h2>
              {appsGadgetsParagraphs.map((para, index) => (
                <p key={index} className='mb-2'>
                  {para.data.text}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Vitamin Stacks Card */}
        {vitaminsParagraphs.length > 0 && (
          <div className='relative group'>

            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-green-500 rounded-lg blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out pointer-events-none z-0" />

            {/* Card Content */}
            <div className='relative bg-white rounded-lg p-6 border-l-4 border-yellow-600 z-10'>
              <h2 className='text-2xl font-bold mb-4 flex items-center text-yellow-600 uppercase tracking-wide'>
                <FaCapsules className='mr-2 text-yellow-600' /> Vitamin Stacks
              </h2>
              {vitaminsParagraphs.map((para, index) => (
                <p key={index} className='mb-2'>
                  {para.data.text}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Habit Stack Card */}
        {habitStackParagraphs.length > 0 && (
          <div className='relative group'>

            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out pointer-events-none z-0" />

            {/* Card Content */}
            <div className='relative bg-white rounded-lg p-6 border-l-4 border-purple-600 z-10'>
              <h2 className='text-2xl font-bold mb-4 flex items-center text-purple-600 uppercase tracking-wide'>
                <FaRegClock className='mr-2 text-purple-600' /> Habit Stack
              </h2>
              {habitStackParagraphs.map((para, index) => (
                <p key={index} className='mb-2'>
                  {para.data.text}
                </p>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContentCards;
