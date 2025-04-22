import React from 'react'
import CarsPage from './CarsPage'
import CarForm from './CarForm'
import DisplayVendorCars from './VendorCars'

 function productPage  () {
  
  return (
    <>
    <div className="p-4">
       <CarForm />
     <DisplayVendorCars/>
    </div>
    </>
  )
}

export default productPage