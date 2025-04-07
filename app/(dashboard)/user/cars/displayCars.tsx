"use client";
import React, { useState, useMemo } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
// import CarCard from "@/components/cars/CarCard";
import dynamic from "next/dynamic";
const CarCard = dynamic(() => import("@/components/cars/CarCard"))
import HeroBanner from "@/components/sections/HeroBanner";
import Filters from "@/components/cars/Filters";

type Car = {
  _id: string;
  brand: string;
  city: string;
  isAvailable: boolean;
  rentalRate: number;
  [key: string]: any;
};

interface DisplayCarsProps{
  cars: Car[]
}

const DisplayCars : React.FC<DisplayCarsProps> = ({ cars }) => {
  const [filters, setFilters] = useState<Record<string, string | number>>({});

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      return (
        (!filters.brand || car.brand === filters.brand) &&
        (!filters.city || car.city === filters.city) &&
        (!filters.availability || (filters.availability === "available" ? car.isAvailable : !car.isAvailable)) &&
        (!filters.rentalRate || car.rentalRate <= Number(filters.rentalRate))
      );
    });
  }, [cars, filters]);

  const clearFilters = () => {
    setFilters({});
  };

  const activeFilters = Object.entries(filters).map(([key, value]) => ({
    key,
    label: key === 'rentalRate' ? `Max Rate: $${value}` : 
           key === 'availability' ? `Availability: ${value}` : 
           `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
  }));

  return (
    <div className="bg-gray-50">
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-6 flex justify-between items-center">

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Cars
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[400px] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle >Filter Cars</SheetTitle>
              </SheetHeader>

              <Filters 
                cars={cars}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
              />

              {Object.keys(filters).length > 0 && (
                <Button 
                  variant="destructive" 
                  className="w-full mt-4"
                  onClick={clearFilters}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" /> Clear All Filters
                </Button>
              )}
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter.key} variant="secondary">
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div id="cars" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarCard key={car._id} car={car} />)
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-xl text-gray-500 mb-4">No cars match your filters</p>
              <Button 
              onClick={clearFilters} 
              className="bg-AppPrimary hover:bg-blue-600">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayCars