import React from "react";
import { getVendorProducts } from "@/app/actions/products";

export default async function DisplayVendorProducts() {
  const products = await getVendorProducts();


  if (!products || products.length === 0) {
    return <p className="text-gray-500">No products found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ul>
          {products.map((product) => (
            <li key={product._id} className="p-4 border rounded-md shadow-md">
              <img
              src={product.image}
              alt={product.carName}
              />

              <h2 className="text-lg font-semibold">{product.carName}</h2>
              <p>Brand: {product.brand || 'N/A'}</p>
              <p>Model: {product.model || 'N/A'}</p>
              <p className="text-green-600 font-bold">
                ${product.price}
              </p>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
