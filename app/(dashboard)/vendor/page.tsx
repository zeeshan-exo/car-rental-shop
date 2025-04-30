"use client"
import { useState, useEffect } from "react"
import { getVendorOrders } from "@/actions/booking"
import { getVendorCars } from "@/actions/cars"
import PieChartWithCustomizedLabel from "@/components/cars/BarChart"
import StatCard from "@/components/dashboard/StatCard"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Car, 
  CreditCard, 
  BarChart3, 
  Clock, 
  RefreshCw, 
  MapPin, 
  Search,
  AlertCircle
} from "lucide-react"
import { MapProvider } from "@/provider/MapProvider"
import RecentBookings from "@/app/(dashboard)/vendor/cars/RecentBookings"
import { formatCurrency } from "@/lib/currency"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import StatusCards from "@/components/dashboard/StatusCards"
import { Booking } from "@/lib/definitions/bookingDefinitions"
import { CarType } from "@/lib/definitions/carDefinitions"
import Welcome from "@/components/dashboard/Tabs/Welcome"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsWrapper, TabsList, TabsContent, TabsTrigger } from "@/components/shared/Tabs"
import dynamic from "next/dynamic"
const Map = dynamic(() => import("@/components/shared/Map"), {ssr: false})

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

  const pendingReservations = orders.filter(order => order.status === "pending")
  const activeRentals = orders.filter(order => 
    ["delivered", "confirmed", "dispatched"].includes(order.status)
  )
  const totalCars = cars.length
  const availableCars = totalCars - activeRentals.length
  
  const calculateRevenue = () => {
    let totalRevenue = 0
    if (orders.length > 0) {
      //this piece of code have to be fixed
      orders.forEach(order => {
        if (order.paymentStatus === "paid") {
          totalRevenue += order.totalAmount || 0
        }
      })
    }
    return totalRevenue
  }

  const monthlyRevenue = calculateRevenue()

  return (
    <MapProvider>
      <div className="bg-gray-50 min-h-screen">
        <Welcome />

        <div className="bg-AppLight border-b shadow-sm py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-AppPrimary border-AppSecondaryLight hover:bg-AppSecondaryLight"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Activity Log
                </Button>
              </div>
              
              <div className="hidden md:flex relative max-w-xs">
                <Search className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search cars, bookings..."
                  className="pl-8 h-9 pr-4 text-sm bg-gray-50 border-gray-200 focus:bg-AppLight"
                />
              </div>
              
              <Button 
                onClick={fetchData} 
                size="sm" 
                variant="outline" 
                className="bg-AppLight hover:bg-AppSecondaryLight text-AppPrimary border-AppSecondaryLight"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <TabsWrapper value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                  title="Monthly Revenue"
                  value={formatCurrency(monthlyRevenue)}
                  change=""
                  icon={<CreditCard className="h-6 w-6 text-AppPrimary" />}
                />
                <StatCard
                  title="Active Rentals"
                  value={activeRentals.length.toString()}
                  change=""
                  icon={<Car className="h-6 w-6 text-AppPrimary" />}
                />
                <StatCard
                  title="Pending Reservations"
                  value={pendingReservations.length.toString()}
                  change=""
                  icon={<Calendar className="h-6 w-6 text-AppAccent" />}
                />
                <StatCard
                  title="Available Cars"
                  value={availableCars.toString()}
                  change=""
                  icon={<Car className="h-6 w-6 text-green-600" />}
                />
              </div>

              <div className="grid grid-cols-12 gap-6">
       
                <div className="col-span-12 lg:col-span-8">
                  <Card className="mb-6 shadow-sm">
                    <CardHeader className="pb-2 pt-4 px-4 flex flex-row justify-between items-center">
                      <div>
                        <CardTitle className="text-lg text-AppSecondary">Vehicle Locations</CardTitle>
                        <CardDescription className="text-gray-500">Track your fleet in real-time</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs border-AppSecondaryLight text-AppPrimary hover:bg-AppSecondaryLight"
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          Filter Area
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative h-[350px]">
                        {loading ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80">
                            <div className="animate-spin h-8 w-8 border-4 border-AppPrimary border-t-transparent rounded-full"></div>
                          </div>
                        ) : null}
                        <Map />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2 pt-4 px-4 flex flex-row justify-between items-center">
                      <div>
                        <CardTitle className="text-lg text-AppSecondary flex items-center">
                          <BarChart3 className="h-5 w-5 text-AppPrimary mr-2" />
                          Car Distribution
                        </CardTitle>
                        <CardDescription className="text-gray-500">Fleet analytics by model and status</CardDescription>
                      </div>
                      <div className="flex bg-gray-100 rounded-md p-1">
                        <Button variant="ghost" size="sm" className="rounded-sm hover:bg-AppLight text-xs">Weekly</Button>
                        <Button variant="ghost" size="sm" className="rounded-sm hover:bg-AppLight text-xs">Monthly</Button>
                        <Button size="sm" className="rounded-sm bg-AppLight text-AppPrimary shadow-sm text-xs">Yearly</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="p-2">
                        <PieChartWithCustomizedLabel />
                      </div>
                    </CardContent>
                  </Card>

                  {orders.length > 0 && (
                    <div className="bg-AppLight rounded-xl shadow-sm p-4 mt-6">
                      <div className="flex items-center mb-4">
                        <Clock className="h-5 w-5 text-AppPrimary mr-2" />
                        <h2 className="text-lg font-semibold text-AppSecondary">Recent Activities</h2>
                      </div>
                      <div className="space-y-3">
                        {orders.slice(0, 3).map((order, i) => (
                          <div key={order._id} className="border-l-2 border-AppPrimary pl-4 py-1">
                            <p className="text-AppSecondary font-medium">
                              New {order.status} #{order._id.slice(-4)}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {order.carDetails.carName} • {order.days || 'N/A'} days • {formatCurrency(order.totalAmount || 0)}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">{order.updatedAt || 'Recently'}</p>
                          </div>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-AppPrimary hover:text-AppPrimaryHover hover:bg-AppSecondaryLight w-full mt-2"
                        >
                          View All Activities
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-6">

                  <Card className="shadow-sm">
                    <RecentBookings />
                  </Card>

                  <div className="grid grid-cols-1 gap-4">
                    <StatusCards
                      title="Available Cars"
                      count={availableCars}
                      icon={<Car className="h-5 w-5 text-AppPrimary" />}
                      iconBgColor="bg-AppSecondaryLight"
                      description="Ready for rent in your inventory"
                      borderColor="border-AppPrimary"
                    />
                    <StatusCards
                      title="Active Rentals"
                      count={activeRentals.length}
                      icon={<Car className="h-5 w-5 text-AppAccent" />}
                      iconBgColor="bg-amber-100"
                      description="Currently on the road"
                      borderColor="border-AppAccent"
                      buttonText="View Details"
                    />
                    
                    {pendingReservations.length > 0 && (
                      <StatusCards
                        title="Pending Reservations"
                        count={pendingReservations.length}
                        icon={<AlertCircle className="h-5 w-5 text-orange-500" />}
                        iconBgColor="bg-orange-100"
                        description="Reservations awaiting confirmation"
                        borderColor="border-orange-500"
                        buttonText="Review"
                      />
                    )}
                    
                    <StatusCards
                      title="Pending Payments"
                      icon={<CreditCard className="h-5 w-5 text-indigo-600" />}
                      iconBgColor="bg-indigo-100"
                      count={formatCurrency(orders.filter(o => o.paymentStatus === "pending").length * 100)}
                      description={`From ${orders.filter(o => o.paymentStatus === "pending").length} rentals`}
                      borderColor="border-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cars">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Your Fleet</CardTitle>
                    <CardDescription>{cars.length} cars in your inventory</CardDescription>
                  </div>
                  <Button className="bg-AppPrimary hover:bg-AppPrimaryHover">
                    <Car className="h-4 w-4 mr-2" />
                    Add New Car
                  </Button>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin h-8 w-8 border-4 border-AppPrimary border-t-transparent rounded-full"></div>
                    </div>
                  ) : cars.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Car Name</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Brand</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Model Year</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cars.map((car) => {
                            const isRented = activeRentals.some(
                              rental => rental.carDetails._id === car._id
                            )
                            
                            return (
                              <tr key={car._id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-AppSecondary">{car.carName}</td>
                                <td className="px-4 py-3 text-gray-600">{car.brand}</td>
                                <td className="px-4 py-3 text-gray-600">{car.modelYear}</td>
                                <td className="px-4 py-3">
                                  <Badge className={isRented ? "bg-orange-100 text-orange-700 hover:bg-orange-200" : "bg-green-100 text-green-700 hover:bg-green-200"}>
                                    {isRented ? "Rented" : "Available"}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3">
                                  <Button variant="ghost" size="sm" className="text-AppPrimary hover:bg-AppSecondaryLight h-8 px-2">
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Car className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 mb-4">No cars available in your inventory.</p>
                      <Button className="bg-AppPrimary hover:bg-AppPrimaryHover">
                        Add Your First Car
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Booking Management</CardTitle>
                    <CardDescription>{orders.length} total bookings</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="text" 
                      placeholder="Search bookings..." 
                      className="max-w-xs h-9" 
                    />
                    <Button variant="outline" size="sm" className="border-AppSecondaryLight">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin h-8 w-8 border-4 border-AppPrimary border-t-transparent rounded-full"></div>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Booking ID</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Car</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Customer</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Payment</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium text-AppSecondary">#{order._id.slice(-6)}</td>
                              <td className="px-4 py-3">{order.carDetails.carName}</td>
                              <td className="px-4 py-3">{order.userDetails.userName}</td>
                              <td className="px-4 py-3">
                                <Badge className={
                                  order.status === "confirmed" || order.status === "delivered" || order.status === "dispatched" 
                                    ? "bg-green-100 text-green-700" 
                                    : order.status === "pending" 
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-blue-100 text-blue-700"
                                }>
                                  {order.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className={
                                  order.paymentStatus === "paid" 
                                    ? "border-green-500 text-green-700" 
                                    : "border-orange-500 text-orange-700"
                                }>
                                  {order.paymentStatus}
                                </Badge>
                              </td>
                              <td className="px-4 py-3">
                                <Button variant="ghost" size="sm" className="text-AppPrimary hover:bg-AppSecondaryLight h-8 px-2">
                                  Manage
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No bookings found.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Business Analytics</CardTitle>
                  <CardDescription>Track your rental business performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <BarChart3 className="h-4 w-4 text-AppPrimary mr-2" />
                          Revenue Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <PieChartWithCustomizedLabel />
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Car className="h-4 w-4 text-AppPrimary mr-2" />
                          Fleet Utilization
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex flex-col space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Overall Fleet</span>
                              <span className="font-medium">{(activeRentals.length / (totalCars || 1) * 100).toFixed(0)}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-AppPrimary rounded-full" 
                                style={{ width: `${(activeRentals.length / (totalCars || 1) * 100)}%` }} 
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Revenue Target</span>
                              <span className="font-medium">68%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-AppAccent rounded-full" style={{ width: "68%" }} />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Customer Satisfaction</span>
                              <span className="font-medium">92%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-700 mb-3">Download Reports</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button variant="outline" className="justify-start text-AppPrimary border-AppSecondaryLight hover:bg-AppSecondaryLight">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Revenue Report
                      </Button>
                      <Button variant="outline" className="justify-start text-AppPrimary border-AppSecondaryLight hover:bg-AppSecondaryLight">
                        <Car className="h-4 w-4 mr-2" />
                        Fleet Report
                      </Button>
                      <Button variant="outline" className="justify-start text-AppPrimary border-AppSecondaryLight hover:bg-AppSecondaryLight">
                        <Calendar className="h-4 w-4 mr-2" />
                        Booking Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </TabsWrapper>
        </div>
      </div>
    </MapProvider>
  )
}

export default Dashboard;