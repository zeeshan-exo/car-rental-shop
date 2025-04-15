"use client"
import React from "react"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()

  const handleGoBack = () =>{
     if(window.history.length > 1){
        router.back()
     }else{
       router.push("/")
     }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        <Card className="w-full max-w-md shadow-lg border border-gray-200">
            <CardHeader className="text-center">
                <div className="flex justify-center">
                    <AlertTriangle className="h-12 w-12 text-AppDanger"/>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-80">Access Denied</CardTitle>
                <CardDescription className="text-AppDark">{"You don't have permission to view this page"}.</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-gray-500">{"It's look like you wandered in the restricted territory."}</p>
              <Button variant="ghost" 
              className=" bg-AppPrimary text-AppLight"
              onClick={handleGoBack}
              >
                  Go Back
              </Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default Page