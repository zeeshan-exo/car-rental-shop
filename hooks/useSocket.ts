import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// ✅ Ensure a single client-side socket instance
const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
});

export function useSocket() {
  const [notifications, setNotifications] = useState<{ message: string }[]>([]);

  useEffect(() => {
    // ✅ Listen for notifications
    socket.on("receiveNotification", (notification) => {
      console.log("New Notification:", notification); // Debugging
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, []);

  return { notifications, socket };
}
