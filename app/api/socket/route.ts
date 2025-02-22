// app/api/socket/route.ts
import { Server } from "socket.io";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
    if (!global.io) {
        global.io = new Server(3001, { cors: { origin: "*" } });
        global.io.on("connection", (socket) => {
            console.log("User connected:", socket.id);

            socket.on("sendNotification", (data) => {
                global.io.emit("receiveNotification", data);
            });

            socket.on("disconnect", () => console.log("User disconnected"));
        });
    }
    return new Response("WebSocket Server Running");
}
