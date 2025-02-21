import React from "react";

const HeroBanner = () => {
  return (
    <section
      className="relative mb-12 rounded-2xl overflow-hidden bg-[url('/anime-car.webp')] bg-cover bg-center min-h-screen flex items-center"
      aria-label="Hero Banner"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="max-w-xl text-left space-y-6 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
            Elevate Your Journey
          </h1>
          <p className="text-base sm:text-lg text-gray-200 opacity-90 drop-shadow-sm">
            Rent premium cars for unforgettable adventures
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">
              Book Now
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Explore Fleet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;