"use client";
import React, { useState, useEffect } from "react";
import { getVendorOrders, updateOrderStatus } from "@/services/actions/order"; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

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
    setOrders(fetchedOrders);
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
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="w-full text-sm text-left text-gray-500">
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
            <tr key={order._id} className="bg-white border-b text-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900">{order.userName}</td>
              <td className="px-6 py-4">{order.carName}</td>
              <td className="px-6 py-4">{order.carModel}</td>
              <td className="px-6 py-4">{order.email}</td>
              <td className="px-6 py-4">{order.contact}</td>
              <td className="px-6 py-4">{order.date}</td>
              <td className="px-6 py-4">{order.time}</td>
              <td className="px-6 py-4">{order.address}</td>
              <td className="px-6 py-4">
                {/* <select
                  className="border p-1 rounded bg-gray-100"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                </select> */}


       <DropdownMenu >
    <DropdownMenuTrigger className="border p-2 rounded bg-gray-100">
      {order.status}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-slate-300 w-40">
      {/* <DropdownMenuLabel>Update Status</DropdownMenuLabel> */}
      <DropdownMenuSeparator className="bg-slate-300 hover:bg-slate-400"/>
      <DropdownMenuItem className="" onClick={() => handleStatusChange(order._id, "pending")}>
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
    </div>
  );
}
