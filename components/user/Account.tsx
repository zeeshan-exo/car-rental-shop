import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getUser } from '@/actions/users'
import { Edit, Eye } from 'lucide-react'

const ProfilePage = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  const userId = session?.user?.id?.toString()
  const bioData = await getUser(userId)

  return (
    <div className="bg-AppSecondaryLight min-h-screen p-6 dark:bg-slate-900">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-xl font-medium mb-6 dark:text-white">My Profile</h1>

        <div className="bg-AppLight rounded-md shadow-sm mb-6 dark:bg-slate-800">
          <div className="p-6 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-slate-200 flex-shrink-0 relative">
              {user?.image ? (
                  <Image 
                    src={user.image} 
                    alt="Profile" 
                    width={64} 
                    height={64} 
                    className="rounded-full object-cover"
                  />
                 
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-500 font-medium">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div>
              <h2 className="font-medium text-lg dark:text-white">{user?.name || "User"}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user?.role || "Member"}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{bioData?.location || bioData?.city || ""}</p>
            </div>
          </div>
        </div>

        <div className="bg-AppLight rounded-md shadow-sm mb-6 dark:bg-slate-800">
          <div className="px-6 py-4 flex items-center justify-between border-b dark:border-slate-700">
            <h3 className="font-medium dark:text-white">Personal Information</h3>
            <Button variant="outline" size="sm" className="h-8 border-AppDark">
              <Edit className="h-3.5 w-3.5 mr-1" /> Edit
            </Button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">First Name</p>
                <p className="dark:text-white">{user?.name?.split(' ')[0] || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Last Name</p>
                <p className="dark:text-white">{user?.name?.split(' ')[1] || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Date of Birth</p>
                <p className="dark:text-white">{bioData?.dateOfBirth || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Email Address</p>
                <p className="dark:text-white">{user?.email || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Phone Number</p>
                <p className="dark:text-white">{bioData?.phone || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">User Role</p>
                <p className="dark:text-white">{user?.role || "Not set"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-AppLight rounded-md shadow-sm mb-6 dark:bg-slate-800">
          <div className="px-6 py-4 flex items-center justify-between border-b dark:border-slate-700">
            <h3 className="font-medium dark:text-white">Password</h3>
            <Button variant="outline" size="sm" className="h-8 border-AppDark">
              <Eye className="h-3.5 w-3.5" />Change Password
            </Button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Password</p>
                <p className="dark:text-white">******</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-AppLight rounded-md shadow-sm mb-6 dark:bg-slate-800 border-">
          <div className="px-6 py-4 flex items-center justify-between border-b dark:border-slate-700">
            <h3 className="font-medium dark:text-white">Address</h3>
            <Button variant="outline" size="sm" className="h-8 border-AppDark">
              <Edit className="h-3.5 w-3.5 mr-1" /> Edit
            </Button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Country</p>
                <p className="dark:text-white text-sm">{bioData?.country || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">City</p>
                <p className="dark:text-white">{bioData?.city || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Street no.</p>
                <p className="dark:text-white text-sm">{bioData?.postalCode || "Not set"}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-AppLight mb-6 rounded-md shadow-sm dark:bg-slate-800">
          <div className="px-6 py-4 flex items-center justify-between border-b dark:border-slate-700">
            <h3 className="font-medium dark:text-white">My rentals</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Booking History</p>
                <p className="dark:text-white text-sm">Past Bookings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-AppLight mb-6 rounded-md shadow-sm dark:bg-slate-800">
          <div className="px-6 py-4 flex items-center justify-between border-b dark:border-slate-700">
            <h3 className="font-medium dark:text-white">Lisence</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Driver's Lisence</p>
                <p className="dark:text-white">***********</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-AppLight mb-6 rounded-md shadow-sm dark:bg-slate-800">
          <div className="px-6 py-4 flex items-center justify-between border-b dark:border-slate-700">
            <h3 className="font-medium dark:text-white">Payment Method</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Payment</p>
                <p className="dark:text-white text-sm">Card / Cash</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-AppLight rounded-md shadow-sm dark:bg-slate-800">
          <div className="px-6 py-4 flex items-center justify-between border-b dark:border-slate-700">
            <h3 className="font-medium dark:text-white">Delete Account</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1 dark:text-slate-400">Delete Account</p>
                <p className="dark:text-white text-sm">Do you want to delete your account?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage