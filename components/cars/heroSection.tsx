"use client"
import React, {useState, useEffect}from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { getAllCars } from '@/actions/cars'
import { CarType } from '@/lib/definations/carDefinations'

import { Search, Calendar, Clock, MapPin, ChevronDown, ArrowRight } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

const Time = [
    {value: "06:00 AM", label: "06:00 AM"},
    {value: "07:00 AM", label: "07:00 AM"},
    {value: "08:00 AM", label: "08:00 AM"},
    {value: "09:00 AM", label: "09:00 AM"},
    {value: "10:00 AM", label: "10:00 AM"},
    {value: "11:00 AM", label: "11:00 AM"},
    {value: "Noon", label: "Noon"},
    {value: "01:00 PM", label: "01:00 PM"},
    {value: "02:00 PM", label: "02:00 PM"},
    {value: "03:00 PM", label: "03:00 PM"},
    {value: "04:00 PM", label: "04:00 PM"},
    {value: "05:00 PM", label: "05:00 PM"},
    {value: "07:00 PM", label: "07:00 PM"},
    {value: "08:00 PM", label: "08:00 PM"},
    {value: "09:00 PM", label: "09:00 PM"},
    {value: "10:00 PM", label: "10:00 PM"},
    {value: "11:00 PM", label: "11:00 PM"},
  ]


const HeroSection = () => {
      const [carsData, setCarsData] = useState<CarType[]>([])
      const [city, setCity] = useState("")
      const [pickupTime, setPickupTime] = useState("")
      const [dropTime, setDropTime] = useState("")
      const [tripType, setTripType] = useState("Within City")
      const [pickupDate, setPickupDate] = useState("")
      const [dropoffDate, setDropoffDate] = useState("")
    
      useEffect(() => {
        const fetchCars = async () => {
          const {cars} = await getAllCars()
          console.log("Cars Data:", cars)
          setCarsData(cars)
        }
        fetchCars()
      }, [])

      const cities = [...new Set(carsData.map((car)=> car.city ))]
  return (
    <section className='w-full h-screen overflow-hidden'>
        <div className="relative w-full h-full bg-cover bg-center bg-[url('/anime-car.webp')]">
            <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 backdrop-blur-sm'></div>

            <div className='relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8 lg:px-16'>
                <div>
                    <h1 className='text-white text-4xl  md:text-6xl font-bold drop-shadow-lg'>Find your perfect Ride</h1>
                    <p className='text-white/90 text-xl md:text-2xl mx-auto-2xl'>
                    Explore our premium selection of vehicles for any journey  
                    </p>
                </div>

            </div>

            
        </div>
    </section>
  )
}

export default HeroSection