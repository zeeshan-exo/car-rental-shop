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

  io.on("connection", (socket) => {

    socket.on("register", ({ userId, role }) => {
      if (role === "customer") {
        socket.join(`user:${userId}`);
        // console.log(` Customer ${userId} joined room user:${userId}`);
        // console.log(` Updated Rooms:`, io.sockets.adapter.rooms);
      } else if (role === "vendor") {
        socket.join(`vendor:${userId}`);
        // console.log(` Vendor ${userId} joined room vendor:${userId}`);
        // console.log(` Updated Rooms:`, io.sockets.adapter.rooms);
      }
    });
  
    socket.on("order_placed", (data) => {
      // console.log(`Emitting to vendor:${data.order.vendorId}`);
      io.to(`vendor:${data.order.vendorId}`).emit("order_placed", data);
    });
    
    socket.on("order_updated", (data) => {
      // console.log(` Emitting to user:${data.order.userId}`);
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



