"use client";
import { bookingOrder } from '@/app/actions/order';
import ReusableForm from '@/app/components/Form';
import { useState, useActionState, startTransition } from 'react';

const bookingFields = [
    { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
    { label: "IdCard", name: "idcard", type: "text", placeholder: "Enter your ID card number" },
    { label: "Date", name: "date", type: "date", placeholder: "Select a date" },
    { label: "Time", name: "time", type: "time", placeholder: "Select a time" },
    { label: "Address", name: "address", type: "text", placeholder: "Enter your address" },
];

export default function BookingForm({ carModel, productName }) {
    const [isOpen, setIsOpen] = useState(false);
    const [state, action, pending] = useActionState(bookingOrder, undefined);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = async (formData) => {
        console.log("Form submitted:", formData);
        const formDataWithProduct = { ...formData, carModel, productName };

        startTransition(()=>{
            action(formDataWithProduct)
        })
         closeModal();
    };

    return (
        <div>
            <button onClick={openModal} 
            disabled={pending}
             className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {pending? "Booking": "Book"}
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative">

                        <button 
                            onClick={closeModal} 
                            className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                        >
                            &times;
                        </button>
                        
                        <ReusableForm 
                        title="Book Your Ride" 
                        fields={bookingFields} 
                        onSubmit={handleSubmit}
                        errors={state?.errors || {}}
                         />
                          {state?.errors && (
                            <p className="text-red-500 text-sm mt-2">Failed to book. Please check your details.</p>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
    );
};


