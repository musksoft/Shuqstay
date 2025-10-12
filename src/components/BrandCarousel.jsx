import React from 'react';
import { assets } from '../assets/assets';

const brands = [
  assets.brand1,
  assets.brand2,
  assets.brand3,
  assets.brand4
];

const BrandCarousel = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-4 bg-gray border-t border-b border-brown">
      <div className="relative w-full">
        <div className="flex gap-8 animate-scroll whitespace-nowrap">
          {brands.concat(brands).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Brand ${index + 1}`}
              className="h-[8rem] w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
