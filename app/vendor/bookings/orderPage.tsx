import React from 'react';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import Link from 'next/link';
import DisplayOrder from './displayOrder';

export default async function OrdersPage() {
  const sessionCookie = (await cookies()).get('session')?.value;
  const payload = sessionCookie ? await decrypt(sessionCookie) : null;

  return (
    <div className="min-h-screen ">
      {payload?.userId && payload.role === "vendor" ? (
          <DisplayOrder />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Kindly log in to access this page
          </h1>
          <Link href="/auth/login"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full shadow hover:bg-blue-600 transition duration-200">
              Login
          </Link>
        </div>
      )}
    </div>
  );
}
