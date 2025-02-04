'use client'
import React, { useActionState, useState } from 'react'
import { createProduct } from '@/app/actions/products'

const ProductForm = () => {
  
  const [state, action, pending] = useActionState(createProduct, undefined)  

  return (
    <div className="min-h-screen">
      
      <form action={action} className="max-w-sm mx-auto w-full p-2">
        <div className="flex flex-col">
          <label htmlFor="name">Car Name</label>
          <input 
            id="name"
            name="carName"
            type="text" 
            placeholder="car's name" 
            className="p-2 mb-2 rounded-md border border-gray-800 bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          {state?.errors?.name && (
            <p className="text-red-600 text-sm">{state.errors.name}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="brand">Brand</label>
          <input 
            id="brand"
            name="brand"
            type="text" 
            placeholder="car's brand" 
            className="p-2 mb-2 border border-gray-800 rounded-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          {state?.errors?.brand && (
            <p className="text-red-600 text-sm">{state.errors.brand}</p>
          )}
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="model">Model</label>
          <input 
            id="model"
            name="model"
            type="text" 
            placeholder="model" 
            className="p-2 mb-2 border border-gray-800 rounded-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          {state?.errors?.model && (
            <p className="text-red-600 text-sm">{state.errors.model}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="price">Rental Price</label>
          <input 
            id="price"
            name="price"
            type="text" 
            placeholder="price" 
            className="p-2 mb-2 border border-gray-800 rounded-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          {state?.errors?.price && (
            <p className="text-red-600 text-sm">{state.errors.price}</p>
          )}
        </div>
       
        <div className="mt-4">
          <button
            disabled={pending}
            type="submit"
            className="mb-2 mt-2 w-full bg-indigo-800 p-2 text-white font-bold rounded-md disabled:bg-slate-500"
          >
            {pending ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
