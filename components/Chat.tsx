"use client"
import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import { Input } from './ui/input'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000")

interface Message {
    senderId: string,
    recieverId: string,
    senderRole: string,
    recieverRole: string,
    message: string,
    timestamp: string,
}

interface ChatProps{
    userId: string,
    userRole: "customer" | "vendor",
    recieverId: string,
    recieverRole: "customer" | "vendor"
}

export const Chat = ({userId, userRole, recieverRole, recieverId}: ChatProps) => {
    const [message, setMessage] = useState<Message[]>([])
    const [input, setInput] = useState("")

    useEffect(()=>{
        socket.emit("register", userId, role: userRole)

        socket.on("recieveMessage", (message: Message) => {
            setMessage((prev)=> [...prev, message])
        })

        return () => {
            socket.off("recieveMessage")
        }
    }, [userId, userRole])

    const sendMessage = () => {
        if(input.trim()){
            const messageData={
              senderId: userId,
              senderRole: userRole,
              recieverId: recieverId,
              recieverRole: recieverRole,
              message: input
            }
            socket.emit("sendMessage", messageData)
            setInput("")
        }
    }
  return (
    <div>Chat</div>
  )
}
