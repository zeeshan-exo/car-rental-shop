"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, House } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

const NotFound = () => {
    const router = useRouter()

    const handleGoBack = () => {
        if(window.history.length > 1){
            router.back()
        }else{
            router.push("/")
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
         <Card className='w-full max-w-md shadow-lg border border-gray-200'>
            <CardHeader className='text-center'>
               <div className='flex justify-center mb-4'><AlertTriangle className='h-12 w-12 text-AppDanger'/></div>
               <CardTitle>404 - Page Not Found</CardTitle>
               <CardDescription>The page you're looking for doesn't exist.</CardDescription>
            </CardHeader>
            <CardContent className='text-center space-y-4'>
                <p className="text-sm text-gray-500">
                 It seems you’ve taken a wrong turn. Let’s get you back on track!
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                 <Button
                  className='bg-AppPrimary hover:bg-AppPrimary transition-all shadow-lg'
                  onClick={handleGoBack} 
                 >
                  Go Back
                 </Button>
                 <Button
                 variant="outline"
                 className='bg-AppAccent hover:bg-amber-600 text-white hover:text-white'
                 >
                <Link href="/">
                     Home
                </Link>
 
                 </Button>
                </div>
            </CardContent>
         </Card>
    </div>
  )
}

export default NotFound