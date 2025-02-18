"use client"
import React from 'react'
import Image from 'next/image'

const ProfileImage = () => {
  return (
    <div>
       <div className="flex items-center">
    <Image
      src={"/profile.png"}
      alt={"A"}
      width={40}
      height={40}
      className="rounded-full bg-slate-300"
     />
   </div>
   </div>
  )
}
export default ProfileImage