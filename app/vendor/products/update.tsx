import React, { useState } from 'react'
import { updateCar } from '@/services/actions/products'

export default async function updateCarForm () {
    const [carId, setCarId] = useState("")
    const [formData, setFormData] = useState<Record<string, any>>({})

    const handleChange = (e:React.ChangeEventHandler<HTMLInputElement>)=> {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent)=>{
      e.preventDefault()
       
      const form = new FormData()
      Object.entries(formData).forEach(([Key, value])=>{
        form.append(Key, value as string)
      })

      const result = await updateCar(carId, form)
    }
    
  return (
    <div>

    </div>
  )
}

