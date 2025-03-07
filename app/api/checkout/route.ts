import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", 
});

export async function POST(req: Request) {
  try {
    console.log("API Checkout Route hit...");

    const { carId, carName, price, userEmail } = await req.json();
    console.log("Received Data:", { carId, carName, price});

    if (!price || isNaN(price)) {
      console.error("Invalid price received:", price);
      return NextResponse.json(
        { error: "Invalid or missing price." },
        { status: 400 }
      );
    }

    const totalAmount = Number(price) * 100;
    console.log("Creating Stripe session for:", { carName, totalAmount });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: carName },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      metadata: { carId, userEmail },
    });

    console.log("Stripe session created:", session.id);
    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


