"use client";
import React, { useState } from "react";
import { getCar } from "@/services/actions/products";
import { IoClose } from "react-icons/io5";
import ImageSlider from "@/components/ImageSlider";
import BookingForm from "./bookingForm";
import { 
  Calendar, 
  Users, 
  Fuel, 
  GaugeCircle, 
  MapPin, 
  Shield, 
  Star 
} from "lucide-react";

interface ViewcarProps {
  carId: string;
}

export default function Viewcar({ carId }: ViewcarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [car, setcar] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const openModal = async () => {
    setLoading(true);
    setIsOpen(true);
    try {
      const carData = await getCar(carId);
      setcar(carData);
    } catch (error) {
      console.error("Error fetching car:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setcar(null);
  };

  const features = [
    { icon: <Users size={20} />, label: "4 Seats" },
    { icon: <GaugeCircle size={20} />, label: "Automatic" },
    { icon: <Fuel size={20} />, label: "Hybrid" },
    { icon: <Calendar size={20} />, label: "2024" },
    { icon: <MapPin size={20} />, label: "GPS" },
    { icon: <Shield size={20} />, label: "Insurance" },
  ];

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-yellow-500 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 font-medium"
      >
        View Details
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl relative">
              {loading ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : car && (
                <>
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <IoClose size={24} className="text-gray-500" />
                  </button>

                  <div className="grid lg:grid-cols-2 gap-8 p-8">
                    <div className="space-y-6">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden">
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
                      
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Car Features</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-600">
                              {feature.icon}
                              <span className="text-sm">{feature.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col h-full">
                      <div className="flex-1 space-y-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-gray-800">{car.carName}</h2>
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star size={20} fill="currentColor" />
                              <span className="text-sm font-medium">4.8</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                              {car.brand}
                            </span>
                            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                              {car.model}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <p className="text-gray-600 leading-relaxed">{car.description}</p>
                          
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <span className="text-sm font-medium">
                                {car.vendorName[0].toUpperCase()}
                              </span>
                            </div>
                            <span>Listed by <span className="font-medium">{car.vendorName}</span></span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl">
                          <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-yellow-900">${car.price}</span>
                            <span className="text-yellow-700 mb-1">/day</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8">
                       
                        <div className="flex-1">
                          <BookingForm
                            onClick={closeModal}
                            carModel={car.model}
                            carName={car.carName}
                            carId={car._id}
                            vendorEmail={car.vendorEmail}
                          />
                        </div>
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

