"use client"
import React, {useState} from 'react'
import StatCard from '@/components/StatCard'
import { Car, CreditCard, Users, AlertCircle, Clock, BarChart3, Filter, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Tabs,TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from '@/lib/currency'
import Image from 'next/image'

const Dashboard = () => {
      const [activeTab, setActiveTab] = useState("overview")
    
  return (
    <div className="bg-gray-50 min-h-screen">
      
      <div className="bg-gradient-to-r from-sky-700 to-indigo-800 text-AppLight p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Car Rental Dashboard</h1>
            <p className="text-sky-100 mt-1">Welcome back, Alex! You have 2 pending reservations.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-AppLight/20 hover:bg-AppLight/30 backdrop-blur-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm" className="bg-AppLight text-sky-800 hover:bg-sky-100">
              <Clock className="h-4 w-4 mr-2" />
              Activity Log
            </Button>
            <div className="flex items-center ml-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <Image src="/api/placeholder/40/40" alt="User" />
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3">
      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[500px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </Tabs>
        <div className="bg-AppLight rounded-lg shadow-sm p-3 mb-6 flex flex-wrap items-center gap-3">
          <span className="text-AppDark font-medium flex items-center">
            <Filter className="h-4 w-4 mr-1" /> 
            Quick Filters:
          </span>
          <Button variant="outline" size="sm" className="rounded-full text-xs">
            <MapPin className="h-3 w-3 mr-1" /> Location
          </Button>
          <Button variant="outline" size="sm" className="rounded-full text-xs">
            <Calendar className="h-3 w-3 mr-1" /> Date Range
          </Button>
          <Button variant="outline" size="sm" className="rounded-full text-xs">
            <Car className="h-3 w-3 mr-1" /> Vehicle Type
          </Button>
          <Button variant="outline" size="sm" className="rounded-full text-xs bg-sky-50 text-sky-700 border-sky-200">
            All Filters
          </Button>
        </div>
        <div className={`${activeTab === "customers" ? "block" : "hidden"}`}>
            <Card>
                <CardHeader>
                <CardTitle>Users</CardTitle>
                </CardHeader>

                <CardContent>All current users</CardContent>
            </Card>
        </div>

        <div  className={`${activeTab === "overview" ? "block" : "hidden"} grid grid-cols-1 lg:grid-cols-3 gap-6`}>
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard 
                title="Active Customers" 
                value="248"
                change="+12%" 
                icon={<Users className="h-6 w-6 text-indigo-600" />} 
              />
              <StatCard 
                title="Available Cars" 
                value="37"
                change="-4%" 
                icon={<Car className="h-6 w-6 text-sky-600" />} 
              />
              <StatCard 
                title="Monthly Revenue" 
                value={formatCurrency(2840)}
                change="+18%" 
                icon={<CreditCard className="h-6 w-6 text-emerald-600" />} 
              />
              <StatCard 
                title="Cars Rented" 
                value="19"
                change="+7%" 
                icon={<Car className="h-6 w-6 text-AppAccent" />} 
              />
            </div>


            <div className="bg-AppLight rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-sky-700 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800">Fleet Performance</h2>
                </div>
                <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                  <Button variant="ghost" size="sm" className="rounded-md hover:bg-AppLight text-xs">Weekly</Button>
                  <Button variant="ghost" size="sm" className="rounded-md hover:bg-AppLight text-xs">Monthly</Button>
                  <Button size="sm" className="rounded-md bg-AppLight text-sky-700 shadow-sm hover:bg-gray-50 text-xs">Yearly</Button>
                </div>
              </div>
              <div className="p-6 h-64 flex items-center justify-center text-gray-500">
                {/* Chart placeholder */}
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Fleet performance chart will appear here</p>
                </div>
              </div>
            </div>

            <div className="bg-AppLight rounded-xl shadow-sm p-4">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-sky-700 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-l-2 border-sky-500 pl-4 py-1">
                    <p className="text-gray-800 font-medium">New reservation #{1000 + i}</p>
                    <p className="text-gray-500 text-sm">Toyota Camry • 3 days • $210</p>
                    <p className="text-gray-400 text-xs mt-1">10 minutes ago</p>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="text-sky-700 hover:text-sky-800 hover:bg-sky-50 w-full mt-2">
                  View All Activities
                </Button>
              </div>
            </div>
          </div>

 
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-sm h-64 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/api/placeholder/800/400')" }}
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <span className="bg-amber-500 text-AppLight text-xs px-2 py-1 rounded-full mb-2 w-fit">Featured</span>
                <h3 className="text-xl font-bold text-AppLight">Tesla Model 3</h3>
                <p className="text-AppLight/80 text-sm mb-2">Available for premium rental</p>
                <Button size="sm" className="mt-2 bg-AppLight text-sky-800 hover:bg-sky-50 w-32">View Details</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-AppLight rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow border-l-4 border-sky-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-gray-700 font-medium">Available Cars</h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">9</p>
                    <p className="text-gray-500 text-sm mt-1">Ready for rent in your inventory</p>
                    <Button variant="outline" size="sm" className="mt-3 text-xs rounded-md text-sky-600 border-sky-600 hover:bg-sky-50">Manage Fleet</Button>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                    <Car className="h-5 w-5 text-sky-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-AppLight rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow border-l-4 border-amber-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-gray-700 font-medium">Rented Cars</h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">8</p>
                    <p className="text-gray-500 text-sm mt-1">Currently on the road</p>
                    <Button variant="outline" size="sm" className="mt-3 text-xs rounded-md text-amber-600 border-amber-600 hover:bg-amber-50">Track Vehicles</Button>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Car className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-AppLight rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow border-l-4 border-indigo-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-gray-700 font-medium">Pending Payments</h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{formatCurrency(3240)}</p>
                    <p className="text-gray-500 text-sm mt-1">From 6 active rentals</p>
                    <Button variant="outline" size="sm" className="mt-3 text-xs rounded-md text-indigo-600 border-indigo-600 hover:bg-indigo-50">Process Payments</Button>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard