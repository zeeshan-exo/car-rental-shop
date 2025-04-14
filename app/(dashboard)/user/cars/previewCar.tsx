"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getCar } from "@/actions/cars";
import { Button } from "@/components/ui/button";
import ImageSlider from "@/components/cars/ImageSlider";
import Image from "next/image";
import Loading from "@/components/Loading";
import { formatCurrency } from "@/lib/currency";
import Book from "./book";
import { 
  CircleUserRound, 
  Star, 
  Calendar, 
  Fuel, 
  GitBranch, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Tag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ViewcarProps {
  carId: string;
  onClose?: () => void;
}

const PreviewCar = ({ carId }: ViewcarProps) => {
  const [car, setCarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        const data = await getCar(carId);
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (carId) {
      fetchCarData();
    }
  }, [carId]);

  if (loading) {
    return <Loading />;
  }

  if (!car) {
    return (
      <div className="p-4 text-center">
        <p>Car information not available</p>
      </div>
    );
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="bg-AppPrimary hover:bg-AppPrimaryHover text-AppLight">
          Details
        </Button>
      </DrawerTrigger>
      <DrawerContent className="left-auto right-0 h-full w-full max-w-2xl p-0 rounded-none overflow-hidden">
        <div className="flex flex-col h-full overflow-hidden">
          <DrawerHeader className="pb-2 border-b px-6 pt-6">
            <DrawerTitle className="text-2xl font-bold">
              {car.carName} {car.modelYear}
            </DrawerTitle>
            <div className="flex gap-2 items-center mt-1">
              <Badge variant="outline" className="bg-AppPrimary/10">
                {car.brand}
              </Badge>
              <Badge variant="outline" className="bg-green-100">
                {car.isAvailable}
              </Badge>
            </div>
            <DrawerClose className="absolute right-4 top-4">
              <Button variant="ghost" size="icon">
                <XCircle className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4">
            <div className="mb-6 rounded-lg overflow-hidden">
              {car.images && Array.isArray(car.images) && car.images.length > 0 ? (
                <ImageSlider images={car.images} />
              ) : car.image ? (
                <Image
                  src={car.image}
                  alt={car.carName}
                  width={800}
                  height={450}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="bg-gray-200 w-full h-64 flex items-center justify-center rounded-lg">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 break-words text-sm">{car.details?.text}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-AppPrimary flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Model Year</p>
                  <p className="font-medium truncate">{car.modelYear}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Fuel className="text-AppPrimary flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-medium truncate">{car.details?.specs?.fuelType}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <GitBranch className="text-AppPrimary flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-medium truncate">{car.details?.specs?.transmission}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="text-AppPrimary flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-medium truncate">{car.city}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag className="text-AppPrimary flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Quantity Available</p>
                  <p className="font-medium truncate">{car.carQuantity}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="text-AppPrimary flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium truncate capitalize">{car.isAvailable}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Star className="mr-2 text-AppPrimary flex-shrink-0" size={18} /> Features
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.details?.specs?.features && Array.isArray(car.details.specs.features) ? (
                  car.details.specs.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No specific features listed</p>
                )}
              </div>
            </div>
          </div>
          
          <DrawerFooter className="border-t pt-4 px-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rental Rate</p>
                <p className="text-AppPrimary font-bold text-2xl">
                  {formatCurrency(car?.rentalRate)}<span className="text-sm font-normal">/day</span>
                </p>
              </div>
              {/* <Button
               className="bg-AppPrimary hover:bg-AppPrimaryHover px-6">
                Continue
              </Button> */}
              <Book car={car}/>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PreviewCar;