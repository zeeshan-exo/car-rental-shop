"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { 
  LogOut, 
  X, 
  User, 
  Settings, 
  ChevronRight
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

interface props {
  onClick: () => void
}

const Profile = ({onClick}: props) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const { data: session, status } = useSession();
  const user = session?.user;
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const menuItems = [
    { id: "account", label: "My Account", icon: <User size={18} />, onClick },
    { id: "settings", label: "Settings", icon: <Settings size={18} />, onClick },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="focus:outline-none transition-all hover:scale-105 hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 rounded-full"
        aria-label="Open profile menu"
      >
        <div className="relative overflow-hidden rounded-full border-2 border-gray-200 hover:border-blue-400 transition-colors">
          {status === "loading" ? (
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <Image
              src={user?.image || "/profile.png"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full bg-slate-100 cursor-pointer object-cover transition-transform hover:scale-105"
            />
          )}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-end items-start z-50 backdrop-blur-sm transition-all"
          onClick={handleBackdropClick}
        >
          <div 
            className="bg-white p-5 shadow-xl w-80 rounded-xl mt-16 mr-4 relative animate-slideIn border border-gray-100"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              onClick={() => setOpen(false)}
              aria-label="Close profile menu"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
              <div className="relative">
                <Image
                  src={user?.image || "/profile.png"}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full bg-slate-100 object-cover ring-2 ring-blue-100"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {user?.name || "User"}
                </h2>
                <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
            </div>

            {status === "loading" ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="ml-3 text-gray-600">Loading your profile...</p>
              </div>
            ) : (
              <>
                <nav className="space-y-1 mb-6">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick = {()=> {
                       setActiveTab(item.id)
                       item.onClick()
                      }
                      }
                      // onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`mr-3 ${activeTab === item.id ? "text-blue-500" : "text-gray-500"}`}>
                          {item.icon}
                        </span>
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className={activeTab === item.id ? "text-blue-500" : "text-gray-400"} />
                    </button>
                  ))}
                </nav>

                <Button
                  onClick={() => signOut()}
                  className="w-full mt-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 py-2 rounded-lg flex items-center justify-center transition-all"
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;