'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const OtpVerify = () => {
    const [otp, setOtp] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

   const handleVerify= async (e: React.FormEvent)=>{
    e.preventDefault()
     const res = await fetch('/api/otp-verifiy',{

        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({email, otp})
     })
     console.log("Response:", res)

     const data = await res.json()
     if(!res.ok){
        console.log("Error Occur while verify otp")
     }else{
        router.push("/pages/login")
     }
   }
  return (
    <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleVerify} className="p-6 bg-gray-200 shadow-lg rounded hover:shadow-2xl transition-all">
                <h1 className="text-xl mb-4">Enter OTP</h1>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="enter your 6 digit code"
                    className="border p-2 w-full mb-4 placeholder:text-sm"
                />
               
                <button type="submit" className="bg-green-500 text-white w-full  px-4 py-2 rounded">
                    Verify OTP
                </button>
            </form>
        </div>
  )
}

export default OtpVerify