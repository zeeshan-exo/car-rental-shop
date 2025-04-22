"use client";
import React, { useState } from "react";
import Header from "../../../components/layout/Header";
import Profile from "@/components/dashboard/Tabs/Profile";
import Link from "next/link";
import Viewcar from "./cars/ViewCar";
import { Search, Home, Heart, Car, LayoutDashboard } from "lucide-react";
import Notifications from "@/components/shared/Notifications";
import { useSession } from "next-auth/react";
import SearchModal from "@/components/layout/SearchModal";
import Loading from "@/components/shared/Loading";

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
    <div className="flex flex-col min-h-screen w-full bg-AppLight">
      <Header
        title="AutoNex"
        navLinks={[
          { label: <Home/>, href: "/" },
          { label: <LayoutDashboard />, href: "/user" },
          { label: <Car />, href: "/user/cars" },
          { label: <Heart />, href: "#" },
          { label: <Search />, onClick: handleOpenSearch },
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
                  className="text-AppPrimary font-medium hover:underline"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        }
      />
      <main className="flex-1 mt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 mb-6 w-full">
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
  );
};

export default DashboardLayout;