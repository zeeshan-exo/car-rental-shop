import React from 'react';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import ProductForm from './productForm';

import DisplayVendorProducts from './vendorProducts';

export default async function ProductsPage() {
  const sessionCookie = (await cookies()).get('session')?.value
  const payload = sessionCookie ? await decrypt(sessionCookie) : null;

  return (
    <div className="p-4">
      {payload?.role === "vendor" && <ProductForm />}
      {payload?.userId && payload?.role === "vendor" && <DisplayVendorProducts/>}
    </div>
  );
}
