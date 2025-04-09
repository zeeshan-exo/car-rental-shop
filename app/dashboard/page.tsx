
import React, { useState } from 'react'
import StatCard from '@/components/StatCard'
import Header from '@/components/layout/Header'
import { Car, Heart, House, ShoppingBag, Ticket } from 'lucide-react'
import { TabsWrapper, TabsList, TabsContent, TabsTrigger } from '@/components/Tabs'
import { getAllCars } from '@/actions/cars'
import { getUserOrders } from '@/actions/booking'
import DisplayCars from '../(dashboard)/user/cars/displayCars'
import Overview from '@/components/Tabs/Overview'
import UserBookings from "@/components/bookings/UserBookings";
import Welcome from '@/components/Tabs/Welcome'
import History from '@/components/Tabs/History'
import Track from '@/components/Tabs/Track'

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
    
    <div className='container mx-auto px-4 py-6'>
      <div><Welcome/></div>
    
    <div className='container mx-auto py-6'>
        <TabsWrapper >
            <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='cars'>Cars</TabsTrigger>
                <TabsTrigger value='booking'>Booking</TabsTrigger>
                <TabsTrigger value='track'>Track</TabsTrigger>
                <TabsTrigger value='history'>History</TabsTrigger>
            </TabsList>

            <TabsContent value='overview'>
                <Overview/>
                
            </TabsContent>

            <TabsContent value="cars">
                
                <DisplayCars cars={cars}/>
            </TabsContent>

            <TabsContent value="booking">
                <UserBookings/>
            </TabsContent>

            <TabsContent value='track'>
                <Track/>
             </TabsContent>

            <TabsContent value='history'>
                <History/>
            </TabsContent>
        </TabsWrapper>
    </div>
</div>
    
    </>
  )
}
export default page