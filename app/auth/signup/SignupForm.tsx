'use client'
import { useActionState, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import Image from 'next/image'

import { signup } from '../../../actions/auth'
import Link from 'next/link'
import { Eye, EyeOff, User, Mail, Lock, MapPin, CreditCard } from 'lucide-react'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
  const [verified, setIsVerified] = useState(false)
  const [role, setRole] = useState('customer')
  const [showPassword, setShowPassword] = useState(false)
  const recaptchaRef = useRef(null)

  async function handleSubmit(token) {
    try {
      if (token) {
        await axios.post("/api/recaptcha", { token }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setIsVerified(true)
      }
    } catch (error) {
      console.log("Handle submit error", error);
    }
  }

  const handleonChange = (token) => {
    handleSubmit(token)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="flex w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white">
        <div className="w-full md:w-1/2 p-8">
          <form action={action} className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome!</h1>
              <p className="text-gray-600 mt-2">Create your account to get started</p>
            </div>

            <div className="relative">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300  transition-colors"
                />
              </div>
              {state?.errors?.name && 
                <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
              }
            </div>

            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 transition-colors"
                />
              </div>
              {state?.errors?.email && 
                <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
              }
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-gray-300   transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {state?.errors?.password && 
                <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
              }
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Account Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="role"
                      value="vendor"
                      checked={role === 'vendor'}
                      onChange={(e) => setRole(e.target.value)}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 rounded-full border ${role === 'vendor' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} group-hover:border-blue-400 transition-colors`}>
                      {role === 'vendor' && <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>}
                    </div>
                  </div>
                  <span className="text-gray-700">Vendor</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="role"
                      value="customer"
                      checked={role === 'customer'}
                      onChange={(e) => setRole(e.target.value)}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 rounded-full border ${role === 'customer' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} group-hover:border-blue-400 transition-colors`}>
                      {role === 'customer' && <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>}
                    </div>
                  </div>
                  <span className="text-gray-700">Customer</span>
                </label>
              </div>
            </div>

            {role === 'vendor' && (
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="idCard" className="text-sm font-medium text-gray-700 mb-1 block">
                    ID Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="idCard"
                      id="idCard"
                      placeholder="Enter your ID card number"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1 block">
                    Business Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter your business address"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                ref={recaptchaRef}
                onChange={handleonChange}
              />
            </div>

            <button
              disabled={pending || !verified}
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {pending ? (
                <span className="flex items-center justify-center">
                  Processing...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2 relative">
                    <Image
                      src="/pexels-floristony.jpg"
                      width={600}
                      height={950}
                      objectFit='cover'
                      alt="Signup illustration"
                      className="rounded-r-2xl shadow-lg transform "
                    />
        </div>
      </div>
    </div>
  )
}