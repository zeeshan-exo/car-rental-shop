import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const userRole = token.role;
    const isCustomer = userRole === "customer";
    const isVendor = userRole === "vendor";
    const isAdmin = userRole === "admin";

    if (pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    if (pathname.startsWith("/vendor") && !isVendor) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    if (pathname.startsWith("/user") && !isCustomer) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/login", 
    },
    callbacks: {
      async authorized({ token }) {
        return !!token; 
      },
    },
  }
);

export const config = {
  matcher: [ "/admin/:path*", "/vendor/:path*", "/user/:path*"],
};