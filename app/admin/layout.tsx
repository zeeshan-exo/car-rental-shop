import React from 'react'
import Notifications from '@/components/Notifications'
import { House, LayoutDashboard, Search } from 'lucide-react'
import Header from '@/components/Header'
import ProfileImage from '@/components/ProfileImage'
import Link from 'next/link'


const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
      
     <Header
     title="Expo"
     navLinks={[
      { label: <House/>, href: "/" },
      { label: <LayoutDashboard/>, href: "/dashboard" },
      { label: <Search/>, href: "" },
     ]}
      rightContent={
        <div className="flex justify-between items-center gap-14 flex-wrap">

        {/* <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Notifications userId={user.userId} role={user.role || "customer"} />
              <ProfileImage/>
              
            </>
          ) : (
            <Link href="/auth/login" className="text-blue-500 font-medium hover:underline">
              Login
            </Link>
          )}
        </div> */}
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

export default layout