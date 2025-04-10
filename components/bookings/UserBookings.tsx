"use client";
import React, { useState, useEffect } from "react";
import { getUserOrders} from "@/actions/booking";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Booking } from "@/lib/definations/bookingdefinations";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  CreditCard,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  ChevronDown,
  User,
  Car
} from "lucide-react";
import { Chat } from "@/components/Chat";

export default function VendorOrdersManagement() {

  const [orders, setOrders] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<Booking[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const {data: token, session} = useSession()

  const role = session?.user?.role

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const fetchedOrders = await getUserOrders();
      setOrders(fetchedOrders || []);
      setFilteredOrders(fetchedOrders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter(
        (order) =>
          order?.userDetails?.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order?.carDetails?.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.userDetails?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

 const getStatusColor = (status: string)=>({
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    dispatched: "bg-purple-100 text-purple-800 border-purple-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
    reject: "bg-red-100 text-red-800 border-red-200",
 }[status.toLowerCase()] ||  "bg-gray-100 text-gray-800 border-gray-200")

  const toggleOrderExpansion = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Bookings</CardTitle>
            <Button 
              onClick={fetchOrders} 
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
                placeholder="Search by customer, vehicle, email or status..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="outline" className="bg-AppLight text-gray-500">
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
                      <DropdownMenu>
                        <DropdownMenuTrigger className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </DropdownMenuTrigger>
                       
                      </DropdownMenu>
                      <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{order.userDetails?.userName}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                          <Car className="h-4 w-4 text-gray-400" />
                          <span>{order.carDetails?.carName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="hidden md:block">
                        <div className="flex items-center text-sm text-AppDark">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{order.dateRange?.from.toDateString()} {order.pickupTime}</span>
                        </div>
                      </div>
                      <div>
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${expandedOrder === order._id ? 'transform rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                  
                  {expandedOrder === order._id && (
                    <div className="p-4 bg-AppLight border-t">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Customer Information</h4>
                          <div className="space-y-2">
                            <p className="text-sm flex items-center">
                              <User className="h-4 w-4 text-gray-400 mr-2" />
                              {order.userDetails?.userName}
                            </p>
                            <p className="text-sm flex items-center">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              {order.userDetails?.email}
                            </p>
                            <p className="text-sm flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-2" />
                              {order.userDetails?.contact}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Vehicle Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm flex items-center">
                              <Car className="h-4 w-4 text-gray-400 mr-2" />
                              {order.carDetails?.carName}
                            </p>
                            <p className="text-sm">
                              <span className="ml-6">Model: {order.carDetails?.carModel}</span>
                            </p>
                            {order.carDetails?.carName && (
                              <p className="text-sm">
                                <span className="ml-6">Product: {order.carDetails?.carName}</span>
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Appointment Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              {order.dateRange?.from.toDateString()} at {order.pickupTime}
                            </p>
                            {order.dateRange?.to.toDateString() && (
                              <p className="text-sm ml-6">
                                Return: {order.dateRange?.to.toDateString()}
                              </p>
                            )}
                            <p className="text-sm flex items-start">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                              <span className="flex-1">{order.pickupLocation}</span>
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Payment Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm flex items-center">
                              <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                              {order.paymentStatus}
                            </p>
                          </div>
                        </div>

                        <div>
                        <Chat userId={order?.vendorDetails?.vendorId} userRole={order?.vendorDetails?.role} recieverId={order?.userDetails?.userId} recieverRole={order?.userDetails?.role}/>
                        </div>

                        <div>
                            <Button>Cancel Boooking</Button>
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
  );
}