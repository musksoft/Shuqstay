import React from "react";
import { assets } from "../assets/assets";
const Landlord = () => {
  return (
    <div>
      <div className="w-full">
        <img
          src={assets.land_hero}
          alt="Tenant Hero"
          className="w-full h-[16rem]  rounded-bl-[10rem]"
        />
      </div>

      <div className="text-5xl font-italiana text-center font-medium mt-10">
        For Landlords
      </div>

      <div className="text-center text-lg text-gray-700 px-4 mt-4 max-w-2xl mx-auto leading-relaxed">
        Everything you need to find, apply for, and secure your perfect rental.
        We make the renting process simple, transparent, and stress-free.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 px-4 my-10 mx-4">
        <div className="bg-pink_100 rounded-tl-[3em] h-[11rem] relative overflow-hidden">
          <div className="bg-pink_lt rounded-tl-[3em] h-[10rem] w-full absolute right-0 bottom-0 flex flex-col justify-center items-center px-6 text-center">
            <img
              src={assets.arrow_icon}
              alt=""
              className="w-[3rem] h-auto mb-2 -mt-3"
            />
            <h1 className="text-lg font-semibold mb-1">
              Higher Occupancy rates
            </h1>
            <p className="text-sm">
              Transparent pricing with no surprise charges{" "}
            </p>
          </div>
        </div>

        <div className="bg-green_100 rounded-tl-[3em] h-[11rem] relative overflow-hidden">
          <div className="bg-green rounded-tl-[3em] h-[10rem] w-full absolute right-0 bottom-0 flex flex-col justify-center items-center px-6 text-center">
            <img
              src={assets.shield_icon}
              alt=""
              className="w-[3rem] h-auto mb-2 -mt-3"
            />
            <h1 className="text-lg font-semibold mb-1">Verified Tenants</h1>
            <p className="text-sm">
              Communicate openly with your landlord or property manager.
            </p>
          </div>
        </div>

        {/* Brown with Light Brown overlay */}
        <div className="bg-brown_lt rounded-tl-[3em] h-[11rem] relative overflow-hidden">
          <div className="bg-brown_100 rounded-tl-[3em] h-[10rem] w-full absolute right-0 bottom-0 flex flex-col justify-center items-center px-6 text-center">
            <img
              src={assets.time_icon}
              alt=""
              className="w-[3rem] h-auto  -mt-2"
            />
            <h1 className="text-lg font-semibold mb-1">Reduced Vacancy Time</h1>
            <p className="text-sm">
              Average time to lease is 30% faster than traditional methods{" "}
            </p>
          </div>
        </div>

        <div className="bg-blue_lt rounded-tl-[3em] h-[11rem] relative overflow-hidden">
          <div className="bg-blue rounded-tl-[3em] h-[10rem] w-full absolute right-0 bottom-0 flex flex-col justify-center items-center px-6 text-center">
            <img
              src={assets.star_icon}
              alt=""
              className="w-[3rem] h-auto -mt-3 mb-2 "
            />
            <h1 className="text-lg font-semibold mb-1">Professional Support</h1>
            <p className="text-sm">
              Dedicated account management and marketing support{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto my-10">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Pricing Plans
        </h2>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-2">
          {/* Basic Plan */}

          <div className="bg-pink_lt rounded-tl-[3em] h-[28rem] relative overflow-hidden flex flex-col items-center">
            <div className="bg-white rounded-tl-[3em] h-[24rem] w-full absolute bottom-10 border-2 border-pink_lt flex flex-col justify-center items-center px-6">
              <h1 className="text-[1.5rem] font-arial font-bold -mt-4 text-center">
                Basic
              </h1>
              <h1 className="text-lg font-sans font-medium  text-center">
                <span className="font-bold">Free</span>/forever
              </h1>
              <div className="flex flex-col w-full mb-10 mt-10">
                <ul className="text-[15px] leading-relaxed text-gray-700 space-y-3 mt-2 text-left">
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>3 property listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Basic tenant messaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Standard listing photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Email support</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="absolute bottom-4">
              <button className="bg-white text-pink border border-pink_lt font-semibold px-6 py-2 rounded-full shadow hover:border-white hover:bg-pink_lt hover:text-white transition">
                Get Started
              </button>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-brown rounded-tl-[3em] h-[28rem] relative overflow-hidden flex flex-col items-center">
            <div className="bg-white rounded-tl-[3em] h-[24rem] w-full absolute bottom-10 border-2 border-brown flex flex-col justify-center items-center px-6">
              <h1 className="text-[1.5rem] font-arial font-bold -mt-4 text-center">
                Professional
              </h1>
              <h1 className="text-lg font-sans font-medium mb-1 text-center">
                <span className="font-bold">KD 29</span>/month
              </h1>
              <div className="flex flex-col w-full">
                <ul className="text-[15px] leading-relaxed text-gray-700 space-y-3 mt-2 text-left">
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Unlimited property listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Advanced tenant screening</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Professional photography support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Market analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Automated rent reminders</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="absolute bottom-4">
              <button className="bg-white text-brown border border-brown font-semibold px-6 py-2 rounded-full shadow hover:bg-brown hover:text-white hover:border-white transition">
                Get Started
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-green rounded-tl-[3em] h-[28rem] relative overflow-hidden flex flex-col items-center">
            <div className="bg-white rounded-tl-[3em] h-[24rem] w-full absolute bottom-10 border-2 border-green flex flex-col justify-center items-center px-6">
              <h1 className="text-[1.5rem] font-arial font-bold -mt-4 text-center">
                Enterprise
              </h1>
              <h1 className="text-lg font-sans font-medium mb-1 text-center">
                <span className="font-bold">KD 59</span>/month
              </h1>
              <div className="flex flex-col w-full">
                <ul className="text-[15px] leading-relaxed text-gray-700 space-y-3 mt-2 text-left">
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Everything in professional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Unlimited listings + agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Custom API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Real-time data integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>Advanced reporting tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <img src={assets.tick} alt="tick" className="w-5 h-5" />
                    <span>24/7 priority support</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="absolute bottom-4">
              <button className="bg-white text-green border border-green font-semibold px-6 py-2 rounded-full shadow hover:border-white hover:bg-green hover:text-black transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full h-80 bg-brown_lt mb-2">
        <div className="w-[25rem] m-10">
          <img
            src={assets.land_review}
            alt="review"
            className="w-full h-auto object-cover rounded-tl-[5em] "
          />
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-3">SUCCESS STORY</h2>
          <p className="text-gray-600">
            "Since joining ShuqStay, I've reduced my vacancy time by 40% and
            increased my rental income by 15%. The platform's tenant screening
            tools helped me find reliable, long-term tenants who take care of my
            properties."
          </p>
          <h2 className="text-lg font-semibold mt-5">Ahmed Khalil</h2>
          <p>Property Owner, 12+ units</p>
        </div>
      </div>

      <div className="bg-pink_100 rounded-tl-[3em] h-[14rem] relative overflow-hidden m-8">
        <div className="bg-pink_lt rounded-tl-[3em] h-[13rem] w-full absolute right-0 bottom-0 flex flex-col justify-center items-center px-6 text-center">
          <img
            src={assets.home_icon}
            alt=""
            className="w-[3rem] h-auto -mt-3"
          />
          <h1 className="text-2xl font-bold mb-1">Ready to get started?</h1>
          <p className="text-sm">
            Join thousands of successful landlords who trust ShuqStay to manage
            their rental properties. Start with our free plan and upgrade as you
            grow.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landlord;
