// This approach is compatible with Next.js App Router
export const dynamic = "force-dynamic";
export const revalidate = 0;

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Export a handler function that uses NextAuth with the auth options
// Using NextAuth directly, not as a function that returns a function
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };