import React from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
    
      <aside className="w-60 overflow text-white h-full">
        <Sidebar />
      </aside>

      <main className="flex-1 p-4 overflow-auto bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
