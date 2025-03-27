"use client";
import React, { useState } from "react";
import { getCar } from "@/actions/cars";
import { IoClose } from "react-icons/io5";
import ImageSlider from "@/components/cars/ImageSlider";
import ProductForm from "./carForm";
import { Button } from "@/components/ui/button";
import {  
  Users, 
  Fuel, 
  GaugeCircle, 
  Shield, 
  Star,
  Edit,
  ChevronRight,
} from "lucide-react";
import { formatCurrency } from "@/lib/currency";

interface ViewcarProps {
  carId: string;
}

export default function Viewcar({ carId }: ViewcarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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
    setIsEditing(false);
  };

  const renderCarDetails = () => {
    if (!car) return null;

    return (
      <div className="grid lg:grid-cols-2 gap-8 p-8">
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            {car.images && Array.isArray(car.images) && car.images.length > 0 ? (
              <ImageSlider images={car.images} />
            ) : (
              <img
                src={car.image}
                alt={car.carName}
                className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{car.carName}</h2>
              <div className="flex items-center space-x-2 text-AppDark">
                <Fuel className="text-AppPrimary" size={18} />
                <span className="text-sm">
                  {car.details?.specs?.fuelType || 'N/A'} | {car.details?.specs?.transmission || 'N/A'}
                </span>
              </div>
            </div>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-AppPrimary rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-md"
              onClick={() => setIsEditing(true)}
            >
              <Edit size={16} /> Edit Details
            </button>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <p className="text-AppDark italic">{car.details?.text || 'No additional details available.'}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <GaugeCircle className="text-AppPrimary" size={18} />
                <span className="text-sm text-AppSecondary">Mileage: {car.details?.specs?.mileage || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-AppPrimary" size={18} />
                <span className="text-sm text-AppSecondary">Capacity: {car.details?.specs?.capacity || 'N/A'}</span>
              </div>
            </div>

            {car.details?.specs?.features && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Special Features:</h3>
                <div className="flex flex-wrap gap-2">
                  {car.details.specs.features.map((feature, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-AppPrimary2">{formatCurrency(car.rentalRate)}</span>
                  <span className="text-AppPrimary2 mb-1">/day</span>
                </div>
                <p className="text-sm text-AppPrimary2 mt-1">Competitive daily rental rate</p>
              </div>
              <Shield className="text-green-500" size={36} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Button
        onClick={openModal}
        className="bg-AppPrimary text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-AppPrimary transition-all duration-300 font-medium flex items-center gap-2"
      >
        View Details <ChevronRight size={16} />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-AppLight w-full max-w-6xl rounded-3xl shadow-2xl relative overflow-hidden">
              {loading ? (
                <div className="h-96 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-gray-600 text-lg animate-pulse">Loading car details...</p>
                </div>
              ) : (
                <>
                  <div className="bg-AppPrimary y py-5 px-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <Star className="mr-3" size={24} fill="white" stroke="none" /> 
                      Car Details
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-3 hover:bg-AppSecondary/50 rounded-full transition-colors text-white"
                    >
                      <IoClose size={28} />
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="p-8">
                      <ProductForm carData={car} />
                    </div>
                  ) : (
                    renderCarDetails()
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}