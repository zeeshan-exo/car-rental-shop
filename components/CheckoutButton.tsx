"use client"

import { loadStripe } from "@stripe/stripe-js"
import { Button } from "./ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!)

export default function CheckoutButton({car}: {car: any}){
    const handleCheckout = async() =>{
        const res = await fetch("api/checkout", {
            method: "POST",
            headers: {"Content-Type": "applictaion/json"},
            body:JSON.stringify({
                car: car._id,
                carName: car.carName,
                price: car.pricePerDay,
                rentalDays: 2,
                userEmail: "umar@email.com"
            })
        })

        const {id} = await res.json()
        const stripe = await stripePromise
        stripe?.redirectToCheckout({sessionId: id})
    }

    return <Button 
    onClick={handleCheckout} 
    className="bg-blue-500 text-white px-4 py-2 ">
        Rent Now
    </Button>
}