'use client'
import React, { useState , useEffect} from "react";
import Header from "../../components/Header";
import { logout } from "../../services/actions/auth";
import ProfileImage from "../../components/ProfileImage";
import Link from "next/link";
import { Search, LogOut, House, Heart, Package, Bell } from 'lucide-react';
import NotificationsModal from "@/components/Notifications";
import Notifications from "@/components/Notifications";

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserSession = async () => {
      const response = await fetch("/api/auth/session"); 
      const data = await response.json();
      setUser(data?.user);
    };
    getUserSession();
  },[])
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
      
     <Header
     title="Expo"
     navLinks={[
      { label: <House/>, href: "/" },
      { label: <Package/>, href: "/dashboard/products" },
      { label: <Heart/>, href: "" },
      { label: <Search/>, href: "" },
     ]}
      rightContent={
        <div className="flex justify-between items-center gap-14 flex-wrap">

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Notifications userId={user.userId} role={user.role || "customer"} />
              <button onClick={logout} className="text-red-500 text-md hover:underline">
                <LogOut/>
              </button>
              <ProfileImage/>
              
            </>
          ) : (
            <Link href="/pages/login" className="text-blue-500 font-medium hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
      
    }
     />
        <main className="flex-1 p-6 overflow-auto bg-gray-50 shadow-inner rounded-lg">
          {children}
        </main>
     
      </div>
      
     </div>
  );
};

export default DashboardLayout;
