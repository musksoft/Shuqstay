import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { assets } from "../assets/assets";

const stats = [
  {
    label: "Tenants",
    value: 2000,
    icon: assets.tenant_ic,
    outerColor: "bg-brown",
    innerColor: "bg-white",
    borderColor: "border-brown",
  },
  {
    label: "Landlords",
    value: 500,
    icon: assets.building_ic,
    outerColor: "bg-green",
    innerColor: "bg-white",
    borderColor: "border-green",
  },
  {
    label: "Properties",
    value: 1200,
    icon: assets.home_ic,
    outerColor: "bg-blue",
    innerColor: "bg-white",
    borderColor: "border-blue",
  },
  {
    label: "Cities Covered",
    value: 150,
    icon: assets.location_ic,
    outerColor: "bg-pink_lt",
    innerColor: "bg-white",
    borderColor: "border-pink_lt",
  },
];

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl text-black mb-10">
          Trusted by Thousands Across the Country
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.outerColor} rounded-tl-[5em] h-[10rem] relative overflow-hidden`}
            >
              <div
                className={`${stat.innerColor} ${stat.borderColor} border-2 rounded-tl-[5em] h-full w-[95%] absolute right-0 top-0 flex flex-col justify-center items-center px-6 text-center`}
              >
                <img
  src={stat.icon}
  alt={stat.label}
  className="w-[3rem] h-auto mb-2" 
/>

                <div className="text-xl font-semibold text-gray-800">
                  {inView ? (
                    <CountUp end={stat.value} duration={2.5} separator="," />
                  ) : (
                    "0"
                  )}
                  +
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
