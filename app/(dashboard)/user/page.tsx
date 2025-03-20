"use client"
import PieChartWithCustomizedLabel from "@/components/cars/BarChart"
import StatCard from "@/components/StatCard"
import { Button } from "@/components/ui/button"
import { Calendar, Car, CreditCard, Users, BarChart3, Clock, AlertCircle, RefreshCw, Search } from "lucide-react"
import { MapProvider } from "@/provider/map-provider"
import { Map } from "@/components/Map"
import CurrentOrders from "@/app/(dashboard)/vendor/cars/currentBookings"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAllCars } from "@/actions/cars"
import { getCustomerOrders } from "@/actions/booking"
import { Input } from "@/components/ui/input"
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@radix-ui/react-tabs"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import CustomTabs from "@/components/Tabs"
import StatusCards from "@/components/StatusCards"

interface Order {
  _id: string;
  userName: string;
  productName: string;
  carName: string;
  carModel: string;
  email: string;
  contact: string;
  date: string;
  time: string;
  address: string;
  status: string;
}

const page = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [carsdata, setCars] = useState([])
  const router = useRouter()

  const fetchData = async () => {
    const orderData = await getCustomerOrders()
    setOrders(orderData)

    const { cars } = await getAllCars()
    setCars(cars)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const rentedCars = orders.filter(
    order =>
      order.status === "delivered" ||
      order.status === "confirmed" ||
      order.status === "dispatched"
  )
  const totalCars = carsdata.length

  const { data: session } = useSession()
  const user = session?.user

  const tabsData = [
    {
      value: 'booking',
      tabTitle: 'Booking',
      cardTitle: 'Book Now',
      cardDescription: 'Plenty of Car Options for you to book .',
      cardContent: ""
    },
    {
      value: 'track',
      tabTitle: 'Track',
      cardTitle: 'Track Your Order',
      cardDescription: 'This is the description for track.',
    },
    {
      value: 'messages',
      tabTitle: 'Messages',
      cardTitle: 'Messsage from vendor',
      cardDescription: 'Message about your Booking.',
    },
    {
      value: 'history',
      tabTitle: 'History',
      cardTitle: 'Your past bookings',
      cardDescription: 'You have rented these cars in the past would you like to rent them again.',
    },
  ]

  return (
    <MapProvider>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-sky-800 to-indigo-900 text-white p-6">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-sky-100 mt-1">Welcome to car rental shop</p>
            </div>
            <div className="hidden md:flex space-x-2">
              <Button size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm" className="bg-white text-sky-800 hover:bg-sky-100">
                <Clock className="h-4 w-4 mr-2" />
                Activity Log
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white border-b shadow-sm py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-green-700 border-green-200 hover:bg-green-50">
                  <Car className="h-4 w-4 mr-1" /> 
                  Book
                </Button>
              </div>
              <div className="hidden md:flex relative max-w-xs">
                <Search className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search cars, orders..." 
                  className="pl-8 h-9 pr-4 text-sm bg-gray-50 border-gray-200 focus:bg-white" 
                />
              </div>
              <Button onClick={fetchData} size="sm" variant="outline" className="bg-white hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <CustomTabs tabs={tabsData}/>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Rented Car" 
              value={rentedCars.length}
              change="+40%" 
              icon={<Car className="h-6 w-6 text-sky-700" />} 
            />
            <StatCard 
              title="Active Vendor" 
              value="12" 
              change="+12%" 
              icon={<Users className="h-6 w-6 text-emerald-600" />} 
            />
            <StatCard 
              title="Monthly Revenue" 
              value="$24,350" 
              change="+18%" 
              icon={<CreditCard className="h-6 w-6 text-indigo-600" />} 
            />
            <StatCard 
              title="Reservations" 
              value="2"
              change="+7%" 
              icon={<Calendar className="h-6 w-6 text-amber-600" />} 
            />
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Your Location</h2>
                  <Button variant="outline" size="sm" className="text-xs">
                    <RefreshCw className="h-4 w-4" />
                    <span>Refresh</span>
                  </Button>
                </div>
                <div className="h-80">
                  <Map />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-sky-700 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-800">Car Distribution</h2>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="rounded-md bg-white hover:bg-gray-50 text-xs">
                      Weekly
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-md bg-white hover:bg-gray-50 text-xs">
                      Monthly
                    </Button>
                    <Button size="sm" className="rounded-md bg-sky-700 text-white hover:bg-sky-800 text-xs">
                      Yearly
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <PieChartWithCustomizedLabel />
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* <CurrentOrders/> */}
            
              <div className="relative rounded-xl overflow-hidden shadow-md h-64 group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: "url('/pexels-murdashots.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
            
                <CardHeader>All Vehicles</CardHeader>
                  <Button 
                    size="sm" 
                    className="mt-3 bg-white text-sky-800 hover:bg-sky-50 w-32"
                    onClick={()=> router.push("/dashboard/products")}
                  >
                    View All
                  </Button>
                </div>
              </div>

              <StatusCards
              title="Available Cars"
              count={totalCars}
              icon={< Car className="h-5 w-5 text-AppPrimary"/>}
              description={`Ready for rent i your inventory.`}
              iconBgColor="bg-blue-100"
              borderColor="border-AppPrimary"
              />

             <StatusCards
              title="Rented Cars"
              count={rentedCars.length}
              description={`you have ${rentedCars.length} rented cars.`}
              buttonText="View Details"
              icon={<Car className="h-5 w-5 text-AppAccent"/>}
              iconBgColor="bg-amber-100"
              borderColor="border-AppAccent"
             />

             <StatusCards
              title="Previous Bookings"
              count={rentedCars.length}
              description={`you have booked ${rentedCars.length} rented cars.`}
              icon={<Car className="h-5 w-5 text-indigo-600"/>}
              iconBgColor="bg-indigo-100"
              borderColor="border-indigo-600"
             />

              </div>
            </div>
          </div>
        </div>
    </MapProvider>
  )
}

export default page;
