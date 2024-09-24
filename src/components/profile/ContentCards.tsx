import React from 'react';
import { FC } from 'react';
import EditorOutput from '@/components/EditorOutput';

interface ContentCardsProps {
  content: any;
  dietParagraphs: any[];
  appsGadgetsParagraphs: any[];
  vitaminsParagraphs: any[];
  habitStackParagraphs: any[];
}

const ContentCards: FC<ContentCardsProps> = ({
  content,
  dietParagraphs,
  appsGadgetsParagraphs,
  vitaminsParagraphs,
  habitStackParagraphs,
}) => {
  return (
    <div className='space-y-6'>

      {/* Diet Card - Full Width */}
      {dietParagraphs.length > 0 && (
        <div className='bg-white shadow-md rounded-lg p-6 w-full'>
          <h2 className='text-2xl font-bold mb-4'>Diet</h2>
          {dietParagraphs.map((para, index) => (
            <p key={index} className='mb-2'>
              {para.data.text}
            </p>
          ))}
        </div>
      )}

      {/* Other Cards - Responsive Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

        {/* Apps/Gadgets Stack Card */}
        {appsGadgetsParagraphs.length > 0 && (
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>Apps/Gadgets Stack</h2>
            {appsGadgetsParagraphs.map((para, index) => (
              <p key={index} className='mb-2'>
                {para.data.text}
              </p>
            ))}
          </div>
        )}

        {/* Vitamin Stacks Card */}
        {vitaminsParagraphs.length > 0 && (
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>Vitamin Stacks</h2>
            {vitaminsParagraphs.map((para, index) => (
              <p key={index} className='mb-2'>
                {para.data.text}
              </p>
            ))}
          </div>
        )}

        {/* Habit Stack Card */}
        {habitStackParagraphs.length > 0 && (
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>Habit Stack</h2>
            {habitStackParagraphs.map((para, index) => (
              <p key={index} className='mb-2'>
                {para.data.text}
              </p>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ContentCards;
