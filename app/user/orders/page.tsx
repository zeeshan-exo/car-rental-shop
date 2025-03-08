"use client"
import React, { useEffect, useState } from 'react'
import { getCustomerOrders } from '@/actions/booking'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  RefreshCw, 
  Search, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  AlertCircle,
  ChevronDown
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Order {
  _id: string;
  userName: string;
  productName: string;
  carName: string;
  carModel: string;
  email: string;
  contact: string;
  date: string;
  returnDate: string;
  time: string;
  address: string;
  status: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const fetchData = async() => {
    setLoading(true)
    const orderData = await getCustomerOrders()
    setOrders(orderData || [])
    setFilteredOrders(orderData || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if(searchTerm) {
      const filtered = orders.filter(
        (order) => 
          order.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.date.includes(searchTerm) ||  
          order.status.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setFilteredOrders(filtered)
    } else {
      setFilteredOrders(orders)
    }
  }, [searchTerm, orders])

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "dispatched":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "reject":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  const toggleOrderExpansion = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Customer Orders</CardTitle>
            <Button 
              onClick={fetchData} 
              variant="outline"
              className="flex items-center gap-2 bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between mb-6 mt-2">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by vehicle, customer, date or status..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="outline" className="bg-white text-gray-500">
                {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
              </Badge>
            </div>
          </div>

          {loading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-gray-50 rounded-lg">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No orders found matching your search.</p>
              {searchTerm && (
                <Button 
                  variant="link" 
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-sky-600"
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div 
                  key={order._id} 
                  className="border rounded-lg overflow-hidden hover:border-sky-200 transition-colors"
                >
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleOrderExpansion(order._id)}
                  >
                    <div className="flex items-center gap-4">
                      <Badge className={`px-3 py-1 ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                      <div>
                        <h3 className="font-medium">{order.carName}</h3>
                        <p className="text-sm text-gray-500">{order.carModel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="hidden md:block">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{order.date} - {order.returnDate}</span>
                        </div>
                      </div>
                      <div>
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${expandedOrder === order._id ? 'transform rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                  
                  {expandedOrder === order._id && (
                    <div className="p-4 bg-white border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Customer Information</h4>
                          <div className="space-y-2">
                            <p className="text-sm flex items-center">
                              <span className="font-medium mr-2">Name:</span> {order.userName}
                            </p>
                            <p className="text-sm flex items-center">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              {order.email}
                            </p>
                            <p className="text-sm flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-2" />
                              {order.contact}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Appointment Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              {order.date} - {order.returnDate} at {order.time}
                            </p>
                            <p className="text-sm flex items-start">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                              <span className="flex-1">{order.address}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default OrdersPage