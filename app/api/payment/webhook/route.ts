import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCollection } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    return NextResponse.json(
      { error: "Missing webhook secret in environment" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret, 400);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userEmail = session.metadata?.userEmail;
    const carId = session.metadata?.carId;

    if (!userEmail || !carId) {
      console.error("Missing metadata in Stripe session");
      return NextResponse.json(
        { error: "Missing metadata in session" },
        { status: 400 }
      );
    }

    try {
      const ordersCollection = await getCollection("orders");

      await ordersCollection?.updateOne(
        { "userDetails.email": userEmail, "carDetails.carId": carId },
        { $set: { paymentStatus: "paid", paymentMethod: "card" } }
      );
    } catch (error) {
      console.error("Database update error:", error);
      return NextResponse.json(
        { error: "Database update error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
