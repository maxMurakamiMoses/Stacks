// File: components/news/News.tsx

import React from 'react';

const News = () => {
  return (
    <div className="bg-[#F0FDF4] px-4 md:px-[105px] pt-12">
      {/* Centered heading */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left side (3/4 width) */}
        <div className="w-full md:w-3/4 p-4 space-y-4">
          <div className="mb-4">
            {/* Title for left side */}
            <h2 className="text-[24px] font-bold mt-[-20px]">New Stories</h2>
            {/* Horizontal line for left side */}
            <div className="h-px bg-gray-300"></div>
          </div>
          <div className="overflow-y-auto">
            <p>Something</p>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:block w-px bg-gray-300"></div>

        {/* Right side (1/4 width) */}
        <div className="w-full md:w-1/4 p-4 space-y-4">
          <div className="mb-4">
            {/* Title for right side */}
            <h2 className="text-[24px] font-bold mt-[-20px]">Product Launches</h2>
            {/* Horizontal line for right side */}
            <div className="h-px bg-gray-300"></div>
          </div>
          <p>Something</p>
        </div>
      </div>
    </div>
  );
};

export default News;
