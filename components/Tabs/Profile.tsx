"use client"
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import Image from 'next/image'
import { Button } from '../ui/button'
import { signOut, useSession } from 'next-auth/react'
import { LogOut, Settings, User } from 'lucide-react'

const Profile = () => {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full p-0 hover:bg-slate-50 transition-colors">
            <div className="relative overflow-hidden rounded-full border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <Image
                src="/profile.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full bg-slate-100 cursor-pointer object-cover"
              />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64 p-2 rounded-lg shadow-md" align="end">
          <div className="flex items-center gap-3 p-3">
            <div className="bg-blue-50 p-2 rounded-full">
              <User size={20} className="text-AppPrimary" />
            </div>
            <DropdownMenuLabel className="text-base font-medium m-0 p-0">
              {user?.name || "User"}
            </DropdownMenuLabel>
          </div>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-slate-50">
                <User size={18} className='text-AppDark'/>
                <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-slate-50">
              <Settings size={18} className="text-AppDark" />
              <span>Account Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem 
            onClick={() => signOut()}
            className="flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-red-50 text-AppDanger focus:bg-red-50 focus:text-AppDanger"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Profile