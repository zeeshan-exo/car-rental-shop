import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card'
import { Edit, Settings } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { Button } from '../ui/button'
import { updateBio } from '@/actions/users'
import { getUser } from '@/actions/users'


const data = [
    {title: "Account Information"}
]

const Account = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    const userId = session?.user.id.toString()
    const bioData = await getUser(userId)

  return (
    <section className='bg-AppLight text-AppSecondary  dark:bg-AppSecondary'>
        <h2 className='flex items-center gap-2 text-2xl font-medium px-8 py-4'><span><Settings size={22}/></span>Account Settings</h2>
         
        <p className='text-sm bg-red-100 text-AppDanger p-8 flex justify-between'>You have'nt complete your profile yet. Please complete your profile to be authenticated.
            <span>
                <Button variant="outline" >
                   complete profile
                </Button></span>
        </p>
        <div className='flex flex-row gap-4 p-8'>
        <Card className='w-full border-none min-h-screen text-AppDark'>
            <CardContent>
                <div>
                    <div className='my-6 gap-4 flex justify-between'>
                        <div>
                        <h2 className='text-xl font-normal text-AppSecondary'>Personal Info</h2>
                        <p>Update your photo and personal details here.</p>
                        </div>
                        <div>
                            <Button variant="outline">Edit <Edit/></Button>
                        </div>
                      
                    </div>
                    <hr className='border-gray-200'/>
                </div>
                <div>
                    <div>
                        <ul className='p-4'>
                            <li className='flex justify-between '>Name <span>{user?.name}</span></li>
                            <li className='flex justify-between'>Email <span>{user?.email}</span></li>
                            <li className='flex justify-between'>Bio <span>{bioData?.bio}</span></li>
                        </ul>
                        <hr/>
                        <ul className=' p-4'>
                            <li className='flex justify-between'>Role <span>{user?.role}</span></li>
                        </ul>
                        <hr/>
                        <ul className='p-4'>
                            <h4 className='text-AppSecondary text-xl font-normal'>Personal Information </h4>
                            
                            <li className='flex justify-between'>
                                Age <span>{bioData?.age}</span>
                            </li>
                            <li className='flex justify-between'> Country <span>{bioData.country}</span></li>
                           
                        </ul>
                        <ul className='p-4'>
                            <Button variant="outline" className='text-AppSecondaryLight hover:text-AppSecondaryLight bg-AppDanger hover:bg-AppDanger'>
                                Delete Account
                            </Button>
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