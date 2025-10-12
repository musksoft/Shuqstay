import React from 'react';
import { assets } from '../assets/assets';

export default function MobileApp() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-10 md:py-10 border-t border-brown">
      {/* Left Side: Text and Small Image */}
      <div className="md:w-1/2 space-y-4 text-center md:text-left ml-[4rem]">
        <h2 className="text-2xl md:text-5xl font-bold font-italiana">
          Try Our New <span className='text-brown'>ShuqStay</span>  App
        </h2>
        <p className="text-gray-600 max-w-md mx-auto md:mx-0">
          Experience the best of our services right from your phone. Stay connected by downloading our app.
        </p>
        <img
          src={assets.app_store}
          alt="App Store Badge"
          className="w-[20rem] mx-auto md:mx-0 mt-4"
        />
      </div>

      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end mr-10">
        <img
          src={assets.app}
          alt="App Preview"
          className="w-[24rem] max-w-md"
        />
      </div>
    </div>
  );
}
