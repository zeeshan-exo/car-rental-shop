
import React, { useState } from 'react'
import StatCard from '@/components/StatCard'
import Header from '@/components/layout/Header'
import { Car, Heart, House, ShoppingBag, Ticket } from 'lucide-react'
import { TabsWrapper, TabsList, TabsContent, TabsTrigger } from '@/components/Tabs'
import { getAllCars } from '@/actions/cars'
import { getUserOrders } from '@/actions/booking'
import DisplayCars from '../(dashboard)/user/cars/displayCars'

const  page= async() => {
//   const [activeTab ,setActiveTab] = useState("overview")
  const {cars} = await getAllCars()
  const booking = await getUserOrders()

  return (
    <>
    <Header 
    title= "AutoNex"
    navLinks = {[
        {label: <House/>, href: "/"},
        {label: <ShoppingBag/>, href: "/"},
        {label: <Car/>, href: "/"},
        {label: <Heart/>, href: "/"},
    ]}
    />
    
    <div  className='flex flex-row gap-4'>
     <StatCard
    title='Current Reservation'
    value="1"
    change='3'
    icon={<Ticket />}
    />
     <StatCard
    title='Boking Status'
    value="1"
    change='3'
    icon={<Ticket />}
    />
    <StatCard
    title='Current Reservation'
    value="1"
    change='3'
    icon={<Ticket />}
    />
     <StatCard
    title='Boking Status'
    value="1"
    change='3'
    icon={<Ticket />}
    />
    </div>

    
    <div className='container mx-auto px-4 py-6'>
        <TabsWrapper >
            <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='cars'>Cars</TabsTrigger>
                <TabsTrigger value='booking'>Booking</TabsTrigger>
                <TabsTrigger value='track'>Track</TabsTrigger>
                <TabsTrigger value='history'>History</TabsTrigger>
            </TabsList>

            <TabsContent value='overview'>
                <p>Overview</p>
                
            </TabsContent>

            <TabsContent value="cars">
                
                <DisplayCars cars={cars}/>
            </TabsContent>

            <TabsContent value="booking">
                <p>Booking</p>
            </TabsContent>

            <TabsContent value='track'>
                <p>Track</p>
            </TabsContent>

            <TabsContent value='history'>
                <p>History</p>
            </TabsContent>
        </TabsWrapper>
    </div>
    
    </>
  )
}
export default page