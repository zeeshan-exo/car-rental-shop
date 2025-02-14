"use client";
import React, { useState } from "react";
import PreviewOrder from "./previewOrder";

export default function OrderModal({ orderId }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-2 py-1 rounded-md"
      >
        View Order
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg relative w-96">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
          
            <PreviewOrder orderId={orderId} />
          </div>
        </div>
      )}
    </>
  );
}
