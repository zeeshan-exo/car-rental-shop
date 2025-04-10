"use client"
import React from 'react'
import Link from 'next/link'
import motion from "framer-motion"

const Features = () => {
  return (
    <div>
    <div 
        className="bg-AppDark text-AppLight py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Hit the Road?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Experience the freedom of the open road with our premium car rental service. Book today and enjoy the journey!</p>
          <Link
            href="/user/cars"
            className="bg-AppLight text-AppPrimary font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-300"
          >
            Book Your Car Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Features