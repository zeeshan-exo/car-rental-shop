"use client"
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '../ui/table'
import { getUserOrders } from '@/actions/booking'
import { useSession } from 'next-auth/react'
import { Booking } from '@/lib/definations/bookingdefinations'
import { Button } from '../ui/button'

const History = () => {
    const [bookings, setBooking] = useState<Booking[]>([])

    useEffect(() =>{
       const fetchbokingData = async () =>{
         try {
             const data = await getUserOrders()
             setBooking(data)
             
         } catch (error) {
            console.error("Couldn't found Any data,", error)
         }
       }
       fetchbokingData()
    }, [])
  return (
    <div>
        { bookings?.status === "dispatched" ?
                   <Table>
                   <TableHeader>
                       <TableHead>Booking ID</TableHead>
                       <TableHead>Name</TableHead>
                       <TableHead>Model</TableHead>
                       <TableHead>Status</TableHead>
                   </TableHeader>
                   <TableBody>
                       {bookings.map((booking) => (
                        <TableRow key={booking._id}>
                            <TableCell>{booking._id}</TableCell>
                            <TableCell>{booking?.carDetails?.carName}</TableCell>
                            <TableCell>{booking?.carDetails?.carModel}</TableCell>
                            <TableCell>{booking?.status }</TableCell>
                        </TableRow>
                       ))}
                       
                   </TableBody>
               </Table>
               :
               <div className='flex flex-col items-center mt-4'> 
               <p>It appears that you haven't book any cars at past. Click on the button below to book car.</p>
               <Button 
               className='bg-AppPrimary text-AppLight hover:bg-AppPrimaryHover mt-2'
               > Book Now</Button>
               </div>
        }

    </div>
  )
}

export default History