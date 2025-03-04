"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getVendorOrders } from "@/services/actions/order";
import { useRouter } from "next/navigation";


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

const CurrentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getVendorOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
      <div className="border-b border-gray-100 bg-indigo-50 p-4">
        <h2 className="text-lg font-semibold text-indigo-800">Current Orders</h2>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">Order #{order._id.slice(-4)}</p>
                  <p className="text-sm text-gray-500">
                    {order.carName} - {order.carModel}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : order.status === "confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "dispatched"
                      ? "bg-purple-100 text-purple-800"
                      : order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "reject"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No orders available.</p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
          onClick={()=> useRouter().push("/vendor/orders")}
        >
          View All Orders
        </Button>
      </div>

    </div>
  );
};

export default CurrentOrders;
