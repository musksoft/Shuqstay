import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import bgImage from "../assets/hero.png";

function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={`flex h-9 w-full rounded-md border px-3 py-1 text-base text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center bg-olive text-white font-medium px-5 py-2 rounded-full hover:bg-olive/90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Hero({ onSearch }) {
  const [formValues, setFormValues] = useState({
    location: "",
    priceRange: "any",
    bedrooms: "any",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formValues);
  };

  return (
    <section
      className="min-h-[85vh] flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-10 w-full max-w-6xl px-4 py-10 text-center">
        <h2 className="text-3xl md:text-5xl font-italiana text-black mt-4 mb-2">
          "Sakan Bin Sahla
        </h2>
        <h2 className="text-3xl md:text-5xl font-italiana text-black mb-8">
          - Renting Made Easy"
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Location */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  name="location"
                  placeholder="City, neighborhood..."
                  className="pl-8"
                  value={formValues.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Price Range
              </label>
              <select
                name="priceRange"
                value={formValues.priceRange}
                onChange={handleChange}
                className="w-full h-9 rounded-md border px-3 text-sm text-gray-700"
              >
                <option value="any">Any price</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-3000">$2,000 - $3,000</option>
                <option value="3000+">$3,000+</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <select
                name="bedrooms"
                value={formValues.bedrooms}
                onChange={handleChange}
                className="w-full h-9 rounded-md border px-3 text-sm text-gray-700"
              >
                <option value="any">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4+">4+ Bedrooms</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <Button type="submit" className="w-full max-w-xs">
              <Search className="h-4 w-4 mr-2" />
              Search Flats
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Hero;
