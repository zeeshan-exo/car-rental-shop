"use client"
import PieChartWithCustomizedLabel from "@/components/PieChart"
import StatCard from "@/components/StatCard"
import { Button } from "@/components/ui/button"
import { Calendar, Car, CreditCard, Users, BarChart3, Clock, AlertCircle, RefreshCw } from "lucide-react"
import { MapProvider } from "@/provider/map-provider"
import { Map } from "@/components/Map"
import CurrentOrders from "@/app/vendor/products/currentOrders"
import { useState, useEffect } from "react"
import { getVendorOrders } from "@/services/actions/order"
import { getVendorCars } from "@/services/actions/cars"
import { getUsers } from "@/services/actions/users"


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
  const [cars, setCars] = useState([])
  const [user, setUser] = useState()

  // const getUserSession = async() => {
  //      const res = await fetch("/api/auth/session")
  //      const data = await res.json()
  //      setUser(data?.user)
  // }

  const fetchData = async() =>{
    const orderData = await getVendorOrders()
    setOrders(orderData)

    const carsData = await getVendorCars()
    setCars(carsData)
  }
  useEffect(()=>{
    fetchData()
  }, [])

  const reservations = orders.filter(order => order.status === "pending")

 const rentedCars = orders.filter(order => order.status === "delivered" || order.status ==="confirmed" || order.status ==="dispatched")

 const totalCars = cars.length

 const totalReserveCars = orders.length
 const deliveredConfirmedOrder = orders.filter(order => order.status === "delivered" || order.status === "confirmed" || order.status === "dispatched")
const avialableCars=totalReserveCars -deliveredConfirmedOrder.length 
 
  return (
    <MapProvider>
      <div className="bg-gray-50 min-h-screen">

        <div className="bg-gradient-to-r from-sky-800 to-indigo-900 text-white p-6">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-sky-100 mt-1">Welcome to your car rental management portal</p>
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

        <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard 
                      title="Total Cars Rented" 
                      value={rentedCars.length}
                      change="+40%" 
                      icon={<Car className="h-6 w-6 text-sky-700" />} 
                    />
                    <StatCard 
                      title="Active Customers" 
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
                      value={reservations.length} 
                      change="+7%" 
                      icon={<Calendar className="h-6 w-6 text-amber-600" />} 
                    />
                  </div>



          <div className="grid grid-cols-12 gap-6">
           
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Vehicle Locations</h2>
                  <Button variant="outline" size="sm" className="text-xs"><RefreshCw className="h-4 w-4" />
                  <span>Refresh</span></Button>
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
                    <Button variant="outline" size="sm" className="rounded-md bg-white hover:bg-gray-50 text-xs">Weekly</Button>
                    <Button variant="outline" size="sm" className="rounded-md bg-white hover:bg-gray-50 text-xs">Monthly</Button>
                    <Button size="sm" className="rounded-md bg-sky-700 text-white hover:bg-sky-800 text-xs">Yearly</Button>
                  </div>
                </div>
                <div className="p-6">
                  <PieChartWithCustomizedLabel />
                </div>
              </div>
            </div>

  
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <CurrentOrders/>

              <div className="relative rounded-xl overflow-hidden shadow-md h-64 group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: "url('/pexels-murdashots.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">Featured Vehicles</h3>
                  <Button size="sm" className="mt-3 bg-white text-sky-800 hover:bg-sky-50 w-32">View All</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-sky-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-gray-700 font-medium">Available Cars</h2>
                      <p className="text-3xl font-bold text-gray-800 mt-2">{totalCars}</p>
                      <p className="text-gray-500 text-sm mt-1">Ready for rent in your inventory</p>
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
                      <p className="text-gray-500 text-sm mt-1">Currently on the road</p>
                      <Button variant="outline" size="sm" className="mt-3 text-xs rounded-md text-amber-600 border-amber-600 hover:bg-amber-50">View Details</Button>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Car className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-indigo-600 sm:col-span-2 lg:col-span-1">
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