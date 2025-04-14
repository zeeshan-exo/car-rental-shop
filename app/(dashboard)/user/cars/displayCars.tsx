"use client";
import React, { useState, useMemo } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
const CarCard = dynamic(() => import("@/components/cars/CarCard"));
import Filters from "@/components/cars/Filters";

type Car = {
  _id: string;
  brand: string;
  carName: string;
  modelYear: number;
  city: string;
  isAvailable: string;
  rentalRate: number;
  details: {
    specs: {
      fuelType: string;
      transmission: string;
    };
    features: string[];
  };
  [key: string]: any;
};

interface DisplayCarsProps {
  cars: Car[];
}

const DisplayCars: React.FC<DisplayCarsProps> = ({ cars }) => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {

      if (filters.brands?.length > 0 && 
          !filters.brands.includes(car.brand)) {
        return false;
      }

      if (filters.cities?.length > 0 && 
          !filters.cities.includes(car.city)) {
        return false;
      }

      if (filters.fuelType?.length > 0 && 
          !filters.fuelType.includes(car.details?.specs?.fuelType)) {
        return false;
      }

      if (filters.transmission?.length > 0 && 
          !filters.transmission.includes(car.details?.specs?.transmission)) {
        return false;
      }

      if (filters.availability?.length > 0 && 
          !filters.availability.includes(car.isAvailable)) {
        return false;
      }
      
      if (filters.maxRate && car.rentalRate > filters.maxRate) {
        return false;
      }
      
      return true;
    });
  }, [cars, filters]);

  const clearFilters = () => {
    setFilters({});
  };

  const removeFilter = (key: string, value?: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      
      if (key === 'maxRate') {
        delete newFilters[key];
      } else if (value !== undefined) {
        newFilters[key] = newFilters[key].filter((v: any) => v !== value);
        if (newFilters[key].length === 0) {
          delete newFilters[key];
        }
      } else {
        delete newFilters[key];
      }
      
      return newFilters;
    });
  };

  const activeFilterBadges = useMemo(() => {
    const badges = [];

    if (filters.brands?.length) {
      filters.brands.forEach((brand: string) => {
        badges.push({
          key: `brand-${brand}`,
          label: brand,
          onClick: () => removeFilter('brands', brand)
        });
      });
    }

    if (filters.cities?.length) {
      filters.cities.forEach((city: string) => {
        badges.push({
          key: `city-${city}`,
          label: city,
          onClick: () => removeFilter('cities', city)
        });
      });
    }

    if (filters.fuelType?.length) {
      filters.fuelType.forEach((fuel: string) => {
        badges.push({
          key: `fuel-${fuel}`,
          label: fuel,
          onClick: () => removeFilter('fuelType', fuel)
        });
      });
    }

    if (filters.transmission?.length) {
      filters.transmission.forEach((trans: string) => {
        badges.push({
          key: `trans-${trans}`,
          label: trans,
          onClick: () => removeFilter('transmission', trans)
        });
      });
    }

    if (filters.availability?.length) {
      filters.availability.forEach((status: string) => {
        badges.push({
          key: `avail-${status}`,
          label: `${status}`,
          onClick: () => removeFilter('availability', status)
        });
      });
    }

    if (filters.maxRate) {
      badges.push({
        key: 'max-price',
        label: `Max $${filters.maxRate}`,
        onClick: () => removeFilter('maxRate')
      });
    }
    
    return badges;
  }, [filters]);

  return (
    <div className="bg-gray-50 flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-64 lg:sticky lg:top-0 lg:h-screen hidden lg:block p-4">
        <div className="mb-4 flex justify-between items-center">
          {/* <h2 className="text-xl font-bold">Filters</h2> */}
          {Object.keys(filters).length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
        <Filters 
          cars={cars}
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
        />
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Available Cars</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 lg:hidden">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filter Cars</SheetTitle>
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
          </div>

          {activeFilterBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilterBadges.map(badge => (
                <Badge 
                  key={badge.key} 
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={badge.onClick}
                >
                  {badge.label}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
              
              {activeFilterBadges.length > 1 && (
                <Badge 
                  variant="outline"
                  className="flex items-center gap-1 cursor-pointer hover:bg-gray-100"
                  onClick={clearFilters}
                >
                  Clear All
                </Badge>
              )}
            </div>
          )}

          <p className="text-sm text-gray-500">
            Showing {filteredCars.length} of {cars.length} cars
          </p>
        </div>

        <div id="cars" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarCard key={car._id} car={car} />)
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-xl text-gray-500 mb-4">No cars match your filters</p>
              <Button 
                onClick={clearFilters} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayCars;