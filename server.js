import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  console.log("io")

  const users = new Map<string, string>();

  io.on("connection", (socket) => {
    console.log("A user connected");
    console.log("Socket ID:", socket.id)
  
    socket.on("order_placed", (data) => {
      console.log(" Broadcasting order_placed:", data);
      io.emit("order_placed", data); 
    });
  
    socket.on("order_updated", (data) => {
      console.log(" Broadcasting order_updated:", data);
      io.emit("order_updated", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
  
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});



