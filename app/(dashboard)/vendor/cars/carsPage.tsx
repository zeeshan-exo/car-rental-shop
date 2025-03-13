import React from 'react';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import ProductForm from './carForm';
import DisplayVendorCars from './vendorCars';
import { useSession } from 'next-auth/react';

export default async function ProductsPage() {

  const {data: session} = useSession()

  const role = session?.user?.role

  return (
    <div className="p-4">
      {role === "vendor" && <ProductForm />}
      {session?.user?.id && role === "vendor" && <DisplayVendorCars/>}
    </div>
  );
}
