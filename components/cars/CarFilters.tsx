"use client"
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, } from '../ui/card'
import { Filter } from 'lucide-react'
import CategoriesCard from './CategoriesCard'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { CarType } from '@/lib/definations/carDefinations'

interface DisplayCarsProps{
    cars: CarType[]
}

const categories = [
    {label: "Economy", value: "economy"},
    {label: "Standard", value: "standard"},
    {label: "Comercial", value: "comercial"},
    {label: "Luxury", value: "luxury"},
]
const CarFilters =  ({cars} : DisplayCarsProps ) => {
    const [selectedBrands, setSelectedBRands] = useState<string[]>([])
    const [selectedTransmission, setSelectedTransmission] = useState<string[]>([])
    const [selectedFuelType, setSelectedFuelType] = useState<string[]>([])

    const uniqueBrands = [...new Set(cars.map((car) => car?.brand))]
    const uniqueTransmission = [...new Set(cars.map((car) => car?.details?.specs?.transmission))]
    const uniqueFuelType = [...new Set(cars.map((car) => car?.details?.specs?.fuelType))]
  return (
    <div>
        <Card className=' w-60 rounded-none min-h-screen '>
            <CardHeader className='flex flex-row gap-2'>
                <CardTitle className='flex items-center space-x-2'><Filter/>Filter Cars</CardTitle>
            </CardHeader>
            <CardContent>
               <>
                <h2 className='text-AppSecondary font-semibold mb-2'>Categories</h2>
                {categories.map((category) => (
                    <div key={category.value} className='flex space-x-2 mb-2 mt-2'>
                        <input type='checkbox'  id={category.value}/>
                        <Label htmlFor={category.value} className='text-AppDark'>{category.label}</Label>
                    </div>
                ))}
                <hr></hr>
                </>
                
                <>
                <h2 className='text-AppSecondary font-semibold mb-2 mt-2'>Brand</h2>
                {uniqueBrands.map((brand) => (
                    <div key={brand}  className='flex space-x-2 mb-2 mt-2'>
                    <input type='checkbox' id={brand}/>
                    <Label htmlFor={brand} className='text-AppDark'>{brand}</Label>
                    </div>
                ))}
                <hr></hr>
                </>
                <>
                <h2 className='text-AppSecondary font-semibold mb-2 mt-2'>Fuel</h2>
                {uniqueFuelType.map((fuelType) => (
                    <div key={fuelType} className='flex space-x-2 mb-2 mt-2'>
                        <input type='checkbox' id={fuelType}/>
                        <Label htmlFor={fuelType} className='text-AppDark'>{fuelType}</Label>
                    </div>
                ))}
                <hr></hr>
                </>
                <>
                <h2 className='text-AppSecondary font-semibold mb-2 mt-2'>Transmission</h2>
                {uniqueTransmission.map((transmission) => (
                    <div key={transmission} className='flex space-x-2 mb-2 mt-2'>
                        <input type='checkbox' id={transmission}/>
                        <Label htmlFor={transmission} className='text-AppDark'>{transmission}</Label>
                    </div>
                ))}
                <hr></hr>
                </>
                
                
            </CardContent>
        </Card>
    </div>
  )
}

export default CarFilters