import React from "react";
import { getVendorCars } from "@/services/actions/cars";
import DeletecarButton from "./deleteCar";
import ImageSlider from "@/components/ImageSlider";
import Viewcar from "@/app/vendor/cars/viewCar";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Car, Box, DollarSign, Tag, Eye } from "lucide-react";

export default async function DisplayVendorCars() {
  const cars = await getVendorCars();

  if (!cars || cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <Car className="w-12 h-12 text-gray-300 mb-2" />
        <p className="text-gray-500 text-center font-medium">
          No cars found in your inventory.
        </p>
        <p className="text-gray-400 text-sm">Add your first car to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative h-60">
              {car.images &&
              Array.isArray(car.images) &&
              car.images.length > 0 ? (
                <div className="h-full ">
                  <ImageSlider images={car.images} />
                </div>
              ) : (
                <img
                  src={car.image}
                  alt={car.carName}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-3 right-3">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {car.brand}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                  {car.carName}
                </h2>
                <p className="text-green-600 font-bold text-xl">
                  <span className="flex items-center">
                    <DollarSign className="w-5 h-5" />
                    {car.rentalRate}
                  </span>
                </p>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-gray-600">
                  <Tag className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">Model Year:</span>
                  <span className="ml-1 text-sm font-medium">
                    {car.modelYear}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Box className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">Available:</span>
                  <span className="ml-1 text-sm font-medium">
                    {car.carQuantity} units
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">City:</span>
                  <span className="ml-1 text-sm font-medium">{car.city}</span>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm line-clamp-1 mb-4 ">
                {car.details?.text}
              </p>

              
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <Viewcar carId={car._id.toString()} />
                <DeletecarButton carId={car._id.toString()} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
