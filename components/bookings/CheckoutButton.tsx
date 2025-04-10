"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../ui/button";
import { useState } from "react";
import { formatCurrency } from "@/lib/currency";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Car {
  carName: string;
  rentalRate: number;
}

interface CheckoutButtonProps {
  car: Car;
}

export default function CheckoutButton({ car }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({
          carName: car.carName,
          price: car.rentalRate,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { id } = await res.json();

      const { error } = await stripe!.redirectToCheckout({ sessionId: id });
      if (error) {
        console.error("Stripe redirect error:", error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold">Checkout</h1>
      <div>
        <h2>{car.carName}</h2>
        <p>Price per day: {formatCurrency(car.rentalRate)}</p>
      </div>

      <Button
        onClick={handleCheckout}
        className="bg-AppPrimary text-AppLight px-4 py-2"
        disabled={loading}
      >
        {loading ? "Processing..." : "Rent Now"}
      </Button>
    </div>
  );
}