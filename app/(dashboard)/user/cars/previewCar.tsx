"use client"
import React, { useEffect, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCar } from '@/actions/cars'
import { CarType } from '@/lib/definations/carDefinations'
import { Button } from '@/components/ui/button'
import ImageSlider from '@/components/cars/ImageSlider'
import Image from 'next/image'


interface ViewcarProps {
    carId: string;
    onClose?: () =>void
  }


const PreviewCar = ({carId}: ViewcarProps) => {
    const [car, setCarData] = useState<any>(null)
    useEffect(() => {
        const fetchCarData = async () => {
            const data = await getCar(carId)
            console.log("Car Data:", data)
            setCarData(data)
            
        }
        fetchCarData()
    }, [])
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button className='bg-AppAccent hover:bg-AppAccent text-AppLight'>Details</Button>
        </SheetTrigger>
        <SheetContent className='bg-AppLight'>
            <SheetHeader>
                <SheetTitle className="text-xl font-bold flex items-center">Car Preview</SheetTitle>
            </SheetHeader>
            <Card className='mt-6 '>
                {/* <CardHeader>
                    <CardTitle>Car PreView</CardTitle>
                </CardHeader> */}
                <CardContent className='mt-2'>
                    <div >
                        <div>
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
                    <div>  
                        <h1>{car?.carName}</h1>
                        <p>{car?.details?.specs?.fuelType}</p>
                        <p className='text-sm'>{car?.details?.text}</p>
                    </div>
                    </div>

                </CardContent>
            </Card>
        </SheetContent>
    </Sheet>
      
  )
}

export default PreviewCar