import { Currency } from "lucide-react";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: "2025-02-24.acacia",
})

export async function POST(req: Request){
   try {
    const {carId, carName, price, rentalDays, userEmail} = await req.json()

    const totalAmount = price * rentalDays * 100

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        customer_email: userEmail,
        line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: carName,
                  description: `Rental for ${rentalDays} days`,
                },
                unit_amount: totalAmount,
              },
              quantity: 1,
            },
          ],
        mode: "payment",
        success_url:  `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
        metadata: {carId, rentalDays, userEmail}
    })

    return NextResponse.json({id: session.id})
   } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
}