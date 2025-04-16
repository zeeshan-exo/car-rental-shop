"use client";
import React, { useState, useEffect } from "react";
import { getCar } from "@/actions/cars";
import { X } from "lucide-react";
import ImageSlider from "@/components/cars/ImageSlider";
import { Button } from "@/components/ui/button";
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
import { formatCurrency } from "@/lib/currency";
import Booking from "./booking";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const benefits = [
  "Free cancellation up to 24 hours before pickup",
  "No hidden fees or charges",
  "24/7 customer support",
  "All cars sanitized before delivery"
];

interface ViewcarProps {
  carId: string;
  onClose?: () => void;
}

const Viewcar: React.FC<ViewcarProps> = ({ carId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingForm, setShowBookingForm] = useState(false);

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
    setActiveTab('overview');
    setShowBookingForm(false);
  };
  
  // Effect to show booking form when booking tab is selected
  useEffect(() => {
    if (activeTab === 'booking') {
      setShowBookingForm(true);
    } else {
      setShowBookingForm(false);
    }
  }, [activeTab]);

  return (
    <div>
      <Button
        onClick={openModal}
        className="bg-AppPrimary text-AppLight px-6 py-2.5 rounded-lg shadow-md hover:bg-AppPrimaryHover transition-all duration-300 font-medium flex items-center gap-2"
      >
        Details <ChevronRight size={16} />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-AppLight w-full max-w-6xl rounded-2xl shadow-2xl relative overflow-hidden">
              {loading ? (
                <div className="h-96 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-gray-500 animate-pulse">Loading car details...</p>
                </div>
              ) : car && (
                <>
                  <div className="bg-gradient-to-r from-AppPrimary to-AppPrimaryHover py-4 px-8 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-AppLight flex items-center">
                      <Star className="mr-2" size={20} fill="white" stroke="none" /> 
                      {activeTab === 'overview' ? 'Car Details' : 'Book This Car'}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-blue-700/50 rounded-full transition-colors text-AppLight"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 p-8">
                    <div className="space-y-6">
                      <div className="rounded-xl overflow-hidden shadow-md">
                        {car.images && Array.isArray(car.images) && car.images.length > 0 ? (
                          <ImageSlider images={car.images} />
                        ) : (
                          <Image
                            width={500}
                            height={300}
                            src={car.image || "/images/car-placeholder.jpg"}
                            alt={car.carName}
                            loading="lazy"
                            className="w-full h-64 object-cover"
                          />
                        )}
                      </div>

                      
                      
                      {activeTab === 'overview' && (
                        <>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-blue-100">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-AppPrimary">
                          <CircleUserRound size={20} />
                        </div>
                        <div>
                          <span className="text-AppDark text-sm">Listed by</span>
                          <p className="font-medium text-gray-800">{car.vendor?.vendorName || "Vendor"}</p>
                        </div>
                      </div>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                            <Star className="mr-2 text-AppPrimary" size={18} /> Features
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-4">
                            {car.details?.features && car.details.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-gray-700 group hover:text-AppPrimary transition-colors cursor-default">
                                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                  {getFeatureIcon(feature)}
                                </div>
                                <span className="text-sm font-medium">{feature}</span>
                              </div>
                            ))}
                            
                            {car.details?.specs?.fuelType && (
                              <div className="flex items-center gap-2 text-gray-700 group hover:text-AppPrimary transition-colors cursor-default">
                                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                  <Fuel size={20} className="text-AppPrimary" />
                                </div>
                                <span className="text-sm font-medium">{car.details.specs.fuelType}</span>
                              </div>
                            )}
                            
                            {car.details?.specs?.transmission && (
                              <div className="flex items-center gap-2 text-gray-700 group hover:text-AppPrimary transition-colors cursor-default">
                                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                  <GaugeCircle size={20} className="text-AppPrimary" />
                                </div>
                                <span className="text-sm font-medium">{car.details.specs.transmission}</span>
                              </div>
                            )}
                            
                            {car.modelYear && (
                              <div className="flex items-center gap-2 text-gray-700 group hover:text-AppPrimary transition-colors cursor-default">
                                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                  <Calendar size={20} className="text-AppPrimary" />
                                </div>
                                <span className="text-sm font-medium">{car.modelYear}</span>
                              </div>
                            )}
                            
                            {car.city && (
                              <div className="flex items-center gap-2 text-gray-700 group hover:text-AppPrimary transition-colors cursor-default">
                                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                  <MapPin size={20} className="text-AppPrimary" />
                                </div>
                                <span className="text-sm font-medium">{car.city}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        </>
                      )}
                      
                      {activeTab === 'booking' && (
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                            <Calendar className="mr-2 text-AppPrimary" size={18} /> Rental Summary
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                              <span className="text-gray-600">Car</span>
                              <span className="font-medium">{car.carName} ({car.modelYear})</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                              <span className="text-gray-600">Rental Rate</span>
                              <span className="font-medium">{formatCurrency(car.rentalRate)}/day</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                              <span className="text-gray-600">Location</span>
                              <span className="font-medium">{car.city || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2">
                              <span className="text-gray-600">Available Units</span>
                              <span className="font-medium">{car.carQuantity || 0}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-3">
                          <button 
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-100 text-AppPrimary' : 'text-AppDark hover:bg-gray-100'}`} 
                            onClick={() => setActiveTab('overview')}
                          >
                            Overview
                          </button>
                          <button 
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'booking' ? 'bg-blue-100 text-AppPrimary' : 'text-AppDark hover:bg-gray-100'}`}
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
                                {car.isAvailable === "available" && (
                                  <div className="flex items-center gap-1 text-AppPrimary">
                                    <Star size={20} fill="currentColor" />
                                    <span className="text-sm font-medium">Available</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Badge 
                                variant="outline"
                                className="px-3 py-1 bg-blue-50 text-AppPrimary border border-blue-100 rounded-lg text-sm font-medium">
                                  {car.brand}
                                </Badge>
                                <Badge 
                                variant="outline"
                                className="px-3 py-1 bg-blue-50 text-AppPrimary border border-blue-100 rounded-lg text-sm font-medium">
                                  {car.modelYear}
                                </Badge>
                                <Badge 
                                variant="outline"
                                className={`px-3 py-1 ${
                                  car.carQuantity > 0 
                                    ? "bg-green-50 text-green-700 border-green-100" 
                                    : "bg-red-50 text-red-700 border-red-100"
                                } border rounded-lg text-sm font-medium`}>
                                  {car.carQuantity > 0 ? `Available: ${car.carQuantity}` : "Not Available"}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-white rounded-lg p-4 border border-gray-100">
                                <p className="text-AppDark text-sm leading-relaxed">{car.details?.text || "No description available for this vehicle."}</p>
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

                            <div className="bg-gray-50 p-6 rounded-xl border border-blue-200 shadow-sm">
                              <div className="flex items-end gap-2 mb-1">
                                <span className="text-3xl font-bold text-AppPrimary">{formatCurrency(car.rentalRate)}</span>
                                <span className="text-AppPrimary mb-1">/day</span>
                              </div>
                              <p className="text-AppPrimary text-sm mt-1">All taxes and fees included</p>
                              
                              <Button 
                                onClick={() => setActiveTab('booking')}
                                disabled={car.carQuantity <= 0 || car.isAvailable !== "available"}
                                className="w-full mt-4 bg-AppPrimary text-AppLight py-2.5 rounded-lg shadow-md hover:bg-AppPrimaryHover transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Book Now
                              </Button>
                            </div>
                          </>
                        )}

                        {activeTab === "booking" && showBookingForm && (
                          <div className="h-full">
                            <Booking
                              carModel={car.modelYear}
                              carName={car.carName}
                              carId={car._id}
                              vendorEmail={car.vendor?.vendorEmail}
                              vendorName={car.vendor?.vendorName}
                              vendorId={car.vendor?.vendorId}
                              rentalRate={car.rentalRate}
                            />
                          </div>
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
};

const getFeatureIcon = (feature) => {
  feature = feature.toLowerCase();
  if (feature.includes('seat')) {
    return <Users size={20} className="text-AppPrimary" />;
  } else if (feature.includes('bluetooth')) {
    return <Shield size={20} className="text-AppPrimary" />;
  } else if (feature.includes('electric') || feature.includes('battery')) {
    return <Fuel size={20} className="text-AppPrimary" />;
  } else if (feature.includes('automatic')) {
    return <GaugeCircle size={20} className="text-AppPrimary" />;
  } else {
    return <Check size={20} className="text-AppPrimary" />;
  }
};

export default Viewcar;