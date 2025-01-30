'use client'
import { useActionState } from 'react'

import { signup } from '@/app/actions/auth'
import Link from 'next/link'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
  return (
    <div className="min-h-screen bg-gradient-to-tr from-violet-500 to-violet-900 flex items-center justify-center">
    <form action={action} className='max-w-sm mx-auto w-full p-8 rounded-md bg-slate-200'>
      <div className='mb-2'>
        <h1 className='text-3xl mb-2 font-bold text-blue-700 text-center'>Signup</h1>
      </div>

      <div className='flex flex-col'>
        <label htmlFor="email">Name</label>
        <input id="name" name="name" type="name" placeholder="Enter Name" className='p-2 mb-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-800'/>
      </div>
      <div className='text-red-500 text-sm'>
      {state?.errors?.name && <p>{state.errors.name}</p>}
      </div>
      
      <div className='flex flex-col'>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" className='p-2 mb-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-800'/>
      </div>
      <div className='text-red-500 text-sm'>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      </div>
      
      <div className='flex flex-col'>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder='password' className='p-2 mb-3 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-800' />
      </div>
      <div className='text-red-500 text-sm '>
      {state?.errors?.password && <p>{state.errors.password}</p>}
      </div>

     <div>
      <label className='p-2'>
        <input type="radio" name='role' value="vendor" />Vendor
      </label>
      <label>
        <input type="radio" name='role' value="customer"/>Customer
      </label>
     </div>
     <div className='text-red-500 text-sm'>
     {state?.errors?.password && <p>{state.errors.password}</p>}
     </div>
     <div className='mb-4 text-sm'>
     <Link href='/pages/login' className='text-blue-600 underline'>Already have an account?</Link>
     </div>
    
   
      <button disabled={pending} type="submit" className='mb-2 w-full bg-blue-700 p-2 text-white font-bold rounded-md'>signup</button>
    </form>
    </div>
  )
}