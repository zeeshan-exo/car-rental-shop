"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features"
import { logout } from "../services/actions/auth";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react"; 
import { MdFeaturedPlayList } from "react-icons/md";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserSession = async () => {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setUser(data?.user);
    };
    getUserSession();
  }, []);

  return (
    <>
      <Header
        title="Expo"
        navLinks={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Contact", href: "/" },
          { label: "About", href: "/" },
        ]}
        rightContent={
          <div className="space-x-4 flex items-center">
            {user ? (
              <button onClick={logout} className="text-red-500 font-bold text-xl">
                <LogOut />
              </button>
            ) : (
              <Link href="/pages/login" className="text-blue-500">
                Login
              </Link>
            )}
          </div>
        }
      />

      <div className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 bg-[url('/pexels-derwin-edwards.jpg')] bg-cover bg-center bg-no-repeat">

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>


        <div className="relative max-w-2xl mx-auto text-white z-10 drop-shadow-lg">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-start">
            Welcome to Expo
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-4">
            Your Ultimate Car Rental Experience
          </p>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Explore our wide range of vehicles and enjoy seamless booking, flexible rentals, and exceptional customer service.
          </p>
          <Link href="/dashboard/products">
            <button className="px-8 py-3 text-lg font-bold rounded-full bg-yellow-500 text-black shadow-md hover:bg-yellow-600 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      <div className="min-h-96 bg-gray-100 py-12">
          <Features/>
      </div>

      <Footer />
    </>
  );
}