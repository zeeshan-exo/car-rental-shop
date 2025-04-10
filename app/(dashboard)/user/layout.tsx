"use client";
import React, { useState } from "react";
import Header from "../../../components/layout/Header";
import ProfileImage from "@/components/user/ProfileImage";
import Profile from "@/components/Tabs/Profile";
import Link from "next/link";
import Viewcar from "./cars/viewCar";
import { Search, House, MapPinned, Home, Ticket, Settings, HelpCircle, Heart, Car, LayoutDashboard, Bell } from "lucide-react";
import Notifications from "@/components/Notifications";
import { useSession } from "next-auth/react";
import SearchModal from "@/components/layout/SearchModal";
import Loading from "@/components/Loading";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { title } from "process";

const sidebarItems = [
  {title: "Home", url: "/user/car", icon: Home},
  {title: "Cars", url: "/user/cars", icon: Car},
  {title: "MyBooking", url: "/user/car", icon: Ticket},
  {title: "Notifications", url:"/", icon: Bell},
  {title: "Track", url:"/user", icon: MapPinned}
  
]

const footerItems = [
  { title: "Account", url: "/account", icon: Settings },
  { title: "Help & Support", url: "/help", icon: HelpCircle },
];


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  if (status === "loading") {
    return <div><Loading variant="minimal"/></div>;
  }

  const user = session?.user;

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleCarSelect = (carId: string) => {
    setSelectedCarId(carId);
    setIsSearchOpen(false);
  };

  const handleCloseViewer = () => {
    setSelectedCarId(null);
  };

  return (
    <SidebarProvider>
    <div className="flex min-h-screen w-full bg-AppLight">
      <Sidebar
      items={sidebarItems}
      footerItems={footerItems}
      defaultActiveItems=""
      />
      <div className="flex flex-col flex-1 w-full max-w-[calc(100vw-16rem)]">
        <Header
          title="AutoNex"
          navLinks={[
            { label: <Home/>, href: "/" },
            { label: <LayoutDashboard />, href: "/user" },
            { label: <Car />, href: "/user/cars" },
            { label: <Heart />, href: "#" },
            { label: <Search />,  onClick: handleOpenSearch },
          ]}
          rightContent={
            <div className="flex justify-between items-center gap-14 flex-wrap">
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Notifications userId={user.id} role={user.role || "customer"} />
                    <Profile/>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="text-blue-500 font-medium hover:underline"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          }
        />
        <main className="flex-1 mt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 mb-6 w-full">
        <div className="md:hidden mb-4">
              <SidebarTrigger className="p-2 rounded-md bg-white shadow-sm border border-gray-200" />
            </div>
            <div className="w-full h-screen">{children}</div>
        </main>

        <SearchModal
          isOpen={isSearchOpen}
          onClose={handleCloseSearch}
          onCarSelect={handleCarSelect}
          defaultValue=""
        />

        {selectedCarId && (
          <Viewcar 
            carId={selectedCarId} 
            onClose={handleCloseViewer} 
          />
        )}
      </div>
    </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;