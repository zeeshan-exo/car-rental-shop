"use client";
import React, { useMemo } from "react";
import { 
  Car, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type FiltersProps = {
  cars: any[];
  filters: Record<string, string | number>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string | number>>>;
  clearFilters: () => void;
};

export default function Filters({ 
  cars, 
  filters, 
  setFilters, 
  clearFilters 
}: FiltersProps) {
  // Memoized filter options to prevent unnecessary re-renders
  const filterOptions = useMemo(() => {
    return {
      brands: Array.from(new Set(cars.map((car) => car.brand))).map((brand) => ({
        value: brand,
        label: brand,
      })),
      cities: Array.from(new Set(cars.map((car) => car.city))).map((city) => ({
        value: city,
        label: city,
      })),
      rentalRates: [
        { value: 500, label: "Under $500" },
        { value: 1000, label: "Under $1000" },
        { value: 2000, label: "Under $2000" },
        { value: Math.max(...cars.map((car) => car.rentalRate)), label: `Full Range` },
      ],
    };
  }, [cars]);

  return (
    <div className="grid gap-6">
      {/* Brand Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <Car className="h-4 w-4" /> Brand
        </label>
        <Select 
          value={filters.brand as string} 
          onValueChange={(value) => setFilters(prev => ({...prev, brand: value}))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.brands.map((brand) => (
              <SelectItem key={brand.value} value={brand.value}>
                {brand.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <MapPin className="h-4 w-4" /> City
        </label>
        <Select 
          value={filters.city as string} 
          onValueChange={(value) => setFilters(prev => ({...prev, city: value}))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.cities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rental Rate Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <DollarSign className="h-4 w-4" /> Rental Rate
        </label>
        <Select 
          value={filters.rentalRate ? String(filters.rentalRate) : undefined} 
          onValueChange={(value) => setFilters(prev => ({...prev, rentalRate: Number(value)}))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Max Rate" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.rentalRates.map((rate) => (
              <SelectItem key={rate.value} value={String(rate.value)}>
                {rate.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Availability Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          {filters.availability === 'available' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />} 
          Availability
        </label>
        <Select 
          value={filters.availability as string} 
          onValueChange={(value) => setFilters(prev => ({...prev, availability: value}))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}