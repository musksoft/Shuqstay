import React from "react";
import { assets } from "../assets/assets";
import { Phone, Mail } from "lucide-react";

const Tenants = () => {
  return (
    <div className="">
      <div className="w-full">
        <img
          src={assets.ten}
          alt="Tenant Hero"
          className="w-full h-44 object-cover bg-brown rounded-br-[10rem]"
        />
      </div>

      <div className="text-5xl font-italiana text-center font-medium mt-10">
        For Tenants
      </div>

      <div className="text-center text-lg text-gray-700 px-4 mt-4 max-w-2xl mx-auto leading-relaxed">
        Everything you need to find, apply for, and secure your perfect rental.
        We make the renting process simple, transparent, and stress-free.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 px-4 my-10 mx-4">
        {/* Brown with Light Brown overlay */}
        <div className="bg-brown rounded-tl-[5em] h-[10rem] relative overflow-hidden">
          <div className="bg-brown_lt rounded-tl-[5em] h-full w-[95%] absolute right-0 top-0 flex flex-col justify-center items-center px-6 text-center">
            <img
              src={assets.shield_icon}
              alt=""
              className="w-[3rem] h-auto mb-2"
            />
            <h1 className="text-lg font-semibold mb-1">Verified Listings</h1>
            <p className="text-sm">
              All properties are verified for accuracy and legitimacy
            </p>
          </div>
        </div>

        <div className="bg-pink rounded-tl-[5em] h-[10rem] relative overflow-hidden">
          <div className="bg-pink_lt rounded-tl-[5em] h-full w-[95%] absolute right-0 top-0 flex flex-col justify-center items-center px-6 text-center">
            <img
              src={assets.money_icon}
              alt=""
              className="w-[3rem] h-auto mb-2"
            />
            <h1 className="text-lg font-semibold mb-1">No Hidden Fees</h1>
            <p className="text-sm">
              Transparent pricing with no surprise charges{" "}
            </p>
          </div>
        </div>

        <div className="bg-blue rounded-tl-[5em] h-[10rem] relative overflow-hidden">
          <div className="bg-blue_lt rounded-tl-[5em] h-full w-[95%] absolute right-0 top-0 flex flex-col justify-center items-center px-6 text-center">
            <img
              src={assets.time_icon}
              alt=""
              className="w-[3rem] h-auto "
            />
            <h1 className="text-lg font-semibold mb-1">Quick Response</h1>
            <p className="text-sm">
              Get responses from landlords within 24 hours  
            </p>
          </div>
        </div>

            <div className="bg-green_lt rounded-tl-[5em] h-[10rem] relative overflow-hidden">
          <div className="bg-green rounded-tl-[5em] h-full w-[95%] absolute right-0 top-0 flex flex-col justify-center items-center px-6 text-center">
            <img
              src={assets.arrow_icon}
              alt=""
              className="w-[3rem] h-auto "
            />
            <h1 className="text-lg font-semibold mb-1">Communication</h1>
            <p className="text-sm">
              Communicate openly with your landlord or property manager.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-[16rem] items-center bg-brown_lt mt-16 py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">How it Works</h1>
        <div className="relative w-full max-w-6xl">
          {/* Horizontal line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-brown z-0"></div>

          {/* Step items */}
          <div className="flex justify-between relative z-10">
            {[
              "Browse verified listings with detailed photos and information",
              "Message landlords directly and schedule viewings",
              "Submit your application with our guided process",
              "Complete your lease and get the keys to your new home",
            ].map((text, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center w-1/4 px-2"
              >
                {/* Circle with animation */}
                <div
                  className={`h-16 w-16 rounded-full bg-black text-white flex text-2xl items-center justify-center font-semibold mb-5
              animate-pop
              delay-[${index * 3000}ms]
            `}
                  style={{ animationDelay: `${index * 1800}ms` }}
                >
                  {index + 1}
                </div>

                {/* Text */}
                <div className="text-sm max-w-[13rem]">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 my-10 mx-4">
        {/* Brown with Light Brown overlay */}
        <div className="bg-brown rounded-tl-[5em] h-[10rem] relative overflow-hidden">
          <div className="bg-brown_lt rounded-tl-[5em] h-full w-[95%] absolute right-0 top-0 flex flex-col justify-center px-6 text-center">
            <h1 className="text-lg font-semibold">Lease Agreement</h1>
            <p className="text-sm">
              Always read the lease agreement carefully before signing.
            </p>
          </div>
        </div>

        {/* Pink with Light Pink overlay */}
        <div className="bg-pink rounded-tl-[5em] h-[10rem] relative overflow-hidden">
          <div className="bg-pink_lt rounded-tl-[5em] h-full w-[95%] absolute right-0 top-0 flex flex-col justify-center px-6 text-center">
            <h1 className="text-lg font-semibold">Budget Planning</h1>
            <p className="text-sm">
              Your rent should not exceed 30% of your monthly income. Don’t
              forget to factor in utilities, parking, and other fees.
            </p>
          </div>
        </div>

        {/* Blue with Light Blue overlay */}
        <div className="bg-blue rounded-tl-[5em] h-[10rem] relative overflow-hidden">
          <div className="bg-blue_lt rounded-tl-[5em] h-full w-[95%] absolute right-0 top-0 flex flex-col justify-center px-6 text-center">
            <h1 className="text-lg font-semibold">Neighborhood Check</h1>
            <p className="text-sm">
              Visit the neighborhood at different times before committing.
            </p>
          </div>
        </div>

        {/* Green with Light Green overlay */}
        <div className="bg-green rounded-tl-[5em] h-[10rem] relative overflow-hidden">
          <div className="bg-green rounded-tl-[5em] h-full w-[95%] absolute right-0 top-0 rounded-rb-[3em] flex flex-col justify-center px-6 text-center">
            <h1 className="text-lg font-semibold mb-4">Communication</h1>
            <p className="text-sm">
              Communicate openly with your landlord or property manager.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 my-12 px-6">
        {/* Image on the left */}

        {/* Text on the right */}
        <div className="w-full md:w-1/2 pl-4">
          <h2 className="text-[35px] font-bold mb-4 font-italiana">
            Amenities That Matter
          </h2>
          <p className="text-[18px] leading-relaxed text-gray-700">
            Enjoy the convenience of on-site laundry, high-speed internet, and
            secure parking. Stay active with a modern fitness center, unwind in
            a sparkling swimming pool, and relax year-round with efficient air
            conditioning — all in a pet-friendly community built for your
            lifestyle.
          </p>
        </div>
        <div className="w-full md:w-3/4">
          <img
            src={assets.amenity}
            alt="Amenities preview"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start bg-brown_lt gap-10 mt-12 py-10 px-10">
        {/* Text on the left */}
        <div className="w-full md:w-3/4 ml-3 mt-4 pl-4">
          <h2 className="text-4xl font-bold mb-4">Need Help?</h2>
          <p className="text-[15px] leading-relaxed text-gray-700 mb-4">
            Our tenant support team is here to help you every step of the way.
            From finding the right property to understanding lease terms, we're
            committed to making your rental experience smooth and successful.
          </p>
          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <img src={assets.tick} alt="tick" className="w-5 h-5 mt-1" />
              24/7 customer satisfaction
            </li>
            <li className="flex items-start gap-2">
              <img src={assets.tick} alt="tick" className="w-5 h-5 mt-1" />
              Free rental consultation
            </li>
            <li className="flex items-start gap-2">
              <img src={assets.tick} alt="tick" className="w-5 h-5 mt-1" />
              Application assistance
            </li>
            <li className="flex items-start gap-2">
              <img src={assets.tick} alt="tick" className="w-5 h-5 mt-1" />
              Move-in support
            </li>
          </ul>

          {/* Contact Boxes with Lucide Icons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Phone Box */}
            <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3 w-full sm:w-auto">
              <Phone size={18} className="text-gray-800" />
              <span className="text-sm text-gray-800">+1 (123) 456-7890</span>
            </div>

            {/* Email Box */}
            <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3 w-full sm:w-auto">
              <Mail size={18} className="text-gray-800" />
              <span className="text-sm text-gray-800">support@example.com</span>
            </div>
          </div>
        </div>

        {/* Image on the extreme right */}
        <div className="w-full md:w-1/2 flex justify-end">
          <img
            src={assets.tenant_help}
            alt="Tenant Help"
            className="h-auto w-[18rem] mt-3 mr-10 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Tenants;
