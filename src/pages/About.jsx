import React, { useRef, useState, useEffect } from "react";
import StatsSection from "../components/StatsSection";
import { assets } from "../assets/assets";
import { Volume2, VolumeX, ArrowDownRight, Phone } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

const About = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [startParagraph, setStartParagraph] = useState(false);

  // Mute toggle
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMute = !isMuted;
      videoRef.current.muted = newMute;
      setIsMuted(newMute);
    }
  };

  // Delay paragraph after heading finishes
  const handleHeadingDone = () => {
    setTimeout(() => {
      setStartParagraph(true);
    }, 500);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden">
      {/* Video Section with Overlay */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          src={assets.video}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-10" />

        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-40 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          aria-label="Toggle Mute"
        >
          {isMuted ? (
            <VolumeX className="text-brown w-5 h-5" />
          ) : (
            <Volume2 className="text-brown w-5 h-5" />
          )}
        </button>

        {/* Centered Text */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="font-italiana text-4xl md:text-5xl text-white mb-4">
            <Typewriter
              words={["About ShuqStay"]}
              typeSpeed={80}
              cursor={false}
              loop={1}
              onLoopDone={handleHeadingDone}
            />
          </h1>

          {startParagraph && (
            <>
              <p className="text-lg md:text-xl max-w-2xl mb-6">
                <Typewriter
                  words={[
                    "ShuqStay is your trusted partner in simplifying property rental experiences. We provide seamless, tech-driven solutions that streamline every aspect of renting – for landlords and tenants alike.",
                  ]}
                  typeSpeed={30}
                  cursor={false}
                  loop={1}
                />
              </p>

              {/* Know More Button */}
              <button className="flex items-center gap-2 text-white bg-black hover:bg-brown/90 px-6 py-2 rounded-full text-sm font-semibold transition">
                Know More
                <ArrowDownRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white md:px-8">
        <StatsSection />
      </div>

      <div className="flex flex-col mb-5 -mt-4 md:flex-row items-start gap-10">
        {/* Left: Text Content */}
        <div className="my-4 ml-8 md:w-1/2">
          <h2 className="text-4xl font-bold mb-4 font-italiana">Our Story</h2>
          <div className="text-[15px] leading-relaxed text-gray-700">
            <p>
              RentEasy was born from a simple frustration: finding quality
              rental properties shouldn't be so complicated. Our founder, Sarah
              Williams, experienced firsthand the challenges of navigating the
              rental market as both a tenant and property owner.
            </p>
            <p>
              In 2010, she assembled a team of real estate veterans and tech
              innovators to create a platform that would revolutionize how
              people find, evaluate, and secure rental properties. Today, we're
              proud to serve over 50,000 happy tenants across 25+ major cities.
            </p>
            <p>
              Our commitment goes beyond just listings – we're building a
              community where transparency, trust, and exceptional service are
              the foundation of every interaction.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="mr-6 mt-4 md:w-1/2 relative">
          <img
            src={assets.team}
            alt="RentEasy office team meeting"
            className="rounded-tl-[5em] shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

<div className="bg-green_lt rounded-tl-[3em] min-h-[18rem] relative overflow-hidden m-8">
  <div className="bg-green rounded-tl-[3em] min-h-[17rem] w-full absolute right-0 bottom-0 flex flex-col justify-center items-center px-6 text-center space-y-4 py-6">
    <div className="flex justify-center">
      <Phone className="w-[2.5rem] h-[2.5rem] text-black" />
    </div>

    <h1 className="text-2xl font-bold text-gray-800">
      Need Help Getting Started?
    </h1>

    <p className="text-sm text-gray-600 max-w-xl">
      Whether you're a landlord looking to streamline your property management,
      or a tenant searching for verified listings, our team is here to assist.
      Reach out to us for a personalized walkthrough or support with your
      rental needs.
    </p>

    <button className="flex items-center gap-2 text-white bg-brown hover:bg-brown/90 px-6 py-2 rounded-full text-sm font-semibold transition">
      Contact Our Team
    </button>
  </div>
</div>


 


    </div>
  );
};

export default About;
