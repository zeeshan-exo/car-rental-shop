"use server";
import { getCollection } from "@/lib/db";
import { BookingSchema, BookingType} from "@/lib/definations/bookingdefinations";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import ejs from 'ejs'
import path from "path";
import { sendMail } from "@/lib/email";
import { getSocket } from "@/lib/socket";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

export async function bookingOrder(state: any, formData: BookingType) {
  // const rawData = formData as Record<string, any>;
  const rawData = formData
  const carDetails = rawData.carDetails ? JSON.parse(rawData.carDetails) : {};
  const vendorDetails = rawData.vendorDetails ? JSON.parse(rawData.vendorDetails) : {};

  const bookingData = {
    pickupDate: rawData.pickupDate,
    returnDate: rawData.returnDate,
    pickupTime: rawData.pickupTime,
    pickupLocation: rawData.pickupLocation,
    status: rawData.status,
    carDetails: {
      carId: carDetails.carId || "",
      carModel: carDetails.carModel || "",
      carName: carDetails.carName || "",
      rentalRate: carDetails.rentalRate || ""
    },
    vendorDetails: {
      vendorId: vendorDetails.vendorId || "",
      vendorName: vendorDetails.vendorName || "",
      vendorEmail: vendorDetails.vendorEmail || "",
    },
    userDetails: {
      userId: rawData.userId || "",
      userName: rawData.userName || "",
      email: rawData.email,
      contact: rawData.contact,
    },
    // totalAmount: rawData.totalAmount ? Number(rawData.totalAmount) : 0,
    // transactionId: rawData.transactionId,
    paymentMethod: rawData.paymentMethod || "cashOnDelivery", 
    paymentStatus: rawData.paymentMethod === "card" ? "pending" : "paid",
    createdAt: rawData.createdAt,
  };


  const validatedFields = BookingSchema.safeParse(bookingData);
  if (!validatedFields.success) {
    console.error("Booking Validation Errors:", validatedFields.error.flatten());
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const session = await getServerSession(authOptions)
  if(!session){
    console.log("No session found")
    return []
  }

  try {
    const orderCollection = await getCollection("orders");
    const now = new Date();
    const newOrder = {
      ...validatedFields.data,
      createdAt: validatedFields.data.createdAt || now,
      userDetails: {
        ...validatedFields.data.userDetails,
        userName: session.user?.name,
        userId: session.user?.id,
      },
    };
    if (orderCollection) {
      await orderCollection.insertOne(newOrder);
    }

    console.log("vendorID:", newOrder.vendorDetails.vendorId)

    const socket = getSocket(newOrder.vendorDetails.vendorId, "vendor");

    if (socket) {
      socket.emit("order_placed", {
        message: `New order placed for ${newOrder.carDetails.carName} from ${newOrder.pickupDate} to ${newOrder.returnDate} at ${newOrder.pickupTime}.`,
        order: newOrder,
      });
    } else {
      console.warn("Socket not connected. Unable to send order notification.");
    }
    
    return { success: true, message: "Order created successfully!" };
  } catch (error: any) {
    console.error("Error while creating order:", error);
    return { errors: { server: "Failed to create order. Please try again." } };
  }
}

export async function getOrders() {
    try {
        const orderCollection = await getCollection("orders")
        if(orderCollection){
          const orders = await orderCollection.find().toArray()
          return orders?.length ? orders: []
        }
    } catch (error) {
        console.log("Error occured while fetching orders", error)
    }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const orderCollection = await getCollection("orders");
    if (!orderCollection) {
      throw new Error("Orders collection not found");
    }

    const result = await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: newStatus } }
    );

    const order = await orderCollection.findOne({ _id: new ObjectId(orderId) });
    if (order) {
      const socket = getSocket(order.userDetails.userId, "customer");
      if (socket) {
        socket.emit("order_updated", {
          message: `Your order for ${order.carDetails.carName} has been ${order.status}.`,
          order: order,
        });
      }
    }

    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error updating order status:", error);
    return false;
  }
}



export async function getOneOrder(id:string) { 
  try {
    const orderCollection = await getCollection("orders");
    if (!orderCollection) {
      throw new Error("Orders collection not found");
    }

    const order = await orderCollection.findOne({ _id: new ObjectId(String(id)) });
    if (!order) {
      console.error("No order found with id:", id);
      return null;
    }
    
    return {
      ...order,
      _id: order._id.toString(),
    };
  } catch (error) {
    console.error("Error in getOneOrder:", error);
    return null;
  }
}

export async function getVendorOrders() {
  try {
    const session = await getServerSession(authOptions)
    if(!session){
      console.log("No user found")
      return[]
    }

    if(session.user?.role !== "vendor"){
      console.log("User is not vendor.")
      return[]
    }
    const vendorId = session.user.id;

    const orderCollection = await getCollection("orders");
    if (!orderCollection) {
      throw new Error("Orders collection not found.");
    }
    
    const orders = await orderCollection.find({ "vendorDetails.vendorId": vendorId }).toArray();
    return orders?.length ? orders.map(order => ({
      ...order,
      _id: order._id.toString(),
    })) : [];
  } catch (error) {
    console.error("Error fetching vendor orders:", error);
    throw error;
  }
}

export async function getCustomerOrders(){
  try {

    const session = await getServerSession(authOptions)
    if(!session){
      console.log("No Session found.")
      return []
    }

    const customerId = session.user.id;
  
    const ordersCollection = await getCollection("orders");
    if(!ordersCollection) throw new Error("Orders Collection not found");
  
    const customerOrders = await ordersCollection.find({ "userDetails.userId": customerId }).toArray();
  
    return customerOrders.map(order => ({
      ...order,
      _id: order._id.toString(),
    }));
    
  } catch (error) {
    console.error("Errors fetching customer orders", error);
  }
}