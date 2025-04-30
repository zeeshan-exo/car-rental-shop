"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getVendorOrders } from "@/actions/booking";
import { useRouter } from "next/navigation";
import { Booking } from "@/lib/definitions/bookingDefinitions";
import { ClipboardList, ChevronRight, Calendar, Clock } from "lucide-react";

const RecentBookings = () => {
  const [orders, setOrders] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const fetchedOrders = await getVendorOrders();
      setOrders(fetchedOrders.slice(0, 3));
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-100",
          text: "text-amber-800",
        };
      case "confirmed":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
        };
      case "dispatched":
        return {
          bg: "bg-purple-100",
          text: "text-purple-800",
        };
      case "delivered":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
        };
      case "reject":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="bg-AppPrimary p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ClipboardList className="text-white" size={20} />
          <h2 className="text-lg font-semibold text-white">Current Bookings</h2>
        </div>
        <span className="bg-AppPrimaryHover text-white text-xs font-medium px-2 py-1 rounded-full">
          {orders.length} Active
        </span>
      </div>
      
      <div className="p-5">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="animate-pulse flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2 w-2/3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusStyle = getStatusStyles(order.status);
              return (
                <div
                  key={order._id}
                  className="flex flex-col p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-AppPrimary">
                        Order #{order._id.slice(-6)}
                      </span>
                      <span 
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-gray-500 hover:text-AppPrimary"
                      onClick={() => router.push(`/vendor/booking/${order._id}`)}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-gray-700">
                      {order.carDetails.carName} - {order.carDetails.carModel}
                    </p>
                    
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      {order.createdAt && (
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {formatDate(order.createdAt)}
                        </div>
                      )}
                      
                      {order.userDetails.userName && (
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-indigo-400 mr-1"></span>
                          {order.userDetails.userName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="bg-gray-100 inline-flex rounded-full p-3 mb-4">
              <ClipboardList className="text-gray-500" size={24} />
            </div>
            <p className="text-gray-600 font-medium">No orders available</p>
            <p className="text-gray-500 text-sm mt-1">New orders will appear here</p>
          </div>
        )}
        
        <Button
          className="w-full mt-5 bg-AppPrimary hover:bg-AppPrimaryHover text-white flex items-center justify-center transition-all"
          onClick={() => router.push("/vendor/booking")}
        >
          View All Orders
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default RecentBookings;