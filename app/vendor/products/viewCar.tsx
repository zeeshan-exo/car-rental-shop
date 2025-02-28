"use client";
import React, { useState } from "react";
import { getCar } from "@/services/actions/products";
import { IoClose } from "react-icons/io5";
import ImageSlider from "@/components/ImageSlider";
import ProductForm from "./productForm";
import { 
  Calendar, 
  Users, 
  Fuel, 
  GaugeCircle, 
  MapPin, 
  Shield, 
  Star,
  Edit,
  ChevronRight,
  Check
} from "lucide-react";

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

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 font-medium flex items-center gap-2"
      >
        View Details <ChevronRight size={16} />
      </button>

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

                  {isEditing ? (
                    <div className="p-8">
                      <ProductForm carData={car} />
                    </div>
                  ) : (
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
                      </div>

                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-3xl font-bold text-gray-800">{car.carName}</h2>
                          <button 
                            className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors"
                            onClick={() => setIsEditing(true)}
                          >
                            <Edit size={14} /> Edit
                          </button>
                        </div>

                        <p className="text-gray-700">{car.description}</p>

                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
                          <div className="flex items-end gap-2 mb-1">
                            <span className="text-3xl font-bold text-blue-900">${car.price}</span>
                            <span className="text-blue-700 mb-1">/day</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
