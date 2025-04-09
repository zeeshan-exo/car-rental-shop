"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogOut, X, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";


const ProfileImage = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="focus:outline-none transition-transform hover:scale-105"
        aria-label="Open profile menu"
      >
        <div className="relative overflow-hidden rounded-full border-2 border-gray-200">
          <Image
            src="/profile.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full bg-slate-100 cursor-pointer object-cover"
          />
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-end items-start z-50 backdrop-blur-sm transition-opacity"
          onClick={handleBackdropClick}
        >
          <div className="bg-white p-6 shadow-lg w-80 rounded-lg mt-16 mr-4 relative animate-slideIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              onClick={() => setOpen(false)}
              aria-label="Close profile menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
              <div className="bg-blue-50 p-2 rounded-full">
                <User size={24} className="text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.name || "User"}
              </h2>
            </div>

            {session ? (
              <div className="space-y-3 text-gray-600">
                {/* <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Email</span>
                  <span className="font-medium">{user?.email}</span>
                </div> */}
                <div>
                  <Button
                  size="sm"
                  className="bg-AppLight/20 hover:bg-AppLight/30 text-AppPrimary w-full"
                  >
                    <User className="h-5 w-5 text-AppPrimary"/>
                    Profile Settings
                  </Button>
                </div>
                
              </div>
            ) : (
              <div className="flex items-center justify-center py-4">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="ml-2 text-gray-500">Loading...</p>
              </div>
            )}

            <Button
              onClick={() => signOut()}
              size={"sm"}
              className="mt-4 w-full text-sm font-medium text-white bg-AppDanger hover:bg-red-600 p-3 rounded-md flex items-center justify-center transition-colors"
            >
              <LogOut size={16} className="mr-2" /> Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
