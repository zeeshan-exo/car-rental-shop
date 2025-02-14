import React from "react";
import { getAllProducts } from "@/services/actions/products";
import ImageSlider from "@/components/ImageSlider";
import Image from "next/image";
import ViewProduct from "./viewProduct";
import Link from "next/link";

export default async function DisplayProducts() {
  const products = await getAllProducts();

  return (
    <div className="p-6">

      <div className="min-h-screen bg-[url('/anime-car.webp')] mb-10 rounded-2xl bg-cover bg-no-repeat p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between relative">
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
        
        <div className="flex flex-col items-start md:w-1/2 space-y-4 relative z-10">
          <h1 className="text-5xl font-extrabold text-white leading-tight">Elevate Your Travel Experience</h1>
          <p className="text-lg text-gray-300 font-medium">Premium rental cars for every occasion</p>
          
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition">
              Book Now
            </button>
            <Link href="/dashboard" className="px-6 py-2 border border-white text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-black transition">
              Explore 
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6">
            <div className="relative">
              {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                <ImageSlider images={product.images} />
              ) : (
                <img
                  src={product.image}
                  alt={product.carName}
                  className="w-full h-56 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-gray-900">{product.carName}</h2>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">Brand:</span> {product.brand}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">Model:</span> {product.model}
              </p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-1">{product.description}</p>
              <p className="text-gray-600">
                <span className="text-sm text-gray-700">Owner:</span> {product.vendorName}
              </p>

              <div className="flex justify-between items-center mt-4">
                <p className="text-green-600 font-bold text-lg">${product.price}</p>
              </div>
            </div>

            <div className="mt-4">
              <ViewProduct productId={product._id.toString()} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
