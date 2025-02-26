"use client";
import { useEffect, useState } from "react";
import { socket } from "../socket";


export default function Home() {
  const [message, setMessage] = useState("");
  const [received, setReceived] = useState("");

  useEffect(() => {
    socket.on("message", (msg: string) => {
      console.log(msg)
      setReceived(msg);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
   if (socket) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Socket.IO with Next.js 15</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <p>Received: {received}</p>
    </div>
  );
}
