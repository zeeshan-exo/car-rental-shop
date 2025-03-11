"use client";
import React, { useState, useEffect } from "react";
import { getOneOrder, confirmOrder, updateOrderStatus } from "@/actions/booking";

interface Order{
  _id: string; 
  userName: string;
  productName: string;
  carModel: string;
  email: string;
  contact: string;
  date: string;
  time: string;
  address: string;
  status: string;
}

interface PreviewOrderProps{
  orderId: string,
  onClose: ()=> void,
  onStatusUpdate: (newStatus: string)=>void
}

export default function PreviewOrder({ orderId, onClose, onStatusUpdate,}: PreviewOrderProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const fetchedOrder = await getOneOrder(orderId);
      setOrder(fetchedOrder);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  const handleConfirmation = async () => {
    try {
      setConfirming(true);
      await updateOrderStatus(orderId);
      onStatusUpdate("confirmed");
      setConfirming(false);
      onClose();
    } catch (error) {
      console.error("Error confirming order:", error);
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Order not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" role="dialog" aria-modal="true">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <div className="space-y-2">
          <p><strong>User Name:</strong> {order.userName}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>ID Card:</strong> {order.contact}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Time:</strong> {order.time}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Car Model:</strong> {order.carModel}</p>
          <p><strong>Product Name:</strong> {order.productName}</p>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button 
          onClick={onClose}
          className="px-4 py-2 border border-gray-500 text-gray-600 rounded-md hover:bg-gray-200 transition"
          >
            close
          </button>
          <button 
            onClick={handleConfirmation}
            disabled={confirming || order.status === "confirmed"}
            className="bg-sky-500 text-white px-4 py-2 rounded-md"
          >
            {confirming ? "Confirming..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
