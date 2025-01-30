import React from 'react'
import Link from 'next/link'
import { logout } from '../actions/auth'

const Sidebar = () => {
  return (
    <div className='bg-slate-600 text-white font-bold max-w-60 min-h-screen'>
        <nav className='flex flex-col space-y-4 p-2'>
            <h1 className='text-3xl text-slate-900'>Dashboard</h1>
        <Link href="/" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>Home</Link>
        <Link href="/" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>About</Link>
        <Link href="/" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>Contact</Link>
        <Link href="/" className='focus:outline-none rounded-md hover:bg-slate-900 p-2'>Services</Link>

        <button onClick={logout}>signout</button>
        </nav>
        
    </div>
  )
}

export default Sidebar