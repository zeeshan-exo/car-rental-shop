
import React from 'react';
import Link from 'next/link';
import VendorOrdersManagement from './displayOrder';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';

export default async function OrdersPage() {
  const session =await  getServerSession(authOptions)

  return (
    <div className="min-h-screen ">
      {session?.user?.id && session?.user?.role === "vendor" ? (
          <VendorOrdersManagement />
      ) : (
        <div className="bg-AppLight p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Kindly log in to access this page
          </h1>
          <Link href="/auth/login"
          className="inline-block bg-AppPrimary text-AppLight px-6 py-3 rounded-full shadow hover:bg-blue-600 transition duration-200">
              Login
          </Link>
        </div>
      )}
    </div>
  );
}
