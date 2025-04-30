"use client"
import React, {useEffect, useState} from 'react'
import StatCard from '@/components/dashboard/StatCard'
import { Car, CreditCard, Users, AlertCircle, Clock, BarChart3, Filter, MapPin, Calendar, User2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Tabs,TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from '@/lib/currency'
import Image from 'next/image'
import StatusCards from '@/components/dashboard/StatusCards'
import UserList from '@/components/dashboard/Tabs/UserList'
import CarsList from '@/components/dashboard/Tabs/CarsList'
import { getUsers } from '@/actions/users'
import { useSession } from 'next-auth/react'
import { getAllCars } from '@/actions/cars'
import { CarType } from '@/lib/definitions/carDefinitions'

const Dashboard = () => {
      const [activeTab, setActiveTab] = useState("overview")
      const [users, setUsers] = useState([])
      const [cars, setCars] = useState<CarType[]>([])
      const [pages, setPages] = useState()
      const {data :session } = useSession()
      const user = session?.user

    const fetchUsers = async () => {
      const response = await getUsers()
      setUsers(response)
    }

    const fetchCars = async () => {
      // const searchParams = await props.searchParams
      // const currentPage = Number(searchParams?.page)|| 1
      const {allCars, cars, totalPages} = await getAllCars()
      setCars(allCars, cars)
      setPages(totalPages)
    }

    useEffect (() => {
      fetchUsers()
      fetchCars()
    },[])

    const totalUsers = users.length
    const activeUsers = users.filter(user => user?.status === "active").length
    const vendors = users.filter(user => user?.role === "vendor").length
    const customers = users.filter(user => user?.role === "customer").length
    const totalCars = cars.length
    const availableCars = cars.filter(car => car?.isAvailable === "available").length

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <div className="bg-gradient-to-r from-sky-700 to-indigo-800 text-AppLight p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-sky-100 mt-1">Welcome back, {user?.name}.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-AppLight/20 hover:bg-AppLight/30 backdrop-blur-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm" className="bg-AppLight text-sky-800 hover:bg-sky-100">
              <Clock className="h-4 w-4 mr-2" />
              Activity Log
            </Button>
            <div className="flex items-center ml-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <Image src="/api/placeholder/40/40" alt="User" width={256} height={256} />
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3">
      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab} >
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[500px] bg-gray-200 py-2 rounded-lg font-normal text-sm" >
              <TabsTrigger value="overview" >Overview</TabsTrigger>
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </Tabs>
       
        <div className={`${activeTab ==="users" ? "block" : "hidden"}`}>
            <UserList users={users}/>
        </div>

        <div className={`${activeTab === "cars" ? "block": "hidden"}`}>
             <CarsList cars={cars} totalCars={totalCars} totalPages ={pages}/>
        </div>

        <div  className={`${activeTab === "overview" ? "block" : "hidden"} grid grid-cols-1 lg:grid-cols-3 gap-6`}>
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard 
                title="Active User's" 
                value={activeUsers}
                change="+12%" 
                icon={<Users className="h-6 w-6 text-indigo-600" />} 
              />
              <StatCard 
                title="Total Cars" 
                value={totalCars}
                change="-4%" 
                icon={<Car className="h-6 w-6 text-sky-600" />} 
              />
              <StatCard 
                title="Cars Rented" 
                value={availableCars}
                change="+7%" 
                icon={<Car className="h-6 w-6 text-AppAccent" />} 
              />
              <StatCard 
                title="Monthly Revenue" 
                value={formatCurrency(2840)}
                change="+18%" 
                icon={<CreditCard className="h-6 w-6 text-emerald-600" />} 
              />
              
            </div>


            <div className="bg-AppLight rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-sky-700 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800">Traffic</h2>
                </div>
                <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                  <Button variant="ghost" size="sm" className="rounded-md hover:bg-AppLight text-xs">Weekly</Button>
                  <Button variant="ghost" size="sm" className="rounded-md hover:bg-AppLight text-xs">Monthly</Button>
                  <Button size="sm" className="rounded-md bg-AppLight text-sky-700 shadow-sm hover:bg-gray-50 text-xs">Yearly</Button>
                </div>
              </div>
              <div className="p-6 h-64 flex items-center justify-center text-gray-500">
                {/* Chart placeholder */}
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Traffic chart will appear here</p>
                </div>
              </div>
            </div>

            
          </div>

 
          <div className="space-y-6">
            
            

            <StatusCards
            title="Total Uers"
            count={totalUsers}
            icon={<User2 className="h-5 w-5 text-AppPrimary" />}
            iconBgColor="bg-AppSecondaryLight"
            description={ `Total ${totalUsers} users.`}
            borderColor="border-AppPrimary"
            />

           <StatusCards
            title="Vendor's"
            count={vendors}
            icon={<Car className="h-5 w-5 text-AppAccent" />}
            iconBgColor="bg-amber-100"
            description={ `Total ${vendors} vendor.`}
            borderColor="border-AppAccent"
            // buttonText="View Details"
            />

          <StatusCards
            title="Customer's"
            count={customers}
            icon={<User2 className="h-5 w-5  text-indigo-600" />}
            iconBgColor="bg-AppSecondaryLight"
            description={`Total number of customers ${customers}`}
            borderColor="border-indigo-600"
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard