"use client";

import { useEffect, useState } from "react";
import { socket } from "@/app/socket"; 
import { getSocket } from "@/lib/socket";
import { Bell, X } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState<{ message: string }[]>([]);
  const [openModal, setModal] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.warn(" Socket is not connected.");
      return;
    }
  
    const handleOrderCreated = (data: { message: string }) => {
      console.log(" Notification received:", data);
      setNotifications((prev) => [...prev, data]);
    };
  
    socket.on("order_placed", handleOrderCreated);
    socket.on("order_updated", handleOrderCreated);
  
    return () => {
      socket.off("order_placed", handleOrderCreated);
      socket.off("order_updated", handleOrderCreated);
    };
  }, []);
  
  return (
    <div className="fixed z-50">
      <button
     className="p-2 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-100 mr-4"
     onClick={() => setModal(!openModal)}
>
    <Bell className="w-6 h-6 text-gray-700" />
     {notifications.length > 0 && (
      <span className="ml-1 text-xs text-red-600 font-bold">
      {notifications.length}
       </span>
     )}
     </button>


      {openModal && (
        <div className="absolute top-12 right-0 w-80 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button onClick={() => setModal(false)}>
              <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            </button>
          </div>
          <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="p-2 border rounded-md bg-gray-100 text-sm"
                >
                  {notification.message}
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center">No notifications</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
