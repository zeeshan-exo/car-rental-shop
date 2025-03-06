"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { logout } from "../actions/auth";
import { useEffect, useState } from "react";
import { LogOut, Car, Calendar, MapPin, Search, Star } from "lucide-react";
import { MdFeaturedPlayList } from "react-icons/md";
import Image from "next/image";

export default function Home() {
  const [user, setUser] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const getUserSession = async () => {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setUser(data?.user);
    };
    getUserSession();
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Cars", href: "/dashboard/cars" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Reviews", href: "#testimonials" },
  ];

  return (
    <>
      <Header
        title="AutoNex"
        navLinks={navLinks}
        rightContent={
          user ? (
            <Button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </Link>
          )
        }
        className="bg-gray-900 text-white fixed w-full z-10 px-4 py-4"
      />

      <section className="relative min-h-screen flex items-center px-6 sm:px-12 bg-[url('/pexels-derwin-edwards.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/70 "></div>
        <div className="relative z-10 max-w-4xl mx-auto text-white text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Welcome to AutoNex
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow-md">
            Your Ultimate Car Rental Experience
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Explore our wide range of vehicles and enjoy seamless booking, flexible rentals, and exceptional service.
          </p>


          <Link href="#cars">
            <button className="mt-6 px-8 py-3 text-lg font-bold rounded-full bg-yellow-500 text-black hover:bg-yellow-600 transition-all hover:-translate-y-1 shadow-md">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <section id="cars" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-2">
            <MdFeaturedPlayList className="text-blue-600" />
            Featured Vehicles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition-transform">
              <Image
                src="/api/placeholder/400/300"
                alt="Toyota Camry"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Toyota Camry</h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  $49<span className="text-sm text-gray-500 font-normal">/day</span>
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <Features />
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Roll?</h2>
        <Link href="#cars">
          <Button className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-bold text-lg transition-colors">
            Book Now
          </Button>
        </Link>
      </section>

      <Footer />
    </>
  );
}