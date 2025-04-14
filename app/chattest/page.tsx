"use client"
import React from 'react'
import { Chat } from '@/components/Chat'
import { useSession } from 'next-auth/react'
import { Session } from 'inspector/promises'

const Page = () => {
    const {data: session} = useSession()
    const user = session?.user
    const userId = session?.user.id
    const role = session?.user?.role

    // console.log("Role:", role)
    // console.log("User Id:", userId)
  return (
    <div><Chat userId={session?.user.id} userRole={session?.user?.role}/></div>
  )
}


export default Page