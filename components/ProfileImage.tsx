"use client";

import React, { useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOut, User, X } from "lucide-react";
import { logout } from "@/services/actions/auth";

const ProfileImage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <Image
          src={"/profile.png"}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full bg-slate-300 cursor-pointer"
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 z-50"
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setOpen(false)}
          >
            <X size={16} />
          </button>
          <ul className="space-y-2">
            <li>
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setOpen(false)}
              >
                <User size={16} className="mr-2" /> Show Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
              >
                <LogOut size={16} className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
