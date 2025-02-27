"use client"
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Calendar, Car, MapPin, Search, Star, Users } from 'lucide-react';

export default function Home() {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  return (
    <>
      <Head>
        <title>DriveEasy - Premium Car Rentals</title>
        <meta name="description" content="Rent premium cars at affordable prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Header/Navigation */}
        <header className="bg-gray-900 text-white fixed w-full z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                Drive<span className="text-blue-500">Easy</span>
              </div>
              <nav className="hidden md:flex space-x-8 items-center">
                <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
                <a href="#cars" className="hover:text-blue-400 transition-colors">Cars</a>
                <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a>
                <a href="#testimonials" className="hover:text-blue-400 transition-colors">Reviews</a>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                  Sign Up
                </button>
              </nav>
              <button className="md:hidden text-2xl">☰</button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-24 bg-gradient-to-r from-blue-900 to-indigo-900 text-white min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium Cars at Affordable Prices</h1>
              <p className="text-xl mb-8">Rent the car of your dreams with our easy booking process and exceptional service.</p>
              <a href="#cars" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-transform hover:-translate-y-1">
                Explore Cars
              </a>

              {/* Search Form */}
              <div className="bg-white rounded-xl p-6 mt-10 shadow-lg text-left text-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="pickup" className="block text-sm font-medium mb-1">Pickup Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <input 
                        type="text" 
                        id="pickup" 
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                        placeholder="Enter city or airport" 
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="dropoff" className="block text-sm font-medium mb-1">Drop-off Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <input 
                        type="text" 
                        id="dropoff" 
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                        placeholder="Enter city or airport" 
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label htmlFor="pickup-date" className="block text-sm font-medium mb-1">Pickup Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <input 
                        type="date" 
                        id="pickup-date" 
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="return-date" className="block text-sm font-medium mb-1">Return Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <input 
                        type="date" 
                        id="return-date" 
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="car-type" className="block text-sm font-medium mb-1">Car Type</label>
                    <div className="relative">
                      <Car className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <select 
                        id="car-type" 
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                      >
                        <option value="">All Car Types</option>
                        <option value="economy">Economy</option>
                        <option value="compact">Compact</option>
                        <option value="midsize">Midsize</option>
                        <option value="suv">SUV</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Search className="h-5 w-5" />
                  Search Available Cars
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars */}
        <section id="cars" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Vehicles</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Choose from our premium selection of comfortable and reliable vehicles</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Car Card 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                <div className="relative h-48 w-full bg-gray-200">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="relative w-full h-full">
                      <Image 
                        src="/api/placeholder/400/300" 
                        alt="Toyota Camry" 
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">Toyota Camry</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm">4.8/5</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-4">$49<span className="text-sm text-gray-500 font-normal">/day</span></p>
                  <div className="flex justify-between mb-6 text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">5 Seats</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Automatic</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">A/C</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
              
              {/* Car Card 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                <div className="relative h-48 w-full bg-gray-200">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="relative w-full h-full">
                      <Image 
                        src="/api/placeholder/400/300" 
                        alt="Honda CR-V" 
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">Honda CR-V</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm">4.7/5</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-4">$65<span className="text-sm text-gray-500 font-normal">/day</span></p>
                  <div className="flex justify-between mb-6 text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">5 Seats</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Automatic</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">A/C</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
              
              {/* Car Card 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                <div className="relative h-48 w-full bg-gray-200">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="relative w-full h-full">
                      <Image 
                        src="/api/placeholder/400/300" 
                        alt="BMW 3 Series" 
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">BMW 3 Series</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm">4.9/5</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-4">$95<span className="text-sm text-gray-500 font-normal">/day</span></p>
                  <div className="flex justify-between mb-6 text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">5 Seats</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Automatic</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">A/C</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <button className="inline-flex items-center bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors">
                View All Vehicles
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Renting a car with DriveEasy is quick and simple</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold mb-3">Choose Your Car</h3>
                <p className="text-gray-600">Browse our extensive fleet and select the perfect vehicle for your needs.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold mb-3">Book Your Trip</h3>
                <p className="text-gray-600">Enter your details and confirm your booking in just a few clicks.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold mb-3">Enjoy Your Ride</h3>
                <p className="text-gray-600">Pick up your vehicle and enjoy the freedom of the open road.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Read testimonials from our satisfied customers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"The booking process was so simple, and the car was in perfect condition. Will definitely use DriveEasy for my next trip!"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <div className="relative w-full h-full">
                      <Image 
                        src="/api/placeholder/100/100" 
                        alt="Customer" 
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-gray-500 text-sm">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"Great selection of cars and excellent customer service. The staff went above and beyond to ensure I had a good experience."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <div className="relative w-full h-full">
                      <Image 
                        src="/api/placeholder/100/100" 
                        alt="Customer" 
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Roberts</h4>
                    <p className="text-gray-500 text-sm">Chicago, IL</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"I've used many rental companies before, but DriveEasy offers the best value for money. The BMW I rented was fantastic!"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <div className="relative w-full h-full">
                      <Image 
                        src="/api/placeholder/100/100" 
                        alt="Customer" 
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Jennifer Wilson</h4>
                    <p className="text-gray-500 text-sm">Miami, FL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg">Join thousands of satisfied customers and experience the freedom of the open road with DriveEasy.</p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg transition-colors">
              Get Started Today
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Drive<span className="text-blue-500">Easy</span></h3>
                <p className="text-gray-400">Premium car rentals at affordable prices. Experience the joy of driving with our exceptional service.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="#cars" className="text-gray-400 hover:text-white transition-colors">Cars</a></li>
                  <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                  <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Reviews</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>123 Main Street, New York, NY 10001</li>
                  <li>info@driveeasy.com</li>
                  <li>(555) 123-4567</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} DriveEasy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}