import React from 'react';
import { getServerSession } from 'next-auth';
import ProductForm from './carForm';
import DisplayVendorCars from './vendorCars';
import { authOptions } from '@/lib/auth/auth';

export default async function ProductsPage() {

  return (
    <div className="p-4">
       <ProductForm />
     <DisplayVendorCars/>
    </div>
  );
}
