"use client"
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { logout } from "../services/actions/auth";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export default function Home() {
  const [user, setUser] = useState(null)

 useEffect(() => {
    const getUserSession = async () => {
      const response = await fetch("/api/auth/session"); 
      const data = await response.json();
      setUser(data?.user);
    };
    getUserSession();
  },[]);
  return (
    <>
     <Header
     title="Expo"
     navLinks={[
      { label: "Home", href: "/" },
      { label: "Dashbard", href: "/dashboard" },
      { label: "Contact", href: "/" },
      { label: "About", href: "/" },
     ]}
     rightContent={
            <div className="space-x-4 flex items-center">
              {user ? (
                  <button onClick={logout} className="text-red-500 font-bold text-xl">
                    <LogOut/>
                  </button>  
              ) : (
                <Link href="/pages/login" className="text-blue-500">Login</Link>
              )}
            </div>
     }
     />
     
      <div className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 bg-[url('/redcar.webp')] bg-cover bg-center bg-no-repeat">

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-lg text-white drop-shadow-lg">
          <h1 className="text-5xl font-bold mb-4 text-start">Welcome to Expo</h1>
          <p className="mb-6 text-xl text-start text-gray-200">Let's explore with us this page</p>
          <button className="px-6 py-2 text-black font-semibold rounded-lg shadow-md bg-white  hover:bg-black hover:text-white transition">
            Get Started
          </button>
        </div>
      </div>
      <div className="min-h-96">
        features
      </div>
      <Footer/>
  
    </>
  );
}
