
import React from "react";
import { getAllProducts } from "@/app/actions/products";
import ImageSlider from "@/app/components/ImageSlider";
import Image from "next/image";
import ViewProduct from "./viewProduct";

export default async function DisplayProducts() {
  const products = await getAllProducts();

  return (
    <div className="p-6">
   <div className="min-h-screen bg-[url('/anime-car.webp')] mb-10 rounded-2xl
    bg-current bg-cover bg-no-repeat bg-blend-normal p-8 shadow-lg flex flex-col md:flex-row items-center justify-between">

   <div className="flex flex-col items-start md:w-1/2 space-y-4">
    <h1 className="text-5xl font-extrabold text-white">Elevate Your Travel Experience</h1>
    <p className="text-lg text-white font-medium">Premium rental cars for every occasion</p>

    <div className="flex space-x-4">
      <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition">  Book Now </button>
      <button className="px-6 py-2 border border-white text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-black transition"> Explore </button>
    </div>
  </div>

  <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
    {/* <Image
      src="/bgCar.png"
      alt="Luxury Car"
      width={500}
      height={500}
      className="rounded-lg shadow-xl"
    /> */}
   </div>
   </div>
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow transform hover:-translate-y-1 p-5"
          >
            <div className="relative">
              {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                <ImageSlider images={product.images} />
              ) : (
                <img
                  src={product.image}
                  alt={product.carName}
                  className="w-full h-56 object-cover rounded-md"
                />
              )}
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.carName}</h2>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">Brand:</span> {product.brand}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">Model:</span> {product.model}
              </p>
              <p className="text-sm text-gray-500 mt-2">{product.description}</p>
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-green-600 font-bold text-lg">${product.price}</p>
                <ViewProduct productId={product._id.toString()}/>
              </div>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}