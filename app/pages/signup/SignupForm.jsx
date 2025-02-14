'use client'
import { useActionState, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'
import { signup } from '@/services/actions/auth'
import Link from 'next/link'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
  const [verified, setIsVerified] = useState(false)
  const [role, setRole] = useState('customer') 
  const recaptchaRef = useRef(null)

  async function handleSubmit(token) {
    try {
      if (token) {
        await axios.post("/api/route", { token }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setIsVerified(true)
      }
    } catch (error) {
      console.log("Handle submit error", error);
    }
  }

  
  const handleonChange = (token) => {
    handleSubmit(token)
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-violet-500 to-violet-900 flex items-center justify-center">
      <form action={action} className='max-w-sm mx-auto w-full p-8 rounded-md bg-slate-200'>
        <h1 className='text-3xl mb-2 font-bold text-blue-700 text-center'>Register</h1>

        <div className='flex flex-col'>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Enter Name" className='p-2 mb-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-800'/>
          {state?.errors?.name && <p className='text-red-500 text-sm'>{state.errors.name}</p>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" className='p-2 mb-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-800'/>
          {state?.errors?.email && <p className='text-red-500 text-sm'>{state.errors.email}</p>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder='Password' className='p-2 mb-3 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-800' />
          {state?.errors?.password && <p className='text-red-500 text-sm'>{state.errors.password}</p>}
        </div>

      
        <div className="flex gap-4 mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="role" value="vendor" checked={role === 'vendor'} onChange={(e) => setRole(e.target.value)} />
            Vendor
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="role" value="customer" checked={role === 'customer'} onChange={(e) => setRole(e.target.value)} />
            Customer
          </label>
        </div>
        {state?.errors?.role && <p className='text-red-500 text-sm'>{state.errors.role}</p>}

    
        {role === 'vendor' && (
          <>
            <div className='flex flex-col mt-4'>
              <label htmlFor="cars_quantity">No. of Cars</label>
              <input type="number" name="cars_quantity" id="cars_quantity" placeholder='Number of cars' className='p-2 mb-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-800'/>
            </div>
            
            <div className='flex flex-col'>
              <label htmlFor="idCard">ID Card</label>
              <input type="text" name="idCard" id="idCard" placeholder='Vendor ID card' className='p-2 mb-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-800'/>
            </div>
            
            <div className='flex flex-col'>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" placeholder='Vendor address' className='p-2 mb-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-800'/>
            </div>
          </>
        )}

        <div className='mb-4 text-sm'>
          <Link href='/pages/login' className='text-blue-600 underline'>Already have an account?</Link>
        </div>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          ref={recaptchaRef}
          onChange={handleonChange}
        />

        <button disabled={pending || !verified} type="submit" className='mb-2 mt-2 w-full bg-blue-700 p-2 text-white font-bold rounded-md disabled:bg-slate-500'>Register</button>
      </form>
    </div>
  )
}
