"use client"
import { useState, useEffect } from "react"
import PieChartWithCustomizedLabel from "@/components/cars/BarChart"
import StatCard from "@/components/StatCard"
import { Button } from "@/components/ui/button"
import { Calendar, Car, CreditCard, Users, BarChart3, Clock, AlertCircle, RefreshCw, Filter, MapPin, Bell, Search } from "lucide-react"
import { MapProvider } from "@/provider/map-provider"
import { Map } from "@/components/Map"
import CurrentOrders from "@/app/(dashboard)/vendor/cars/currentBookings"
import { getVendorOrders } from "@/actions/booking"
import { getVendorCars } from "@/actions/cars"
import { getUsers } from "@/actions/users"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Order {
  _id: string;
  userName: string;
  productName: string;
  carDetails:{
    carName: string;
    carModel: string;
  }

  email: string;
  contact: string;
  date: string;
  time: string;
  address: string;
  status: string;
  rentalRate: string;
  paymentStatus: string;
  paymentMethod: string
}

interface Car {
  _id: string;
   carName: string,
   brand: string,
   modelYear: string,
   rentalRate: string,
   carsQuantity: number,

}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const fetchData = async() => {
    setLoading(true)
    try {
      const orderData = await getVendorOrders()
      setOrders(orderData)

      const carsData = await getVendorCars()
      setCars(carsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const reservations = orders.filter(order => order.status === "pending")
  const rentedCars = orders.filter(order => order.status === "delivered" || order.status === "confirmed" || order.status === "dispatched")
  const totalCars = cars.length
  const deliveredConfirmedOrder = orders.filter(order => order.status === "delivered" || order.status === "confirmed" || order.status === "dispatched")
  const availableCars = totalCars - deliveredConfirmedOrder.length
  
  return (
    <MapProvider>
      <div className="bg-gray-50 min-h-screen">

        <div className="bg-gradient-to-r from-sky-700 to-indigo-800 text-white p-6 shadow-md">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Car Rental Dashboard</h1>
                <p className="text-sky-100 mt-1">
                  Welcome back! You have {reservations.length} pending reservations
                </p>
              </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm" className="bg-white text-sky-800 hover:bg-sky-100">
              <Clock className="h-4 w-4 mr-2" />
              Activity Log
            </Button>
            <div className="flex items-center ml-2">
              {/* <Avatar className="h-8 w-8 border-2 border-white">
                <img src="/api/placeholder/40/40" alt="User" />
              </Avatar> */}
            </div>
          </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-b shadow-sm py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-sky-700 border-sky-200 hover:bg-sky-50">
                  <Clock className="h-4 w-4 mr-1" /> 
                  Activity Log
                </Button>
                <Button variant="outline" size="sm" className="text-green-700 border-green-200 hover:bg-green-50">
                  <Car className="h-4 w-4 mr-1" /> 
                  Add New Car
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
          <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[500px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className={`${activeTab === "cars" ? "block" : "hidden"}`}>
          <Card>
  <CardHeader>
    <CardTitle>Cars</CardTitle>
    <CardDescription>Your All Cars</CardDescription>
  </CardHeader>
  <CardContent>
    {loading ? (
      <p className="text-center text-gray-500">Loading cars...</p>
    ) : cars.length > 0 ? (
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3">Car Name</th>
            <th className="px-6 py-3">Brand</th>
            <th className="px-6 py-3">Model Year</th>
            <th className="px-6 py-3">Rental Rate</th>
            {/* <th className="px-6 py-3">Available Quantity</th> */}
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{car.carName}</td>
              <td className="px-6 py-4">{car.brand}</td>
              <td className="px-6 py-4">{car.modelYear}</td>
              <td className="px-6 py-4">${car.rentalRate} / day</td>
              {/* <td className="px-6 py-4">{car.carsQuantity}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-center text-gray-500">No cars available.</p>
    )}
  </CardContent>
</Card>
          </div>


          <div className={`${activeTab === "bookings" ? "block" : "hidden"}`}>
          <Card>
  <CardHeader>
    <CardTitle>Bookings</CardTitle>
    <CardDescription>Bookings</CardDescription>
  </CardHeader>
  <CardContent>
    {loading ? (
      <p className="text-center text-gray-500">Loading ordrs...</p>
    ) : orders.length > 0 ? (
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3">Car Name</th>
            <th className="px-6 py-3">Model Year</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Payment Status</th>
            <th className="px-6 py-3">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{order.carDetails.carName}</td>
              <td className="px-6 py-4">{order.carDetails.carModel}</td>
              <td className="px-6 py-4">{order.status.toLowerCase()}</td>
              <td className="px-6 py-4 ">{order.paymentStatus}</td>
              <td className="px-6 py-4">{order.paymentMethod.toLocaleLowerCase().slice(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-center text-gray-500">No orders available.</p>
    )}
  </CardContent>
</Card>
          </div>
          

          <div className={`${activeTab === "overview" ? "block" : "hidden"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard 
                title="Total Cars Rented" 
                value={rentedCars.length}
                change="+12%" 
                icon={<Car className="h-6 w-6 text-sky-700" />} 
              />
              <StatCard 
                title="Active Customers" 
                value="12"
                change="+8%" 
                icon={<Users className="h-6 w-6 text-emerald-600" />} 
              />
              <StatCard 
                title="Monthly Revenue" 
                value="$24,350" 
                change="+15%" 
                icon={<CreditCard className="h-6 w-6 text-indigo-600" />} 
              />
              <StatCard 
                title="Pending Reservations" 
                value={reservations.length} 
                change="+4%" 
                icon={<Calendar className="h-6 w-6 text-amber-600" />} 
              />
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">

                <Card className="mb-6 shadow-sm">
                  <CardHeader className="pb-2 pt-4 px-4 flex flex-row justify-between items-center">
                    <div>
                      <CardTitle className="text-lg text-gray-800">Vehicle Locations</CardTitle>
                      <CardDescription className="text-gray-500">Track your fleet in real-time</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        Filter Area
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Refresh
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 ">
                    <div className="relative">
                      {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80">
                          <div className="animate-spin h-8 w-8 border-4 border-sky-600 border-t-transparent rounded-full"></div>
                        </div>
                      ) : null}
                      <Map/>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader className="pb-2 pt-4 px-4 flex flex-row justify-between items-center">
                    <div>
                      <CardTitle className="text-lg text-gray-800 flex items-center">
                        <BarChart3 className="h-5 w-5 text-sky-700 mr-2" />
                        Car Distribution
                      </CardTitle>
                      <CardDescription className="text-gray-500">Fleet analytics by model and status</CardDescription>
                    </div>
                    <div className="flex bg-gray-100 rounded-md p-1">
                      <Button variant="ghost" size="sm" className="rounded-sm hover:bg-white text-xs">Weekly</Button>
                      <Button variant="ghost" size="sm" className="rounded-sm hover:bg-white text-xs">Monthly</Button>
                      <Button size="sm" className="rounded-sm bg-white text-sky-700 shadow-sm text-xs">Yearly</Button>
                    </div>
                  </CardHeader>
                  <CardContent >
                    <div className="p-2">
                      <PieChartWithCustomizedLabel />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-4 space-y-6">
                <Card className="shadow-sm">
                  <CardContent className="px-2 pt-2 pb-4">
                    <CurrentOrders/>
                  </CardContent>
                </Card>

                <div className="relative rounded-xl overflow-hidden shadow-sm h-64 group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: "url('/api/placeholder/800/400')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <Badge variant="outline" className="bg-amber-500 text-white border-0 mb-2 w-fit">Featured</Badge>
                    <h3 className="text-xl font-bold text-white">Premium Vehicles</h3>
                    <p className="text-white/80 text-sm mb-2">Explore our luxury collection</p>
                    <Button size="sm" className="mt-2 bg-white text-sky-800 hover:bg-sky-50 w-32">View All</Button>
                  </div>
                </div>

                {/* Status Cards with improved visual feedback */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  <Card className="shadow-sm border-l-4 border-sky-600 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-gray-700 font-medium">Available Cars</h2>
                          <p className="text-3xl font-bold text-gray-800 mt-2">{totalCars}</p>
                          <p className="text-gray-500 text-sm mt-1">Ready for rent in your inventory</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                          <Car className="h-5 w-5 text-sky-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border-l-4 border-amber-600 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-gray-700 font-medium">Rented Cars</h2>
                          <p className="text-3xl font-bold text-gray-800 mt-2">{rentedCars.length}</p>
                          <p className="text-gray-500 text-sm mt-1">Currently on the road</p>
                          <Button variant="outline" size="sm" className="mt-3 text-xs rounded-md text-amber-600 border-amber-600 hover:bg-amber-50">View Details</Button>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                          <Car className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border-l-4 border-indigo-600 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-gray-700 font-medium">Pending Payments</h2>
                          <p className="text-3xl font-bold text-gray-800 mt-2">$3,240</p>
                          <p className="text-gray-500 text-sm mt-1">From 6 active rentals</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-indigo-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MapProvider>
  )
}

export default Dashboard;