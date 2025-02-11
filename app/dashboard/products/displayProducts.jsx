import React from "react";
import { getAllProducts } from "@/app/actions/products";
import ImageSlider from "@/app/components/ImageSlider";

export default async function DisplayProducts() {
  const products = await getAllProducts();


  return (
   
    <div className="p-6">
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow"
        >
          <div>
            {product.images &&
            Array.isArray(product.images) &&
            product.images.length > 0 ? (
              
              <ImageSlider images={product.images} />
            ) : (
              
              <img
                src={product.image}
                alt={product.carName}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">{product.carName}</h2>
            <p className="text-gray-600">
              Brand: <span className="font-medium">{product.brand}</span>
            </p>
            <p className="text-gray-600">
              Model: <span className="font-medium">{product.model}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            <p className="text-green-600 font-bold text-lg mt-2">
              ${product.price}
            </p>
           
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
