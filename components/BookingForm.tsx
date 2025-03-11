import React, { useState } from "react";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard, ChevronDown } from "lucide-react";
import { StringExpressionOperatorReturningArray } from "mongoose";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
}

interface ReusableFormProps {
  fields: FormField[];
  onSubmit: (formData: any) => void;
  initialValues?: Record<any, any>;
  carDetails:{carId: string, carName: string, rentalRate: string}
  errors?: Record<string, string>;
  pending?: boolean;
}

interface car {
  carId: string,
  carName: string,
  rentalRate: number,
  userEmail: string,
}

export default function ReusableForm({
  fields,
  onSubmit,
  initialValues = {},
  carDetails,
  errors = {},
  pending = false,
}: ReusableFormProps) {
  const [formData, setFormData] = useState(initialValues);
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery"); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "paymentMethod") {
      setPaymentMethod(value); 
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);
  };

  const handleCheckout=async ()=>{

    try {
      console.log("Form Data Before Checkout:", formData)

      const stripe = await stripePromise
      if (!stripe) {
        console.error("Stripe failed to load.");
        return;
      }
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: carDetails.carId,
          carName: carDetails.carName,
          rentalRate: carDetails.rentalRate,
          // userEmail: carDetails.userEmail,
        }),
      });

      console.log("Response Api:", response)
      
      const result = await response.json();
      console.log("API Response:", result); 
      
      if (!result.id) {
        console.error("Error: No session ID received from API", result);
        alert(`Failed to create Stripe session: ${result.error || "Unknown error"}`);
        return;
      }
      
  
      console.log("Redirecting to Stripe with session ID:", result.id);
      const { error } = await stripe?.redirectToCheckout({sessionId: result.id})
      if (error) {
        console.error("Stripe redirect error:", error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
}

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ label, name, type, placeholder, icon, required }) => (
        <div key={name} className="relative">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              {icon}
            </span>
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              required={required}
              disabled={pending}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                errors[name] ? "border-red-300" : "border-gray-300"
              } transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
          </div>
          {errors[name] && (
            <p className="mt-1 text-red-600 text-sm">{errors[name]}</p>
          )}
        </div>
      ))}

      <div className="mt-4">
        <label
          htmlFor="paymentMethod"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Payment Method
        </label>
        <div className="relative">
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handleChange}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
          >
            <option value="cashOnDelivery">💵 Cash on Delivery</option>
            <option value="card">💳 Pay with Card</option>
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <ChevronDown />
          </span>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <a href="/terms" className="text-sm text-sky-600 hover:underline">
          Terms & Conditions
        </a>
        {formData.paymentMethod === "cashOnDelivery" ? (
          <Button
            type="submit"
            disabled={pending}
            className="px-6 py-3 bg-sky-400 text-white font-semibold rounded-lg shadow-md hover:bg-sky-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Booking..." : "Confirm Booking"}
          </Button>
        ) : (
            <Button
            onClick={handleCheckout}
             className="px-6 py-3 bg-sky-400 text-white font-semibold rounded-lg shadow-md hover:bg-sky-500 transition-all duration-300">
              Proceed to Checkout
            </Button>
        )}
      </div>
    </form>
  );
}