import React from 'react';
import { assets } from '../assets/assets';
import { ArrowRight } from 'lucide-react';

const Entry = () => {
  const handleGetStarted = () => {
    alert('Get Started clicked!');
    // Add your logic here
  };

  return (
    <section className="min-h-[25vh] flex flex-col md:flex-row items-center px-6 py-6 md:px-14 md:py-4">
      {/* Left Side - Text */}
      <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
        <h1 className="text-4xl md:text-[40px] font-bold font-italiana leading-snug mb-6">
          Find Your Perfect Flat, Effortlessly.
        </h1>
        <p className="text-base md:text-[16px] text-gray-700 leading-relaxed">
          Discover affordable and fully verified rental flats in the city’s best neighborhoods.
          Whether you're relocating, downsizing, or upgrading, we make the search easy — with real-time
          listings, transparent pricing, and zero hassle. Start your journey to a better living space today.
        </p>
        <button
          type="button"
          onClick={handleGetStarted}
          className="flex items-center justify-center mt-5 w-40 max-w-xs bg-brown text-white px-4 py-1 rounded-full"
        >
          Get Started
          <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={assets.entry}
          alt="Entry"
          className="w-full max-w-[400px] md:max-w-[500px] h-auto object-contain mt-5"
        />
      </div>
    </section>
  );
};

export default Entry;
