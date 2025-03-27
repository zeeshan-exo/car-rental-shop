"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard, CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  carDetails: { carId: string; carName: string; rentalRate: string };
  errors?: Record<string, string>;
  pending?: boolean;
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      dateRange: {
        from: dateRange?.from,
        to: dateRange?.to,
      },
    };
    onSubmit(updatedFormData);
  };

  const handleCheckout = async () => {
    try {
      console.log("Form Data Before Checkout:", { ...formData, dateRange });
      const stripe = await stripePromise;
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
          pickupDate: dateRange?.from,
          returnDate: dateRange?.to,
        }),
      });

      const result = await response.json();
      if (!result.id) {
        console.error("Error: No session ID received from API", result);
        alert(`Failed to create Stripe session: ${result.error || "Unknown error"}`);
        return;
      }

      console.log("Redirecting to Stripe with session ID:", result.id);
      const { error } = await stripe.redirectToCheckout({ sessionId: result.id });
      if (error) {
        console.error("Stripe redirect error:", error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ label, name, type, placeholder, icon, required }) => (
        <div key={name} className="relative">
          <Label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">{icon}</span>
            <Input
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
          {errors[name] && <p className="mt-1 text-red-600 text-sm">{errors[name]}</p>}
        </div>
      ))}

      <div className="relative">
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Rental Period <span className="text-red-500">*</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-AppPrimary" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              minDate={new Date()}
            />
          </PopoverContent>
        </Popover>
        {errors["dateRange"] && (
          <p className="mt-1 text-red-600 text-sm">{errors["dateRange"]}</p>
        )}
      </div>

      <div className="mt-4">
        <Label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
          Select Payment Method
        </Label>
        <Select
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
          disabled={pending}
        >
          <SelectTrigger id="paymentMethod" className="w-full">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cashOnDelivery">💵 Cash on Delivery</SelectItem>
            <SelectItem value="card">💳 Pay with Card</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <a href="/terms" className="text-sm text-AppPrimary hover:underline">
          Terms & Conditions
        </a>
        {paymentMethod === "cashOnDelivery" ? (
          <Button
            type="submit"
            disabled={pending || !dateRange?.from || !dateRange?.to}
            className="px-6 py-3 bg-AppPrimary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Booking..." : "Confirm Booking"}
          </Button>
        ) : (
          <Button
            onClick={handleCheckout}
            disabled={pending || !dateRange?.from || !dateRange?.to}
            className="px-6 py-3 bg-AppPrimary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Proceed to Checkout
          </Button>
        )}
      </div>
    </form>
  );
}