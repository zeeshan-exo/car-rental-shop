"use client"
import PieChartWithCustomizedLabel from "@/components/cars/BarChart"
import StatCard from "@/components/StatCard"
import { Button } from "@/components/ui/button"
import { Calendar, Car, CreditCard, Users, BarChart3, Clock, AlertCircle, RefreshCw, Search, Loader2 } from "lucide-react"
import { MapProvider } from "@/provider/map-provider"
import { Map } from "@/components/Map"
import CurrentOrders from "@/app/(dashboard)/vendor/cars/currentBookings"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAllCars } from "@/actions/cars"
import { getCustomerOrders } from "@/actions/booking"
import { Input } from "@/components/ui/input"
import { Toaster } from "../ui/sonner"

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

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [carsData, setCars] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const getUserSession = async() => {
    try {
      const res = await fetch("/api/auth/session")
      const data = await res.json()
      setUser(data?.user)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user session. Please refresh.",
        variant: "destructive"
      })
    }
  }

  const fetchData = async() => {
    setLoading(true)
    try {
      const orderData = await getCustomerOrders()
      setOrders(orderData)

      const {cars} = await getAllCars()
      setCars(cars)
      
      toast({
        title: "Success",
        description: "Dashboard data refreshed successfully",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserSession()
    fetchData()
  }, [])

  // Filter rentals by status
  const rentedCars = orders.filter(order => 
    order.status === "delivered" || 
    order.status === "confirmed" || 
    order.status === "dispatched"
  )

  const totalCars = carsData.length
  const availableCars = totalCars - rentedCars.length
  
  // Filter function for search
  const filteredOrders = orders.filter(order => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      order.carName?.toLowerCase().includes(searchLower) ||
      order.userName?.toLowerCase().includes(searchLower) ||
      order.status?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <MapProvider>
      <div className="bg-gray-50 min-h-screen">
        {/* Header section */}
        <div className="bg-gradient-to-r from-sky-800 to-indigo-900 text-white p-6">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Car Rental Dashboard</h1>
              <p className="text-sky-100 mt-1">Welcome back, {user?.name || "User"}</p>
            </div>
            <div className="flex space-x-2 w-full sm:w-auto">
              <Button size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm" className="bg-white text-sky-800 hover:bg-sky-100">
                <Clock className="h-4 w-4 mr-2" />
                Activity
              </Button>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="bg-white border-b shadow-sm py-3 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-green-700 border-green-200 hover:bg-green-50"
                  onClick={() => router.push("/user/book")}
                >
                  <Car className="h-4 w-4 mr-1" /> 
                  Book New Car
                </Button>
              </div>
              <div className="relative w-full sm:max-w-xs">
                <Search className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search cars, orders..." 
                  className="pl-8 h-9 pr-4 text-sm bg-gray-50 border-gray-200 focus:bg-white w-full" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                onClick={fetchData} 
                size="sm" 
                variant="outline" 
                className="bg-white hover:bg-gray-50 w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh Data
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Available Cars" 
              value={availableCars}
              change={`${availableCars > 0 ? '+' : ''}${Math.round((availableCars/totalCars || 0) * 100)}%`} 
              icon={<Car className="h-6 w-6 text-sky-700" />} 
            />
            <StatCard 
              title="Rented Cars" 
              value={rentedCars.length}
              change={rentedCars.length > 0 ? "+12%" : "0%"} 
              icon={<Users className="h-6 w-6 text-emerald-600" />} 
            />
            <StatCard 
              title="Monthly Revenue" 
              value="$24,350" 
              change="+18%" 
              icon={<CreditCard className="h-6 w-6 text-indigo-600" />} 
            />
            <StatCard 
              title="Upcoming Reservations" 
              value="2"
              change="+7%" 
              icon={<Calendar className="h-6 w-6 text-amber-600" />} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main content area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Map section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Your Location</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Last updated: Just now</span>
                    <Button variant="outline" size="sm" className="text-xs">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Refresh</span>
                    </Button>
                  </div>
                </div>
                <div className="h-80">
                  <Map />
                </div>
              </div>

              {/* Chart section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-sky-700 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-800">Car Distribution</h2>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="rounded-md bg-white hover:bg-gray-50 text-xs">Weekly</Button>
                    <Button variant="outline" size="sm" className="rounded-md bg-white hover:bg-gray-50 text-xs">Monthly</Button>
                    <Button size="sm" className="rounded-md bg-sky-700 text-white hover:bg-sky-800 text-xs">Yearly</Button>
                  </div>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 text-sky-700 animate-spin" />
                    </div>
                  ) : (
                    <PieChartWithCustomizedLabel />
                  )}
                </div>
              </div>

              {/* Recent orders/bookings section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push("/user/book")}
                  >
                    View All
                  </Button>
                </div>
                <div className="p-4">
                  {loading ? (
                    <div className="flex justify-center items-center h-32">
                      <Loader2 className="h-8 w-8 text-sky-700 animate-spin" />
                    </div>
                  ) : filteredOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredOrders.slice(0, 5).map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{order.carName}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{order.userName}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                              <td className="px-3 py-2 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === "delivered" ? "bg-green-100 text-green-800" :
                                  order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                                  order.status === "dispatched" ? "bg-purple-100 text-purple-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>No bookings found{searchQuery ? " matching your search" : ""}.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* View all vehicles card */}
              <div className="relative rounded-xl overflow-hidden shadow-md h-64 group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: "url('/pexels-murdashots.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">All Vehicles</h3>
                  <p className="text-white/80 text-sm mb-3">Browse our complete collection of {totalCars} available cars</p>
                  <Button 
                    size="sm" 
                    className="bg-white text-sky-800 hover:bg-sky-50 w-32"
                    onClick={() => router.push("/dashboard/products")}
                  >
                    View All
                  </Button>
                </div>
              </div>

              {/* Quick stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-sky-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-gray-700 font-medium">Available Cars</h2>
                      <p className="text-3xl font-bold text-gray-800 mt-2">{availableCars}</p>
                      <p className="text-gray-500 text-sm mt-1">Ready for rent in your inventory</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 text-xs rounded-md text-sky-700 border-sky-700 hover:bg-sky-50"
                        onClick={() => router.push("/dashboard/available")}
                      >
                        View Available
                      </Button>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                      <Car className="h-5 w-5 text-sky-700" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-amber-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-gray-700 font-medium">Rented Cars</h2>
                      <p className="text-3xl font-bold text-gray-800 mt-2">{rentedCars.length}</p>
                      <p className="text-gray-500 text-sm mt-1">Currently rented out to customers</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 text-xs rounded-md text-amber-600 border-amber-600 hover:bg-amber-50"
                        onClick={() => router.push("/dashboard/rented")}
                      >
                        View Rentals
                      </Button>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Car className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-indigo-600 sm:col-span-2 lg:col-span-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-gray-700 font-medium">Monthly Revenue</h2>
                      <p className="text-3xl font-bold text-gray-800 mt-2">$24,350</p>
                      <div className="flex items-center mt-1 text-green-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z" clipRule="evenodd" />
                        </svg>
                        <span>18% from last month</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 text-xs rounded-md text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                        onClick={() => router.push("/dashboard/finances")}
                      >
                        Financial Report
                      </Button>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-indigo-600" />
                    </div>
                  </div>
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