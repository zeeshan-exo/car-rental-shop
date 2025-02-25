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




  io.on("connection", (socket) => {
    console.log("A user connected");
    console.log("Socket ID:", socket.id)


    socket.on("register", ({ userId, role }) => {
      if (role === "vendor") {
        socket.join(`vendor:${userId}`); // e.g., "vendor:123"
        console.log(`Vendor ${userId} joined room vendor:${userId}`);
      } else if (role === "user") {
        socket.join(`user:${userId}`); // e.g., "user:456"
        console.log(`User ${userId} joined room user:${userId}`);
      }
    });
  
    socket.on("order_placed", (data) => {
      console.log("Order placed:", data);
      // Send to the specific vendor's room
      io.to(`vendor:${data.order.vendorId}`).emit("order_placed", data);
    });

    socket.on("order_updated", (data) => {
      console.log("Order updated:", data);
      io.to(`user:${data.order.userId}`).emit("order_updated", data);
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



