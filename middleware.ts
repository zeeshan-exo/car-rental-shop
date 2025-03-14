import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async authorized({ req, token }) {
      const { pathname } = req.nextUrl;

      if (!token) return false; 
      if (pathname.startsWith("/vendor") && token.role !== "vendor") {
        return false; 
      }

      return true;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/vendor/:path*", "/user/:path*"],
};
