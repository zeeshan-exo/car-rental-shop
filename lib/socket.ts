import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log(" Connected to WebSocket server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.warn(" Disconnected from WebSocket server");
      socket = null;
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => {
  if (!socket) {
    console.warn(" Socket not initialized! Initializing now...");
    return initSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
