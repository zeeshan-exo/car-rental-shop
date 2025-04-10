
import React, { useEffect } from 'react'
import SearchCars from '@/components/cars/SearchCars'
import Footer from '@/components/layout/Footer'
import CarCard from '@/components/cars/CarCard'
import DisplayCars from '../cars/displayCars'
import { getAllCars } from '@/actions/cars'
import Features from '@/components/cars/Features'

const page = async () => {

  const {cars} = await getAllCars()
  
  // useEffect(() => {
  //   const fetchCars = async() =>{
  //     const {cars} = await getAllCars()
  //     setCars({})
  //   }
  //   fetchCars()
  // }, [])
  return (
    <div>
        <SearchCars/>
        <DisplayCars cars={cars}/>
        <Features/>
        <Footer/>
    </div>
  )
}

export default page