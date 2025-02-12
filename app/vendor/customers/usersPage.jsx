import React from 'react';
import DisplayUsers from './displayUsers';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';


export default async function UsersPage() {

    const sessionCookie = (await cookies()).get('session')?.value
  const payload = sessionCookie ? await decrypt(sessionCookie) : null;

  return (
    <div className="p-4">

      {payload?.role === "vendor" && <DisplayUsers/>}

      
    </div>
  );
}
