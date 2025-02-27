"use server";
import { getCollection } from "@/lib/db";
import { OrderSchema } from "@/lib/definations/orderdefinations";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import ejs from 'ejs'
import path from "path";
import { sendMail } from "@/utils/email";
import { getSocket } from "@/lib/socket";


export async function bookingOrder(state: any, formData: FormData) {
  const rawData = formData;
  const validatedFields = OrderSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { carName, carModel, ...orderData } = validatedFields.data;
  const session = (await cookies()).get("session")?.value;
  const payload = session ? await decrypt(session) : null;
  if (!payload) {
    return { errors: { session: "User session not found" } };
  }

  try {
    const orderCollection = await getCollection("orders");
    const newOrder = {
      ...orderData,
      userName: payload?.name,
      userId: payload?.userId,
      carModel: rawData.carModel,
      carId: rawData.carId,
      carName: rawData.carName,
      vendorEmail: rawData.vendorEmail,
      vendorId: rawData.vendorId
    }
    if(orderCollection)
    await orderCollection.insertOne(
       newOrder
    );

    const socket = getSocket(newOrder.vendorId, "vendor");
    if (socket) {
      socket.emit("order_placed", {
        message: `New order placed for ${newOrder.carName}`,
        order: newOrder,
      });
    } else {
      console.warn("Socket not connected. Unable to send order notification.");
    }
    
    return { success: true, message: "Order created successfully!" };
  } catch (error) {
    console.error("Error while creating order:", error);
    return { errors: { server: "Failed to create order. Please try again." } };
  }
}


export async function getOrders() {
    try {
        const session = (await cookies()).get('session')?.value
        if(!session){
          console.log("No session found in cookies")
        }
        const payload = await decrypt(session)
        if(!payload){console.log("data not found in payload")}

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

     const session = (await cookies()).get("session")?.value;
     const payload = session ? await decrypt(session) : null;
     if (!payload) {
       return { errors: { session: "User session not found" } };
     }

    const order = await orderCollection.findOne({_id: new ObjectId(orderId)})

    if(order){
      const socket = getSocket(order.userId, "customer");
      if (socket) {
        socket.emit("order_updated", {
          message: `Your order for ${order.carName} has been ${order.status}.`,
          order: order,
        });
      }
    }

    // const templatePath = path.join(process.cwd(), "templates", "orderStatus.ejs")
    // const OrderConfirmed = await ejs.renderFile(templatePath, {userName, address, carName, status, carModel, date, time})

    // await sendMail ({
    //   to: email,
    //   subject: "Order Status",
    //   message: OrderConfirmed
    // })

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
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) {
      throw new Error("Session cookie not found.");
    }
    const payload = await decrypt(sessionCookie);
    if (!payload || payload.role !== "vendor") {
      throw new Error("Unauthorized access. Vendor session required.");
    }
    const vendorId = payload.userId; 

    const orderCollection = await getCollection("orders");
    if (!orderCollection) {
      throw new Error("Orders collection not found.");
    }
    
    const orders = await orderCollection.aggregate([
      {
        $addFields: {
          carIdObj: { $toObjectId: "$carId" }
        }
      },
      {
        $lookup: {
          from: "cars",        
          localField: "carIdObj", 
          foreignField: "_id",        
          as: "carDetails"
        }
      },
      { 
        $unwind: "$carDetails"  
      },
      {
        $match: {
          "carDetails.vendorId": vendorId
        }
      },
    ]).toArray();

    const sanitizedOrders = orders.map(order => ({
      ...order,
      _id: order._id.toString(), 
      carIdObj: order.carIdObj.toString(), 
      carDetails: {
        ...order.carDetails,
        _id: order.carDetails._id.toString() 
      }
    }));


    return sanitizedOrders;
  } catch (error) {
    console.error("Error fetching vendor orders:", error);
    throw error;
  }
}

