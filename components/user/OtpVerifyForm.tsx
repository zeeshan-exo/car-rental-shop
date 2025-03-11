'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState, useRef } from 'react'

const OtpVerify = () => {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return

        const newOtpValues = [...otpValues]
        newOtpValues[index] = value.substring(0, 1)
        setOtpValues(newOtpValues)

        // Move to next input if current field is filled
        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        const otpValue = otpValues.join('')
        
        const res = await fetch('/api/otp-verifiy', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, otp: otpValue })
        })
        console.log("Response:", res)

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
                    {/* Header */}
                    <div className="bg-indigo-700 p-6 text-center">
                        <h1 className="text-2xl font-bold text-white">Verification Code</h1>
                        <p className="mt-2 text-indigo-100">
                            Please enter the verification code sent to
                        </p>
                        <p className="text-indigo-200 font-medium">
                            {email || 'your email'}
                        </p>
                    </div>
                    
                    {/* Form */}
                    <form onSubmit={handleVerify} className="p-6">
                        <div className="mb-8">
                            <label className="block text-gray-700 text-sm font-medium mb-4">
                                Enter 6-digit code
                            </label>
                            
                            <div className="flex justify-between gap-2">
                                {otpValues.map((value, index) => (
                                    <input
                                        key={index}
                                        ref={el => inputRefs.current[index] = el}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={value}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-12 text-center text-xl font-bold bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full px-6 py-3 bg-indigo-700 text-white font-medium rounded-md shadow-sm"
                        >
                            Verify Code
                        </button>
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Didn't receive a code? <button type="button" className="text-indigo-700 font-medium">Resend</button>
                            </p>
                        </div>
                    </form>
                </div>
                
                {/* Information card */}
                <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
                    <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-blue-800">
                            The verification code will expire in 10 minutes. Please check your inbox and spam folder if you haven't received it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpVerify