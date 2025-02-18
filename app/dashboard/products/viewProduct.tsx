"use client";
import React, { useState } from "react";
import { getProduct } from "@/services/actions/products";
import { IoClose } from "react-icons/io5"; 
import ImageSlider from "@/components/ImageSlider";
import BookingForm from "./bookingForm";

interface ViewProductProps{
  productId: string
}

export default function ViewProduct({productId}: ViewProductProps ) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<any>(null);

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
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition-all"
      >
        View Product
      </button>

      {isOpen && product && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 overflow-auto">
          <div className="bg-white p-10 rounded-lg shadow-xl w-full h-full items-center relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
            >
              <IoClose />
            </button>

            <div className="grid grid-cols-2 gap-6 h-full">
              <div className="relative">
                {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                  <ImageSlider images={product.images} />
                ) : (
                  <img
                    src={product.image}
                    alt={product.carName}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mt-4">{product.carName}</h2>
                  <p className="text-gray-600 mt-2">{product.brand}</p>
                  <p className="text-gray-600 mt-2">{product.model}</p>
                  <p className="text-gray-600 mt-2">Vendor: {product.vendorName}</p>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="text-green-600 font-semibold text-lg mt-4">
                    ${product.price}
                  </p>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button onClick={closeModal} className="px-4 py-2 border border-gray-500 text-gray-600 rounded-md hover:bg-gray-200 transition">
                    Close
                  </button>
                  <BookingForm onClick={closeModal} carModel={product.model} productName={product.carName} productId={product._id}/>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
