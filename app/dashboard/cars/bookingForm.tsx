"use client";
import { bookingOrder } from "@/services/actions/booking";
import ReusableForm from "@/components/BookingForm";
import { useState, useEffect } from "react";
import { useActionState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Mail, 
  CreditCard, 
  MapPin, 
  X, 
  User, 
  CarFront,
  Check
} from "lucide-react";
import CheckoutButton from "@/components/CheckoutButton";

interface BookingFormProps {
  carModel: string;
  carName: string;
  carId: string;
  vendorEmail: string;
  vendorId: string;
  vendorName: string;
  rentalRate: number
}

const initialBookingFields = [
  {
    label: "User Name",
    name: "userName",
    type: "text",
    placeholder: "Enter your full name",
    icon: <User className="w-5 h-5 text-blue-500" />,
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email address",
    icon: <Mail className="w-5 h-5 text-blue-500" />,
    required: true,
  },
  {
    label: "Contact Number",
    name: "contact",
    type: "text",
    placeholder: "Enter your mobile number",
    icon: <CreditCard className="w-5 h-5 text-blue-500" />,
    required: true,
  },
  {
    label: "Pickup Date",
    name: "pickupDate",
    type: "date",
    placeholder: "Select pickup date",
    icon: <Calendar className="w-5 h-5 text-blue-500" />,
    required: true,
  },
  {
    label: "Return Date",
    name: "returnDate",
    type: "date",
    placeholder: "Select return date",
    icon: <Calendar className="w-5 h-5 text-blue-500" />,
    required: true,
  },
  {
    label: "Pickup Time",
    name: "pickupTime",
    type: "time",
    placeholder: "Select pickup time",
    icon: <Clock className="w-5 h-5 text-blue-500" />,
    required: true,
  },
  {
    label: "Pickup Location",
    name: "pickupLocation",
    type: "text",
    placeholder: "Enter full pickup address",
    icon: <MapPin className="w-5 h-5 text-blue-500" />,
    required: true,
  },
];

export default function BookingForm({
  carModel,
  carName,
  carId,
  vendorEmail,
  vendorId,
  vendorName,
  rentalRate
}: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [state, action, isPending] = useActionState(bookingOrder, null);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch("/api/auth/session", { credentials: "include" });
        const data = await response.json();
        setUser(data?.user);
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      }
    };
    fetchUserSession();
  }, []);

  useEffect(() => {
    if (user?.email ) {
      setInitialValues({ email: user.email});
    }
  }, [user]);

  const handleSubmit = (formData: any) => {
    const bookingData = { 
      ...formData,
      carDetails: JSON.stringify({ carId, carModel, carName }),
      vendorDetails: JSON.stringify({ vendorId, vendorName, vendorEmail }),
    };
    startTransition(() => action(bookingData));
  };
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <Button
        onClick={openModal}
        disabled={isPending}
        className="w-full h-full bg-blue-600 px-6 py-2.5 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          "Book Now"
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative transform transition-all duration-300 ease-in-out">
              <>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <CarFront className="w-10 h-10" />
                    <div>
                      <h2 className="text-2xl font-bold">Book {carName}</h2>
                      <p className="text-sm text-blue-100">{carModel}</p>
                    </div>
                  </div>

                  <button
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="p-2 hover:bg-blue-700/30 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                  <ReusableForm
                    fields={initialBookingFields}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    carDetails={{
                      carName: carName,
                      carId: carId,
                      price: rentalRate,
                    }}
                    errors={state?.errors || {}}
                    pending={isPending}
                  />

                  {state?.errors && (
                    <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200 flex items-center gap-3 text-red-600">
                      <X className="w-6 h-6 text-red-500" />
                      <div>
                        <h3 className="font-semibold">Booking Failed</h3>
                        <p className="text-sm">Please review and correct your details.</p>
                      </div>
                    </div>
                  )}
                </div>

              </>
            </div>
        </div>
      )}
    </div>
  );
}