"use client";

import { useSocket } from "@/hooks/useSocket";
import { useState, useEffect } from "react";

export default function SocketComponent() {
  const socket = useSocket();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (msg: string) => {
      console.log("📩 Received message:", msg);
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      console.log("📤 Sending message...");
      socket.emit("message", "Hello from the client!");
    }
  };

  return (
    <div>
      <h2>Socket.io Test</h2>
      <button onClick={sendMessage} className="bg-blue-500 p-2">Send Message</button>

      <div className="mt-4 p-2 border rounded">
        <h3 className="font-bold">Messages:</h3>
        {messages.length > 0 ? (
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className="p-1 border-b">{msg}</li>
            ))}
          </ul>
        ) : (
          <p>No messages yet...</p>
        )}
      </div>
    </div>
  );
}
