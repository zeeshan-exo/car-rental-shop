import Link from 'next/link'
import React from 'react'


const Header = () => {
  return (
    <div>
        <nav className=' w-full max-auto  p-4 '>
            <div className='flex justify-between items-center' >
                <div className='text-2xl font-bold tracking-wide'>Expo</div>
           
          
                <ul className='hidden md:flex space-x-6 text-lg font-medium '>
                    <li className="hover:text-gray-300 transition duration-300">
                    <a href='/'>Home</a>
                    </li>
                    <li className="hover:text-gray-300 transition duration-300">
                    <Link href='/dashboard'>Dashboard</Link>
                    </li>
                    <li className="hover:text-gray-300 transition duration-300">
                    <a href='#'>About</a>
                    </li>
                    <li className="hover:text-gray-300 transition duration-300">
                    <a href='#'>Contact</a>
                    </li>
                    <li >
                    <Link href="/pages/signup"  className="px-6 py-2 rounded-full font-bold bg-gray-600 text-white  hover:bg-gray-800 transition duration-300 ease-in-out focus:ring-2 focus:ring-gray-500 shadow-md">
                        Signup
                    </Link>
                    </li>
                   
                    
                </ul>
           
            </div>
        </nav>
    </div>
  )
}

export default Header