// import { decrypt } from "@/lib/session";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const sessionCookie = cookies().get("session")?.value;

//   if (!sessionCookie) {
//     return NextResponse.redirect(new URL("/pages/login", req.nextUrl));
//   }

//   const payload = await decrypt(sessionCookie);

//   if (!payload || !payload.userId) {
//     return NextResponse.redirect(new URL("/pages/login", req.nextUrl));
//   }

//   if (payload.role === "vendor" && !req.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
//   }

 
//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/dashboard/:path*"], 
// };


