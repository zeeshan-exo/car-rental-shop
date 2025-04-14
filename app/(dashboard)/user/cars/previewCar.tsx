"use client"
import React, { useEffect, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { getCar } from '@/actions/cars'
import { CarType } from '@/lib/definations/carDefinations'
import { Button } from '@/components/ui/button'
import ImageSlider from '@/components/cars/ImageSlider'
import Image from 'next/image'
import Loading from '@/components/Loading'
import { CircleUserRound, Star } from 'lucide-react'


interface ViewcarProps {
    carId: string;
    onClose?: () =>void
  }


const PreviewCar = ({carId}: ViewcarProps) => {
    const [car, setCarData] = useState<any>(null)
    const [loading , setLoading] = useState(true)


    useEffect(() => {
      const fetchCarData = async () => {
        try {
          setLoading(true);
          const data = await getCar(carId);
          console.log("Car Data:", data);
          setCarData(data);
        } catch (error) {
          console.error("Error fetching car data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCarData();
}, []);

 if(loading) {
  return <Loading/>
 }
  return (
    <Drawer direction='right'>
        <DrawerTrigger asChild>
            <Button className='bg-AppAccent hover:bg-AppAccent text-AppLight'>Details</Button>
        </DrawerTrigger>
        <DrawerContent className="left-auto right-0 h-full w-[600px] p-6 rounded-none">
            <DrawerHeader>
                <DrawerTitle className="text-xl font-bold flex items-center">Car Preview</DrawerTitle>
            </DrawerHeader>
            
            <div>
              <div>
              <div className='mb-6'>
              {car.images && Array.isArray(car.images) && car.images.length > 0 ? (
                          <ImageSlider images={car.images} />
                        ) : (
                          <Image
                            src={car.image}
                            alt={car.carName}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        )}
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-AppPrimary">
                                        <CircleUserRound size={20} />
                                      </div>
                                      <div>
                                        <span className="text-AppDark text-sm">Listed by</span>
                                        <p className="font-medium text-gray-800">{car.vendor?.vendorName}</p>
                                      </div>
                                    </div>
              </div>
              
              <div>  
                        <h1>{car?.carName}</h1>
                        
                        <p className='text-sm'>{car?.details?.text}</p>
                    </div>
                    <div>
                      <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                          <Star className="mr-2 text-AppPrimary" size={18} />Features
                        </h3>
                        <div>
                        <p>{car?.details?.specs?.fuelType}</p>
                        <p>{car?.details?.specs?.transmission}</p>
                        <p>{car?.details?.specs?.fetures}</p>
                        
                        </div>
                      </div>
                    </div>
            </div>
            <DrawerFooter>
              <Button>Continue</Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
      
  )
}

export default PreviewCar