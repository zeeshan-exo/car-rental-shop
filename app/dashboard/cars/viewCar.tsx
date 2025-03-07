"use client";
import React, { useState } from "react";
import { getCar } from "@/services/actions/cars";
import { IoClose } from "react-icons/io5";
import ImageSlider from "@/components/ImageSlider";
import { Button } from "@/components/ui/button";
import BookingForm from "./bookingForm";
import { 
  Calendar, 
  Users, 
  Fuel, 
  GaugeCircle, 
  MapPin, 
  Shield, 
  Star,
  ChevronRight,
  Check,
  CircleUserRound
} from "lucide-react";

const benefits = [
  "Free cancellation up to 24 hours before pickup",
  "No hidden fees or charges",
  "24/7 customer support",
  "All cars sanitized before delivery"
];

interface ViewcarProps {
  carId: string;
}

export default function Viewcar({ carId }: ViewcarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const openModal = async () => {
    setLoading(true);
    setIsOpen(true);
    try {
      const carData = await getCar(carId);
      setCar(carData);
    } catch (error) {
      console.error("Error fetching car:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setCar(null);
  };

  const features = [
    { icon: <Users size={20} className="text-blue-500" />, label: "4 Seats" },
    { icon: <GaugeCircle size={20} className="text-blue-500" />, label: "Automatic" },
    { icon: <Fuel size={20} className="text-blue-500" />, label: "Hybrid" },
    { icon: <Calendar size={20} className="text-blue-500" />, label: "2024" },
    { icon: <MapPin size={20} className="text-blue-500" />, label: "GPS" },
    { icon: <Shield size={20} className="text-blue-500" />, label: "Insurance" },
  ];

  return (
    <div>
      <Button
        onClick={openModal}
        className="bg-amber-500 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-yellow-700 transition-all duration-300 font-medium flex items-center gap-2"
      >
        View Details <ChevronRight size={16} />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl relative overflow-hidden">
              {loading ? (
                <div className="h-96 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-gray-500 animate-pulse">Loading car details...</p>
                </div>
              ) : car && (
                <>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-8 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <Star className="mr-2" size={20} fill="white" stroke="none" /> 
                      Car Details
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-blue-700/50 rounded-full transition-colors text-white"
                    >
                      <IoClose size={24} />
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 p-8">
                    <div className="space-y-6">
                      <div className="rounded-xl overflow-hidden shadow-md">
                        {car.images && Array.isArray(car.images) && car.images.length > 0 ? (
                          <ImageSlider images={car.images} />
                        ) : (
                          <img
                            src={car.image}
                            alt={car.carName}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <CircleUserRound size={20} />
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Listed by</span>
                          <p className="font-medium text-gray-800">{car.vendor?.vendorName}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                          <Star className="mr-2 text-blue-500" size={18} /> Car Features
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-4">
                          {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-700 group hover:text-blue-600 transition-colors cursor-default">
                              <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                {feature.icon}
                              </div>
                              <span className="text-sm font-medium">{feature.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-3">
                          <button 
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`} 
                            onClick={() => setActiveTab('overview')}
                          >
                            Overview
                          </button>
                          <button 
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'booking' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('booking')}
                          >
                            Booking
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 space-y-6">
                        {activeTab === "overview" && (
                          <>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-3xl font-bold text-gray-800">{car.carName}</h2>
                                <div className="flex items-center gap-1 text-blue-500">
                                  <Star size={20} fill="currentColor" />
                                  <span className="text-sm font-medium">4.8</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-medium">
                                  {car.brand}
                                </span>
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-medium">
                                  {car.modelYear}
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-sm font-medium">
                                  Available: {car.carQuantity}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <p className="text-gray-700 leading-relaxed">{car.details?.text}</p>
                              </div>

                              <div className="space-y-2 mt-4">
                                <h4 className="font-medium text-gray-800">Benefits:</h4>
                                <ul className="space-y-2">
                                  {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-700">
                                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm">{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
                              <div className="flex items-end gap-2 mb-1">
                                <span className="text-3xl font-bold text-blue-900">${car.rentalRate}</span>
                                <span className="text-blue-700 mb-1">/day</span>
                              </div>
                              <p className="text-blue-700 text-sm mt-1">All taxes and fees included</p>
                            </div>
                          </>
                        )}

                        {activeTab === "booking" && (
                          <BookingForm
                            onClick={closeModal}
                            carModel={car.modelYear}
                            carName={car.carName}
                            carId={car._id}
                            vendorEmail={car.vendor?.vendorEmail}
                            vendorName = {car.vendor?.vendorName}
                            vendorId={car.vendor?.vendorId}
                            rentalRate={car.rentalRate}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
