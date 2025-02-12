import React from "react";
import { getVendorProducts } from "@/app/actions/products";
import DeleteProductButton from "./deleteProduct";
import ImageSlider from "@/app/components/ImageSlider";

export default async function DisplayVendorProducts() {
  const products = await getVendorProducts();

  if (!products || products.length === 0) {
    return <p className="text-gray-500 text-center">No products found.</p>;
  }
  
  return (
    <div className="p-4">

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
              <div className="mt-2 flex items-center justify-between">
               <p className="text-green-600 font-bold text-lg">
                  ${product.price}
               </p>
                 <DeleteProductButton productId={product._id.toString()} />
             </div>
            </div>
          </div>
        ))}
      </div>
    

    </div>
  );
}
