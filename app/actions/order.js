"use server";
import { getCollection } from "@/lib/db";
import { OrderSchema } from "@/lib/order/orderdefinations";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

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

        const result = await orderCollection.insertOne({
            ...orderData,
            userName: payload?.name, 
            carModel: rawData.carModel, 
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

        const orderCollection = await getCollection("orders")
        const orders = await orderCollection.find().toArray()
        return orders?.length ? orders: []
    } catch (error) {
        console.log("Error occured while fetching orders", error)
    }
}