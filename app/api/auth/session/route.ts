import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export async function GET() {
    const sessionCookie = (await cookies()).get('session')?.value
  const payload = sessionCookie ? await decrypt(sessionCookie) : null;

  return NextResponse.json({ user: payload });
}
