"use client";

import { useEffect, useState, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { Bell, X, CheckCircle, AlertCircle } from "lucide-react";

export default function Notifications({ userId, role }: { userId: string; role: "customer" | "vendor" }) {
  const [notifications, setNotifications] = useState<{ message: string; type?: string; timestamp?: Date }[]>([]);
  const [openModal, setModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = getSocket(userId, role);
    if (!socket) {
      console.warn("Socket is not connected.");
      return;
    }

    socket.emit("register", { userId, role });

    socket.on("connect", () => console.log("Socket connected!"));
    socket.on("disconnect", () => console.log("Socket disconnected!"));

    const handleOrderEvent = (data: { message: string; type?: string }) => {
      console.log("Notification received:", data);
      const newNotification = {
        ...data,
        timestamp: new Date()
      };
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("order_placed", handleOrderEvent);
    socket.on("order_updated", handleOrderEvent);

    return () => {
      socket.off("order_placed", handleOrderEvent);
      socket.off("order_updated", handleOrderEvent);
    };
  }, [userId, role]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setModal(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenModal = () => {
    setModal(!openModal);
    if (!openModal) {
      setUnreadCount(0);
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        className="p-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative"
        onClick={handleOpenModal}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {openModal && (
        <div 
          className="absolute bg-white top-12 right-0 w-80 shadow-xl rounded-lg overflow-hidden z-50 border border-gray-200 animate-fade-in"
          style={{ maxHeight: '80vh' }}
        >
          <div className="flex justify-between items-center p-3 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button 
                  onClick={clearAllNotifications}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              )}
              <button 
                onClick={() => setModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {notifications.length > 0 ? (
            <>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
                <ul className="divide-y divide-gray-100">
                  {notifications.map((notification, index) => (
                    <li key={index} className="p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1">
                          {notification.type === 'error' ? (
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          {notification.timestamp && (
                            <p className="text-xs text-gray-500 mt-1">{formatTime(notification.timestamp)}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-2 text-center border-t text-xs text-gray-500 bg-gray-50">
                You have {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
              </div>
            </>
          ) : (
            <div className="py-8 px-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                <Bell className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No new notifications</p>
              <p className="text-gray-400 text-xs mt-1">We'll notify you when something arrives</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}