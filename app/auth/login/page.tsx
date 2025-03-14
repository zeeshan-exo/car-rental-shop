"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.role;
      if (role) {
        const roleRoutes: { [key: string]: string } = {
          customer: "/user",
          vendor: "/vendor",
          admin: "/admin",
        };
        router.push(roleRoutes[role] || "/");
      } else {
        router.push("/");
      }
    }
  }, [status, session, router]);

  return <LoginForm />;
}
