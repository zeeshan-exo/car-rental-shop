import React from "react";
import { getAllProducts } from "@/app/actions/products";

export default async function DisplayProducts() {
  const products = await getAllProducts();

  if (products.length === 0) {
    return <p className="text-gray-500">No products found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 ">Products</h1>
      <div className="grid grid-flow-col  gap-4">
      <ul className= "" >
        {products.map((product) => (
          <li key={product._id} className="p-4 border rounded-md shadow-md">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>Name: {product.carName}</p>
            <p>Brand: {product.brand}</p>
            <p>Model: {product.model}</p>
           
            <p className="text-green-600 font-bold">${product.price}</p>
          </li>
        ))}
      </ul>
      </div>
     
    </div>
  );
}
