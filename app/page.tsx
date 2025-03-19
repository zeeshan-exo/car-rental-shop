"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import Features from '@/components/sections/Features';
import { getAllCars } from '@/actions/cars';

const LandingPage = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    availability: "all",
    minPrice: 0,
    maxPrice: 3000,
    city: ""
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getAllCars(); 
        
        if (response && Array.isArray(response.cars)) {
          setCars(response.cars.slice(0, 4)); 
        } else {
          console.error("Cars data is not an array:", response);
        }
  
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };
  
    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => {
    return (
      (filters.brand === "" || car.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
      (filters.availability === "all" || car.isAvailable === filters.availability) &&
      (filters.city === "" || car.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      car.rentalRate >= filters.minPrice &&
      car.rentalRate <= filters.maxPrice
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      <motion.div 
        className="bg-blue-600 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find Your Perfect Ride
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our extensive collection of premium vehicles
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="#cars" className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition duration-300">
              Browse Cars
            </a>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12" id="cars">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.h2 
            className="text-3xl font-bold mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Available Cars
          </motion.h2>
          
          <motion.div 
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Search by brand"
              className="border border-gray-300 rounded-md px-4 py-2"
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
            />
            <select 
              className="border border-gray-300 rounded-md px-4 py-2"
              onChange={(e) => setFilters({...filters, availability: e.target.value})}
            >
              <option value="all">All Cars</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
            <select 
              className="border border-gray-300 rounded-md px-4 py-2"
              onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
            >
              <option value="1000">Any Price</option>
              <option value="50">Under $100</option>
              <option value="200">Under $200</option>
              <option value="350">Under $350</option>
              <option value="500">Under $500</option>
              <option value="750">Under $750</option>
              <option value="1000">Under $100</option>
            </select>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCars.map((car) => (
            <motion.div 
              key={car._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="relative pb-[60%] overflow-hidden">
                <img 
                  src={car.images && car.images.length > 0 ? car.images[0].cloudinaryUrl : "/api/placeholder/800/500"} 
                  alt={`${car.brand} ${car.carName}`} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {car.isAvailable === "booked" && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 m-2 rounded">
                    Reserved
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{car.brand} {car.carName}</h3>
                  <p className="text-lg font-bold text-blue-600">${car.rentalRate}/day</p>
                </div>
                <p className="text-gray-600 mb-3">Year: {car.modelYear}</p>
                <p className="text-gray-800 mb-4 line-clamp-1">{car.details?.text || "Experience luxury and comfort"}</p>
                
                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">{car.details?.specs?.transmission || "Automatic"}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">{car.details?.specs?.fuelType || "Gasoline"}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    className={`px-4 py-2 rounded-md ${car.isAvailable === "available" 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
                    disabled={car.isAvailable !== "available"}
                  >
                    {car.isAvailable === "available" ? "Book Now" : "Not Available"}
                  </button>
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition duration-300">
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredCars.length === 0 && (
          <motion.div 
            className="bg-white p-6 rounded-lg shadow text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg">No cars match your search criteria.</p>
            <p className="text-gray-600 mt-2">Try adjusting your filters.</p>
          </motion.div>
        )}
      </div>

       <Features/>

       <Footer/>
    </div>
  );
};

export default LandingPage;