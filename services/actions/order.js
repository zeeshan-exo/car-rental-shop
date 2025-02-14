"use server";
import { getCollection } from "@/lib/db";
import { OrderSchema } from "@/lib/order/orderdefinations";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function bookingOrder(state, formData) {
    const rawData = formData;

    const validatedFields = OrderSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    const { userName,productName, carModel, ...orderData } = validatedFields.data;

    const session = (await cookies()).get("session")?.value;
    const payload = session ? await decrypt(session) : null;
    if (!payload) {
        return { errors: { session: "User session not found" } };
    }

    try {
        const orderCollection = await getCollection("orders");
         await orderCollection.insertOne({
            ...orderData,
            userName: payload?.name,
            userId: payload?.userId, 
            carModel: rawData.carModel,
            productId: rawData.productId, 
            productName: rawData.productName
        });

        return { success: true, message: "Order created successfully!" };
    } catch (error) {
        console.error("Error while creating order:", error);
        return { errors: { server: "Failed to create order. Please try again." } };
    }
}

export async function getOrders() {
    try {
        const session = (await cookies()).get('session').value
        if(!session){
          console.log("No session found in cookies")
        }
        const payload = await decrypt(session)
        if(!payload){console.log("data not found in payload")}

        const orderCollection = await getCollection("orders")
        const orders = await orderCollection.find().toArray()
        return orders?.length ? orders: []
    } catch (error) {
        console.log("Error occured while fetching orders", error)
    }
}

export async function confirmOrder(id) { 
    try {
      const orderCollection = await getCollection("orders");
      if (!orderCollection) {
        throw new Error("Orders collection not found");
      }
      const result = await orderCollection.updateOne(
        { _id: new ObjectId((string(id))) },
        {$set:{status: "confirmed"}}
    )
    return result
    } catch (error) {
        console.error("Error in getOneOrder:", error);
        return null;
    }
}

export async function getOneOrder(id) { 
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
          productIdObj: { $toObjectId: "$productId" }
        }
      },
      {
        $lookup: {
          from: "products",        
          localField: "productIdObj", 
          foreignField: "_id",        
          as: "productDetails"
        }
      },
      { 
        $unwind: "$productDetails"  
      },
      {
        $match: {
          "productDetails.vendorId": vendorId
        }
      },
    ]).toArray();
    
    return orders;
  } catch (error) {
    console.error("Error fetching vendor orders:", error);
    throw error;
  }
}

