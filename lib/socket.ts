import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (userId: string, role: "customer" | "vendor"): Socket => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      transports: ["websocket", "polling"],
    }); 

    socket.on("connect", () => {
      console.log("Connected to WebSocket:", socket.id);
      socket.emit("register", { userId, role });
    });

    socket.on("disconnect", () => {
      console.warn(" Disconnected from WebSocket");
      socket = null;
    });
  }
  return socket;
};

export function getSocket(userId: string, role: "customer" | "vendor") {
  if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
    console.error("NEXT_PUBLIC_SOCKET_URL is not defined!");
    return null;
  }

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, { withCredentials: true });

    socket.on("connect", () => {
      console.log(`Socket connected: ${socket.id}`);
      socket.emit("register", { userId, role });
    });

    socket.on("disconnect", () => {
      console.warn(" Socket disconnected.");
    });
  }

  return socket;
}


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
