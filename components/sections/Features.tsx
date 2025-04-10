import React from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <div>
      <motion.div 
        className="bg-gray-100 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-AppLight p-6 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-AppPrimary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast & Simple</h3>
              <p className="text-AppDark">Book your car in minutes with our streamlined process.</p>
            </motion.div>
            
            <motion.div 
              className="bg-AppLight p-6 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-AppPrimary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-AppDark">All our vehicles undergo thorough inspection and maintenance.</p>
            </motion.div>
            
            <motion.div 
              className="bg-AppLight p-6 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-AppPrimary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-AppDark">Our customer service team is available round the clock.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-AppDark text-AppLight py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Hit the Road?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Experience the freedom of the open road with our premium car rental service. Book today and enjoy the journey!</p>
          <Link
            href="/user/cars"
            className="bg-AppLight text-AppPrimary font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-300"
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.95 }}
          >
            Book Your Car Now
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Features