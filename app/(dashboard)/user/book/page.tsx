import { User } from 'lucide-react'
import React from 'react'

const formbook = () => {
  return (
    <div>
        <form action="">
            <div className='p-8 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100'>
          <div className='relative'>
            <label
            htmlFor='email'
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
             {/* {required && <span className="text-red-500">*</span>} */}
          </label>
          <div>
                   <span  className="absolute inset-y-0 left-0 pl-3 flex items-center"><User/></span>
                   <input 
                   type="text"
                  placeholder='email' 
                  required
                   className="w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
               />
          </div>
          </div>
          <div className='relative'>
            <label
            htmlFor='email'
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
             {/* {required && <span className="text-red-500">*</span>} */}
          </label>
          <div>
                   <span  className="absolute inset-y-0 left-0 pl-3 flex items-center"><User/></span>
                   <input 
                   type="text"
                  placeholder='email' 
                  required
                   className="w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
               />
          </div>
          </div>
          <div className='relative'>
            <label
            htmlFor='email'
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
             {/* {required && <span className="text-red-500">*</span>} */}
          </label>
          <div>
                   <span  className="absolute inset-y-0 left-0 pl-3 flex items-center"><User/></span>
                   <input 
                   type="text"
                  placeholder='email' 
                  required
                   className="w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
               />
          </div>
          </div>
          <div className='relative'>
            <label
            htmlFor='email'
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
             {/* {required && <span className="text-red-500">*</span>} */}
          </label>
          <div>
                   <span  className="absolute inset-y-0 left-0 pl-3 flex items-center"><User/></span>
                   <input 
                   type="text"
                  placeholder='email' 
                  required
                   className="w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
               />
          </div>
          </div>
            </div>
        </form>
    </div>
  )
}

export default formbook