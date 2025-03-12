"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const role = session.user.role;
      if (role === "customer") router.push("/user");
      else if (role === "vendor") router.push("/vendor");
      else if (role === "admin") router.push("/admin");
      else router.push("/");
    }
  }, [status, session, router]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
