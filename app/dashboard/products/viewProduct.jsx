"use client";
import React, { useState } from "react";
import { getProduct } from "@/app/actions/products";
import { IoClose } from "react-icons/io5"; 
import ImageSlider from "@/app/components/ImageSlider";

export default function ViewProduct({ productId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const openModal = async () => {
    setIsOpen(true);
    try {
      const productData = await getProduct(productId);
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct(null);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
      >
        View Product
      </button>

      {isOpen && product && (
        <div className="fixed w-auto inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
            >
              <IoClose />
            </button>

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
            <h2 className="text-2xl font-bold text-gray-800">{product.carName}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-green-600 font-semibold text-lg mt-4">
              ${product.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
