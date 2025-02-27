"use client";
import React, { useState, useEffect } from "react";
import { getVendorOrders, updateOrderStatus } from "@/services/actions/order";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  _id: string;
  userName: string;
  productName: string;
  carName: string;
  carModel: string;
  email: string;
  contact: string;
  date: string;
  time: string;
  address: string;
  status: string;
}

export default function DisplayOrder() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const fetchedOrders = await getVendorOrders();
    setOrders(fetchedOrders || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } else {
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 border rounded-lg shadow-sm">
          <thead className="text-xs text-white uppercase bg-orange-500">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Car</th>
              <th className="px-6 py-3">Model</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="bg-white border-b text-gray-700 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{order.userName}</td>
                <td className="px-6 py-4">{order.carName}</td>
                <td className="px-6 py-4">{order.carModel}</td>
                <td className="px-6 py-4">{order.email}</td>
                <td className="px-6 py-4">{order.contact}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{order.time}</td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="border p-2 rounded bg-gray-100 hover:bg-gray-200 text-sm">
                      {order.status}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuItem onClick={() => handleStatusChange(order._id, "pending")}>
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order._id, "confirmed")}>
                        Confirmed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order._id, "dispatched")}>
                        Dispatched
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order._id, "delivered")}>
                        Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order._id, "rejected")}>
                        Rejected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}