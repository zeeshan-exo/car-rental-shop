"use client"
import React, { useState, useEffect, useRef, ReactNode } from 'react'
import io from 'socket.io-client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from 'lucide-react'
import { Sheet, 
     SheetContent, 
    SheetDescription, 
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
    userId: string | ReactNode;
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
            console.log("Message:", messageData)
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
                    <SheetTitle>Chat</SheetTitle>
                    <SheetDescription>Start Chat with the vendor for more details.</SheetDescription>
                </SheetHeader>
                <Card className="w-full max-w-md mx-auto mt-6 bg-slate-50">
            <CardContent className="p-4 rounded-t-xl mb-2">
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
                                            ? 'bg-AppPrimary text-white' 
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
            <CardFooter className="flex gap-2 z-50">
                <Input 
                    placeholder="Send message..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 border-gray-400"
                />
                <Button 
                    onClick={sendMessage} 
                    disabled={!input.trim()}
                    size="icon"
                    className='bg-AppPrimary'
                    
                >
                    <Send className="h-4 w-4 bg-AppPrimary" />
                </Button>
            </CardFooter>
        </Card>
            </SheetContent>
        </Sheet>

    )
}