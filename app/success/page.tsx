"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const id = searchParams.get("session_id");
    if (id) {
      setSessionId(id);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your booking! Your payment was successful.
        </p>

        {sessionId && (
          <p className="text-gray-500 mt-2 text-sm">
            Transaction ID: <span className="font-semibold">{sessionId}</span>
          </p>
        )}

        <Link
          href="/user/cars"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
           Go Back
        </Link>
      </div>
    </div>
  );
}
