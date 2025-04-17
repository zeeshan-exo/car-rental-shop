import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card'
import { Settings } from 'lucide-react'


const data = [
    {title: "Account Information"}
]

const Account = () => {
  return (
    <section className='bg-AppLight text-AppSecondary  dark:bg-AppSecondary'>
        <h2 className='flex items-center gap-2 text-2xl font-medium px-8 py-4'><span><Settings size={22}/></span>Account Settings</h2>
        <hr className='border-AppDark'/>
        <div className='flex flex-row gap-4 p-8'>
        <Card className='w-full border-none min-h-screen text-AppDark'>
            {/* <CardHeader>
                <CardTitle className='text-AppSecondary'>Account Information</CardTitle>
            </CardHeader> */}
            <CardContent>
                <div>
                    <div className='my-6 gap-4'>
                       <h2 className='text-xl font-normal text-AppSecondary'>Personal Info</h2>
                       <p>Update your photo and personal details here.</p>
                    </div>
                    <hr className='border-gray-200'/>
                </div>
                <div>
                    <div className='p-4'>
                        <ul>
                            <li>Name</li>
                            <li>Email</li>
                            <li>Personal Details</li>
                        </ul>

                    </div>
                </div>
            </CardContent>
        </Card>
        </div>
    </section>
  )
}

export default Account