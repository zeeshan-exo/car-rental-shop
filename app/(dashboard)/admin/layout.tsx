"use client"
import React from 'react'
import Notifications from '@/components/shared/Notifications'
import { House, LayoutDashboard, Search } from 'lucide-react'
import Header from '@/components/layout/Header'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { User2 } from 'lucide-react'
import Profile from '@/components/user/Profile'


const Layout = ({children}:{children: React.ReactNode}) => {
  const{data: session} = useSession({required: false})

  const user = session?.user
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
      
     <Header
     title="AutoNex"
     navLinks={[
      // { label: <House/>, href: "/" },
      { label: <LayoutDashboard/>, href: "/admin" },
      { label:  <User2/>, href: "/admin/users" },
      { label: <Search/>, href: "" },
     ]}
      rightContent={
        <div className="flex justify-between items-center gap-14 flex-wrap">
          {user ?(
            <Profile/>
          ):(
            <Link
            href="/auth/login"
            className="text-AppPrimary font-medium hover:underline"
          >
            Login
          </Link>
          )}

      </div>
      
    }
     />
        <main className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-gray-blue-300 scrollbar-track-gray-100 bg-gray-50 shadow-inner rounded-lg">
          {children}
        </main>
     
      </div>
      
     </div>
  )
}

export default Layout