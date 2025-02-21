"use client";
import React, { useState, useEffect } from "react";
import { getVendorOrders } from "@/services/actions/order";
import OrderModal from "./OrderModal";

interface Order{
  _id: string; 
  userName: string;
  productName: string;
  carName: string;
  carModel: string;
  email: string;
  idcard: string;
  date: string;
  time: string;
  address: string;
  status: string;
}

export default function DisplayOrder() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const fetchedOrders = await getVendorOrders();
    setOrders(fetchedOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = (orderId:string, newStatus:string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id.toString() === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-white uppercase bg-orange-500">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Car</th>
            <th scope="col" className="px-6 py-3">Model</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Id Card</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Time</th>
            <th scope="col" className="px-6 py-3">Address</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id.toString()} className="bg-white border-b text-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900">{order.userName}</th>
              <td className="px-6 py-4">{order.carName}</td>
              <td className="px-6 py-4">{order.carModel}</td>
              <td className="px-6 py-4">{order.email}</td>
              <td className="px-6 py-4">{order.idcard}</td>
              <td className="px-6 py-4">{order.date}</td>
              <td className="px-6 py-4">{order.time}</td>
              <td className="px-6 py-4">{order.address}</td>
              <td className="px-6 py-4">{order.status}</td>
              <td className="px-6 py-4">
                <OrderModal 
                  orderId={order._id.toString()}
                  onStatusUpdate={(newStatus) => updateOrderStatus(order._id.toString(), newStatus)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
