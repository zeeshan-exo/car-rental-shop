"use client"
import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from 'lucide-react'
import { Sheet, 
    SheetClose,
     SheetContent, 
    SheetDescription, 
    SheetFooter,
     SheetHeader,
     SheetTitle,
     SheetTrigger

 } from './ui/sheet'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000")

interface Message {
    id: string;
    senderId: string;
    recieverId: string;
    senderRole: "customer" | "vendor";
    recieverRole: "customer" | "vendor";
    message: string;
    timestamp: string;
}

interface ChatProps {
    userId: string;
    userRole: "customer" | "vendor";
    recieverId: string;
    recieverRole: "customer" | "vendor";
}

export const Chat: React.FC<ChatProps> = ({ 
    userId, 
    userRole, 
    recieverId, 
    recieverRole 
}) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        socket.emit("register", { userId, role: userRole })

        socket.on("recieveMessage", (message: Message) => {
            setMessages((prev) => [...prev, message])
        })

        scrollToBottom()

        return () => {
            socket.off("recieveMessage")
        }
    }, [userId, userRole])

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }

    const sendMessage = () => {
        if (input.trim()) {
            const messageData: Message = {
                id: `${Date.now()}-${userId}`,
                senderId: userId,
                senderRole: userRole,
                recieverId: recieverId,
                recieverRole: recieverRole,
                message: input,
                timestamp: new Date().toISOString()
            }

            socket.emit("sendMessage", messageData)

            setMessages((prev) => [...prev, messageData])

            setInput("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button variant={"outline"}>Chat</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Real time cha</SheetTitle>
                    <SheetDescription>Start Chat with the vendor for more details.</SheetDescription>
                </SheetHeader>
                <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4">
                <ScrollArea 
                    ref={scrollAreaRef} 
                    className="h-[400px] pr-4"
                >
                    <div className="space-y-3">
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    className={`max-w-[70%] p-2 rounded-lg ${
                                        msg.senderId === userId 
                                            ? 'bg-AppAccent text-white' 
                                            : 'bg-gray-200 text-black'
                                    }`}
                                >
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Input 
                    placeholder="Type a message..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                />
                <Button 
                    onClick={sendMessage} 
                    disabled={!input.trim()}
                    size="icon"
                    className='bg-AppAccent'
                    
                >
                    <Send className="h-4 w-4 bg-AppAccent" />
                </Button>
            </CardFooter>
        </Card>
            </SheetContent>
        </Sheet>

    )
}