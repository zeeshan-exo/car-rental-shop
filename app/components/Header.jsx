import Link from 'next/link'
import React from 'react'


const Header = () => {
  return (
    <div>
        <nav className=' w-full max-auto bg-gray-700 p-4 text-white'>
            <div className='flex justify-between items-center' >
                <div className='text-2xl text-white text-bold '>Expo</div>
           
          
                <ul className='flex space-x-6 '>
                    <li className='hover:text-gray-300'>
                    <a href='/'>Home</a>
                    </li>
                    <li className='hover:text-gray-300'>
                    <a href='#'>About</a>
                    </li>
                    <li className='hover:text-gray-300'>
                    <a href='#'>Contact</a>
                    </li>
                     <Link href="/pages/signup" className=' bg-white text-gray-800 rounded-full text-gray p-1 hover:text-gray-400'>
                        Signup
                    </Link>
                    
                </ul>
           
            </div>
        </nav>
    </div>
  )
}

export default Header