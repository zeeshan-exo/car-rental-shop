import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (userId: string, role: "user" | "vendor"): Socket => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      transports: ["websocket", "polling"],
    });


    socket.on("connect", () => {
      console.log("Connected to WebSocket server:", socket.id);
      // Register the client with their userId and role
      socket.emit("register", { userId, role });
    });

    // socket.on("connect", () => {
    //   console.log(" Connected to WebSocket server:", socket.id);
    // });

    socket.on("disconnect", () => {
      console.warn(" Disconnected from WebSocket server");
      socket = null;
    });
  }
  return socket;
};

export const getSocket = (userId?: string, role?: "user" | "vendor"): Socket | null => {
  if (!socket) {
    if (!userId || !role) {
      console.warn("Socket not initialized and no userId/role provided!");
      return null;
    }
    console.warn("Socket not initialized! Initializing now...");
    return initSocket(userId, role);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
