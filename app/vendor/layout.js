'use client'
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { logout } from "../actions/auth";
import ProfileImage from "../components/ProfileImage";
import Link from "next/link";
import Footer from "../components/Footer";

export default function VendorDashboardLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserSession = async () => {
      const response = await fetch("/api/auth/session"); 
      const data = await response.json();
      setUser(data?.user);
    };
    getUserSession();
  },[]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
        <Header
          title="Expo"
          navLinks={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/vendor" },
            { label: "Products", href: "/vendor/products" },
          ]}
          rightContent={
            <div className="space-x-4 flex items-center">
              {user ? (
                <>
                  <button onClick={logout} className="text-red-500 text-md hover:underline">
                    Logout
                  </button>
                  <ProfileImage/>
                </>
              ) : (
                <Link href="/pages/login" className="text-blue-500">Login</Link>
              )}
            </div>
          }
        />

        <main className="flex-1 p-6 overflow-auto bg-gray-50 shadow-inner rounded-lg">
          {children}
        </main>
        <Footer/>
      </div>
    </div>
  );
}
