'use client'
import React, { useState } from "react";
import Header from "../components/Header";
import { logout } from "../actions/auth";
import { ImSwitch } from "react-icons/im";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
      
     <Header
     title="Expo"
     navLinks={[
      { label: "Home", href: "/" },
      { label: "Dashbard", href: "/dashboard" },
      { label: "Products", href: "/dashboard/products" },
      { label: "Users", href: "/dashboard/customers" },
     ]}
      rightContent={
      <div className="space-x-4">
         <button onClick={logout} className="text-red-500 text-xl"><ImSwitch/></button>
             
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
