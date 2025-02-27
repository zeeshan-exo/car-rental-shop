
"use client";
import { bookingOrder } from "@/services/actions/order";
import ReusableForm from "@/components/Form";
import { useState, useEffect } from "react";
import { useActionState, startTransition } from "react";
import { Calendar, Clock, Mail, CreditCard, MapPin, X } from "lucide-react";

interface BookingFormProps {
  carModel: string;
  carName: string;
  carId: string;
  vendorEmail: string;
  vendorId: string
}

const initialBookingFields = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    icon: <Mail className="w-5 h-5 text-gray-400" />,
    required: true,
  },
  {
    label: "ID Card",
    name: "idcard",
    type: "text",
    placeholder: "Enter your ID card number",
    icon: <CreditCard className="w-5 h-5 text-gray-400" />,
    required: true,
  },
  {
    label: "Pickup Date",
    name: "date",
    type: "date",
    placeholder: "Select pickup date",
    icon: <Calendar className="w-5 h-5 text-gray-400" />,
    required: true,
  },
  {
    label: "Pickup Time",
    name: "time",
    type: "time",
    placeholder: "Select pickup time",
    icon: <Clock className="w-5 h-5 text-gray-400" />,
    required: true,
  },
  {
    label: "Pickup Address",
    name: "address",
    type: "text",
    placeholder: "Enter pickup address",
    icon: <MapPin className="w-5 h-5 text-gray-400" />,
    required: true,
  },
];

export default function BookingForm({
  carModel,
  carName,
  carId,
  vendorEmail,
  vendorId
}: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
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
    if (user?.email) {
      setInitialValues({ email: user.email });
    }
  }, [user]);

  const handleSubmit = (formData: any) => {
    const bookingData = { ...formData, carModel, carName, carId, vendorEmail, vendorId };
    startTransition(() => action(bookingData));
    closeModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        disabled={isPending}
        className="w-full bg-yellow-400 text-black px-6 py-2.5 rounded-lg font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Booking...
          </>
        ) : (
          "Book Now"
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative transform transition-all duration-300 scale-95 animate-modal-in">
            <div className="grid md:grid-cols-5">
              
              <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-yellow-400 to-yellow-500 p-6 text-white">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Secure Your Ride</h3>
                    <p className="mt-2 text-yellow-100 text-sm">
                      Book {carName} in just a few steps
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <p className="text-sm">Fast Booking</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <p className="text-sm">24/7 Support</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Book {carName}</h2>
                    <p className="text-gray-500 text-sm">{carModel}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <ReusableForm
                  fields={initialBookingFields}
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  errors={state?.errors || {}}
                  pending={isPending}
                />

                {state?.errors && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200 text-red-600 text-sm">
                    Booking failed. Please check your details.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}













