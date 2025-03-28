"use client"
import React from 'react'
import { Chat } from '@/components/Chat'
import { useSession } from 'next-auth/react'
import { Session } from 'inspector/promises'

const page = () => {
    const {data: session} = useSession()
    const user = session?.user
    const userId = session?.user.id
    const role = session?.user?.role
  return (
    <div><Chat userId='userId' userRole='role'/></div>
  )
}


export default page