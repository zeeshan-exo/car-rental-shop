"use client"
import React, { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';
import { XCircle, User, Mail, Phone, Home, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

const Book = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Form submitted:', formData);
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="text-AppLight bg-AppPrimary hover:bg-AppPrimaryHover">
          Continue
        </Button>
      </DrawerTrigger>
      <DrawerContent className="left-auto right-0 h-full w-full max-w-2xl p-0 rounded-none overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DrawerHeader className="pb-4 border-b px-6 pt-6">
            <DrawerTitle className="text-2xl font-bold mb-3">
              Book Your Appointment
            </DrawerTitle>
            <div className="flex flex-row gap-2 bg-sky-100 p-3 border border-AppPrimary rounded-lg text-AppPrimary">
              <Badge
                variant="outline"
                className="text-AppPrimary bg-sky-200 rounded-xl p-1.5"
              >
                Note
              </Badge>
              <p className="text-sm">
                Please enter your correct details for booking. These details are necessary to verify your identity.
              </p>
            </div>
            <DrawerClose className="absolute right-4 top-4">
              <Button variant="ghost" size="icon" type="button">
                <XCircle className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User className="h-4 w-4" />
                  </div>
                  <Input 
                    type="text" 
                    id="name" 
                    placeholder="Enter your full name" 
                    className="pl-10"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input 
                    type="email" 
                    id="email" 
                    placeholder="example@gmail.com" 
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-sm font-medium">Contact Number</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <Input 
                    type="tel" 
                    id="contact" 
                    placeholder="Enter your phone number" 
                    className="pl-10"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Home className="h-4 w-4" />
                  </div>
                  <Input 
                    type="text" 
                    id="address" 
                    placeholder="Enter your address" 
                    className="pl-10"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="px-6 py-4 border-t">
            <Button 
              type="submit" 
              className="bg-AppPrimary hover:bg-AppPrimaryHover text-AppLight w-full flex items-center justify-center gap-2"
            >
              Continue
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

export default Book