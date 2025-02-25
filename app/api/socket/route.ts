import { NextRequest } from "next/server";
import { Server } from "socket.io";


export const GET = async (req: NextRequest) => {
  if (!(global as any).io) {
    console.log("🚀 Starting Socket.io server...");

    const io = new Server(3001, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("message", (msg) => {
        console.log("📩 Received message:", msg);
        io.emit("message", ` Server says: ${msg}`);
      });

      socket.on("disconnect", () => {
        console.log(" Client disconnected:", socket.id);
      });
    });

    (global as any).io = io;
  }

  return new Response("Socket.io server is running", { status: 200 });
};
