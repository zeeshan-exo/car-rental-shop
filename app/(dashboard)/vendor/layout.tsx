"use client"
import React from "react";
import Header from "@/components/layout/Header";
import { useSession } from "next-auth/react";
import ProfileImage from "@/components/user/ProfileImage";
import Link from "next/link";
import { House, Search, ShoppingCart, Car, LayoutDashboard } from "lucide-react";
import Notifications from "@/components/Notifications";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/App-sidebar";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full">
          <Header
            title={
              <Link href="/" className="flex items-center gap-2">
                <span className="font-bold text-xl">AutoNex</span>
              </Link>
            }
            navLinks={[
              // { label: <House className="text-gray-700" />, href: "/" },
              { 
                label: <LayoutDashboard className="text-gray-700" />, 
                href: "/vendor",
              },
              { 
                label: <Car className="text-gray-700" />, 
                href: "/vendor/cars",
              },
              { 
                label: <ShoppingCart className="text-gray-700" />, 
                href: "/vendor/orders",
              },
              // { 
              //   label: <Search className="text-gray-700" />, 
              //   href: "/vendor/search" 
              // },
            ]}
            rightContent={
              <div className="flex items-center gap-4">
                {status === "loading" ? (
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                ) : user ? (
                  <>
                    <div className="relative">
                      <Notifications userId={user.id} role={user.role || "vendor"} />
                    </div>
                    <div className="flex items-center gap-2">
                      <ProfileImage />
                    </div>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700"
                  >
                    Login
                  </Link>
                )}
              </div>
            }
            className="bg-white shadow-md w-full"
          />

          <main className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 mb-6 w-full">
            <div className="md:hidden mb-4">
              <SidebarTrigger className="p-2 rounded-md bg-white shadow-sm border border-gray-200" />
            </div>
            <div className="w-full h-screen">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
