import React from "react";
import { getVendorCars } from "@/actions/cars";
import DeletecarButton from "./deleteCar";
import ImageSlider from "@/components/cars/ImageSlider";
import Viewcar from "@/app/(dashboard)/vendor/cars/viewCar";
import { MapPin, Car, Box, DollarSign, Tag } from "lucide-react";
import { formatCurrency } from "@/lib/currency";
import Image from "next/image";

export default async function DisplayVendorCars() {
  const cars = await getVendorCars();

  if (!cars || cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-AppLight rounded-lg border border-dashed border-AppSecondary/30">
        <Car className="w-12 h-12 text-AppSecondary/50 mb-2" />
        <p className="text-AppSecondary text-center font-medium">
          No cars found in your inventory.
        </p>
        <p className="text-AppSecondary/70 text-sm">Add your first car to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-AppLight border border-AppLight rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative h-60">
              {car.images &&
              Array.isArray(car.images) &&
              car.images.length > 0 ? (
                <div className="h-full">
                  <ImageSlider images={car.images} />
                </div>
              ) : (
                <Image
                  src={car.image}
                  alt={car.carName}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-3 right-3">
                <span className="bg-AppPrimary text-AppLight text-xs font-bold px-2 py-1 rounded-full">
                  {car.brand}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-AppDark line-clamp-1">
                  {car.carName}
                </h2>
                <p className="text-AppAccent font-bold text-xl">
                  <span className="flex items-center">
                    {formatCurrency(car.rentalRate)}
                  </span>
                </p>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-AppSecondary">
                  <Tag className="w-4 h-4 mr-2 text-AppPrimary/70" />
                  <span className="text-sm">Model Year:</span>
                  <span className="ml-1 text-sm font-medium">
                    {car.modelYear}
                  </span>
                </div>
                
                <div className="flex items-center text-AppSecondary">
                  <Box className="w-4 h-4 mr-2 text-AppPrimary/70" />
                  <span className="text-sm">Available:</span>
                  {/* <span className="ml-1 text-sm font-medium">
                    {car.carQuantity} units
                  </span> */}
                </div>

                <div className="flex items-center text-AppSecondary">
                  <MapPin className="w-4 h-4 mr-2 text-AppPrimary/70" />
                  <span className="text-sm">City:</span>
                  <span className="ml-1 text-sm font-medium">{car.city}</span>
                </div>
              </div>
              
              <p className="text-AppSecondary/80 text-sm line-clamp-1 mb-4">
                {car.details?.text}
              </p>
              
              <div className="flex items-center justify-between pt-3 border-t border-AppLight">
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