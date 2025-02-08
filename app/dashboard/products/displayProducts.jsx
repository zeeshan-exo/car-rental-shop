import React from "react";
import { getAllProducts } from "@/app/actions/products";

export default async function DisplayProducts() {
  const products = await getAllProducts();


  return (
   
    <div className="p-4 m-0">
    {/* <div className="h-80 mx-0 bg-[url('/car.jpg')] bg-cover bg-center flex items-center justify-center mb-4">
      <h2 className="text-2xl text-white text-start">Let's ride with us</h2>
    </div> */}
 
    <div className="grid grid-cols-3 w-full gap-6">
      {products.map((product) => (
        <div key={product._id} className="border w-full rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow">
          <img
            src={product.image}
            alt={product.carName}
            className="w-full h-48 object-cover rounded-md"
          />
          
          <div className="mt-4 ">
            <h2 className="text-lg font-semibold">{product.carName}</h2>
            <p className="text-gray-600">Brand: <span className="font-medium">{product.brand}</span></p>
            <p className="text-gray-600">Model: <span className="font-medium">{product.model}</span></p>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            <p className="text-green-600 font-bold text-lg mt-2">${product.price}</p>
            
            </div>
          </div>
      ))}
    </div>
  </div>
  );
}
