import React from "react";
import { getVendorProducts } from "@/app/actions/products";

export default async function DisplayVendorProducts() {
  const products = await getVendorProducts();

  if (!products || products.length === 0) {
    return <p className="text-gray-500 text-center">No products found.</p>;
  }

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-6 text-center">Your Products</h1> */}
      
      <div className="grid grid-cols-3 w-full gap-6">
        {products.map((product) => (
          <div key={product._id} className=" border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow">
            <img
              src={product.image}
              alt={product.carName}
              className="w-full h-48 object-cover rounded-md"
            />
            
            <div className="mt-4">
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
