"use client"
import React from "react";
import Header from "@/components/layout/Header";
import { useSession } from "next-auth/react";
import ProfileImage from "@/components/user/ProfileImage";
import Profile from "@/components/Tabs/Profile";
import Link from "next/link";
import { House, Search,HelpCircle, MapPinned, ShoppingCart, Settings, Home, Ticket, Bell, Car, LayoutDashboard, Mail, LocateIcon } from "lucide-react";
import Notifications from "@/components/Notifications";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar"
import { AppSidebar } from "@/components/layout/App-sidebar";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const user = session?.user;

  const sidebarItems = [
    {title: "Home", url: "/vendor", icon: Home},
    {title: "Inventory", url: "/vendor/cars", icon: Car},
    {title: "Booking", url: "/vendor/booking", icon: Ticket},
    {title: "Notifications", url:"/", icon: Bell},
    {title: "Messages", url:"/vendor", icon: Mail},
    {title: "Track", url:"/vendor", icon: MapPinned}
  ]
  
  const footerItems = [
    { title: "Account", url: "/account", icon: Settings },
    { title: "Help & Support", url: "/help", icon: HelpCircle },
  ];
  

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar 
        items={sidebarItems}
        footerItems={footerItems}
        defaultActiveItems="Home"
         />
        <div className="flex flex-col flex-1 w-full">
          {/* <Header
            title={
              <Link href="/" className="flex items-center gap-2">
                <span className="font-bold text-xl">AutoNex</span>
              </Link>
            }
            navLinks={[
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
                      <Profile />
                    </div>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="bg-sky-600 text-AppLight px-4 py-2 rounded-md hover:bg-sky-700"
                  >
                    Login
                  </Link>
                )}
              </div>
            }
            className="bg-AppLight shadow-md w-full"
          /> */}

          <main className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 mb-6 w-full">
            <div className="md:hidden mb-4">
              <SidebarTrigger className="p-2 rounded-md bg-AppLight shadow-sm border border-gray-200" />
            </div>
            <div className="w-full h-screen">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
