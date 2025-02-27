"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { logout } from "../../services/actions/auth";
import ProfileImage from "../../components/ProfileImage";
import Link from "next/link";
import { House, LogOut, Search, Bell } from "lucide-react";
import Notifications from "@/components/Notifications";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserSession = async () => {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setUser(data?.user);
    };
    getUserSession();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <AppSidebar />

        <div className="flex flex-col flex-1">
          <Header
            title="AutoNex"
            navLinks={[
              { label: <House />, href: "/" },
              { label: "Dashboard", href: "/vendor" },
              { label: "Products", href: "/vendor/products" },
              { label: "Orders", href: "/vendor/orders" },
              { label: <Search />, href: "/vendor/search" },
            ]}
            rightContent={
              <div className="space-x-4 flex items-center">
                {user ? (
                  <>
                    <Notifications userId={user.userId} role={user.role || "vendor"} />
                    <ProfileImage />
                  
                  </>
                ) : (
                  <Link
                    href="/pages/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            }
            className="bg-white shadow-md"
          />

          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            <SidebarTrigger className="md:hidden mb-4" /> 
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}