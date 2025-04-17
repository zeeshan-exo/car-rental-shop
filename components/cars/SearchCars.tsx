"use client"
import React, {useState, useEffect} from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { getAllCars } from '@/actions/cars'
import { CarType } from '@/lib/definations/carDefinations'
import { Search, Calendar, Clock, MapPin, ChevronDown, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

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

const SearchCars = () => {
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
    <section className="w-full h-screen overflow-hidden">
      <div className="relative w-full h-full bg-cover bg-center bg-[url('/anime-car.webp')]">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 backdrop-blur-sm"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8 lg:px-16">
          {/* Hero text */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white tracking-tight drop-shadow-lg">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Find Your Perfect Ride</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mt-4">
              Explore our premium selection of vehicles for any journey
            </p>
          </div>
          
          {/* Search card */}
          <div className="w-full max-w-6xl">
            <div className="bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl shadow-AppAccent/10 p-6 md:p-8 overflow-hidden">
              {/* Trip type selection */}
              <div className="mb-8">
                <RadioGroup 
                  value={tripType} 
                  onValueChange={setTripType} 
                  className="flex justify-center"
                >
                  <div className="p-1 bg-black/30 backdrop-blur-md rounded-xl flex gap-1 border border-white/10">
                    <div className={`relative ${tripType === "Within City" ? "bg-AppAccent text-white" : "bg-transparent text-white/70 hover:text-white"} rounded-lg px-6 py-3 transition-all duration-300 ease-out`}>
                      <RadioGroupItem 
                        value="Within City" 
                        id="within-city" 
                        className="absolute opacity-0" 
                      />
                      <Label htmlFor="within-city" className="cursor-pointer font-medium flex items-center gap-2">
                        <MapPin size={16} />
                        Within City
                      </Label>
                    </div>
                    
                    <div className={`relative ${tripType === "Out of City" ? "bg-AppAccent text-white" : "bg-transparent text-white/70 hover:text-white"} rounded-lg px-6 py-3 transition-all duration-300 ease-out`}>
                      <RadioGroupItem 
                        value="Out of City" 
                        id="out-of-city" 
                        className="absolute opacity-0" 
                      />
                      <Label htmlFor="out-of-city" className="cursor-pointer font-medium flex items-center gap-2">
                        <ArrowRight size={16} />
                        Out of City
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Divider */}
              <div className="relative mb-16">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Search form */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4">
                {/* City Selection */}
                <div className="lg:col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="group relative w-full">
                        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-AppAccent bg-AppAccent/10 rounded-l-xl border-r border-white/10">
                          <MapPin size={18} />
                        </div>
                        <Input 
                          type="text"
                          value={city}
                          readOnly
                          placeholder="Select city"
                          className="pl-16 pr-12 py-6 h-14 bg-black/30 border border-white/10 focus:border-AppAccent/50 text-white placeholder:text-white/40 rounded-xl ring-offset-AppAccent transition-all duration-300"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-AppAccent transition-colors">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-full max-h-64 overflow-auto bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-AppAccent/10 p-1"
                    >
                      {cities && cities.length > 0 ? cities.map((city) => (
                        <DropdownMenuItem 
                          key={city} 
                          onSelect={() => setCity(city)}
                          className="pl-16 pr-12 py-6 hover:bg-AppAccent/10 rounded-lg text-white/90 hover:text-white focus:text-white transition-all"
                        >
                          <MapPin size={16} className="mr-2 text-AppAccent" />
                          {city}
                        </DropdownMenuItem>
                      )) : (
                        <div className="py-2 px-4 text-white/60 text-center italic">No cities available</div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Pickup Date */}
                <div className="lg:col-span-2">
                  <div className="relative w-full">
                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-AppAccent bg-AppAccent/10 rounded-l-xl border-r border-white/10">
                      <Calendar size={18} />
                    </div>
                    <Input 
                      type="date" 
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="pl-16 pr-8 py-6 h-14 bg-black/30 border border-white/10 focus:border-AppAccent/50 text-white placeholder:text-white/40 rounded-xl ring-offset-AppAccent transition-all duration-300" 
                    />
                  </div>
                </div>

                {/* Pickup Time */}
                <div className="lg:col-span-2 items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="group relative w-full">
                        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-AppAccent bg-AppAccent/10 rounded-l-xl border-r border-white/10">
                          <Clock size={18} />
                        </div>
                        <Input 
                          type="text" 
                          value={pickupTime}
                          readOnly
                          placeholder="Pickup"
                          className="pl-16 pr-12 py-6 h-14 bg-black/30 border border-white/10 focus:border-AppAccent/50 text-white placeholder:text-white/40 rounded-xl ring-offset-AppAccent transition-all duration-300"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-AppAccent transition-colors">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      side="bottom"
                      className="w-full max-h-64 overflow-auto bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-AppAccent/10 p-1"
                    >
                      {Time.map((time) => (
                        <DropdownMenuItem 
                          key={time.value} 
                          onSelect={() => setPickupTime(time.value)}
                          className="px-4 py-3 hover:bg-AppAccent/10 rounded-lg text-white/90 hover:text-white focus:text-white transition-all"
                        >
                          <Clock size={16} className="mr-2 text-AppAccent" />
                          {time.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Dropoff Date */}
                <div className="lg:col-span-2 items-center">
                  <div className="relative w-full">
                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-AppAccent bg-AppAccent/10 rounded-l-xl border-r border-white/10">
                      <Calendar size={18} />
                    </div>
                    <Input 
                      type="date" 
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      className="pl-16 pr-8 py-6 h-14 bg-black/30 border border-white/10 focus:border-AppAccent/50 text-white placeholder:text-white/40 rounded-xl ring-offset-AppAccent transition-all duration-300" 
                    />
                  </div>
                </div>

                {/* Dropoff Time */}
                <div className="lg:col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="group relative w-full">
                        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-AppAccent bg-AppAccent/10 rounded-l-xl border-r border-white/10">
                          <Clock size={18} />
                        </div>
                        <Input 
                          type="text" 
                          value={dropTime}
                          readOnly
                          placeholder="Drop off"
                          className="pl-16 pr-12 py-6 h-14 bg-black/30 border border-white/10 focus:border-AppAccent/50 text-white placeholder:text-white/40 rounded-xl ring-offset-AppAccent transition-all duration-300"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-AppAccent transition-colors">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="bottom"
                      className="w-full max-h-64 overflow-auto bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-AppAccent/10 p-1"
                    >
                      {Time.map((time) => (
                        <DropdownMenuItem 
                          key={time.value} 
                          onSelect={() => setDropTime(time.value)}
                          className="px-4 py-3 hover:bg-AppAccent/10 rounded-lg text-white/90 hover:text-white focus:text-white transition-all"
                        >
                          <Clock size={16} className="mr-2 text-AppAccent" />
                          {time.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Search button */}
              <div className="mt-6 flex justify-center">
                <Button 
                  variant="default"
                  className="bg-AppAccent hover:bg-AppAccent/90 text-white px-10 py-6 h-14 rounded-xl shadow-sm shadow-AppAccent/30 hover:shadow-AppAccent/50 transform hover:-translate-y-1 transition-all duration-300 font-medium text-lg"
                >
                  <Search size={20} className="mr-2" />
                  Search Cars
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchCars