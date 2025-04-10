import React from "react";
import dynamic from "next/dynamic";
// const ImageSlider = dynamic(() => import("./ImageSlider"), {ssr : false})
import ImageSlider from "./ImageSlider";
import Image from "next/image";
import Viewcar from "@/app/(dashboard)/user/cars/viewCar";
import { Users, GaugeCircle, Fuel, CalendarDays } from "lucide-react";
import { formatCurrency } from "@/lib/currency";

const CarCard = ({ car }) => {
  return (
    <article className="group bg-AppLight rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      <div className="relative aspect-[16/10]">
        {car.images && Array.isArray(car.images) && car.images.length > 0 ? (
          <ImageSlider images={car.images} />
        ) : (
          <div className="relative h-full">
            <Image
              src={car.image}
              alt={`${car.carName} image`}
              width={400}
              height={250}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        )}
        <span className="absolute top-4 right-4 bg-AppPrimary text-AppLight text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
          {formatCurrency(car.rentalRate)}/day
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{car.carName}</h3>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              {car.brand}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              {car.modelYear}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              {car.isAvailable}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-AppDark">
            <Users size={16} />
            <span >4 Seats</span>
          </div>
          <div className="flex items-center gap-2 text-AppDark">
            <GaugeCircle size={16} />
            <span className="line-clamp-1">{car.details?.specs?.transmission || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-AppDark">
            <Fuel size={16} />
            <span className="line-clamp-1">{car.details?.specs?.fuelType || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-AppDark">
            <CalendarDays size={16} />
            <span>{car.modelYear}</span>
          </div>
        </div>

        <p className="text-AppDark text-sm line-clamp-1">{car.details?.text}</p>

        <div className="pt-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {car.vendor?.vendorName[0].toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-AppDark">
              Listed by <span className="font-medium text-gray-900">{car.vendor?.vendorName}</span>
            </span>
          </div>
          <Viewcar carId={car._id.toString()} />
        </div>
      </div>
    </article>
  );
};

export default CarCard;
