import React from 'react'
import Notifications from '@/components/Notifications'
import { House, LayoutDashboard, Search } from 'lucide-react'
import Header from '@/components/layout/Header'
import ProfileImage from '@/components/ProfileImage'
import { User2 } from 'lucide-react'


const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
      
     <Header
     title="AutoNex"
     navLinks={[
      { label: <House/>, href: "/" },
      { label: <LayoutDashboard/>, href: "/admin/dashboard" },
      { label:  <User2/>, href: "/admin/users" },
      { label: <Search/>, href: "" },
     ]}
      rightContent={
        <div className="flex justify-between items-center gap-14 flex-wrap">
         //profile
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