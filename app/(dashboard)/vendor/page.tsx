"use client"
import { useState, useEffect } from "react"
import PieChartWithCustomizedLabel from "@/components/cars/BarChart"
import StatCard from "@/components/StatCard"
import { Button } from "@/components/ui/button"
import { Calendar, Car, CreditCard, Users, BarChart3, Clock, AlertCircle, RefreshCw, MapPin, Search } from "lucide-react"
import { MapProvider } from "@/provider/map-provider"
import CurrentOrders from "@/app/(dashboard)/vendor/cars/currentBookings"
import { getVendorOrders } from "@/actions/booking"
import { getVendorCars } from "@/actions/cars"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import StatusCards from "@/components/StatusCards"
import { Booking } from "@/lib/definations/bookingdefinations"
import { CarType } from "@/lib/definations/carDefinations"
import { TabsWrapper, TabsList, TabsContent, TabsTrigger } from "@/components/Tabs"
import dynamic from "next/dynamic"
import { formatCurrency } from "@/lib/currency"
const Map = dynamic(() => import("@/components/Map"), {ssr: false})

const Dashboard = () => {
  const [orders, setOrders] = useState<Booking[]>([])
  const [cars, setCars] = useState<CarType[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const fetchData = async () => {
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
          <TabsWrapper value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[500px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="cars">
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
                        </tr>
                      </thead>
                      <tbody>
                        {cars.map((car) => (
                          <tr key={car._id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{car.carName}</td>
                            <td className="px-6 py-4">{car.brand}</td>
                            <td className="px-6 py-4">{car.modelYear}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center text-gray-500">No cars available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
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
            </TabsContent>

            <TabsContent value="overview">
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
                  value={formatCurrency(24350)}
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
                        <Map />
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
                    <CardContent>
                      <div className="p-2">
                        <PieChartWithCustomizedLabel />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-6">
                  <Card className="shadow-sm">
                    <CurrentOrders />
                  </Card>

                  <div className="relative rounded-xl overflow-hidden shadow-sm h-64 group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: "url('/pexels-murdashots.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                      <Badge variant="outline" className="bg-amber-500 text-white border-0 mb-2 w-fit">Featured</Badge>
                      <h3 className="text-xl font-bold text-white">Premium Vehicles</h3>
                      <p className="text-white/80 text-sm mb-2">Explore our luxury collection</p>
                      <Button size="sm" className="mt-2 bg-white text-sky-800 hover:bg-sky-50 w-32">View All</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                    <StatusCards
                      title="Available Cars"
                      count={totalCars}
                      icon={<Car className="h-5 w-5 text-sky-500" />}
                      iconBgColor="bg-sky-100"
                      description="Ready for rent in your inventory"
                      borderColor="border-AppPrimary"
                    />
                    <StatusCards
                      title="Rented Cars"
                      count={rentedCars.length}
                      icon={<Car className="h-5 w-5 text-AppAccent" />}
                      iconBgColor="bg-amber-100"
                      description="Currently on the road"
                      borderColor="border-AppAccent"
                      buttonText="View Details"
                    />
                    <StatusCards
                      title="Pending Payments"
                      icon={<CreditCard className="h-5 w-5 text-indigo-600" />}
                      iconBgColor="bg-indigo-100"
                      count={formatCurrency(890)}
                      description="From 6 active rentals"
                      borderColor="border-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </TabsWrapper>
        </div>
      </div>
    </MapProvider>
  )
}

export default Dashboard;