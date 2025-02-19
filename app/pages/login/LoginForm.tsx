'use client'
import { useActionState, useState } from 'react'
import { login } from '@/services/actions/auth'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to bg-indigo-100 p-4">
      <div className='flex w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white'>
        <div className='w-full md:w-1/2 p-8'>
    <form action={action} className='space-y-6'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 text-center'>Login</h1>
      </div>
      
      <div className='relative'>
        <label htmlFor="email" className='text-sm font-medium text-gray-700 mb-1 block'>Email</label>
        <div className='relative'>
          <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5'/>
        <input 
        id="email" 
        name="email" 
        type="email" 
        placeholder="Email" 
        className='w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 transition-colors'/>
        </div>
        {state?.errors?.email && 
        <p className='text-red-500 text-sm mt-1'>{state.errors.email}</p>
        }
      </div>
      
      <div className='relative'>
        <label htmlFor="password" className='text-sm font-medium text-gray-700 mb-1 block'>
          Password
        </label>

        <div className='relative'>
        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5'/>
        <input 
        id="password" 
        name="password" 
        type={showPassword ? "text" : "password"} 
        placeholder='••••••••' 
        className='w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 transition-colors' 
        />
        <button
          type='button'
          onClick={()=> setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
        >
      
          {showPassword ? <EyeOff className='h-5 w-5'/>: <Eye className='h-5 w-5'/>}
        </button>  
      </div>
      {state?.errors?.password && <p className='text-red-500 text-sm mt-1'>{state.errors.password}</p>}
      </div> 

      <div className='mb-1'>
        <input type="checkbox" name="remember" id="remember" />
        <label className='p-2'>Remember me</label>
      </div>
     
     <div className='mb-4 text-sm'>
      
     <p className=' text-blue-600 underline'><a href='#'>Forgot Password?</a></p>
     </div>
    
   
      <button  disabled={pending}  
      type="submit" 
      className='w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'>
        {pending ? (
          <span>
            Processing...
          </span>
        ):(
          "Login"
        )
        }
      </button>

      <p className="text-center text-sm text-gray-600">
              Create a new account?{' '}
              <Link href="/pages/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
     </form>
     </div>
         <div className="hidden md:block md:w-1/2 relative">
            <Image
              src="/pexels-lina.jpg"
              width={500}
              height={950}
              objectFit='cover'
              alt="Signup illustration"
              className="rounded-r-2xl shadow-lg transform "
            />
        </div>
    </div>
  </div>
  )
}