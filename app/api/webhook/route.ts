import { getCollection } from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,
    {apiVersion: "2025-02-24.acacia"}
)

export async function POST(req:Request) {
    const payload = await req.text()
    const sig = req.headers.get("stripe-signature")!
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

    try {
        const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)

        if(event.type === "checkout.session.completed"){
            console.log("Payment Success:", event.data.object)
            const session = event.data.object
            const {carId, rentalDays, userEmail} = session.metadata

            const bookingCollection = await getCollection("orders")
            await bookingCollection?.insertOne({
                carId, 
                userEmail,
                rentalDays,
                paymentStatus: "paid",
                transactionId: session.id,
                createdAt: new Date()
            })
             console.log("Payment Confirmed for:", carId)
        }

        return NextResponse.json({received: true})
    } catch (error) {
        console.error("WebHook Error:", error)
        return NextResponse.json ({error: "Webhook error"}, {status: 400})
    }
}