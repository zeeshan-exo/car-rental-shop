"use client";
import { bookingOrder } from '@/services/actions/order';
import ReusableForm from '@/app/components/Form';
import { useState, useEffect, useActionState, startTransition } from 'react';

const initialBookingFields = [
  { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
  { label: "IdCard", name: "idcard", type: "text", placeholder: "Enter your ID card number" },
  { label: "Date", name: "date", type: "date", placeholder: "Select a date" },
  { label: "Time", name: "time", type: "time", placeholder: "Select a time" },
  { label: "Address", name: "address", type: "text", placeholder: "Enter your address" },
];

export default function BookingForm({ carModel, productName, productId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [state, action, pending] = useActionState(bookingOrder, undefined);
  const [fields, setFields] = useState(initialBookingFields);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const response = await fetch("/api/auth/session", { credentials: 'include' });
        const data = await response.json();
        setUser(data?.user);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    getUserSession();
  }, []);

  useEffect(() => {
    if (user && user.email) {
      setInitialValues((prev) => ({ ...prev, email: user.email }));
    }
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (formData) => {
    console.log("Form submitted:", formData);
    const formDataWithProduct = { ...formData, carModel, productName, productId };
    
    startTransition(() => {
      action(formDataWithProduct);
    });
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}
        disabled={pending}
        className="bg-blue-500 text-white px-4 py-2 rounded-md">
        {pending ? "Booking" : "Book"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>

            <ReusableForm
              title="Book Your Ride"
              fields={fields}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              errors={state?.errors || {}}
            />
            {state?.errors && (
              <p className="text-red-500 text-sm mt-2">
                Failed to book. Please check your details.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
