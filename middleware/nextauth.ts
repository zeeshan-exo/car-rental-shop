import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const { role } = token;
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/user") && role !== "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/vendor") && role !== "vendor") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: ["/user/:path*", "/vendor/:path*", "/admin/:path*"],
};
