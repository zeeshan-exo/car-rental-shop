import PieChartWithCustomizedLabel from "@/components/PieChart"
import StatCard from "@/components/StatCard"
import { Button } from "@/components/ui/button"
import { Calendar, Car, CreditCard, Users } from "lucide-react"

const Dashboard = () => {
  return (
    <div className="bg-slate-200 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-sky-800">Dashboard</h1>
      
      {/* Stats Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 bg-white">
        <StatCard 
          title="Total Cars Rented" 
          value="18,531" 
          change="+40%" 
          icon={<Car className="h-8 w-8 text-sky-700" />} 
        />
        <StatCard 
          title="Active Customers" 
          value="2,845" 
          change="+12%" 
          icon={<Users className="h-8 w-8 text-emerald-600" />} 
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$24,350" 
          change="+18%" 
          icon={<CreditCard className="h-8 w-8 text-indigo-600" />} 
        />
        <StatCard 
          title="Reservations" 
          value="345" 
          change="+7%" 
          icon={<Calendar className="h-8 w-8 text-amber-600" />} 
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section - Takes 2/3 of width on large screens */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Car Distribution</h2>
              <div className="flex gap-2 mt-3 sm:mt-0">
                <Button variant="outline" size="sm" className="rounded-full bg-white hover:bg-gray-100">Weekly</Button>
                <Button variant="outline" size="sm" className="rounded-full bg-white hover:bg-gray-100">Monthly</Button>
                <Button variant="outline" size="sm" className="rounded-full bg-sky-700 text-white hover:bg-sky-800">Yearly</Button>
              </div>
            </div>
            <PieChartWithCustomizedLabel />
          </div>
        </div>
        
        {/* Right Side Column - Takes 1/3 of width on large screens */}
        <div className="lg:col-span-1 space-y-6">
          {/* Featured Image Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-md h-64">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/pexels-murdashots.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold text-white">Featured Vehicles</h3>
              <p className="text-white/80">Explore our premium selection</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {/* Available Cars */}
            <div className="bg-white rounded-2xl p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Available Cars</h2>
                  <p className="text-3xl font-bold text-sky-700 mt-2">34</p>
                  <p className="text-gray-600 mt-1">Ready for rent in your inventory</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                  <Car className="h-6 w-6 text-sky-700" />
                </div>
              </div>
            </div>
            
            {/* Rented Cars */}
            <div className="bg-white rounded-2xl p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Rented Cars</h2>
                  <p className="text-3xl font-bold text-amber-600 mt-2">4</p>
                  <p className="text-gray-600 mt-1">Currently on the road</p>
                  <Button variant="outline" size="sm" className="rounded-full mt-3 text-xs">View Details</Button>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Car className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>
            
            {/* Payment Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Pending Payments</h2>
                  <p className="text-3xl font-bold text-indigo-600 mt-2">$3,240</p>
                  <p className="text-gray-600 mt-1">From 6 active rentals</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;