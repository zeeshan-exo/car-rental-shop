import { Server as SocketIOServer } from "socket.io";
import { NextApiResponse } from "next";
import { Socket } from "net";

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: {
      io?: SocketIOServer;
    };
  };
};
