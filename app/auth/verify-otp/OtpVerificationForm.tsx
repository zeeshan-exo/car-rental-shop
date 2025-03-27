
'use client'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import {  Megaphone } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const OtpVerification= () => {
    const [otpValue, setOtpValue] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const res = await fetch('/api/otp-verify', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, otp: otpValue })
        })

        const data = await res.json()
        if (!res.ok) {
            console.log("Error Occur while verify otp")
        } else {
            router.push("/auth/login")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">

                    <div className="bg-AppPrimary p-6 text-center">
                        <h1 className="text-2xl font-bold text-white">Verification Code</h1>
                        <p className="mt-2 text-indigo-100">
                            Please enter the verification code sent to
                        </p>
                        <p className="text-indigo-200 font-medium">
                            {email || 'your email'}
                        </p>
                    </div>
                    
                    <form onSubmit={handleVerify} className="p-6">
                        <div className="mb-8">
                            <label className="block text-gray-700 text-sm font-medium mb-4">
                                Enter 6-digit code
                            </label>
                            
                            <div className="">
                               
                                    <InputOTP 
                                    maxLength={6}
                                    value={otpValue}
                                    onChange={(value) => setOtpValue(value)}
                                    >
                                      <InputOTPGroup>
                                      <InputOTPSlot index={0}/>
                                      <InputOTPSlot index={1}/>
                                      <InputOTPSlot index={2}/>
                                      </InputOTPGroup>
                                      <InputOTPSeparator/>
                                      <InputOTPGroup>
                                      <InputOTPSlot index={3}/>
                                      <InputOTPSlot index={4}/>
                                      <InputOTPSlot index={5}/>
                                      </InputOTPGroup>
                                    </InputOTP>
                                
                            </div>
                        </div>
                        
                        <Button 
                            type="submit"
                            variant={"outline"} 
                            className="w-full bg-AppPrimary hover:bg-blue-600  text-white hover:text-white  font-medium rounded-md shadow-sm"
                        >
                            Verify Code
                        </Button>
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Didn't receive a code? <button type="button" className="text-AppPrimary font-medium">Resend</button>
                            </p>
                        </div>
                    </form>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
                    <div className="flex items-start gap-2">
                        < Megaphone className='h-12 w-12 text-AppAccent'/>
                        <p className="text-sm  text-AppAccent">
                            The verification code will expire in 10 minutes. Please check your inbox and spam folder if you haven't received it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpVerification