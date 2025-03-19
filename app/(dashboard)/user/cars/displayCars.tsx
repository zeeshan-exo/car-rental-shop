"use client"
import React from "react";
import CarCard from "@/components/cars/CarCard";
import HeroBanner from "@/components/sections/HeroBanner";

export default function Displaycars({cars}: {cars: any[]}){
  const [filetrs, setFilters] = useState({
    brand: "",
    availability: "all",
    city: ""
  })


  const filteredCars = cars.filter(car =>{
     return(
      (filetrs.brand === "")
     )
  })
  return (

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
<HeroBanner />

<div 
id="cars"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 scroll-t-16">
  {cars.map((car) => (
    <CarCard key={car._id} car={car} />
  ))}
</div>
</div>
  );
}
