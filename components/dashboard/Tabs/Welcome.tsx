"use client"
import React from 'react'
import { Button } from '../../ui/button'
import { AlertCircle, Clock, Slice } from 'lucide-react'
import { getSession } from 'next-auth/react'

const Welcome = () => {
    const session = getSession()
    const name = session?.user?.name
  return (
   
    <div className='flex justify-between bg-gradient-to-r from-AppPrimary to-AppPrimaryHover text-AppLight p-6 mb-4 shadow-md'>
        <div className='container mx-auto'>
         <div  className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
                <h1 className='text-3xl font-bold'>AutoNex</h1>
                <p className='text-AppLight mt-1'>Welcome! {
                 name? 
                 name?.charAt(0).toLocaleUpperCase() + name?.slice(1)
                 : ""} to AutoNex
                </p>
            </div>
            <div className='flex flex-wrap gap-2'>
                <Button 
                size="sm" 
                className='bg-AppLight/20 hover:bg-AppLight/30 backdrop:blur-sm' >
                    <AlertCircle className='h-5 w-5'/>
                    Notifications
                </Button>
                <Button 
                size="sm" 
                className='bg-AppLight text-sky-800 hover:bg-slate-200'>
                    <Clock className='h-5 w-5 '/>
                    Activity Log
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome