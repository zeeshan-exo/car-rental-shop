import React from 'react';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import DisplayOrder from './displayOrder';


export default async function OrdersPage() {
  const sessionCookie = (await cookies()).get('session')?.value
  const payload = sessionCookie ? await decrypt(sessionCookie) : null;

  return (
    <div className="p-4">
      {payload?.userId && payload?.role === "vendor" && <DisplayOrder/>}
    </div>
  );
}