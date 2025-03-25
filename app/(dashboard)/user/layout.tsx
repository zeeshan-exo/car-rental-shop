"use client";
import React, { useState } from "react";
import Header from "../../../components/layout/Header";
import ProfileImage from "@/components/user/ProfileImage";
import Link from "next/link";
import Viewcar from "./cars/viewCar";
import { Search, House, Heart, Car, LayoutDashboard } from "lucide-react";
import Notifications from "@/components/Notifications";
import { useSession } from "next-auth/react";
import SearchModal from "@/components/layout/SearchModal";
import Loading from "@/components/Loading";

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
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
        <Header
          title="AutoNex"
          navLinks={[
            { label: <House />, href: "/" },
            { label: <LayoutDashboard />, href: "/user" },
            { label: <Car />, href: "/user/cars" },
            { label: <Heart />, href: "" },
            { label: <Search />, href: "#", onClick: handleOpenSearch },
          ]}
          rightContent={
            <div className="flex justify-between items-center gap-14 flex-wrap">
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Notifications userId={user.id} role={user.role || "customer"} />
                    <ProfileImage />
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
        <main className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-gray-blue-300 scrollbar-track-gray-100 bg-gray-50 shadow-inner rounded-lg">
          {children}
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
  );
};

export default DashboardLayout;