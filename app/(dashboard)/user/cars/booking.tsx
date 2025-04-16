"use client";

import { bookingOrder } from "@/actions/booking";
import { useState, useEffect } from "react";
import { useActionState, startTransition } from "react";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Mail,
  CreditCard,
  MapPin,
  User,
  CalendarIcon,
  Check
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface BookingFormProps {
  carModel: string;
  carName: string;
  carId: string;
  vendorEmail: string;
  vendorId: string;
  vendorName: string;
  rentalRate: string;
}

const Booking: React.FC<BookingFormProps> = ({
  carModel,
  carName,
  carId,
  vendorEmail,
  vendorId,
  vendorName,
  rentalRate,
}) => {
  const [state, action, isPending] = useActionState(bookingOrder, null);
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

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
    const bookingData = {
      ...formData,
      dateRange: {
        from: dateRange?.from,
        to: dateRange?.to,
      },
      carDetails: JSON.stringify({ carId, carModel, carName, rentalRate }),
      vendorDetails: JSON.stringify({ vendorId, vendorName, vendorEmail }),
    };
    startTransition(() => action(bookingData));
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe failed to load.");
        return;
      }
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          carName,
          rentalRate,
          pickupDate: dateRange?.from,
          returnDate: dateRange?.to,
        }),
      });

      const result = await response.json();
      if (!result.id) {
        console.error("Error: No session ID received from Server Action", result);
        alert(`Failed to create Stripe session: ${result.error || "Unknown error"}`);
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: result.id });
      if (error) {
        console.error("Stripe redirect error:", error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const fields = [
    {
      label: "User Name",
      name: "userName",
      type: "text",
      placeholder: "Enter your full name",
      icon: <User className="w-5 h-5 text-AppPrimary" />,
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email address",
      icon: <Mail className="w-5 h-5 text-AppPrimary" />,
      required: true,
    },
    {
      label: "Contact Number",
      name: "contact",
      type: "text",
      placeholder: "Enter your mobile number",
      icon: <CreditCard className="w-5 h-5 text-AppPrimary" />,
      required: true,
    },
    {
      label: "Pickup Time",
      name: "pickupTime",
      type: "time",
      placeholder: "Select pickup time",
      icon: <Clock className="w-5 h-5 text-AppPrimary" />,
      required: true,
    },
    {
      label: "Address",
      name: "pickupLocation",
      type: "text",
      placeholder: "Enter full pickup address",
      icon: <MapPin className="w-5 h-5 text-AppPrimary" />,
      required: true,
    },
  ];

  return (
    <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(({ label, name, type, placeholder, icon, required }) => (
            <div key={name} className="relative">
              <Label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
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
                  disabled={isPending}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    state?.errors?.[name] ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                  } shadow-sm transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
                />
              </div>
              {state?.errors?.[name] && (
                <p className="mt-1 text-red-600 text-sm">{state.errors[name]}</p>
              )}
            </div>
          ))}

          <div className="relative">
            <Label className="block text-sm font-medium text-gray-700 mb-1.5">
              Rental Period <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal py-3",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-AppPrimary" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
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
                <CalendarComponent
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
            {state?.errors?.dateRange && (
              <p className="mt-1 text-red-600 text-sm">{state.errors.dateRange}</p>
            )}
          </div>

          <div className="mt-4">
            <Label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Select Payment Method
            </Label>
            <Select
              value={paymentMethod}
              onValueChange={handlePaymentMethodChange}
              disabled={isPending}
            >
              <SelectTrigger id="paymentMethod" className="w-full py-3 border-gray-200">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cashOnDelivery">💵 Cash on Delivery</SelectItem>
                <SelectItem value="card">💳 Pay with Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <a href="/terms" className="text-sm text-AppPrimary hover:underline">
              Terms & Conditions
            </a>
            {paymentMethod === "cashOnDelivery" ? (
              <Button
                type="submit"
                disabled={isPending || !dateRange?.from || !dateRange?.to}
                className="px-6 py-3 bg-AppPrimary text-AppLight font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleCheckout}
                disabled={isPending || !dateRange?.from || !dateRange?.to}
                className="px-6 py-3 bg-AppPrimary text-AppLight font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </Button>
            )}
          </div>
        </form>

        {state?.errors && (
          <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200 flex items-center gap-3 text-red-600">
            <div className="p-2 bg-red-100 rounded-full">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Booking Failed</h3>
              <p className="text-sm">Please review and correct your details.</p>
            </div>
          </div>
        )}
        
        {state?.success && (
  <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 flex items-center gap-3 text-green-600">
    <div className="p-2 bg-green-100 rounded-full">
      <Check className="w-5 h-5 text-green-500" />
    </div>
    <div>
      <h3 className="font-semibold">Booking Successful</h3>
      <p className="text-sm">Your booking has been confirmed.</p>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Booking;