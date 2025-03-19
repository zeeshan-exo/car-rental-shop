"use client";
import React, { useState, useEffect } from "react";
import CarCard from "@/components/cars/CarCard";
import HeroBanner from "@/components/sections/HeroBanner";
import FilterModal from "@/components/cars/Filters";

export default function Displaycars({ cars }: { cars: any[] }) {
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [brands, setBrands] = useState<{ value: string; label: string }[]>([]);
  const [rentalRates, setRentalRates] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    const uniqueBrands = Array.from(new Set(cars.map((car) => car.brand))).map((brand) => ({
      value: brand,
      label: brand,
    }));
    
    const maxRentalRate = Math.max(...cars.map((car) => car.rentalRate));
    const rentalRateOptions = [
      { value: 500, label: "Under $500" },
      { value: 2000, label: "Under $2000" },
      { value: maxRentalRate, label: `Up to $${maxRentalRate}` },
    ];

    setBrands(uniqueBrands);
    setRentalRates(rentalRateOptions);
  }, [cars]);

  const filterFields = [
    { key: "brand", label: "Brand", options: brands },
    { key: "city", label: "City", options: Array.from(new Set(cars.map((car) => car.city))).map((city) => ({ value: city, label: city })) },
    {
      key: "availability",
      label: "Availability",
      options: [
        { value: "available", label: "Available" },
        { value: "booked", label: "Booked" },
      ],
    },
    { key: "rentalRate", label: "Rental Rate", options: rentalRates },
  ];

  const handleFilterChange = (updatedFilters: Record<string, string | number>) => {
    setFilters(updatedFilters);
  };

  const filteredCars = cars.filter((car) => {
    return (
      (!filters.brand || car.brand === filters.brand) &&
      (!filters.city || car.city === filters.city) &&
      (!filters.availability || (filters.availability === "available" ? car.isAvailable : !car.isAvailable)) &&
      (!filters.rentalRate || car.rentalRate <= Number(filters.rentalRate))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
     <FilterModal filterFields={filterFields} onFilterChange={handleFilterChange}/>
      <HeroBanner />

      <div id="cars" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 scroll-t-16">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No cars match your filters.</p>
        )}
      </div>
    </div>
  );
}
