import React from 'react';

const CallToAction = () => {
  return (
    <div className="text-center px-4 md:px-[105px] bg-white rounded-lg py-20">
      <div className="h-px bg-gray-300"></div>
      <h2 className="text-2xl font-semibold mb-4 pt-20">Join the Mailing List</h2>
      <p className="text-gray-600 text-lg mb-6">
        Once a month, you&#39;ll get a short & clear health-related story, insight, or tip. No fluff.
      </p>
      <form className="flex justify-center">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-green-500 text-white font-medium rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default CallToAction;
