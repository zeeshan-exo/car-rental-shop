"use client"
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <motion.section
      className="relative mb-12 rounded-2xl overflow-hidden bg-[url('/anime-car.webp')] bg-cover bg-center min-h-screen flex items-center"
      aria-label="Hero Banner"
    >

      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10"
        initial={{ opacity: 0, y: 50 }}  
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} 
      >
        <motion.div 
          className="max-w-xl text-left space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} 
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
            Elevate Your Journey
          </h1>
          <p className="text-base sm:text-lg text-gray-200 opacity-90 drop-shadow-sm">
            Rent premium cars for unforgettable adventures
          </p>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          >
            <Link href="#cars" scroll={true}>
            <Button className="px-6 py-3 bg-AppAccent text-black font-semibold rounded-lg shadow-lg hover:bg-amber-500 transition-all duration-300 transform hover:scale-105">
              Book Now
            </Button>
            </Link>
            <Link href="#cars" scroll={true} >
            <Button
            className="px-6 py-3 border-2 bg-transparent border-white text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Explore Fleet
            </Button>  
            
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroBanner;
