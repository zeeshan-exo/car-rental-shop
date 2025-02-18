import React from 'react'
import Link from 'next/link'
import { logout } from '../services/actions/auth'

const Sidebar = () => {
  return (
    <div className='bg-slate-600 text-white font-bold max-w-60 min-h-screen'>
        <nav className='flex flex-col space-y-4 p-2'>
        
        <Link href="/" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>Home</Link>
        <Link href="/dashboard/products" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>Products</Link>
        <Link href="/dashboard/customers" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>Customers</Link>
        <Link href="/dashboard" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>Orders</Link>
        <Link href="/dashboard" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>Reviews</Link>
        <Link href="/" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>Services</Link>

        <button onClick={logout}>signout</button>
        </nav>
        
    </div>
  )
}

export default Sidebar