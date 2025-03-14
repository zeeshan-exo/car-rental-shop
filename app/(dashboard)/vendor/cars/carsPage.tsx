import React from 'react';
import { getServerSession } from 'next-auth';
import ProductForm from './carForm';
import DisplayVendorCars from './vendorCars';
import { authOptions } from '@/lib/auth/auth';

export default async function ProductsPage() {

  const  session = await getServerSession( authOptions)

  const role = session?.user?.role

  return (
    <div className="p-4">
      {role === "vendor" && <ProductForm />}
      {session?.user?.id && role === "vendor" && <DisplayVendorCars/>}
    </div>
  );
}
