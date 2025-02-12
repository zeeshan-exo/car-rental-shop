'use client'
import React, { useState , useEffect} from "react";
import Header from "../components/Header";
import { logout } from "../actions/auth";
import ProfileImage from "../components/ProfileImage";
import Link from "next/link";

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
      { label: "Home", href: "/" },
      { label: "Dashbard", href: "/dashboard" },
      { label: "Products", href: "/dashboard/products" },
     ]}
      rightContent={
        <div className="flex justify-between items-center gap-14 flex-wrap">
 
        <div className="flex-1">
          <input
            type="search"
            placeholder="Search for items"
            className="w-full px-4 py-2 bg-slate-200 outline-none rounded-md placeholder:text-sm placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-black focus:border-gray-600"
          />
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button onClick={logout} className="text-red-500 text-md hover:underline">
                Logout
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
