import React from "react";
import CarCard from "@/components/CarCard";
import HeroBanner from "@/components/HeroBanner";

export default function Displaycars({cars}: {cars: any[]}){

  return (

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<HeroBanner />

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {cars.map((car) => (
    <CarCard key={car._id.toString()} car={car} />
  ))}
</div>
</div>
  );
}
