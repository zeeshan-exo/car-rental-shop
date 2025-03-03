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
            router.push("/pages/login")
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






// 'use client'
// import { useSearchParams, useRouter } from 'next/navigation'
// import React, { useState, useEffect } from 'react'

// const OtpVerify = () => {
//     const [otp, setOtp] = useState(['', '', '', '', '', ''])
//     const [isLoading, setIsLoading] = useState(false)
//     const [error, setError] = useState('')
//     const [timeLeft, setTimeLeft] = useState(120) // 2 minutes countdown
    
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const email = searchParams.get("email")
    
//     // Countdown timer effect
//     useEffect(() => {
//         if (timeLeft <= 0) return
        
//         const timer = setInterval(() => {
//             setTimeLeft(prev => prev - 1)
//         }, 1000)
        
//         return () => clearInterval(timer)
//     }, [timeLeft])
    
//     // Format time as MM:SS
//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60)
//         const secs = seconds % 60
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//     }
    
//     // Handle input change for individual OTP fields
//     const handleChange = (index, value) => {
//         // Only allow numbers
//         if (!/^\d*$/.test(value)) return
        
//         const newOtp = [...otp]
//         newOtp[index] = value
//         setOtp(newOtp)
        
//         // Auto-focus next input
//         if (value && index < 5) {
//             const nextInput = document.getElementById(`otp-${index + 1}`)
//             if (nextInput) nextInput.focus()
//         }
//     }
    
//     // Handle key events for navigation between inputs
//     const handleKeyDown = (index, e) => {
//         if (e.key === 'Backspace' && !otp[index] && index > 0) {
//             // Move to previous input on backspace if current is empty
//             const prevInput = document.getElementById(`otp-${index - 1}`)
//             if (prevInput) prevInput.focus()
//         }
//     }
    
//     // Handle OTP paste
//     const handlePaste = (e) => {
//         e.preventDefault()
//         const pastedData = e.clipboardData.getData('text')
//         if (!/^\d+$/.test(pastedData)) return
        
//         const digits = pastedData.slice(0, 6).split('')
//         const newOtp = [...otp]
        
//         digits.forEach((digit, index) => {
//             if (index < 6) newOtp[index] = digit
//         })
        
//         setOtp(newOtp)
        
//         // Focus last filled input or the next empty one
//         const lastIndex = Math.min(digits.length - 1, 5)
//         const lastInput = document.getElementById(`otp-${lastIndex}`)
//         if (lastInput) lastInput.focus()
//     }
    
//     const handleResend = async () => {
//         try {
//             setIsLoading(true)
//             // Implement your resend OTP logic here
//             const res = await fetch('/api/resend-otp', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email })
//             })
            
//             if (!res.ok) {
//                 throw new Error('Failed to resend OTP')
//             }
            
//             // Reset timer
//             setTimeLeft(120)
//             setError('')
//         } catch (err) {
//             setError('Failed to resend OTP. Please try again.')
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
//     const handleVerify = async (e) => {
//         e.preventDefault()
//         setIsLoading(true)
//         setError('')
        
//         // Join OTP values
//         const otpValue = otp.join('')
        
//         // Validate OTP
//         if (otpValue.length !== 6) {
//             setError('Please enter all 6 digits')
//             setIsLoading(false)
//             return
//         }
        
//         try {
//             const res = await fetch('/api/otp-verify', {
//                 method: "POST",
//                 headers: { "Content-type": "application/json" },
//                 body: JSON.stringify({ email, otp: otpValue })
//             })
            
//             const data = await res.json()
            
//             if (!res.ok) {
//                 setError(data.message || 'Invalid OTP. Please try again.')
//             } else {
//                 router.push("/pages/login")
//             }
//         } catch (err) {
//             setError('An error occurred. Please try again.')
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//             <div className="w-full max-w-md">
//                 <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                     <div className="bg-indigo-600 p-6 text-white text-center">
//                         <h1 className="text-2xl font-bold">Verification Required</h1>
//                         <p className="mt-2 opacity-80">
//                             We've sent a 6-digit code to
//                             <span className="font-medium block truncate">
//                                 {email || 'your email'}
//                             </span>
//                         </p>
//                     </div>
                    
//                     <form onSubmit={handleVerify} className="p-8">
//                         <div className="text-center mb-6">
//                             <p className="text-gray-600 mb-1">Enter verification code</p>
//                             <div className="flex justify-center gap-2 mt-2" onPaste={handlePaste}>
//                                 {otp.map((digit, index) => (
//                                     <input
//                                         key={index}
//                                         id={`otp-${index}`}
//                                         type="text"
//                                         maxLength={1}
//                                         value={digit}
//                                         onChange={(e) => handleChange(index, e.target.value)}
//                                         onKeyDown={(e) => handleKeyDown(index, e)}
//                                         className="w-12 h-14 text-center text-xl font-bold border rounded-md 
//                                                  shadow-sm focus:border-indigo-500 focus:ring-1 
//                                                  focus:ring-indigo-500 focus:outline-none"
//                                     />
//                                 ))}
//                             </div>
                            
//                             {error && (
//                                 <p className="text-red-500 mt-2 text-sm">{error}</p>
//                             )}
                            
//                             <div className="mt-6 text-sm text-gray-600">
//                                 {timeLeft > 0 ? (
//                                     <p>Resend code in {formatTime(timeLeft)}</p>
//                                 ) : (
//                                     <button
//                                         type="button"
//                                         onClick={handleResend}
//                                         disabled={isLoading}
//                                         className="text-indigo-600 hover:text-indigo-800 font-medium"
//                                     >
//                                         Resend code
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
                        
//                         <button
//                             type="submit"
//                             disabled={isLoading || otp.join('').length !== 6}
//                             className={`w-full py-3 px-4 rounded-lg font-medium text-white 
//                                       transition-all duration-300 ${
//                                           isLoading || otp.join('').length !== 6
//                                           ? 'bg-indigo-400 cursor-not-allowed'
//                                           : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300'
//                                       }`}
//                         >
//                             {isLoading ? 'Verifying...' : 'Verify & Continue'}
//                         </button>
                        
//                         <p className="mt-6 text-center text-sm text-gray-600">
//                             Having trouble? <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Contact Support</a>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default OtpVerify